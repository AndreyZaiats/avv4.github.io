$(document).ready(function() {
	$('#shulte_modal3').modal('show');
/* 	sweetAlert({
		title: "Таблица Шульте 5х5",
		text: " 25 элементов - классический формат таблицы Шульте. <br /> <br /> Сфокусируйте внимание на таблице и нажимайте последовательно на номера от 1 до 25. <br /> Чем меньше общее время выполнения, тем лучше.",
		
		html: true
		}
	); */
	
	function calculateResults(time) {
		$('#shulte_modal4').modal('show');
		$('#shulte_modal4 .onboarding-text h4 span').html(time);
		$('#shulte_modal4 .onboarding-content button').click(function () {
			location.href = 'inverted-text.html';
		})
	}

	var valuesObj = {
		'num1': ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],
		'num2': ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25'],
		'num3': ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p']
	};
	var num = [];
		num = valuesObj.num2;
	var count = 0;
    var timeArray = [];
	function compareRandom(a, b) {
	  return Math.random() - 0.5;
	}	
	num.sort(compareRandom);
	for (var i = 0; i <= num.length-1; i++) {
		$("#table").append('<a href="#" class="table-item-5"></a>');
		$(".table-item-5").eq(i).html(num[i]);
	}
	$("body").on('click', '.table-item-5', function() {
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
      		/*$(".type").append("Your time:" + timeArrayItem);*/
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
