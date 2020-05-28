$(document).ready(function () {


	var stopwatch_i = 0;


	class Stopwatch {
		constructor(display, results) {
			this.running = false;
			this.display = display;
			this.results = results;
			this.laps = [];
			this.reset();
			this.print(this.times);
		}

		reset() {
			this.times = [0, 0, 0];
		}

		start() {
			if (!this.time) this.time = performance.now();
			if (!this.running) {
				this.running = true;
				requestAnimationFrame(this.step.bind(this));
			}
		}

		lap() {
			let times = this.times;
			let li = document.createElement('li');
			li.innerText = this.format(times);
			this.results.appendChild(li);
		}

		stop() {
			this.running = false;
			this.time = null;
		}

		restart() {
			if (!this.time) this.time = performance.now();
			if (!this.running) {
				this.running = true;
				requestAnimationFrame(this.step.bind(this));
			}
			this.reset();
		}

		clear() {
			clearChildren(this.results);
		}

		step(timestamp) {
			if (!this.running) return;
			this.calculate(timestamp);
			this.time = timestamp;
			this.print();
			requestAnimationFrame(this.step.bind(this));
		}

		calculate(timestamp) {
			var diff = timestamp - this.time;
			// Hundredths of a second are 100 ms
			this.times[2] += diff / 10;
			// Seconds are 100 hundredths of a second
			if (this.times[2] >= 100) {
				this.times[1] += 1;
				this.times[2] -= 100;
			}
			// Minutes are 60 seconds
			if (this.times[1] >= 60) {
				this.times[0] += 1;
				this.times[1] -= 60;
			}
		}

		print() {
			this.display.innerText = this.format(this.times);
		}

		format(times) {
			return `\
	${pad0(times[0], 2)}:\
	${pad0(times[1], 2)}:\
	${pad0(Math.floor(times[2]), 2)}`;
		}
	}


	function pad0(value, count) {
		var result = value.toString();
		for (; result.length < count; --count)
			result = '0' + result;
		return result;
	}

	function clearChildren(node) {
		while (node.lastChild)
			node.removeChild(node.lastChild);
	}

	let stopwatch = new Stopwatch(document.querySelector('.stopwatch span'), document.querySelector('.results'));

















	$('#play').on('click', function () {

		stopwatch.start();
		stopwatch_i++
		$("#display").html("");
		show();
		/*$('#next').show();*/
		$(this).hide();
	});
	var excCount = 0;
	$('#next').on('click', function () {

		stopwatch.lap();
		stopwatch_i++;


		if (excCount <= 8) {
			excCount = excCount + 1;
			$("#display").html("");
			show();
		} else {
			$('#next-exercise').show();
			$(this).hide();
		}

	});

	$('#stop').on('click', function () {});
	$('#text').hide();

	$('#regression3').modal('show');

	var error_arr = [];
	error_arr_index = 0;

	var show = function () {
		var text = $("#text").text();
		text = text.replace(/[^a-zA-ZА-Яа-яЁё0-9]/gi, '').replace(/\s+/gi, ', ');
		text = text.match(/(.{1,4})/gim) || '';

		function compareRandom(a, b) {
			return Math.random() - 0.5;
		}
		text.sort(compareRandom);
		text.length = 7;
		var columnsArr = [];
		for (var i = 0; i <= 4; i++) {
			var colNum = String(i);
			window['column' + i] = text;
			$("#display").append('<div class="display-row" style="display: flex; width: 100%; justify-content: space-around;"></div>')
			for (var k = 0; k < text.length; k++) {
				$(".display-row").eq(i).append('<a href="#" class="display-row-item" style="margin: 0 10px; color: #000;">' + text[k] + '</a>');
			}
		}
		var colQuantity = $(".display-row").length - 1;

		function randomInteger(min, max) {
			var rand = min + Math.random() * (max + 1 - min);
			rand = Math.floor(rand);
			return rand;
		}
		var randCol = randomInteger(0, colQuantity);
		var randEl = randomInteger(0, text.length - 1);
		var element = $(".display-row").eq(randCol).find('.display-row-item').eq(randEl);
		var elements = element.text();
		elements = elements.match(/(.{1,1})/gim) || '';
		var elementsLength = elements.length;
		var randSymbolNumber = randomInteger(0, elementsLength - 1);
		var randSymbol = elements[randSymbolNumber];
		var textArray = $("#text").text();
		textArray = textArray.replace(/[^a-zA-ZА-Яа-яЁё0-9]/gi, '').replace(/\s+/gi, ', ');
		textArray = textArray.match(/(.{1,1})/gim) || '';
		for (var q = textArray.length - 1; q >= 0; q--) {
			if (textArray[q] === randSymbol) {
				textArray.splice(q, 1);
			}
		}
		var newLetterNumber = randomInteger(0, textArray.length - 1);
		var newLetter = textArray[newLetterNumber];
		elements[randSymbolNumber] = newLetter;
		elements = elements.join('');
		element.text(elements);
	}
	$("body").on("click", ".display-row-item", function () {
		var that = this;
		var list = $(that).parents(".display-row").find("a");
		var listItemIndex = list.index($(that));
		var errorCount = 0;
		for (var w = 0; w < list.length; w++) {
			if ($(that).text() == $(".display-row").eq(w).find("a").eq(listItemIndex).text()) {
				errorCount++;
				//console.log(errorCount);
			}
		}
		if (errorCount == 5) {
			for (var w = 0; w < list.length; w++) {
				$(".display-row").eq(w).find("a").eq(listItemIndex).css({
					color: 'red'
				});
			}
			error_arr_index++;
			error_arr[0] = error_arr_index;

		} else {
			for (var w = 0; w < list.length; w++) {
				$(".display-row").eq(w).find("a").eq(listItemIndex).css({
					color: 'green'
				});
			}
		}
		if (excCount == 5) {
			var difference_arr = []

			stopwatch.lap();
			stopwatch.stop();

			var right_answer = 6 - parseInt(error_arr[0]);
			var result_percent_right = (right_answer * 100) / 6;
			result_percent_right = result_percent_right.toFixed(2) + '%';


			$('#regression4').modal('show');


			var resultTime = $('#regression4 ul.results').find('li');
			for (let rt = 0; rt < resultTime.length; rt++) {

				if (rt < 5) {
					var rtt = rt + 1;
				} else {
					break;
				}

				var first_dif = $('#regression4 ul.results li').eq(rt).html();
				var second_dif = $('#regression4 ul.results li').eq(rtt).html();


				second_dif = second_dif.split(': ');
				second_dif = second_dif.join();
				second_dif = second_dif.replace(/\s+/g, '');
				first_dif = first_dif.split(': ');
				first_dif = first_dif.join();
				first_dif = first_dif.replace(/\s+/g, '');


				var second_dif_min = second_dif.substring(0, 2);
				var first_dif_min = first_dif.substring(0, 2);
				var second_dif_sec = second_dif.substring(3, 5);
				var first_dif_sec = first_dif.substring(3, 5);


				if (rt == 0) {
					difference_arr[5] = (first_dif_min * 60 + first_dif_sec) - 0;
				}

				var result_minsec = (second_dif_min * 60 + second_dif_sec) - (first_dif_min * 60 + first_dif_sec);
				difference_arr[rt] = result_minsec;


				//var second_dif_ms =second_dif.substring(6,8);
				//var first_dif_ms =first_dif.substring(6,8);

				var difference = $('#regression4 ul.results li').eq(rt + 1).html() - $('#regression4 ul.results li').eq(rt).html();
			}
			console.log(difference_arr);

			var summ = 0;
			for (let md = 0; md < difference_arr.length; md++) {
				summ = summ + difference_arr[md];
			}
			var middleNum = summ / difference_arr.length;
			middleNum = middleNum.toFixed(0);
			if (middleNum < 10) {
				middleNum = '0' + middleNum;
			}
			var rand_ms = randomNumber(0, 99);
			if (rand_ms < 10) {
				rand_ms = '0' + rand_ms;
			}

			function randomNumber(min, max) {
				var rand = min - 0.5 + Math.random() * (max - min + 1)
				rand = Math.round(rand);
				return rand;
			}
			$('#regression4 .onboarding-content .reg_h41 span').html(result_percent_right);
			$('#regression4 .onboarding-content .reg_h42 span').html(middleNum + ':' + rand_ms);
			$('#regression4 .onboarding-content button').click(function () {
				location.href = 'finish.html';
			})


		} else {
			var newLap = setTimeout(function () {
				$("#next").trigger('click');
			}, 1000);
		}

	});
});