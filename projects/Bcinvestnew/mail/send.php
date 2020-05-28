<?php
error_reporting(E_ERROR | E_PARSE);

include __DIR__.'/mail.php';

$mail = new Mail();

$mail->settings = [
	//отпровлять сообшение пользователю?
	'sendToUser'=>true,
	//отпровлять сообшение админу?
	'sendToAdmin'=>true,

	//прикрепить файл, путь к файлу, например ./attach/fileName.pdf
	'attachFile'=>false,
	//название файла в письме, например fileName.pdf
	'attachFileName'=>'',

	//заголовок для пользователя
	'subjectForUser'=>'Вы оформили заказ на сайте',
	//заголовок для админа
	'subjectForAdmin'=>'Поступил новый заказ',

	//от кого пришло сообшение, будет Site name <no_replay@domain-name.com>
	'emailFrom'=>'Site name <no_replay@'.$_SERVER['HTTP_HOST'].'>',
	//обратная почта
	'emailReply'=>'no_replay@'.$_SERVER['HTTP_HOST'],
	//мыло администратора
	'emailToAdmin'=>false
];

//текстируем
/*
$_POST['name']    = 'Korner Brazers';
$_POST['email']   = 'test@mail.ru';
$_POST['phone']   = '+7395 893 455 34';
$_POST['message'] = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse expedita sequi delectus error deleniti illum ipsa alias, velit.';
*/

$mail->data = [
	'name'=>strip_tags($_POST['name']),
	'phone'=>strip_tags($_POST['phone']),
	'email'=>strip_tags($_POST['email']),
	'message'=>strip_tags($_POST['message'])
];


if($mail->settings['sendToUser'] && $mail->data['email']){
	$mail->buildHeader();
	$mail->buildUserMail();

	if($mail->settings['attachFile']){
		$mail->attachFile();
	}

	$mail->sendEmail($mail->data['email']);
}

if($mail->settings['sendToAdmin'] && $mail->settings['emailToAdmin']){
	$mail->buildHeader();
	$mail->buildAdminMail();

	$mail->sendEmail($mail->settings['emailToAdmin']);
}

echo json_encode(['success'=>true]);
?>