$(document).ready(function(){
    $(".navbar-nav a").mPageScroll2id({
        offset: 0
    });


    //Burger menu animation with greensock / gsap
        var menu = $(".menuburger"),
            menuitem1 = $(".menu__item--1"),
            menuitem2 = $(".menu__item--2"),
            menuitem3 = $(".menu__item--3"),
            speed = 0.15;

        //instantiate  timeline
        var tl = new TimelineLite({paused:true}); //pause default

        //collapse menu
        tl.to(menuitem1, speed, {ease:Quint.easeOut}, "label--1") 
        .to(menuitem3, speed, {ease:Quint.easeOut}, "label--1")

        //expand menu
        .to(menuitem1, speed, {ease:Quint.easeOut}, "label--2")
        .to(menuitem3, speed, {ease:Quint.easeOut}, "label--2"); 


        // play timeline on click, reverse animation if active
        menu.click(function() {
            $(this).toggleClass('active');

            if ( $(this).hasClass("active") ) {
                tl.play(); 
            }  
            else {
                tl.reverse(); 
            }
        });



        
    var burgermenu = window.matchMedia('(max-width: 1199px)');
    burgermenu.addListener(changes);
    changes(burgermenu);

    function changes(scrn) {
        if (burgermenu.matches) {
            $('#sidebar').css('transform','translate3d(-100%, 0, 0)');
        } else {
            $('#sidebar').css('transform','translate3d(0, 0, 0)');
        }
    }

    $('#header_account .menuburger').click(function () {
        if ($('#header_account .menuburger').hasClass('active')) {   
            $('#sidebar').attr('style','transform: translate3d(0, 0, 0)');
        }
        else {
            $('#sidebar').attr('style','transform: translate3d(-100%, 0, 0)');
        }
    })
});