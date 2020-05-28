$(document).ready(function(){
    
    //search section1
    $('#section1 .search_lang .dropdown-item').click(function () {
       var thisLang =  $(this).find('span').html();
       $('#section1 #dropdownSearch span').html(thisLang);
    });

    

    var dataR = {
        rrr: function () {
            $('#section4 .s_numbers h3').eq(0).animateNumber(
                {number: 30180,},
                {
                  easing: 'swing',
                  duration: 2500
                }
            );
            $('#section4 .s_numbers h3').eq(1).animateNumber(
                {number: 800000,},
                {
                  easing: 'swing',
                  duration: 3400
                }
            );
            $('#section4 .s_numbers h3').eq(2).animateNumber(
                {number: 79,},
                {
                  easing: 'swing',
                  duration: 3800
                }
            );
            $('#section4 .s_numbers h3').eq(3).animateNumber(
                {number: 1300000,},
                {
                  easing: 'swing',
                  duration: 4200
                }
            );
        }
    }


    //section2 tabs
    $('#section2 .item_s2').click(function () {
        $('#section2 .item_s2').removeClass('active');
        $(this).addClass('active');
        var this_index = $(this).parent().index();
        
        $('#section2 .s2_cont').fadeOut(0);
        $('#section2 .s2_cont').eq(this_index).fadeIn();
    })


    //sidebar

    var burgermenu_small = window.matchMedia('(max-width: 992px)');
    burgermenu_small.addListener(changes);
    changes(burgermenu_small);

    function changes(scrn) {
        if (burgermenu_small.matches) {
            $('nav .navbar-toggler').click(function () {
                //$('#navbarSupportedContent').css('left','-19rem');
                $('nav .navbar-toggler').toggleClass('open');
                //$('#navbarNav .sidebar_main').toggleClass('open');
                if ($('nav .navbar-toggler').hasClass('open')) {
                    $('#navbarSupportedContent').css('left','0');
                    //$('#navbarNav').css('left','0');
                    //$('nav .new_nav-button').css('left','17rem');
                }
                else {
                    $('#navbarSupportedContent').css('left','-19.1rem');
                    //$('.sidebar_main').css('left','-30.1rem');
                    //$('nav .new_nav-button').css('left','0');
                }
            })
        } else {
        }
    }



    
    //scroll to numbers and animateNumber
    var waypoint = new Waypoint({
        element: document.getElementById('section3'),
        offset: '-17%',
        handler: function(direction) {
            if (typeof dataR.rrr != "undefined") {
                dataR.rrr();
            }
            delete dataR.rrr;

        }
    })
});


