
$(document).ready(function() { 
	
$('.hamburger').click(function(){
    $('.hamburger-block, .hamburger-icons, #menu').toggleClass('open');
});
	
	
	$('.top-list-contacts-callback span').click(function(){
    $('.popup-block').fadeIn('show');
});
	
	$('.popup-close').click(function(){
    $('.popup-block').fadeOut('fade');
});

if( $(".owl-carousel").length )
{
  $(".catalog .owl-carousel").owlCarousel({
    margin: 20,
    dots: true,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
  	480: {
        items: 2
      },
      800: {
        items: 3
      },
		 1024: {
        items: 5
      },
	1444: {
        items: 6
      }
    }
  });

}

$(".reviews .owl-carousel").owlCarousel({
    dots: true,
    nav: true,
    items: 1
  });


var i = 1; $('.catalog-list-rowe .owl-dot').each(function(){ $(this).text(i); i++; });
var i = 1; $('.catalog-list-bardahl .owl-dot').each(function(){ $(this).text(i); i++; });
var i = 1; $('.catalog-list-additives .owl-dot').each(function(){ $(this).text(i); i++; });
var i = 1; $('.reviews-list .owl-dot').each(function(){ $(this).text(i); i++; });

$(function() {
	  $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
		$(this)
		  .addClass('active').siblings().removeClass('active')
		  .closest('div.catalog').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	  });

	});

$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
	});


$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
	
	
	
	$(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 1000, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
	
	function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.circle-nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.circle-nav ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
		$('nav ul li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('nav ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
    });
}
	

	
$(document).on('wheel', function(e) {
  e.preventDefault();
  $('html, body').stop(true).animate({
    scrollTop: (e.originalEvent.deltaY > 0 ? '+=' : '-=') + $(window).height() + 'px'
  }, 1000);
});
	

	var objScroll = {
		func1: function () {

			$('#header').each(function() {
				var self = $(this),height;
				var height = self.offset().top - 500;
	
				if ($(document).scrollTop() >= height) {
					$('.circle-nav').removeClass('active');
				}
				var height = self.offset().top;
				if ($(document).scrollTop() >= height) {
					$('.top').removeClass('active');
				}
			});
			$('#bardahl').each(function() {
				var self = $(this),height;
				var height = self.offset().top - 500;
	
				if ($(document).scrollTop() >= height) {
					$('.circle-nav').removeClass('active');
				}
				var height = self.offset().top;
				if ($(document).scrollTop() >= height) {
					$('.top').removeClass('active');
				}
			});
			$('#rowe').each(function() {
				var self = $(this),height;
				var height = self.offset().top - 500;
	
				if ($(document).scrollTop() >= height) {
					$('.circle-nav').removeClass('active');
				}
				var height = self.offset().top;
				if ($(document).scrollTop() >= height) {
					$('.top').removeClass('active');
				}
			});
			$('#catalog').each(function() {
				var self = $(this),height;
				var height = self.offset().top - 500;
	
				if ($(document).scrollTop() >= height) {
					$('.circle-nav').removeClass('active');
				}
				var height = self.offset().top;
				if ($(document).scrollTop() >= height) {
					$('.top').removeClass('active');
				}
			});
			$('#call').each(function() {
				var self = $(this),height;
				var height = self.offset().top - 500;
	
				if ($(document).scrollTop() >= height) {
					$('.circle-nav').addClass('active');
				}
				var height = self.offset().top;
				if ($(document).scrollTop() >= height) {
					$('.top').addClass('active');
				}
			});
			$('#reviews').each(function() {
				var self = $(this),height;
				var height = self.offset().top - 500;
	
				if ($(document).scrollTop() >= height) {
					$('.circle-nav').removeClass('active');
				}
				var height = self.offset().top;
				if ($(document).scrollTop() >= height) {
					$('.top').removeClass('active');
				}
			});
			$('#insurance').each(function() {
				var self = $(this),height;
				var height = self.offset().top - 500;
	
				if ($(document).scrollTop() >= height) {
					$('.circle-nav').addClass('active');
				}
				var height = self.offset().top;
				if ($(document).scrollTop() >= height) {
					$('.top').addClass('active');
				}
			});
			$('#trials').each(function() {
				var self = $(this),height;
				var height = self.offset().top - 500;
	
				if ($(document).scrollTop() >= height) {
					$('.circle-nav').removeClass('active');
				}
				var height = self.offset().top;
				if ($(document).scrollTop() >= height) {
					$('.top').removeClass('active');
				}
			});
			$('#community').each(function() {
				var self = $(this),height;
				var height = self.offset().top - 500;
	
				if ($(document).scrollTop() >= height) {
					$('.circle-nav').removeClass('active');
				}
				var height = self.offset().top;
				if ($(document).scrollTop() >= height) {
					$('.top').removeClass('active');
				}
			});
		}
	}

	var windowHeight = $(window).height();
	var setInt;
	$(document).on('scroll', function() {
		objScroll.func1();
		
	});
	$('.mouse-down a, #menu li a, #circle-nav li a').click(function () {
		$(document).scroll(function() {
			objScroll.func1();
			
		});
	})
	//edits
/*  	$('.mouse-down a, #menu li a, #circle-nav li a').click(function () {
		setInt = setInterval(function () {
			var active_a = $('#circle-nav li a.active');
			var active_index = $(active_a).parent().index();
			console.log(active_index);
			if (active_index==4) {
				$('.top, .circle-nav').addClass('active');
			}
			else if (active_index==6) {
				$('.top, .circle-nav').addClass('active');
			}
			else {
				$('.top, .circle-nav').removeClass('active');
			}
		},10)
	}) */

/* 	$('#circle-nav li a').click(function () {
		var eqDot = parseInt($(this).parent().index());
		
		if (eqDot==4) {
			$('.top, .circle-nav').addClass('active');
		}
		else if (eqDot==6) {
			$('.top, .circle-nav').addClass('active');
		}
		else {
			$('.top, .circle-nav').removeClass('active');
		}
	}) */
})	
