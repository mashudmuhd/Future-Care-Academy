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
    
    // Initiate WOW.js for animations
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // Sticky Navbar Handler
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
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

    // Course Program Filter Tabs
    $('.filter-btn').on('click', function () {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        var filterValue = $(this).attr('data-filter');

        if (filterValue === 'all') {
            $('.course-item-col').fadeIn(300);
        } else {
            $('.course-item-col').hide();
            $('.course-item-col[data-category="' + filterValue + '"]').fadeIn(300);
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

    // Admission Modal Program Preselection
    $('[data-bs-target="#inquiryModal"]').on('click', function () {
        var selectedProgram = $(this).attr('data-program');
        if (selectedProgram) {
            $('#modalProgramSelect').val(selectedProgram);
        }
    });

    // Quick Inquiry Form WhatsApp Generator
    $('#quickInquiryForm').on('submit', function (e) {
        e.preventDefault();
        var name = $('#inquiryName').val() || 'Prospective Student';
        var phone = $('#inquiryPhone').val() || '';
        var program = $('#modalProgramSelect').val() || 'Degree Programme';
        var query = $('#inquiryMessage').val() || 'I want to know admission eligibility, fees and syllabus.';

        var message = "Hello Future Care Institute of Advanced Studies (FIAS),%0A%0A" +
            "*Admission Inquiry Details:*%0A" +
            "• *Name:* " + encodeURIComponent(name) + "%0A" +
            "• *Phone:* " + encodeURIComponent(phone) + "%0A" +
            "• *Interested Program:* " + encodeURIComponent(program) + "%0A" +
            "• *Message:* " + encodeURIComponent(query);

        var whatsappUrl = "https://wa.me/+918907087565?text=" + message;
        window.open(whatsappUrl, '_blank');
    });

})(jQuery);
