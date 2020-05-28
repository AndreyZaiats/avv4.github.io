var wpm = $('#speed').val();
var interval = 60000/wpm;
var paused = false;
var $space = $('#display');
var i = 1;

$('#text').hide();

$('#sprint1').modal('show');
	
var startDate, startTime, timer, spritz;
var gpm = 150;

function stop() {
  clearInterval(timer);
  calculateResults();
}

function start() {
  timer = setInterval(incrementSpeed, 2500); 
  startDate = new Date();
  startTime = startDate.getTime();
  $('#play').hide();
  $('#stop').show();
}

/* TEXT PARSING */
function words_set() {
  words = $('#text').text().trim()
    .replace(/([-—])(\w)/g, '$1 $2')
    .replace(/[\r\n]/g, ' {linebreak} ')
    .replace(/\. /g, '. {period} ')
    .replace(/[ \t]{2,}/g, ' ')
    .split(' ');
  for (var j = 1; j < words.length; j++) {
    words[j] = words[j].replace(/{linebreak}|{period}/g, '   ');
  }
}
/* ON EACH WORD */
function word_show(i) {
  var word = words[i];
  var stop = Math.round((word.length+1)*0.4)-1;
  $space.html('<div style="width: 40%; text-align: right;">'+word.slice(0,stop)+'</div><div class="split">'+word[stop]+'</div><div style="width: 60%; text-align: left;">'+word.slice(stop+1)+'</div>');
}
/* ITERATION FUNCTION */
function word_update() {
  spritz = setInterval(function() {
    word_show(i);
    i++;
    if (i == words.length) {
      setTimeout(function() {
        $space.html('');
        spritz_pause();
      }, interval);
      clearInterval(spritz);
    };
  }, interval);
}

/* PAUSING FUNCTIONS */
function spritz_pause() {
  clearInterval(spritz);
  paused = true;
  $('#play').addClass('paused');
}
function spritz_play() {
  word_update();
  paused = false;
  $('#play').removeClass('paused');
}
function spritz_flip() {
  if (paused) {
    spritz_play();
  } else {
    spritz_pause();
  }
}

/* INITIATE */
words_set();
//word_show(0);
//word_update();

/* CHANGE SPEED */
$('#speed').on('input', function() {
  interval = 60000/$('#speed').val();
  if (!paused) {
    clearInterval(spritz);
    word_update();
  }
});

/* REFRESH TEXT */
$('#refresh').on('click', function() {
  clearInterval(spritz);
  words_set();
  i = 0;
  spritz_play();
});

/* PAUSE BUTTON AND SPACE BAR */
$('#play').on('click', function() {
  start();
  spritz_play();
  return false;
});
$('#stop').on('click', function() {
  stop();
  spritz_pause();
  return false;
});
$(document).on('keyup', function(e) {
  if (e.keyCode == 32) {
    spritz_flip();
  }
});

function incrementSpeed() {
  gpm = gpm + 50;
  var speed = gpm;
  interval = 60000/speed;
  clearInterval(spritz);
  spritz = setInterval(function() {
    word_show(i);
    i++;
    if (i == words.length) {
      setTimeout(function() {
        $space.html('');
        spritz_pause();
      }, interval);
      clearInterval(spritz);
    };
  }, interval);
}

function calculateResults() {

  var date_now = new Date (); 
  var time_now = date_now.getTime (); 
  var time_diff = time_now - startTime; 
  var seconds_elapsed = Math.floor ( time_diff / 1000 ); 
  var text = getMark(seconds_elapsed);

  $('#sprint2').modal('show');
  $('#sprint2 .onboarding-content h4 span').html(time_diff/1000 +'s')
  $('#sprint2 .onboarding-content button').click(function () {
    location.href = 'fast-words-harder.html';
  })

}

function getMark(score) {
  store.set('five', score);
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