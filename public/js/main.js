(function ($) {
    "use strict";

    // Ensure jQuery is loaded
    if (typeof jQuery === "undefined") {
        console.error("jQuery is not loaded. Please include jQuery before this script.");
        return;
    }

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate WOW.js if available
    if (typeof WOW !== "undefined") {
        new WOW().init();
    } else {
        console.warn("WOW.js is not loaded.");
    }

    // Sticky Navbar
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });

    // Back to top button
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $(document).on("click", ".back-to-top", function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    if ($.fn.counterUp) {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });
    } else {
        console.warn("counterUp plugin is missing.");
    }

    // Date and time picker
    if ($.fn.datetimepicker) {
        $('.date').datetimepicker({
            format: 'L',
            locale: 'en'
        });
        $('.time').datetimepicker({
            format: 'LT',
            locale: 'en'
        });
    } else {
        console.warn("Datetimepicker plugin is missing.");
    }

    // Header carousel
    if ($.fn.owlCarousel) {
        $(".header-carousel").owlCarousel({
            autoplay: false,
            animateOut: 'fadeOutLeft',
            items: 1,
            dots: true,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ]
        });
    } else {
        console.warn("OwlCarousel plugin is missing.");
    }

})(jQuery);
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        // Header Carousel
        new Swiper(".header-swiper", {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            effect: "fade",
        });

        // Testimonial Carousel
        new Swiper(".testimonial-swiper", {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            speed: 1000,
        });
    }, 100); // Delay execution by 100ms
});
