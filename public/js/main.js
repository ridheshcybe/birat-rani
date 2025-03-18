(function () {
    "use strict";
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            const spinnerElement = document.getElementById('spinner');
            if (spinnerElement) {
                spinnerElement.classList.remove('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();
    
    // Sticky Navbar
    window.addEventListener('scroll', function () {
        const stickyTopElements = document.querySelectorAll('.sticky-top');
        if (window.scrollY > 300) {
            stickyTopElements.forEach(element => {
                element.classList.add('shadow-sm');
                element.style.top = '0px';
            });
        } else {
            stickyTopElements.forEach(element => {
                element.classList.remove('shadow-sm');
                element.style.top = '-100px';
            });
        }
    });
    
    // Back to top button
    window.addEventListener('scroll', function () {
        const backToTopElements = document.querySelectorAll('.back-to-top');
        if (window.scrollY > 300) {
            backToTopElements.forEach(element => {
                fadeIn(element, 'slow');
            });
        } else {
            backToTopElements.forEach(element => {
                fadeOut(element, 'slow');
            });
        }
    });
    
    document.querySelectorAll('.back-to-top').forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            animateScrollTo(0, 1500, 'easeInOutExpo');
            return false;
        });
    });
    
    // Helper functions for fading
    function fadeIn(element, speed) {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        const duration = speed === 'slow' ? 400 : 200;
        const interval = 10;
        const gap = interval / duration;
        
        let opacity = 0;
        const fading = setInterval(() => {
            opacity += gap;
            element.style.opacity = opacity;
            
            if (opacity >= 1) {
                clearInterval(fading);
            }
        }, interval);
    }
    
    function fadeOut(element, speed) {
        const duration = speed === 'slow' ? 400 : 200;
        const interval = 10;
        const gap = interval / duration;
        
        let opacity = 1;
        const fading = setInterval(() => {
            opacity -= gap;
            element.style.opacity = opacity;
            
            if (opacity <= 0) {
                element.style.display = 'none';
                clearInterval(fading);
            }
        }, interval);
    }
    
    // Simple animation for scrolling (replacement for jQuery animate)
    function animateScrollTo(targetY, duration, easing) {
        const startY = window.scrollY;
        const difference = targetY - startY;
        const startTime = performance.now();
        
        function step() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime < duration) {
                // Basic easing function - can be expanded for more easing types
                let progress;
                if (easing === 'easeInOutExpo') {
                    progress = elapsedTime / (duration / 2);
                    if (progress < 1) {
                        window.scrollTo(0, startY + (difference / 2 * Math.pow(2, 10 * (progress - 1))));
                    } else {
                        progress--;
                        window.scrollTo(0, startY + difference / 2 * (-Math.pow(2, -10 * progress) + 2));
                    }
                } else {
                    // Linear as fallback
                    progress = elapsedTime / duration;
                    window.scrollTo(0, startY + difference * progress);
                }
                requestAnimationFrame(step);
            } else {
                window.scrollTo(0, targetY);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    // Facts counter
    const counterElements = document.querySelectorAll('[data-toggle="counter-up"]');
    counterElements.forEach(element => {
        // Assuming counterUp library is still available, just called differently
        counterUp(element, {
            delay: 10,
            time: 2000
        });
    });
    
    // Date and time picker (assuming datetimepicker library is still available)
    const dateElements = document.querySelectorAll('.date');
    dateElements.forEach(element => {
        new datetimepicker(element, {
            format: 'L'
        });
    });
    
    const timeElements = document.querySelectorAll('.time');
    timeElements.forEach(element => {
        new datetimepicker(element, {
            format: 'LT'
        });
    });
    
    // Header carousel (assuming OwlCarousel is still available)
    const headerCarouselElements = document.querySelectorAll('.header-carousel');
    headerCarouselElements.forEach(element => {
        new OwlCarousel(element, {
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
    });
    
    // Testimonials carousel
    const testimonialCarouselElements = document.querySelectorAll('.testimonial-carousel');
    testimonialCarouselElements.forEach(element => {
        new OwlCarousel(element, {
            autoplay: false,
            smartSpeed: 1000,
            center: true,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-arrow-left"></i>',
                '<i class="bi bi-arrow-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                }
            }
        });
    });
})();