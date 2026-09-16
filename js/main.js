(function ($) {
    "use strict";

    // Spinner Handler
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 100);
    };
    spinner();
    
    // Initiate WOW.js for entrance animations
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // Sticky Navbar Scroll Elevation
    $(window).scroll(function () {
        if ($(this).scrollTop() > 80) {
            $('.navbar-custom').addClass('shadow-sm').css('background', 'rgba(255, 255, 255, 0.98)');
        } else {
            $('.navbar-custom').removeClass('shadow-sm').css('background', 'rgba(255, 255, 255, 0.95)');
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 800, 'easeInOutExpo');
        return false;
    });

    // Animated Numbers Counter on Scroll
    function animateCounters() {
        $('.stat-counter-num').each(function () {
            var $this = $(this);
            var target = parseInt($this.attr('data-count'), 10);
            var suffix = $this.attr('data-suffix') || '';
            var prefix = $this.attr('data-prefix') || '';
            
            if (isNaN(target)) return;

            $({ countNum: 0 }).animate({ countNum: target }, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $this.text(prefix + Math.floor(this.countNum) + suffix);
                },
                complete: function () {
                    $this.text(prefix + this.countNum + suffix);
                }
            });
        });
    }

    var animated = false;
    $(window).scroll(function () {
        var statSection = $('.stat-counter-box');
        if (statSection.length > 0 && !animated) {
            var oTop = statSection.offset().top - window.innerHeight;
            if ($(window).scrollTop() > oTop) {
                animateCounters();
                animated = true;
            }
        }
    });
    // Trigger if already in view
    if ($('.stat-counter-box').length > 0 && $(window).scrollTop() >= 0 && !animated) {
        setTimeout(function() {
            animateCounters();
            animated = true;
        }, 300);
    }

    // Course Program Filter Tabs with Smooth Transitions
    $('.filter-btn-pro').on('click', function () {
        $('.filter-btn-pro').removeClass('active');
        $(this).addClass('active');

        var filterValue = $(this).attr('data-filter');

        if (filterValue === 'all') {
            $('.course-item-col').stop().fadeIn(350);
        } else {
            $('.course-item-col').stop().hide();
            $('.course-item-col[data-category="' + filterValue + '"]').stop().fadeIn(350);
        }
    });

    // Header Carousel
    if ($('.header-carousel').length > 0 && typeof $.fn.owlCarousel !== 'undefined') {
        $(".header-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1200,
            items: 1,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ]
        });
    }

    // Testimonials Carousel
    if ($('.testimonial-carousel').length > 0 && typeof $.fn.owlCarousel !== 'undefined') {
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            center: true,
            margin: 24,
            dots: true,
            loop: true,
            nav: false,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                992: { items: 3 }
            }
        });
    }

    // Quick Inquiry Form WhatsApp Link Generator
    $('#quickInquiryForm, #contactInquiryForm').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var name = form.find('#inquiryName').val() || 'Prospective Student';
        var phone = form.find('#inquiryPhone').val() || '';
        var program = form.find('#modalProgramSelect').val() || 'Online Degree Programme';
        var query = form.find('#inquiryMessage').val() || 'I want to know admission eligibility, fees and syllabus details.';

        var message = "Hello Future Care Institute of Advanced Studies (FIAS),%0A%0A" +
            "*🎓 New Online Admission Inquiry:*%0A" +
            "• *Candidate Name:* " + encodeURIComponent(name) + "%0A" +
            "• *WhatsApp / Mobile:* " + encodeURIComponent(phone) + "%0A" +
            "• *Interested Degree / Program:* " + encodeURIComponent(program) + "%0A" +
            "• *Inquiry Message:* " + encodeURIComponent(query) + "%0A%0A" +
            "_Please send me admission eligibility and fee schedule._";

        var whatsappUrl = "https://wa.me/+918907087565?text=" + message;
        window.open(whatsappUrl, '_blank');
    });

})(jQuery);
