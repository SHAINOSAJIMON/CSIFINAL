!(function($) {
    "use strict";

    // Smooth scroll for the navigation menu and links with .scrollto classes
    var scrolltoOffset = $('#header').outerHeight() - 1;
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();

                var scrollto = target.offset().top - scrolltoOffset;

                if ($(this).attr("href") == '#header') {
                    scrollto = 0;
                }

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu, .mobile-nav').length) {
                    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    $('.mobile-nav-overly').fadeOut();
                }
                return false;
            }
        }
    });


    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function() {
        if (window.location.hash) {
            var initial_nav = window.location.hash;
            if ($(initial_nav).length) {
                var scrollto = $(initial_nav).offset().top - scrolltoOffset;
                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');
            }
        }
    });

    // Mobile Navigation
    if ($('.nav-menu').length) {
        var $mobile_nav = $('.nav-menu').clone().prop({
            class: 'mobile-nav d-lg-none'
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
        $('body').append('<div class="mobile-nav-overly"></div>');

        $(document).on('click', '.mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').toggle();
        });

        $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
            e.preventDefault();
            $(this).next().slideToggle(300);
            $(this).parent().toggleClass('active');
        });

        $(document).click(function(e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    $('.mobile-nav-overly').fadeOut();
                }
            }
        });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
        $(".mobile-nav, .mobile-nav-toggle").hide();
    }

    // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.nav-menu, .mobile-nav');

    $(window).on('scroll', function() {
        var cur_pos = $(this).scrollTop() + 200;

        nav_sections.each(function() {
            var top = $(this).offset().top,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                if (cur_pos <= bottom) {
                    main_nav.find('li').removeClass('active');
                }
                main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
            }
            if (cur_pos < 300) {
                $(".nav-menu ul:first li:first, .mobile-menu ul:first li:first").addClass('active');
            }
        });
    });

    // Toggle .header-scrolled class to #header when page is scrolled
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Porfolio isotope and filter
    $(window).on('load', function() {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $('#portfolio-flters li').on('click', function() {
            $("#portfolio-flters li").removeClass('filter-active');
            $(this).addClass('filter-active');

            portfolioIsotope.isotope({
                filter: $(this).data('filter')
            });
            aos_init();
        });
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
        $('.venobox').venobox();
    });

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            900: {
                items: 2
            }
        }
    });

    // Portfolio details carousel
    $(".portfolio-details-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });

    // Init AOS
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }
    $(window).on('load', function() {
        aos_init();
    });

    $("#contact-form").submit((e) => {
        e.preventDefault();
        $("#loading").css("display", "block");
        $("#contact-form-button").css("display", "none");
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbzz61Ej-hHr6kpqM8dBhX20irqTGryC5tYQ8Cmx51Z6LxLCow16HqePjNMqpErX2uXPQQ/exec",
            data: $("#contact-form").serialize(),
            method: "POST",
            success: function(response) {
                $("#loading").css("display", "none");
                $("#contact-form-button").css("display", "none");
                $("#sent-message").css("display", "block");
            },
            error: function(err) {
                $("#loading").css("display", "none");
                $("#contact-form-button").css("display", "block");
                $("#error-message").css("display", "block");
            },
        });
    });


    $("#ongoing-event1").submit((e) => {
        e.preventDefault();
        $("#loading").css("display", "block");
        $("#ongoing-button1").css("display", "none");
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbyITxSPvnyCevPufFGnVtJnrZyISFsQDd7Cra7bhFr9Gwgxd6hanI5wCjuouNyDB24P/exec",
            data: $("#ongoing-event1").serialize(),
            method: "POST",
            success: function(response) {
                $("#loading").css("display", "none");
                $("#ongoing-button1").css("display", "none");
                $("#sent-message").css("display", "block");
            },
            error: function(err) {
                $("#loading").css("display", "none");
                $("#ongoing-button1").css("display", "block");
                $("#error-message").css("display", "block");
            },
        });
    });



    $("#ongoing-event2").submit((e) => {
        e.preventDefault();
        $("#loading").css("display", "block");
        $("#ongoing-button2").css("display", "none");
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbyITxSPvnyCevPufFGnVtJnrZyISFsQDd7Cra7bhFr9Gwgxd6hanI5wCjuouNyDB24P/exec",
            data: $("#ongoing-event2").serialize(),
            method: "POST",
            success: function(response) {
                $("#loading").css("display", "none");
                $("#ongoing-button2").css("display", "none");
                $("#sent-message").css("display", "block");
            },
            error: function(err) {
                $("#loading").css("display", "none");
                $("#ongoing-button2").css("display", "block");
                $("#error-message").css("display", "block");
            },
        });
    });

    $("#ongoing-event3").submit((e) => {
        e.preventDefault();
        $("#loading").css("display", "block");
        $("#ongoing-button3").css("display", "none");
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbyITxSPvnyCevPufFGnVtJnrZyISFsQDd7Cra7bhFr9Gwgxd6hanI5wCjuouNyDB24P/exec",
            data: $("#ongoing-event3").serialize(),
            method: "POST",
            success: function(response) {
                $("#loading").css("display", "none");
                $("#ongoing-button3").css("display", "none");
                $("#sent-message").css("display", "block");
            },
            error: function(err) {
                $("#loading").css("display", "none");
                $("#ongoing-button3").css("display", "block");
                $("#error-message").css("display", "block");
            },
        });
    });

})(jQuery);