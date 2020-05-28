$(document).ready(function(){


  function readCookie(name) {
    var name_cook = name+"=";
    var spl = document.cookie.split(";");
    for(var i=0; i<spl.length; i++) {
      var c = spl[i];
      while(c.charAt(0) == " ") {      
        c = c.substring(1, c.length);       
      }
      
      if(c.indexOf(name_cook) == 0) {     
        return c.substring(name_cook.length, c.length);   
      }
    }
    return undefined;
  }
  var value_cookie1 = readCookie("finishShulte");
  var value_cookie2 = readCookie("finishPhrase");
  console.log(value_cookie1);
  console.log(value_cookie2);

  var percentsFinishPhrase = (function () {

    if (value_cookie2!=undefined) {
      var phrase_percent = 0;
      if (value_cookie2>=34) {
        phrase_percent = 99;
      }
      else if (value_cookie2<34 && value_cookie2>=30) {
        phrase_percent = 98;
      }
      else if (value_cookie2<30 && value_cookie2>=27) {
        phrase_percent = 95;
      }
      else if (value_cookie2<27 && value_cookie2>=24) {
        phrase_percent = 92;
      }
      else if (value_cookie2<24) {
        phrase_percent = (value_cookie2 * 90) / 23;
      }
      phrase_percent = phrase_percent.toFixed(0);
      $('.finish_block1 .finishPhrase h6').html(phrase_percent+'%');
      $('.finish_block1 .finishPhrase .progress-bar').attr('aria-valuenow',phrase_percent).attr('style','width:'+phrase_percent+'%');
  
    }
    else {
      $('.finish_block1 .finishPhrase h6').html(0+'%');
      $('.finish_block1 .finishPhrase .progress-bar').attr('aria-valuenow',0).attr('style','width:'+0+'%');

    }

  })();
  
  var percentsFinishShulte = (function () {
    var phrase_percent = 0;
    if (value_cookie1!=undefined) {
      value_cookie1 = value_cookie1.split(':').join('').substring(0,6);

      value_cookie1_Hours = value_cookie1.substring(0,2);
      value_cookie1_Hours = parseInt(value_cookie1_Hours) * 3600;
  
      value_cookie1_Min = value_cookie1.substring(2,4);
      value_cookie1_Min = parseInt(value_cookie1_Min) * 60;
  
      value_cookie1_Sec = value_cookie1.substring(4,6);
      value_cookie1_Sec = parseInt(value_cookie1_Sec);
      cookie1_Result = value_cookie1_Hours + value_cookie1_Min + value_cookie1_Sec;
  
      console.log(cookie1_Result);
      if (cookie1_Result<=11) {
        phrase_percent = 98;
      }
      else if (cookie1_Result>11 && cookie1_Result<=12) {
        phrase_percent = 95;
      }
      else if (cookie1_Result>12 && cookie1_Result<=13) {
        phrase_percent = 92;
      }
      else if (cookie1_Result>13) {
        phrase_percent = (14 / cookie1_Result) * 90;
      }
      phrase_percent = phrase_percent.toFixed(0);
  
      $('.finish_block1 .finishShulte h6').html(phrase_percent+'%');
      $('.finish_block1 .finishShulte .progress-bar').attr('aria-valuenow',phrase_percent).attr('style','width:'+phrase_percent+'%');
    }
    else {
      $('.finish_block1 .finishShulte h6').html(0+'%');
      $('.finish_block1 .finishShulte .progress-bar').attr('aria-valuenow',0).attr('style','width:'+0+'%');
    }
    

  })();


  var percentsAll = (function () {
    var shulte_p = parseInt($('.finish_block1 .finishShulte h6').html());
    var phrase_p = parseInt($('.finish_block1 .finishPhrase h6').html());
    var resultAll = (phrase_p + shulte_p) / 2;
    resultAll = resultAll.toFixed(2);
    $('.finish_block1 .finishAll h6').html(resultAll+'%');
    $('.finish_block1 .finishAll .progress-bar').attr('aria-valuenow',resultAll).attr('style','width:'+resultAll+'%');

  })()






  var one = store.get('one');
  var two = store.get('two');
  var three = store.get('three');
  var four = store.get('four');
  var five = store.get('five');

  var all_scores = one + two + three + four + five;

  var heading = text = '';

  var name = store.get('name');

  if ( all_scores <= 10 ) {
    heading = 'Nice try, ' + name + '!';
    text = 'But you need to train more, so we\'ll be waiting for you :)';
  }
  if ( all_scores > 10 && all_scores <= 20 ) {
    heading = 'Not so bad, ' + name + '!';
    text = 'But you need to train more, so we\'ll be waiting for you :)';
  }
  if ( all_scores > 20 && all_scores <= 30 ) {
    heading = 'You did good, ' + name + '!';
    text = 'But you can do it better, we\'ll be waiting for you :)';
  }
  if ( all_scores > 30 && all_scores <= 40 ) {
    heading = 'You\'re on top, ' + name + '!';
    text = 'We will bring you to the top, so keep in touch :)';
  }
  if ( all_scores > 40 && all_scores <= 50 ) {
    heading = 'Wow, ' + name + '!';
    text = 'Really great results, hope we will be able to increase your results :)';
  }

  $('#heading').text(heading);
  $('#main-text').text(text);

});