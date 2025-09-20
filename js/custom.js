// Custom JavaScript for TechFlow Bootstrap 5 UI Project

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize fade-in animations
    initFadeInAnimations();
    
    // Initialize contact form validation
    initContactForm();
    
    // Initialize navbar scroll effect
    initNavbarScrollEffect();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize counter animations
    initCounterAnimations();
});

/**
 * Fade-in animations for elements when they come into view
 */
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successAlert = document.getElementById('successAlert');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Add Bootstrap validation classes
            contactForm.classList.add('was-validated');
            
            // Check if form is valid
            if (contactForm.checkValidity()) {
                // Simulate form submission
                setTimeout(() => {
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    successAlert.classList.remove('d-none');
                    
                    // Scroll to success message
                    successAlert.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Reset form after 5 seconds and show it again
                    setTimeout(() => {
                        contactForm.reset();
                        contactForm.classList.remove('was-validated');
                        contactForm.style.display = 'block';
                        successAlert.classList.add('d-none');
                    }, 5000);
                }, 1000);
            }
        });
        
        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') && this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });
        });
    }
}

/**
 * Navbar scroll effect
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add shadow when scrolled
            if (currentScroll > 50) {
                navbar.classList.add('shadow');
            } else {
                navbar.classList.remove('shadow');
            }
            
            // Hide/show navbar on scroll (optional)
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
        
        // Add transition for smooth hide/show
        navbar.style.transition = 'transform 0.3s ease-in-out';
    }
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize Bootstrap tooltips
 */
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Counter animations for statistics
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-counter'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + '+';
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Modal form handling
 */
document.addEventListener('DOMContentLoaded', function() {
    const quoteModal = document.getElementById('getQuoteModal');
    const quoteForm = quoteModal?.querySelector('form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success state
                submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Sent Successfully!';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    // Reset form and close modal
                    quoteForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-primary');
                    bootstrap.Modal.getInstance(quoteModal).hide();
                }, 2000);
            }, 2000);
        });
    }
});

/**
 * Newsletter subscription
 */
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('form[action=""]');
    
    newsletterForms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (emailInput && submitBtn) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (emailInput.value && emailInput.checkValidity()) {
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Subscribing...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        submitBtn.textContent = 'Subscribed!';
                        submitBtn.classList.remove('btn-primary');
                        submitBtn.classList.add('btn-success');
                        emailInput.value = '';
                        
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                            submitBtn.classList.remove('btn-success');
                            submitBtn.classList.add('btn-primary');
                        }, 3000);
                    }, 1000);
                }
            });
        }
    });
});

/**
 * Carousel auto-play pause on hover
 */
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        carousel.addEventListener('mouseenter', function() {
            bootstrap.Carousel.getInstance(this)?.pause();
        });
        
        carousel.addEventListener('mouseleave', function() {
            bootstrap.Carousel.getInstance(this)?.cycle();
        });
    });
});

/**
 * Feature card hover effects
 */
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card, .team-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

/**
 * Back to top button
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-primary position-fixed';
    backToTopBtn.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
            setTimeout(() => backToTopBtn.style.opacity = '1', 10);
        } else {
            backToTopBtn.style.opacity = '0';
            setTimeout(() => backToTopBtn.style.display = 'none', 300);
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

/**
 * Dark mode toggle (bonus feature)
 */
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
        
        // Load saved preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
});

/**
 * Preloader (optional)
 */
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        });
    }
});

/**
 * Form field character counter
 */
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea[maxlength]');
    
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        const counter = document.createElement('small');
        counter.className = 'text-muted float-end';
        textarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                counter.classList.add('text-warning');
                counter.classList.remove('text-muted');
            } else {
                counter.classList.remove('text-warning');
                counter.classList.add('text-muted');
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial update
    });
});

// Export functions for potential use in other scripts
window.TechFlowUI = {
    initFadeInAnimations,
    initContactForm,
    initNavbarScrollEffect,
    initSmoothScrolling,
    initTooltips,
    initCounterAnimations
};