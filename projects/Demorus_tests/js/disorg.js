$(document).ready(function(){

	var startDate = new Date();
	var startTime = startDate.getTime();

	$('#finish').on('click', function(){
		calculateResults();
	});

  sweetAlert("Instructions", "Words in this text have mixed letters. Read this text as quick as you can. Once you complete – hit COMPLETE button. This exercise helps in suppressing subvocalization and understanding words as units.");

  function calculateResults() {

		var date_now = new Date (); 
		var time_now = date_now.getTime (); 
		var time_diff = time_now - startTime; 
		var seconds_elapsed = Math.floor ( time_diff / 1000 ); 
    var text = getMark(seconds_elapsed);
    sweetAlert({
      title: "Alright!", 
      text: text, 
      type: "success",
      confirmButtonText: "Ok, go next!",
    },
    function(isConfirm){
      if (isConfirm) {
        window.location.href = 'phrase.html';
      }
    });
    
  }

  function getMark(score) {
    store.set('one', score);
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