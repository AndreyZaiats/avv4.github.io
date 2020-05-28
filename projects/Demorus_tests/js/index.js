$(document).ready(function(){

  $('input').on('change', function(){
    $(this).removeClass('error');
  });

  $('#name').on('change', function(){
    if ( !$(this).val().length ) $(this).addClass('error');
  });

  $('#mail').on('change', function(){
    if ( !$(this).val().length ) $(this).addClass('error');
    if ( !validateEmail($(this).val()) ) $(this).addClass('error');
  });

  $('#start').on('mouseover', function(){
    if ( !validateFields() ) {
      $(this).addClass('fail');
    } else {
      $(this).removeClass('fail');
    }
  });

  $('#start').on('click', function(){
    if ( $(this).hasClass('fail') ) {
      validateFields();
      return false;
    } else { 
      var mail = $('#mail').val();
      var name = $('#name').val();
      store.set('name', name);
      store.set('mail', mail);
      window.location.href = 'disorg.html';
    } 
  });

  function validateFields() {
    var mail = $('#mail').val();
    var name = $('#name').val();
    if ( !mail || !validateEmail(mail) ) {
      $('#mail').addClass('error');
      return false;
    }
    if ( !name ) {
      $('#name').addClass('error');
      return false;
    }
    return true;
  }

	function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

});