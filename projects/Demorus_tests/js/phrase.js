$(document).ready(function(){

	$('#play').on('click', start);
	$('#stop').on('click', stop);

	$('#text').hide();

	var startDate, startTime, timer;

	var gpm = 10;

	$('#phrase1').modal('show');
	
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
				'wordsPerLine': 3,
				'groupsPerMinute': 60
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
		gpm = gpm + 3;
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
		document.cookie = "finishPhrase="+seconds_elapsed;

		$('#phrase2').modal('show');
    $('#phrase2 .onboarding-content button').click(function () {
      location.href = 'regression.html';
    })

  }

	function stop() {
		clearInterval(timer);
		stopPlayback();
		calculateResults();
	}

	function start() {
		timer = setInterval(incrementSpeed, 3000); 
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




/* Рейтинг можно ещё больше упростить, по чтению фразами посчитать скорость чтения, а по времени на таблицу 4х4 посчитать внимательность. 


Скорость чтения:
34с - макс -100% чтение фразами
30с  это 98%
27с  это 95%
25с  это 92%
23с - 90%
все что ниже по пропорции

Внимательность:
Все что ниже 11секунды 100%
11+     это 95%
12+     это 92%
13+     это 90%


рейтинг за курс = среднее число
далее по пропорции */