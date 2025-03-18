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
    
    // Vanilla JS header carousel
    function setupHeaderCarousel() {
        const carouselContainer = document.querySelector('.header-carousel');
        if (!carouselContainer) return;
        
        const slides = carouselContainer.querySelectorAll('.carousel-item');
        if (slides.length === 0) return;
        
        let currentIndex = 0;
        
        // Create navigation buttons with arrow styling
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="bi bi-chevron-left"></i>';
        prevButton.classList.add('carousel-control', 'carousel-prev');
        prevButton.setAttribute('aria-label', 'Previous slide');
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="bi bi-chevron-right"></i>';
        nextButton.classList.add('carousel-control', 'carousel-next');
        nextButton.setAttribute('aria-label', 'Next slide');
        
        // Create dot indicators
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('carousel-indicators');
        
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        carouselContainer.appendChild(prevButton);
        carouselContainer.appendChild(nextButton);
        carouselContainer.appendChild(dotsContainer);
        
        // Hide all slides except the first one
        slides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Function to show a specific slide
        function goToSlide(index) {
            // First, hide all slides
            slides.forEach((slide, i) => {
                slide.style.display = 'none';
                dotsContainer.children[i].classList.remove('active');
            });
            
            // Then show the selected slide with a fade effect
            slides[index].style.display = 'block';
            dotsContainer.children[index].classList.add('active');
            
            // Update current index
            currentIndex = index;
        }
        
        // Event listeners for navigation buttons
        prevButton.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(newIndex);
        });
        
        nextButton.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % slides.length;
            goToSlide(newIndex);
        });
        
        // Add styling for the carousel
        const style = document.createElement('style');
        style.textContent = `
            .carousel-control {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0,0,0,0.2);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
                transition: background 0.3s;
                border-radius: 50%;
                font-size: 24px;
            }
            .carousel-control:hover {
                background: rgba(0,0,0,0.5);
            }
            .carousel-prev {
                left: 20px;
            }
            .carousel-next {
                right: 20px;
            }
            .header-carousel {
                position: relative;
                overflow: hidden;
            }
            .carousel-indicators {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 8px;
            }
            .carousel-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255,255,255,0.5);
                border: none;
                cursor: pointer;
                transition: background 0.3s;
            }
            .carousel-dot.active {
                background: white;
                transform: scale(1.2);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Setup testimonials carousel
    function setupTestimonials() {
        const testimonialContainer = document.querySelector('.testimonial-carousel');
        if (!testimonialContainer) return;
        
        const testimonials = testimonialContainer.querySelectorAll('.testimonial-item');
        if (testimonials.length === 0) return;
        
        // Set a class on the container to help with styling
        testimonialContainer.classList.add('carousel-container');
        
        // Create wrapper for all testimonials to allow for horizontal scrolling
        const testimonialsWrapper = document.createElement('div');
        testimonialsWrapper.classList.add('testimonials-wrapper');
        
        // Clone testimonials into the wrapper
        testimonials.forEach(testimonial => {
            const clone = testimonial.cloneNode(true);
            clone.classList.add('testimonial-item');
            testimonialsWrapper.appendChild(clone);
        });
        
        // Create navigation arrows with improved arrow styling
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="bi bi-arrow-left"></i>';
        prevButton.classList.add('testimonial-nav', 'testimonial-prev');
        prevButton.setAttribute('aria-label', 'Previous testimonial');
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="bi bi-arrow-right"></i>';
        nextButton.classList.add('testimonial-nav', 'testimonial-next');
        nextButton.setAttribute('aria-label', 'Next testimonial');
        
        // Clear the original container and add our new elements
        testimonialContainer.innerHTML = '';
        testimonialContainer.appendChild(testimonialsWrapper);
        testimonialContainer.appendChild(prevButton);
        testimonialContainer.appendChild(nextButton);
        
        // Get the cloned testimonial items
        const testimonialItems = testimonialsWrapper.querySelectorAll('.testimonial-item');
        
        // Keep track of current position
        let currentIndex = 0;
        let itemWidth = 0;
        let visibleItems = 0;
        
        // Function to calculate dimensions and update display
        function updateCarouselLayout() {
            const containerWidth = testimonialContainer.offsetWidth;
            visibleItems = containerWidth >= 768 ? 2 : 1;
            itemWidth = containerWidth / visibleItems;
            
            // Set width for each testimonial item
            testimonialItems.forEach(item => {
                item.style.minWidth = `${itemWidth}px`;
                item.style.maxWidth = `${itemWidth}px`;
            });
            
            // Center the active item(s)
            updatePosition(false);
        }
        
        // Function to update carousel position with smooth animation
        function updatePosition(animate = true) {
            const translateX = -currentIndex * itemWidth;
            
            if (animate) {
                testimonialsWrapper.style.transition = 'transform 0.5s ease';
            } else {
                testimonialsWrapper.style.transition = 'none';
            }
            
            testimonialsWrapper.style.transform = `translateX(${translateX}px)`;
            
            // Update button states
            prevButton.disabled = currentIndex <= 0;
            nextButton.disabled = currentIndex >= testimonialItems.length - visibleItems;
            
            prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
            nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
        }
        
        // Event listeners for navigation
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updatePosition();
            }
        });
        
        nextButton.addEventListener('click', () => {
            if (currentIndex < testimonialItems.length - visibleItems) {
                currentIndex++;
                updatePosition();
            }
        });
        
        // Add styling for the testimonial carousel
        const style = document.createElement('style');
        style.textContent = `
            .carousel-container {
                position: relative;
                overflow: hidden;
                padding: 20px 0;
            }
            
            .testimonials-wrapper {
                display: flex;
                transition: transform 0.5s ease;
                margin: 0 auto;
            }
            
            .testimonial-item {
                padding: 0 15px;
                box-sizing: border-box;
                flex-shrink: 0;
            }
            
            .testimonial-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 5px rgba(0,0,0,0.15);
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
                transition: all 0.3s ease;
                font-size: 18px;
            }
            
            .testimonial-nav:hover {
                background: #f8f9fa;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            
            .testimonial-nav:focus {
                outline: none;
            }
            
            .testimonial-prev {
                left: 10px;
            }
            
            .testimonial-next {
                right: 10px;
            }
            
            .testimonial-nav i {
                line-height: 1;
            }
            
            @media (max-width: 767px) {
                .testimonial-nav {
                    width: 36px;
                    height: 36px;
                    font-size: 16px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Initialize layout
        updateCarouselLayout();
        
        // Update on window resize
        window.addEventListener('resize', () => {
            updateCarouselLayout();
        });
    }
    
    // Initialize the carousels
    setupHeaderCarousel();
    setupTestimonials();
})();