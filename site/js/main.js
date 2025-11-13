/**
 * Barcony Website - Main JavaScript Module
 * Centralized JavaScript for all pages
 */

(function() {
    'use strict';

    /**
     * Initialize navigation active state
     */
    function initNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar__link');

        navLinks.forEach(link => {
            link.classList.remove('navbar__link--active');
            const href = link.getAttribute('href');

            if (currentPath === '/' && href === '/') {
                link.classList.add('navbar__link--active');
            } else if ((currentPath === '/gallerij' || currentPath === '/gallerij/') && href === '/gallerij') {
                link.classList.add('navbar__link--active');
            } else if ((currentPath === '/modellen-prijzen' || currentPath === '/modellen-prijzen/') && href === '/modellen-prijzen') {
                link.classList.add('navbar__link--active');
            }

            // Handle hash links for homepage sections
            if (currentPath === '/' && href.startsWith('#')) {
                const hash = window.location.hash;
                if (href === hash) {
                    link.classList.add('navbar__link--active');
                }
            }
        });
    }

    /**
     * Initialize scroll animations using Intersection Observer
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-scale-in, .animate-fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Initialize navbar scroll effect with hide/show and shrink behavior
     * Inspired by Virtual Counsel best practices
     */
    function initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        const mobileMenu = document.getElementById('navbar-menu');
        if (!navbar) return;

        let lastScrollTop = 0;
        let ticking = false;
        let scrollTimeout = null;
        const scrollThreshold = 50;
        const hideThreshold = 100;

        function updateNavbar() {
            // Don't hide navbar if mobile menu is open
            const isMobileMenuOpen = mobileMenu && mobileMenu.classList.contains('navbar__menu--active');
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = scrollTop - lastScrollTop;

            // Add scrolled class for styling changes
            if (scrollTop > scrollThreshold) {
                navbar.classList.add('navbar--scrolled');
            } else {
                navbar.classList.remove('navbar--scrolled');
            }

            // Hide/show navbar based on scroll direction
            // Only hide if scrolled past threshold and scrolling down
            if (!isMobileMenuOpen) {
                if (scrollTop > hideThreshold) {
                    if (scrollDelta > 5) {
                        // Scrolling down - hide navbar
                        navbar.classList.add('navbar--hidden');
                    } else if (scrollDelta < -5) {
                        // Scrolling up - show navbar
                        navbar.classList.remove('navbar--hidden');
                    }
                } else {
                    // Always show navbar near top
                    navbar.classList.remove('navbar--hidden');
                }
            } else {
                // Always show navbar when mobile menu is open
                navbar.classList.remove('navbar--hidden');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }

            // Clear any existing timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Debounce to prevent excessive updates
            scrollTimeout = setTimeout(() => {
                window.requestAnimationFrame(updateNavbar);
            }, 10);
        }, { passive: true });
    }

    /**
     * Initialize smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Initialize mobile menu toggle with improved UX
     */
    function initMobileMenu() {
        const mobileToggle = document.getElementById('navbar-toggle');
        const mobileMenu = document.getElementById('navbar-menu');
        if (!mobileToggle || !mobileMenu) return;

        function closeMenu() {
            mobileToggle.classList.remove('navbar__toggle--active');
            mobileMenu.classList.remove('navbar__menu--active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
        }

        function openMenu() {
            mobileToggle.classList.add('navbar__toggle--active');
            mobileMenu.classList.add('navbar__menu--active');
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
        }

        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileMenu.classList.contains('navbar__menu--active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMenu();
            }
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('navbar__menu--active')) {
                closeMenu();
            }
        });
    }

    /**
     * Initialize form handling
     */
    function initForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Real-time validation
        const inputs = form.querySelectorAll('input:not([type="checkbox"]):not([name="honeypot"]), textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        // Validate checkbox
        const privacyCheckbox = form.querySelector('#privacy');
        if (privacyCheckbox) {
            privacyCheckbox.addEventListener('change', () => {
                if (privacyCheckbox.classList.contains('error')) {
                    validateField(privacyCheckbox);
                }
            });
        }

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            // Validate checkbox
            if (privacyCheckbox && !privacyCheckbox.checked) {
                isValid = false;
                privacyCheckbox.classList.add('error');
                const checkboxError = document.getElementById('privacy-error');
                if (checkboxError) {
                    checkboxError.textContent = 'Je moet akkoord gaan met het privacybeleid';
                    checkboxError.style.display = 'flex';
                }
            } else if (privacyCheckbox) {
                privacyCheckbox.classList.remove('error');
                const checkboxError = document.getElementById('privacy-error');
                if (checkboxError) {
                    checkboxError.style.display = 'none';
                }
            }

            if (!isValid) {
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Submit form
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span style="display: flex; align-items: center; gap: 8px;">⏳ Bezig...</span>';
            submitBtn.disabled = true;

            try {
                // Prepare form data
                const formData = {
                    name: `${form.querySelector('#firstName').value} ${form.querySelector('#lastName').value}`.trim(),
                    email: form.querySelector('#email').value,
                    phone: form.querySelector('#phone').value || '',
                    city: form.querySelector('#city').value,
                    model: form.querySelector('#model').value || '',
                    message: form.querySelector('#message').value,
                    honeypot: form.querySelector('#honeypot').value || ''
                };

                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    showFormResponse('success', result.message || 'Bedankt voor je bericht! We nemen binnen 24 uur contact met je op.');
                    form.reset();
                } else {
                    showFormResponse('error', result.error || 'Er is iets misgegaan. Probeer het later opnieuw.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormResponse('error', 'Er is iets misgegaan. Probeer het later opnieuw of neem direct contact met ons op.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    /**
     * Validate a single form field
     */
    function validateField(field) {
        const errorElement = document.getElementById(field.id + '-error');
        let isValid = true;
        let errorMessage = '';

        // Skip honeypot field
        if (field.name === 'honeypot') {
            return true;
        }

        // Remove previous error state
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'Dit veld is verplicht';
        }

        // Email validation
        if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            isValid = false;
            errorMessage = 'Voer een geldig e-mailadres in';
        }

        // Phone validation (optional but format check)
        if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
            isValid = false;
            errorMessage = 'Voer een geldig telefoonnummer in';
        }

        // Textarea validation
        if (field.tagName === 'TEXTAREA' && field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'Dit veld is verplicht';
        }

        if (!isValid) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'flex';
            }
        }

        return isValid;
    }

    /**
     * Email validation helper
     */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Phone validation helper
     */
    function isValidPhone(phone) {
        return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    /**
     * Show form response message
     */
    function showFormResponse(type, message) {
        const response = document.getElementById('form-response');
        if (response) {
            response.textContent = message;
            response.className = `form-response ${type}`;
            response.style.display = 'block';
            response.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Auto-hide after 5 seconds for success
            if (type === 'success') {
                setTimeout(() => {
                    response.style.display = 'none';
                }, 5000);
            }
        }
    }

    /**
     * Initialize image lazy loading with fade-in effect
     */
    function initImageLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.filter = 'none';
            });

            // Initial state
            img.style.opacity = '0';
            img.style.filter = 'blur(5px)';
            img.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
        });
    }

    /**
     * Initialize gallery lightbox
     */
    function initLightbox() {
        const galleryItems = document.querySelectorAll('.gallery__item, .gallery-item');
        if (galleryItems.length === 0) return;

        // Create lightbox HTML
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox__overlay"></div>
            <div class="lightbox__content">
                <button class="lightbox__close" aria-label="Sluiten">&times;</button>
                <button class="lightbox__prev" aria-label="Vorige">‹</button>
                <button class="lightbox__next" aria-label="Volgende">›</button>
                <img class="lightbox__image" src="" alt="">
                <div class="lightbox__caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);

        let currentIndex = 0;
        const images = Array.from(galleryItems).map(item => {
            const img = item.querySelector('img');
            const title = item.querySelector('.gallery__title, .gallery-item__title')?.textContent || '';
            return {
                src: img?.src || '',
                alt: img?.alt || '',
                title: title
            };
        }).filter(img => img.src);

        function openLightbox(index) {
            if (index < 0 || index >= images.length) return;
            currentIndex = index;
            const image = images[currentIndex];
            lightbox.querySelector('.lightbox__image').src = image.src;
            lightbox.querySelector('.lightbox__image').alt = image.alt;
            lightbox.querySelector('.lightbox__caption').textContent = image.title || image.alt;
            lightbox.classList.add('lightbox--active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('lightbox--active');
            document.body.style.overflow = '';
        }

        function showNext() {
            openLightbox((currentIndex + 1) % images.length);
        }

        function showPrev() {
            openLightbox((currentIndex - 1 + images.length) % images.length);
        }

        // Attach click handlers to gallery items
        galleryItems.forEach((item, index) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => openLightbox(index));
        });

        // Lightbox controls
        lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox__overlay').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox__next').addEventListener('click', showNext);
        lightbox.querySelector('.lightbox__prev').addEventListener('click', showPrev);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('lightbox--active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }

    /**
     * Initialize all functionality when DOM is ready
     */
    function init() {
        initNavigation();
        initScrollAnimations();
        initNavbarScroll();
        initSmoothScroll();
        initMobileMenu();
        initForm();
        initImageLoading();
        initLightbox();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


