/* ==========================================================================
   PABITRA TECHNOLOGY - MAIN WEB SCRIPT
   Consolidates header effects, active links, scroll indicators, counters, 
   and form validation. Safe to include globally on all pages.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // 1. Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900, // Animation duration
            once: true,    // Animate only once
            offset: 80,    // Offset from trigger point
            delay: 80,     // Delay before starting
        });
    }

    // 2. Header Scroll Effect (Glassmorphism)
    const header = document.querySelector('.header-sticky');
    if (header) {
        const toggleHeaderScrolled = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', toggleHeaderScrolled, { passive: true });
        toggleHeaderScrolled(); // Run once in case page loads scrolled down
    }

    // 3. Dynamic Active Navigation Link Highlighter
    // Highlights the navigation item based on the active page name dynamically.
    const highlightActiveNav = () => {
        // Extract the filename from path (e.g. index.html)
        const pathParts = window.location.pathname.split('/');
        const currentFile = pathParts[pathParts.length - 1] || 'index.html';
        
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        let matched = false;

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // Remove relative folders if any
            const linkFile = linkHref ? linkHref.split('/').pop() : '';

            if (linkFile === currentFile) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
                matched = true;
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });

        // Special case: if the matched path wasn't found in links and it is a service page, highlight Services dropdown
        if (!matched && currentFile.startsWith('service-')) {
            const servicesMenu = document.getElementById('servicesMenu');
            if (servicesMenu) {
                servicesMenu.classList.add('active');
            }
        }
    };
    highlightActiveNav();

    // 4. Advanced Scroll Progress Tracker
    const scrollTracker  = document.getElementById('scroll-tracker');
    const scrollFill     = document.getElementById('scroll-fill');
    const scrollDot      = document.getElementById('scroll-dot');
    const scrollPct      = document.getElementById('scroll-pct');
    const body           = document.body;
    const html           = document.documentElement;

    function updateScrollProgress() {
        if (!scrollTracker) return;

        const scrollPos = window.pageYOffset || html.scrollTop || 0;
        const totalH    = Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        ) - html.clientHeight;

        if (totalH <= 0) {
            body.classList.remove('scrolled');
            return;
        }

        const pct         = Math.min(1, scrollPos / totalH);          // 0 – 1
        const pctInt      = Math.round(pct * 100);                    // 0 – 100
        const trackH      = scrollTracker.offsetHeight;                // px height of track
        const dotH        = scrollDot ? scrollDot.offsetHeight : 14;  // dot height
        const dotTop      = pct * (trackH - dotH);                    // px from track top

        // 1. Fill bar
        if (scrollFill) scrollFill.style.height = `${pct * 100}%`;

        // 2. Dot position — we control `top` not `transform` (CSS handles centering offset)
        if (scrollDot)  scrollDot.style.top  = `${Math.max(0, dotTop + dotH / 2)}px`;

        // 3. Live % label — colour shifts cyan → gold at 50%
        if (scrollPct) {
            scrollPct.textContent = `${pctInt}%`;
            if (pctInt >= 50) {
                scrollPct.style.color = `hsl(${45 + (pctInt - 50) * 0.5}deg 100% 58%)`;
            } else {
                scrollPct.style.color = `hsl(${195 - pctInt * 1.5}deg 100% 60%)`;
            }
        }

        // 4. Show / hide tracker with slide-in effect
        if (scrollPos > 120) {
            body.classList.add('scrolled');
        } else {
            body.classList.remove('scrolled');
        }
    }

    let ticking = false;
    function scrollHandler() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                ticking = false;
            });
            ticking = true;
        }
    }

    if (scrollTracker) {
        window.addEventListener('scroll', scrollHandler, { passive: true });
        window.addEventListener('resize', scrollHandler, { passive: true });
        updateScrollProgress();
    }


    // 5. Smooth Scroll for Anchor Links (excluding dropdowns/toggles)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.startsWith('#faqCollapse') || targetId.startsWith('#navbarNav')) return;
            
            if (targetId.startsWith('#') && (this.pathname === window.location.pathname || this.pathname === '')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    let headerOffset = 70;
                    const mainHeader = document.querySelector('.header-sticky');
                    if (mainHeader) headerOffset = mainHeader.offsetHeight;
                    
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 6. Simple Count Up Animation for Stats
    const countUpElements = document.querySelectorAll('.count-up');
    if (countUpElements.length > 0) {
        const countUpObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const targetValue = parseInt(el.textContent.replace(/,/g, ''), 10) || 0;
                    el.textContent = '0';
                    const duration = 2000;
                    const frameDuration = 1000 / 60;
                    const totalFrames = Math.round(duration / frameDuration);
                    const increment = targetValue / totalFrames;
                    let currentFrame = 0;
                    let currentValue = 0;

                    function updateCount() {
                        currentValue += increment;
                        currentFrame++;

                        if (currentFrame < totalFrames) {
                            el.textContent = Math.ceil(currentValue).toLocaleString();
                            requestAnimationFrame(updateCount);
                        } else {
                            el.textContent = targetValue.toLocaleString();
                        }
                    }
                    requestAnimationFrame(updateCount);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        countUpElements.forEach(el => countUpObserver.observe(el));
    }

    // 7. Formspree Contact Form Handler with Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const messagesDiv = contactForm.querySelector('.messages');
        const submitButton = contactForm.querySelector('.submit-button');
        const submitButtonText = submitButton ? submitButton.querySelector('.submit-text') : null;
        const spinner = submitButton ? submitButton.querySelector('.spinner-border') : null;

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop normal submission

            // Client-side Validation Check
            if (!contactForm.checkValidity()) {
                event.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            // Enable loading state
            if (submitButton) submitButton.disabled = true;
            if (spinner) spinner.classList.remove('visually-hidden');
            if (submitButtonText) submitButtonText.classList.add('visually-hidden');
            if (messagesDiv) messagesDiv.innerHTML = ''; // Clear previous messages
            contactForm.classList.remove('was-validated');

            const formData = new FormData(contactForm);
            const actionUrl = contactForm.getAttribute('action') || 'https://formspree.io/f/xyzngeoq';

            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(errorData => {
                        let errorMessage = 'An error occurred during submission.';
                        if (errorData.errors && errorData.errors.length > 0) {
                            errorMessage = 'Please fix the following issues:';
                            errorData.errors.forEach(err => {
                                errorMessage += `<br>- ${err.field}: ${err.message}`;
                            });
                        } else if (errorData.error) {
                            errorMessage = errorData.error;
                        }
                        throw new Error(errorMessage);
                    }).catch((e) => {
                        throw new Error(e.message || 'Server responded with error.');
                    });
                }
            })
            .then(data => {
                if (data.ok) {
                    if (messagesDiv) {
                        messagesDiv.innerHTML = `<div class="alert alert-success alert-dismissible fade show small p-3" role="alert">
                            Thank you! Your message has been sent successfully. We will get back to you shortly.
                            <button type="button" class="btn-close btn-sm p-2" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
                        messagesDiv.setAttribute('role', 'status');
                        messagesDiv.setAttribute('aria-live', 'polite');
                        try { messagesDiv.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch(e){}
                    }
                    contactForm.reset();
                } else {
                    if (messagesDiv) {
                        messagesDiv.innerHTML = `<div class="alert alert-danger alert-dismissible fade show small p-3" role="alert">
                            Oops! Something went wrong and we could not send your message. Please try again.
                        </div>`;
                        messagesDiv.setAttribute('role', 'status');
                        messagesDiv.setAttribute('aria-live', 'polite');
                        try { messagesDiv.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch(e){}
                    }
                }
            })
            .catch(error => {
                console.error('Submission error:', error);
                if (messagesDiv) {
                    messagesDiv.innerHTML = `<div class="alert alert-danger alert-dismissible fade show small p-3" role="alert">
                        ${error.message || 'A network or server error occurred. Please try again.'}
                        <button type="button" class="btn-close btn-sm p-2" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
                }
            })
            .finally(() => {
                if (submitButton) submitButton.disabled = false;
                if (spinner) spinner.classList.add('visually-hidden');
                if (submitButtonText) submitButtonText.classList.remove('visually-hidden');
            });
        });
    }

    // 8. Advanced Hero Slideshow and SVG Sync System
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const slides = document.querySelectorAll('.hero-slide');
        const contentSlides = document.querySelectorAll('.hero-content-slide');
        const indicators = document.querySelectorAll('.hero-slideshow-indicators .indicator');
        
        const coreElement = document.getElementById('petal-core');
        const petals = {
            seo: document.getElementById('petal-seo'),
            web: document.getElementById('petal-web'),
            apps: document.getElementById('petal-apps'),
            cloud: document.getElementById('petal-cloud'),
            smm: document.getElementById('petal-smm'),
            secure: document.getElementById('petal-secure')
        };
        const stems = {
            seo: document.getElementById('stem-seo'),
            web: document.getElementById('stem-web'),
            apps: document.getElementById('stem-apps'),
            cloud: document.getElementById('stem-cloud'),
            smm: document.getElementById('stem-smm'),
            secure: document.getElementById('stem-secure')
        };

        let currentSlideIndex = 0;
        const slideCount = slides.length;
        let slideInterval;
        const slideDuration = 6000; // 6 seconds per slide

        function highlightSVGElements(index) {
            // Reset all classes
            if (coreElement) {
                coreElement.classList.remove('active', 'dimmed');
            }
            Object.values(petals).forEach(p => {
                if (p) p.classList.remove('active', 'dimmed');
            });
            Object.values(stems).forEach(s => {
                if (s) s.classList.remove('active', 'dimmed');
            });

            // Set classes based on slide index
            if (index === 0) {
                // AI & Innovation: Highlight central core and dim others slightly
                if (coreElement) coreElement.classList.add('active');
                Object.values(petals).forEach(p => { if (p) p.classList.add('dimmed'); });
                Object.values(stems).forEach(s => { if (s) s.classList.add('dimmed'); });
            } else if (index === 1) {
                // Web & App Dev: Highlight WEB and APPS
                if (petals.web) petals.web.classList.add('active');
                if (petals.apps) petals.apps.classList.add('active');
                if (stems.web) stems.web.classList.add('active');
                if (stems.apps) stems.apps.classList.add('active');
                
                // Dim others
                ['seo', 'cloud', 'smm', 'secure'].forEach(key => {
                    if (petals[key]) petals[key].classList.add('dimmed');
                    if (stems[key]) stems[key].classList.add('dimmed');
                });
                if (coreElement) coreElement.classList.add('dimmed');
            } else if (index === 2) {
                // Digital Marketing & SEO: Highlight SEO and SMM
                if (petals.seo) petals.seo.classList.add('active');
                if (petals.smm) petals.smm.classList.add('active');
                if (stems.seo) stems.seo.classList.add('active');
                if (stems.smm) stems.smm.classList.add('active');
                
                // Dim others
                ['web', 'apps', 'cloud', 'secure'].forEach(key => {
                    if (petals[key]) petals[key].classList.add('dimmed');
                    if (stems[key]) stems[key].classList.add('dimmed');
                });
                if (coreElement) coreElement.classList.add('dimmed');
            } else if (index === 3) {
                // Cloud & DevOps: Highlight CLOUD
                if (petals.cloud) petals.cloud.classList.add('active');
                if (stems.cloud) stems.cloud.classList.add('active');
                
                // Dim others
                ['seo', 'web', 'apps', 'smm', 'secure'].forEach(key => {
                    if (petals[key]) petals[key].classList.add('dimmed');
                    if (stems[key]) stems[key].classList.add('dimmed');
                });
                if (coreElement) coreElement.classList.add('dimmed');
            } else if (index === 4) {
                // Cybersecurity: Highlight SECURE
                if (petals.secure) petals.secure.classList.add('active');
                if (stems.secure) stems.secure.classList.add('active');
                
                // Dim others
                ['seo', 'web', 'apps', 'cloud', 'smm'].forEach(key => {
                    if (petals[key]) petals[key].classList.add('dimmed');
                    if (stems[key]) stems[key].classList.add('dimmed');
                });
                if (coreElement) coreElement.classList.add('dimmed');
            }
        }

        function showSlide(index) {
            // Handle wrap-around
            if (index >= slideCount) index = 0;
            if (index < 0) index = slideCount - 1;

            currentSlideIndex = index;

            // 1. Update background slide elements
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // 2. Update content slide elements
            contentSlides.forEach((cs, i) => {
                if (i === index) {
                    cs.classList.add('active');
                } else {
                    cs.classList.remove('active');
                }
            });

            // 3. Update indicators
            indicators.forEach((ind, i) => {
                if (i === index) {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });

            // 4. Update SVG Flower highlighting
            highlightSVGElements(index);
        }

        function nextSlide() {
            showSlide(currentSlideIndex + 1);
        }

        function startSlideTimer() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, slideDuration);
        }

        // Initialize fader system
        showSlide(0);
        startSlideTimer();

        // Add event listeners to indicators for user click control
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const targetIdx = parseInt(this.getAttribute('data-slide'), 10);
                showSlide(targetIdx);
                startSlideTimer(); // Reset timer on manual click
            });
        });

        // Interactive Petal Clicks to jump to corresponding slide
        if (petals.seo) petals.seo.addEventListener('click', () => { showSlide(2); startSlideTimer(); });
        if (petals.smm) petals.smm.addEventListener('click', () => { showSlide(2); startSlideTimer(); });
        if (petals.web) petals.web.addEventListener('click', () => { showSlide(1); startSlideTimer(); });
        if (petals.apps) petals.apps.addEventListener('click', () => { showSlide(1); startSlideTimer(); });
        if (petals.cloud) petals.cloud.addEventListener('click', () => { showSlide(3); startSlideTimer(); });
        if (petals.secure) petals.secure.addEventListener('click', () => { showSlide(4); startSlideTimer(); });
        if (coreElement) coreElement.addEventListener('click', () => { showSlide(0); startSlideTimer(); });

        // 9. Mobile Touch Swipe Handlers for Command Center
        let touchStartX = 0;
        let touchEndX = 0;
        
        const handleGesture = () => {
            const threshold = 55; // minimum distance in px for swipe
            if (touchEndX < touchStartX - threshold) {
                // Swipe Left -> Next Slide
                nextSlide();
                startSlideTimer();
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe Right -> Prev Slide
                showSlide(currentSlideIndex - 1);
                startSlideTimer();
            }
        };

        const commandCenterDeck = heroSection.querySelector('.hero-command-center');
        if (commandCenterDeck) {
            commandCenterDeck.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            commandCenterDeck.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleGesture();
            }, { passive: true });
        }
    }
});

