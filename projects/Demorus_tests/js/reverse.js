$(document).ready(function(){

  var startDate = new Date();
  var startTime = startDate.getTime();

  $('#finish').on('click', function(){
    calculateResults();
  });

  sweetAlert("Instructions", "Letters in this text are backwards. Once you start reading, each word will be a pain to understand, but progress will come fast. It is an important exercise to train eye view angle.  Read this text, once you complete – hit COMPLETE button");

  $('.text-box').find('p').each(function(){
    var text = $(this).text();
    var reverse = text.split("").reverse().join("").split(" ").reverse().map(checkLetter).join(" ");
    $(this).text(reverse);
  });

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
        window.location.href = 'sprint.html';
      }
    });
  }

  function getMark(score) {
    store.set('three', score);
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

  function checkLetter(e) {
    var lastChar = e.length - 1;
    if ( isUpperCase(e.charAt(lastChar)) ) {
      e = capitalize(e);
    }
    if ( e.charAt(0) === ',' || e.charAt(0) == '.' ) {
      e = firstToLast(e);
    }
    return e;
  }

  function isUpperCase(str) {
    return str === str.toUpperCase();
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length - 1) + str.charAt(str.length - 1).toLowerCase();
  }

  function firstToLast(str) {
    return str.slice(1, str.length) + str.charAt(0);
  }

});