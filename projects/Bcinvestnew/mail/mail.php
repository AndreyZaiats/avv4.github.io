<?
class Mail{
	public $settings = [];
	public $data     = [];

	var $header  = '';
	var $message = '';

	var $sendSubject = '';
	var $sendMessage = '';

	function buildHeader(){
		$this->header = "Content-type: text/html; charset=\"utf-8\"\r\n";

		$this->_from(); 
	}

	function _from(){
		if($this->settings['emailFrom']){
			$this->header .= "From: ".$this->settings['emailFrom']."\r\n"; 
		}
			
		if($this->settings['emailReply']){
			$this->header .= "Reply-To: ".$this->settings['emailReply']."\r\n";
		}
	}

	function _include($name){
		$tpl = file_get_contents(__DIR__.'/templates/'.$name.'.html');

		$tpl = str_replace('{@images}',$this->_urlDir().'images',$tpl);

		foreach ($this->data as $key => $value) {
			$tpl = str_replace('{@user-'.$key.'}',$value ? $value : 'Пусто', $tpl);
		}

		return $tpl;
	}

	function _dir(){
		return str_replace('send.php','',$_SERVER['SCRIPT_NAME']);
	}

	function _urlDir(){
		return 'https://'.$_SERVER['HTTP_HOST'].$this->_dir();
	}

	function attachFile(){
		$boundary = "--".md5(uniqid(time()));

		$this->header  = "MIME-Version: 1.0;\r\n"; 
		$this->header .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n"; 

		$this->_from();

		$multipart  = "--$boundary\r\n"; 
		$multipart .= "Content-Type: text/html; charset=utf-8\r\n";
		$multipart .= "Content-Transfer-Encoding: base64\r\n";    
		$multipart .= "\r\n";
		$multipart .= chunk_split(base64_encode($this->sendMessage));

		 
		// Закачиваем файл 
		$fp = fopen($this->settings['attachFile'],"r"); 

		if (!$fp){ 
			echo json_encode(['error'=>'Не удалось открыть файл']);

			exit(); 
		} 

		$file     = fread($fp, filesize($this->settings['attachFile'])); 
		$filename = $this->settings['attachFileName'];

		fclose($fp);

		$message_part  = "\r\n--$boundary\r\n"; 
		$message_part .= "Content-Type: application/octet-stream; name=\"$filename\"\r\n";  
		$message_part .= "Content-Transfer-Encoding: base64\r\n"; 
		$message_part .= "Content-Disposition: attachment; filename=\"$filename\"\r\n"; 
		$message_part .= "\r\n";
		$message_part .= chunk_split(base64_encode($file));
		$message_part .= "\r\n--$boundary--\r\n";

		$this->sendMessage = $multipart . $message_part;
	}

	function buildUserMail(){
		$this->sendSubject = $this->settings['subjectForUser'];

		$this->sendMessage  = $this->_include('styles');
		$this->sendMessage .= $this->_include('head');
		$this->sendMessage .= $this->_include('thank');
		$this->sendMessage .= $this->_include('footer');
	}

	function buildAdminMail(){
		$this->sendSubject = $this->settings['subjectForAdmin'];
		$this->sendMessage  = $this->_include('styles');
		$this->sendMessage .= $this->_include('admin');

		if($this->data['message']){
			$this->sendMessage .= $this->_include('message');
		}
	}

	function sendEmail($to){
		mail($to, $this->sendSubject, $this->sendMessage, $this->header);
	}
}
?>