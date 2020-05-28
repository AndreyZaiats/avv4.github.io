$(document).ready(function() {

  $('#fast-word3').modal('show');	

	var words = [
    { "word" : ["омут", "олух","слух","стул","оспа","спал","спел","спад"] },
    { "word" : ["сабля", "шапка","шахта","тахта","тапок","тюбик","топот","тонус"] },
    { "word" : ["краска", "смазка","столик","статик","ступор","крепок","хрупок"] },
    { "word" : ["прелесть", "глупость","упорство","мудрость","вечность","восторг","верность","старость","ступор"] },
	{ "word" : ["государство", "индульгенция","воровство","господство","презрение","гостиница","гастрономия","прозрение","поступок"] },
	 { "word" : ["прелесть", "глупость","упорство","мудрость","вечность","восторг","верность","старость","ступор"] },
	{ "word" : ["государство", "индульгенция","воровство","господство","презрение","гостиница","гастрономия","прозрение","поступок"] },
	 { "word" : ["сабля", "шапка","шахта","тахта","тапок","тюбик","топот","тонус"] },
    { "word" : ["краска", "смазка","столик","статик","ступор","крепок","хрупок"] },
	   { "word" : ["омут", "олух","слух","стул","оспа","спал","спел","спад"] }
  ];

  var currentWords;
  var i = 0;
  var k = 0;
  var rightWord;
  var rightWordIndex;
  var addWord = function (i) {
    var currentWord = currentWords[i];
    $("#display").text(currentWord);
  }

$("body").on('click', '.answer-item', function() {
  if ($(this).text() == $(".right-answer").text()) {
    $(this).attr('class','btn-success btn');
    /*$("#play").show();*/
  } else {
    $(this).attr('class','btn-danger btn');
  }
  if (k == words.length ) {
    $('#fast-word4').modal('show');
    $('#fast-word4 .onboarding-content button').click(function () {
      location.href = "regression-harder.html";
    })
    
  } else {
    var newLap = setTimeout(function(){
        $("#play").trigger('click');
    }, 1000);
  }

});

function start() {
  startLap(function(val1, val2){
    console.log(val1);
    console.log(val2);
    $("#display").text('');
    $("#answers").html("");
    var arrayQ = [];
    for (var q = 0; q <= 3; q++) {
      $("#answers").append('<a href="#"><div class="answer-item btn btn-primary"></div></a>');
      arrayQ.push(q);
    }
    function compareRandom(a, b) {
      return Math.random() - 0.5;
    }
    arrayQ.sort(compareRandom);
    $("#answers").append('<a href="#"><div class="right-answer btn btn-primary" style="display: none;"></div></a>');
    $(".right-answer").text(val1);
    for (var z = 1; z <= arrayQ.length ; z++) {
      $(".answer-item").eq(arrayQ[0]).text(val1);
      $(".answer-item").eq(arrayQ[z]).text(val2[arrayQ[z]]);
    }
    $('#answers').css({display:"flex"});
  });
  i = 0;
}

function startLap(callback) {
  currentWords = [];
  currentWords = words[k].word;
  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }
  currentWords.sort(compareRandom);
  var arrayLength = currentWords.length;
  addWord(i);
  /*i++;*/
  var run = setInterval(function (){
    i++;
    addWord(i);

    if (i==(arrayLength)) {
      rightWord = $("#display").text();
      rightWordIndex = currentWords.indexOf(rightWord);
      currentWords.splice(rightWordIndex, 1);
      setTimeout(function(){
      },100);
      clearInterval(run);
      if(callback){
        callback(rightWord, currentWords);
      }
    }
  }, 100);
}
$("#play").on('click', function() {
  $('#answers').css({display:"none"}); 
  $(".answer-item").css({color:"black"}); 
  $(this).hide();
  start();
  k++;
  console.log(k);

});


});