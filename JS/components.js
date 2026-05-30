/* ==========================================================================
   PABITRA TECHNOLOGY — UI COMPONENTS LOGIC
   Manages top bar sticky states, active link highlighting, country dropdowns,
   mobile mega-menu clicks, scroll indicators, and Free Website Audit modal.
   ========================================================================== */

(function () {
    'use strict';

    // ── 1. Sticky Header & Scroll Effects ────────────────────────────────────
    function initHeaderScroll() {
        const header = document.getElementById('siteHeader');
        if (!header) return;

        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // Run immediately
    }

    // ── 2. Active Navigation Highlight ───────────────────────────────────────
    function initActiveLinks() {
        const currentFile = window.location.pathname.split('/').pop() || 'index.html';
        
        document.querySelectorAll('.nav-link-custom').forEach(link => {
            const href = (link.getAttribute('href') || '').split('/').pop();
            if (href === currentFile) {
                link.classList.add('active');
                // If it's inside a mega menu, mark the parent Services link active too
                const parentDropdown = link.closest('.mega-dropdown');
                if (parentDropdown) {
                    parentDropdown.querySelector('.nav-link-custom')?.classList.add('active');
                }
            }
        });
    }

    // ── 3. Country Dropdown Handler ──────────────────────────────────────────
    function initCountrySelector() {
        const countryBtn = document.getElementById('countryBtn');
        const countryDropdown = document.getElementById('countryDropdown');
        const mobileCountryBtn = document.getElementById('mobileCountryBtn');
        const mobileCountryDropdown = document.getElementById('mobileCountryDropdown');

        if (countryBtn && countryDropdown) {
            countryBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                countryDropdown.classList.toggle('open');
                if (mobileCountryDropdown) mobileCountryDropdown.classList.remove('open');
            });
        }

        if (mobileCountryBtn && mobileCountryDropdown) {
            mobileCountryBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                mobileCountryDropdown.classList.toggle('open');
                if (countryDropdown) countryDropdown.classList.remove('open');
            });
        }

        // Handle country option selection across ALL country selector instances (desktop & mobile)
        const opts = document.querySelectorAll('.country-dropdown .country-opt, .mobile-country-dropdown .country-opt');
        opts.forEach(function (opt) {
            opt.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const flag = this.dataset.flag;
                const code = this.dataset.code;
                const newPhone = this.dataset.fullphone || "+91 6370584682";
                const cleanPhone = newPhone.replace(/[\s()\-]/g, '');

                // 1. Update Desktop Selector Button if visible/active
                if (countryBtn) {
                    const flagEl = countryBtn.querySelector('.flag-icon');
                    const codeEl = countryBtn.querySelector('.country-code');
                    if (flagEl) flagEl.textContent = flag;
                    if (codeEl) codeEl.textContent = code;
                }

                // 2. Update Mobile Selector Button if visible/active
                if (mobileCountryBtn) {
                    const flagEl = mobileCountryBtn.querySelector('.flag-icon');
                    const textEl = mobileCountryBtn.querySelector('.country-name-selected');
                    if (flagEl) flagEl.textContent = flag;
                    if (textEl) textEl.textContent = this.textContent.trim();
                }

                // 3. Update all dynamic phone links & texts site-wide
                document.querySelectorAll('.dynamic-phone-link').forEach(link => {
                    link.setAttribute('href', 'tel:' + cleanPhone);
                });
                document.querySelectorAll('.dynamic-phone-text').forEach(textEl => {
                    textEl.textContent = newPhone;
                });

                // 4. Sync dropdown active selection classes across BOTH selectors
                document.querySelectorAll('.country-dropdown .country-opt, .mobile-country-dropdown .country-opt').forEach(o => {
                    if (o.dataset.code === code) {
                        o.classList.add('active');
                    } else {
                        o.classList.remove('active');
                    }
                });

                // 5. Close both dropdown overlays
                if (countryDropdown) countryDropdown.classList.remove('open');
                if (mobileCountryDropdown) mobileCountryDropdown.classList.remove('open');
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function () {
            if (countryDropdown) countryDropdown.classList.remove('open');
            if (mobileCountryDropdown) mobileCountryDropdown.classList.remove('open');
        });
    }

    // ── 4. Mobile Menu & Accordion Toggles ────────────────────────────────────
    function initMobileDropdowns() {
        const toggler = document.getElementById('hamburgerBtn');
        if (toggler) {
            const collapseEl = document.getElementById('navbarMain');
            if (collapseEl) {
                collapseEl.addEventListener('show.bs.collapse', () => toggler.setAttribute('aria-expanded', 'true'));
                collapseEl.addEventListener('hide.bs.collapse', () => toggler.setAttribute('aria-expanded', 'false'));
            }
        }

        // Tap to open simple dropdowns & mega menu on mobile devices
        document.querySelectorAll('.simple-dropdown > .nav-link-custom, .mega-dropdown > .nav-link-custom').forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (window.innerWidth < 1200) {
                    const parent = this.closest('.nav-item');
                    const isOpen = parent.classList.contains('open');
                    
                    // Close other open ones
                    document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
                    
                    if (!isOpen) {
                        e.preventDefault();
                        parent.classList.add('open');
                    }
                }
            });
        });
    }

    // ── 5. Free Website Audit Modal Form ─────────────────────────────────────
    function initAuditModal() {
        const overlay = document.getElementById('auditModalOverlay');
        const closeBtn = document.getElementById('auditModalClose');
        const auditForm = document.getElementById('auditForm');

        function openAudit() {
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scroll
        }

        function closeAudit() {
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore background scroll
        }

        // Wire up all click targets that open the modal
        const triggers = ['openAuditModal', 'openAuditModalMobile', 'megaAuditBtn', 'navAuditBtn', 'openAuditModalHero'];
        triggers.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('click', openAudit);
        });

        if (closeBtn) closeBtn.addEventListener('click', closeAudit);
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) closeAudit();
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeAudit();
        });

        // Formspree submission handler
        if (auditForm) {
            auditForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const btn = this.querySelector('.audit-submit-btn');
                const origHtml = btn.innerHTML;
                
                btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending Request...';
                btn.disabled = true;

                fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: { 'Accept': 'application/json' }
                })
                .then(res => {
                    if (res.ok) {
                        btn.innerHTML = '<i class="fas fa-check me-2"></i>Audit Scheduled! Check Email.';
                        btn.style.background = '#25d366';
                        btn.style.color = '#fff';
                        auditForm.reset();
                        setTimeout(() => {
                            closeAudit();
                            btn.innerHTML = origHtml;
                            btn.style.background = '';
                            btn.style.color = '';
                            btn.disabled = false;
                        }, 3000);
                    } else {
                        throw new Error('Network error');
                    }
                })
                .catch(() => {
                    btn.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Submission Failed.';
                    btn.style.background = '#ff4d4d';
                    btn.style.color = '#fff';
                    setTimeout(() => {
                        btn.innerHTML = origHtml;
                        btn.style.background = '';
                        btn.style.color = '';
                        btn.disabled = false;
                    }, 3000);
                });
            });
        }
    }

    // ── 6. Scroll Tracker & Back to Top ──────────────────────────────────────
    function initScrollTracker() {
        const tracker = document.getElementById('scroll-tracker');
        const dot     = document.getElementById('scroll-dot');
        const bttBtn  = document.getElementById('backToTop');
        const body    = document.body;
        const html    = document.documentElement;

        if (!tracker || !dot) return;

        let ticking = false;
        function updateScroll() {
            const scrollPos = window.scrollY || window.pageYOffset;
            const total = Math.max(
                body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight
            ) - html.clientHeight;

            if (total <= 0) {
                tracker.style.opacity = '0';
                return;
            }

            const pct = scrollPos / total;
            const maxMove = tracker.offsetHeight - dot.offsetHeight;
            dot.style.transform = `translateY(${Math.max(0, Math.min(maxMove, pct * maxMove))}px)`;
            
            // Show/hide trackers
            tracker.style.opacity = scrollPos > 100 ? '1' : '0';
            if (bttBtn) {
                bttBtn.classList.toggle('visible', scrollPos > 400);
            }
            
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }, { passive: true });

        window.addEventListener('resize', updateScroll, { passive: true });
        
        if (bttBtn) {
            bttBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        updateScroll();
    }

    // Initialize all components once the HTML is ready in DOM
    function initAll() {
        initHeaderScroll();
        initActiveLinks();
        initCountrySelector();
        initMobileDropdowns();
        initAuditModal();
        initScrollTracker();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

})();
