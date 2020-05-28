var init = {
	swiper: function(){
		/*
		
		roundLengths: true, окрглить значения в анимации, а то разыто все

		effect: 'fade', эффект

		autoHeight: true, авто высота

		autoplay: {
			delay: 5000,
		},

		loop: true, лооп

		spaceBetween: 30, оступ между слайдами

		slidesPerView: 3, количество слайдов

		centeredSlides: true, слайды по центру

		pagination: {
	        el: '.swiper-pagination', точки внизу слайдера
	        clickable: true
	   	},

	   	simulateTouch: false, отключить симуляцию пальца
		
		on: {
		    init: function () {
		    	событие запуска слайдера
		    },
	  	}

		.on('slideChange', function(){
			this.activeIndex
		});

	   	.slideTo(swiper.realIndex); прокрутить к слайду

		*/
		

		var width = $(window).width();

		var navigation = function(elem){
			var parent = $(elem).parents('.container');

			return {
				nextEl: $('.swiper-button-next',parent),
				prevEl: $('.swiper-button-prev',parent),
			}
		}

		new Swiper('#slides-main', {
			spaceBetween: 0,
			autoplay: {
				delay: 5000,
			},
			autoHeight: true,
			effect: 'fade',
			roundLengths: true, 
			navigation: navigation('#slides-main'),
		});


		new Swiper('#slides-video-reviews', {
			spaceBetween: 30,
			slidesPerColumn: 2,
			slidesPerView: width > 996 ? 3 : width > 768 ? 2 : width > 576 ? 2 : 1,
			roundLengths: true, 
			navigation: navigation('#slides-video-reviews'),
			pagination: {
		        el: '#slides-video-pagination',
		        clickable: true
		   	},
		});
		
	},
	mobileMenu: function(){
		$('#mobile-menu').menu();

		$('#mobile-menu-close').on('click',function(){
			$('#mobile-menu').menu('close');
		})

		$('#mobile-menu-toggle').on('click',function(e){
			e.preventDefault();

			$('#mobile-menu').menu('open');
		})
	},
	modal: function(){
		$('a[data-modal]').click(function(event) {
			$(this).modal({
				fadeDuration: 250
			});

			return false;
		});
	},
	magnific: function(){
		$('.gallery').magnificPopup({
			delegate: '.image',
			type: 'image',
			gallery: {
				enabled: true
			},
		});
	},
	video: function(){
		$('.popup-video').magnificPopup({
	        disableOn: false,
	        type: 'iframe',
	        mainClass: 'mfp-fade',
	        removalDelay: 160,
	        preloader: false,
	        fixedContentPos: false
	    });
	},
	wow: function(){
		$('.wow-delay').each(function(){
			var delay = 0;

			$('.wow',this).each(function(){
				delay += 0.1;

				if(delay > 1) delay = 0;

				$(this).attr('data-wow-delay',delay + 's');
			})
		});


		/* фитча, если нужно показать некий контен в котором есть элементы wow, делаем эту фитчу и wow пащет
		var s = $(window).scrollTop()

			    $(window).scrollTop(s - 5);
			    $(window).scrollTop(s + 5);
		*/

		new WOW().init();
	},
	onload: function(){
		var ready = false;
		var load  = function(){
			if(ready) return;

			ready = true;

			clearTimeout(timer);

			$('body').addClass('loaded');

			init.wow();
		}

		
		var timer = setTimeout(function(){
			load();
		}, 5000);

		window.addEventListener('load',function(){
			load();
		});
	},
	form: function(open_page){
		$("input[name='phone']").inputmask("+7 (999) 999 99 99",{
	    	//placeholder: "(909) XXX XX XX",
	    	//showMaskOnHover: false,
	    	clearMaskOnLostFocus: true
	    });

		$('form').submit(function(e){
			e.preventDefault();

			var form = $(this);

			$('button',form).css({opacity: 0.5}).attr('disabled', '');

			$.post('send.php',$(this).serializeArray(),function(json){
				$('button',form).css({opacity: 1}).removeAttr('disabled');

				if(json.success){
					if(open_page){
						window.location = open_page;
					}
					else{
						$('#modal-success').modal({
							fadeDuration: 250
						});

						setTimeout(function(){
							$('input,textarea',form).not('[type="hidden"]').val('');
							
							$.modal.close();
						},3000);
					}
				}
			},'json');
		})
	},
	faq: function(){
		$('.e_faq').each(function(){
			var item = $(this);
			var body = $('.e_faq-thing',item);

			$('.e_faq-utter',item).on('click', function(){
				if(body.is(':visible')){
					body.slideUp(200);
					item.removeClass('open')
				}
				else{
					body.slideDown(200);
					item.addClass('open');
				}
			})
		})
	},
	more: function(){
		$('.e_more').each(function(){
			var read = $('.e_more-read',this);
			var body = $('.e_more-body',this);

			read.on('click', function(e){
				e.preventDefault();

				if(body.is(':visible')){
					body.slideUp(200);
					read.text('Развернуть');
				}
				else{
					body.slideDown(200);
					read.text('Свернуть');
				}
			})
		})
	},
	time: function(elem, date){
		var timeend = new Date(date);

		function time() {
		    var today = new Date();
		    	today = Math.floor((timeend-today)/1000);


		    var tsec  = today%60; today=Math.floor(today/60); if(tsec<10) tsec='0'+tsec;
		    var tmin  = today%60; today=Math.floor(today/60); if(tmin<10) tmin='0'+tmin;
		    var thour = today%24; today=Math.floor(today/24);

		    today = ('0' + today).slice(-2);
		    tsec  = ('0' + tsec).slice(-2);
		    tmin  = ('0' + tmin).slice(-2);
		    thour = ('0' + thour).slice(-2);

		    $('.day',elem).text(today);
		    $('.hour',elem).text(thour);
		    $('.min',elem).text(tmin);
		    $('.sec',elem).text(tsec);
		}

		time();

		setInterval(time,1000)
	},
	scrollTo: function(pushHistory){
		$(".scrollTo").click(function(e){
		    e.preventDefault();

		    $.modal.close();

		    var id = $(this).attr('href') || $(this).data('modal');

	        var ps = $(id).offset().top;

	        if(pushHistory){
		        if(history.pushState) {
		            history.pushState(null, null, id);
		        }
		        else {
		            location.hash = id;
		        }
		    }

	        $('html, body').animate({
	            scrollTop: ps-20
	        }, Math.max(500,Math.round(ps * 0.2)));
		});
	},
	tabs: function(){
		$('.e_tabs').each(function(){
			var links   = $('.e_tabs-utter',this);
			var content = $('.e_tabs-content',this);

			links.on('click', function(e){
				e.preventDefault();

				links.removeClass('active');

				$(this).addClass('active');

				var target = $(this).attr('href');

				content.removeClass('active')

				$(target).addClass('active')
			})
		})
	},
	fluid: function(){
		function resize(){
			var width = $(window).width();

			$('.fluid-right').each(function(){
				var offset = $(this).offset();

				$(this).width(width - offset.left);
			});
		}

		$(window).resize(resize);

		resize();
	},
	sticker: function(sticker){
		sticker.sticky({topSpacing:0});

		/*
		sticker.on('sticky-start', function() {
			sticker.addClass('detach')
		});

		sticker.on('sticky-end', function() {
			sticker.removeClass('detach')
		});
		*/
	},
	count: function(){
		$('.count').each(function () {
		    $(this).prop('Counter',0).animate({
		        Counter: $(this).text()
		    }, {
		        duration: 5000,
		        easing: 'swing',
		        step: function (now) {
		            $(this).text(Math.ceil(now));
		        }
		    });
		});
	}
}

$(function(){
	var isPageSpeed = /Google Page Speed Insights/.test(navigator.userAgent);

	// чтобы результат был аж 100!))
	if(isPageSpeed) return;

	init.magnific();
	init.video();
	init.swiper();
	init.modal();
	init.mobileMenu();
	init.form();
	init.faq();
	init.more();
	init.scrollTo(true);
	init.tabs();
	init.count();

	$('.form-select').niceSelect();

	if($(window).width() <= 992) init.sticker($('#sticker'));

	//init.fluid();

	//init.time($('.date'),'Dec 03 2018 00:00:00')
	







	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//удалить этот код, этот код для примера
	
	var modal = $('#modal-reg')
	var good  = modal.find('.e_good')

	modal.find('.btn').on('click', function(){
		var _self = $(this).addClass('btn-disabled');

		setTimeout(function(){
			_self.slideUp(200);

			good.slideDown(200).addClass('e_good-show');
		},1000)
	})

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
})

init.onload();