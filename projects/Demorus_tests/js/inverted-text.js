$(document).ready(function(){

	$('#play').on('click', start);
	$('#stop').on('click', stop);

	$('#text').hide();

	var startDate, startTime, timer;

	var gpm = 20;

 $('#inverted1').modal('show');
	
	var phraserInstance = new Phraser(
		$("#text").text(),
		$('#display'),
		extractSettings(),
		$('#slider_div'),
		$('#viewer_ta')
	);

	function extractSettings(){
		return {
				'numLines': 1,
				'wordsPerLine': 1,
				'groupsPerMinute': 10
			};
	}

	function changeSettingsButtonCallback(){
		var newSettings = extractSettings();
		recomputeWpm();
	}

	function recomputeWpm(){
		var newSettings = extractSettings();

		$("#wordsPerMinute").val(
				newSettings.numLines *
				newSettings.wordsPerLine *
				newSettings.groupsPerMinute);
	}

	function incrementSpeed() {
		gpm = gpm + 2;
		var speed = gpm;
		_incrementSpeed(speed);
	}

	function _incrementSpeed(wpm_plus){
		newGpm = phraserInstance.incrementSpeed(wpm_plus);
		//$('#groupsPerMinute').val(newGpm);
		//recomputeWpm();
	}

  function calculateResults() {

		var date_now = new Date (); 
		var time_now = date_now.getTime (); 
		var time_diff = time_now - startTime; 
		var seconds_elapsed = Math.floor ( time_diff / 1000 ); 
		var text = getMark(seconds_elapsed);
		
		console.log(seconds_elapsed);
		$('#inverted2').modal('show');
		$('#inverted2 .onboarding-content h4 span').html(time_diff/1000 +'s')
		$('#inverted2 .onboarding-content button').click(function () {
      location.href = 'sprint.html';
    })

  }

	function stop() {
		clearInterval(timer);
		stopPlayback();
		calculateResults();
	}

	function start() {
		timer = setInterval(incrementSpeed, 10000); 
		startDate = new Date();
		startTime = startDate.getTime();
		startNewPlayback();
		$('#play').hide();
		$('#stop').show();
	}

	function startNewPlayback(){
		phraserInstance.start();
	}

	function stopPlayback() {
		phraserInstance.pause();
	}

	function playButtonCallback(){
		var phraserInstance = $("#display").data('phraserInstance');
		
		if(phraserInstance){
			phraserInstance.playOrResume();
		}
	}

	function pauseButtonCallback(){
		var phraserInstance = $("#display").data('phraserInstance');
		
		if(phraserInstance){
			phraserInstance.pause();
		}
	}

	function rewindButtonCallback(){
		var phraserInstance = $("#display").data('phraserInstance');
		
		if(phraserInstance){
			phraserInstance.rewind();
		}
	}

  function getMark(score) {
    store.set('four', score);
    if ( score > 8 ) {
      return "Better than 95% of all users!";
    }
    if ( score > 6 && score <= 8 ) {
      return "Your results are in top 15%!";
    }
    if ( score > 4 && score <= 6 ) {
      return "25% of users did this exercise faster";
    }
    if ( score > 2 && score <= 4 ) {
      return "40% of users got better results";
    }
    if ( score <= 2 ) {
      return "You definitely need to train more!";
    }
  }

});