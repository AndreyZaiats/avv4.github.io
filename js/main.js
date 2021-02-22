$(document).ready(function() {
    "use strict";
	
	/* -----------------------------------
	      2. Menu and Page Start
	----------------------------------- */
	var $menu_but = '.but-about, .but-resume, .but-portfolio, .but-telegram, .but-contact';
	var $menu_all = '.but-menu, .but-about, .but-resume, .but-portfolio, .but-telegram, .but-contact';

	$('.but-menu').on('click', function() {
		$(this).toggleClass('menu-toggle');

		// About Button
		setTimeout(function() {
			$('.but-about').toggleClass('about-toggle');
		}, 100);

		// Resume Button
		setTimeout(function() {
			$('.but-resume').toggleClass('resume-toggle');
		}, 200);

		// Portfolio Button
		setTimeout(function() {
			$('.but-portfolio').toggleClass('portfolio-toggle');
		}, 300);

		// Blog Button
		setTimeout(function() {
			$('.but-telegram').toggleClass('telegram-toggle');
		}, 400);
	
		// Contact Button
		setTimeout(function() {
			$('.but-contact').toggleClass('contact-toggle');
		}, 500);
	});
	
	$($menu_all).on('click', function() {
		$(this).siblings().css({'z-index': '5'});
		$(this).css({'z-index': '10'});
	});

	// Full Page Layout
	$('.menu-item i').on('click', function() {

		if (!($(this).hasClass('nowhite'))) {
			setTimeout(function() {
				$('.page-background').addClass('scale');
			}, 300);
	
			$($menu_but).addClass('hide');
		}

	
	});

	// Close Menu
	$('.close-page').on('click', function() {
		$('.but-menu').addClass('menu-toggle');

		$(this).parents('.section').fadeOut("slow");
			
		setTimeout(function() {
			$('.page-background').removeClass('scale');
			$('i.about-show, i.resume-show, i.portfolio-show, i.blog-show, i.contact-show').fadeIn("slow");
		}, 300);
			
		setTimeout(function() {
			$($menu_but).css({'z-index': '4'}).removeClass('hide');
 	 	}, 500);

		$('.page-background').css({'z-index': '2'});
		
	});

	// Home Full Page Layout 
	$('i.about-show').on('click', function() {
			
		setTimeout(function() {
			$('i.about-show').fadeOut("fast");
		}, 500);
			
		setTimeout(function() {
			$('.about').fadeIn("slow");
		}, 1000);
			
	});

	// Resume Full Page Layout 
	$('i.resume-show').on('click', function() {
		
		setTimeout(function() {	
			$('i.resume-show').fadeOut("fast");
		}, 500);
			
		setTimeout(function() {
			$('.resume').fadeIn("slow");
		}, 1000);
		
	});

	// Portfolio Full Page Layout 
	$('i.portfolio-show').on('click', function() {
			
		setTimeout(function() {
			$('i.portfolio-show').fadeOut("fast");
		}, 500);
			
		setTimeout(function() {
			$('.portfolio').fadeIn("slow");
			
			/* ----- Isotope Portfolio ----- */
			var $item = $(".portfolio-items"),
            	$filters = $('.portfolio-filter ul li');
        		$item.isotope();

        	$filters.on('click', function(){
            $filters.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).data('filter');
            	$(".portfolio-items").isotope({
                	filter: selector
            	});
        	});
			
		}, 1000);
		
	});
	

	/* -----------------------------------
	      3. Portfolio Image Link
	----------------------------------- */
	$(".portfolio-items .image-link").magnificPopup({
		type: "image"
	});
	
	/* -----------------------------------
	      4. Portfolio Video Link
	----------------------------------- */
	$(".portfolio-items .video-link").magnificPopup({
		type: "iframe"
	});
	
	/* -----------------------------------
	      5. About Video Link
	----------------------------------- */
	$(".about .video .video-link").magnificPopup({
		type: "iframe"
	});
	
	/* -----------------------------------
	      6. Testimonials OwlCarousel
	----------------------------------- */
	$(".testimonial .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
				dots: false,
				nav: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            800: {
                items: 1,
            },
            1000: {
                items: 2,
            },
        },
    });
	
});