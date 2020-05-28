var Notification = {
    main_alert: '<div class="alerts_block"></div>',
    into_alert: '<div class="alerts_relative"></div>',
    create: function (status, text_notificate) {
        if ($('.alerts_relative').length==0) {
            $('div:first').after(this.main_alert);
            $('.alerts_block').append(this.into_alert);
        }

        switch (status) {
            case 1:
                $('.alerts_relative').prepend($('<div class="alert alert-success alert-dismissible fade show" role="alert">'+text_notificate+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>').fadeIn(300));
                break;
            case 2:
                $('.alerts_relative').prepend($('<div class="alert alert-warning alert-dismissible fade show" role="alert">'+text_notificate+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>').fadeIn(300));
                break;
            case 3:
                $('.alerts_relative').prepend($('<div class="alert alert-danger alert-dismissible fade show" role="alert">'+text_notificate+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>').fadeIn(300));
                break;
        }

        var alerts_count = $('.alerts_relative .alert');
        if (alerts_count.length>=6) {
            $('.alerts_relative .alert:last').fadeOut(300, function () {
                $('.alerts_relative .alert:last').remove();
            });
        }
        for (var alert_c = 0; alert_c < alerts_count.length; alert_c++) {
            setTimeout(function () {
                $('.alerts_relative .alert:last').fadeOut(300, function () {
                        $('.alerts_relative .alert:last').remove();
                    });
            }, (alert_c+1)*3500);
        }


    },
}