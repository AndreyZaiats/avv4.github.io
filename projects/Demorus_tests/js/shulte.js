$(document).ready(function() {

	$('#shulte_modal1').modal('show');

/* 	sweetAlert({
		title: "Добро пожаловать!",
		text: "Перед вами короткий курс для обучения скорочтению, он содержит 9 интерактивных задач и занимает около 5 минут. <br /> Проходите этот курс регулярно для развития навыков. <br /><br />Первое упражнение называется таблицы Шульте. Сфокусируйте внимание на таблице и нажимайте последовательно на номера от 1 до 16. <br /> Чем меньше общее время выполнения, тем лучше.",
				
		html: true
		}
	); */
	
  function calculateResults(time) {

		document.cookie = "finishShulte="+time;

	$('#shulte_modal2').modal('show');
	$('#shulte_modal2 .onboarding-text h4 span').html(time);
	$('#shulte_modal2 .onboarding-content button').click(function () {
		window.location.href = 'fast-words.html';
	})
/* 	  alert('all');
	sweetAlert({
		title: "Отлично!", 
		text: "Время: " + time, 
		type: "success",
		confirmButtonText: "Дальше",
	},
	function(isConfirm){
	if (isConfirm) {
	window.location.href = 'fast-words.html';
	}
	}); */
  }


	var valuesObj = {
		'num1': ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],
		'num2': ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25']
	};
	var num = [];
		num = valuesObj.num1;
	var count = 0;
    var timeArray = [];
	function compareRandom(a, b) {
	  return Math.random() - 0.5;
	}	
	num.sort(compareRandom);
	for (var i = 0; i <= num.length-1; i++) {
		$("#table").append('<a href="#" class="table-item-4"></a>');
		$(".table-item-4").eq(i).html(num[i]);
	}
	$("body").on('click', '.table-item-4', function() {
      	var arrayLength = num.length;
      	if (($(this).text()==(count+1)) && ($(this).text() < arrayLength) && ($('#clock').val()!="00:00:00.00") ) {
      		count = count + 1;
      		var timeArrayItem = $('#clock').val();
			  timeArray.push(timeArrayItem);
			  
			  $(this).css('background','#24b314');
			  var thisTime = $(this);
			  var st2 = setTimeout(function(){
				  $(thisTime).attr('style','');
			  }, 100);
      	} else if (($(this).text() == arrayLength) && ((count+1) == arrayLength)) {
      		count = count + 1;
      		var timeArrayItem = $('#clock').val();
      		timeArray.push(timeArrayItem);
      		/*$(".type").append("Your time: " + timeArrayItem );*/
			  clearALL();
		    calculateResults(timeArrayItem);
		  }
		  else {
			$(this).css('background','#e65252');
			var thisTime = $(this);
			var st2 = setTimeout(function(){
				$(thisTime).attr('style','');
			}, 100);
		  }
	});
	$("body").on('click', '.onboarding-content button.slick-next', function() {
		findTIME();
	});
});


