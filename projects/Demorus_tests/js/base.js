$(document).ready(function(){

	var startDate = new Date();
	var startTime = startDate.getTime();

	$('#finish').on('click', function(){
		calculateResults();
	});

  sweetAlert("Instructions", "Read this text as quick as you can. Once you complete – hit complete button");

  function calculateResults() {

		var date_now = new Date (); 
		var time_now = date_now.getTime (); 
		var time_diff = time_now - startTime; 
		var seconds_elapsed = Math.floor ( time_diff / 1000 ); 
    var text = getMark(seconds_elapsed);
    sweetAlert("Alright!", text, "success");
  }

  function getMark(score) {
    if ( score > 8 ) {
      return "You'r on top of 92%, just a bit more training and you will be above all!";
    }
    if ( score > 6 && score <= 8 ) {
      return "You'r on top of 83%, you need to train a bit more!";
    }
    if ( score > 4 && score <= 6 ) {
      return "You'r in 74% of avarage, you need to train a bit more!";
    }
    if ( score > 2 && score <= 4 ) {
      return "You'r in 63% of avarage, you need to train a bit more!";
    }
    if ( score <= 2 ) {
      return "You definitely need to train more!";
    }
  }

});