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

        // Formspree / Web3Forms submission handler with improved UX + accessibility
        if (auditForm) {
            // ensure a messages container exists for consistent feedback
            let messagesEl = auditForm.querySelector('.audit-messages');
            if (!messagesEl) {
                messagesEl = document.createElement('div');
                messagesEl.className = 'audit-messages mt-3';
                const disclaimer = auditForm.querySelector('.audit-disclaimer');
                if (disclaimer) {
                    auditForm.insertBefore(messagesEl, disclaimer);
                } else {
                    auditForm.appendChild(messagesEl);
                }
            }

            auditForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Client-side validity
                if (!this.checkValidity()) {
                    this.classList.add('was-validated');
                    messagesEl.innerHTML = `<div class="alert alert-warning small p-2" role="alert">Please complete all required fields before submitting.</div>`;
                    messagesEl.setAttribute('aria-live', 'polite');
                    try { messagesEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (err) {}
                    return;
                }

                // Trim access_key to avoid accidental spaces which cause invalid key errors
                const accessInput = this.querySelector('input[name="access_key"]');
                if (accessInput && typeof accessInput.value === 'string') {
                    accessInput.value = accessInput.value.trim();
                }

                // If access_key is missing or empty, show a clear error to help debugging
                if (!accessInput || !accessInput.value) {
                    messagesEl.innerHTML = `<div class="alert alert-danger small p-2" role="alert">Invalid Form ID / Access Key. Please verify the hidden <strong>access_key</strong> value in the form and ensure there are no extra spaces.</div>`;
                    messagesEl.setAttribute('aria-live', 'polite');
                    try { messagesEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (err) {}
                    return;
                }

                const btn = this.querySelector('.audit-submit-btn');
                const origHtml = btn ? btn.innerHTML : 'Sending...';

                if (btn) {
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2" aria-hidden="true"></i>Sending Request...';
                    btn.disabled = true;
                    btn.setAttribute('aria-disabled', 'true');
                }

                messagesEl.innerHTML = '';
                messagesEl.removeAttribute('role');

                fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
                })
                .then(async res => {
                    const text = await res.text();
                    let data = {};
                    try { data = text ? JSON.parse(text) : {}; } catch (err) { data = { raw: text }; }

                    if (res.ok) {
                        // Prefer server message if available
                        const successMsg = (data.message || data.success || 'Thank you! Your free audit request has been received. Check your email for details.');
                        messagesEl.innerHTML = `<div class="alert alert-success small p-3" role="status">${successMsg}</div>`;
                        messagesEl.setAttribute('aria-live', 'polite');
                        try { messagesEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (err) {}
                        this.reset();
                        // small visual confirmation on button
                        if (btn) {
                            btn.innerHTML = '<i class="fas fa-check me-2" aria-hidden="true"></i>Request Sent';
                            btn.style.background = '#25d366';
                            btn.style.color = '#fff';
                        }
                        // close the modal after a short pause
                        setTimeout(() => {
                            closeAudit();
                            if (btn) {
                                btn.innerHTML = origHtml;
                                btn.style.background = '';
                                btn.style.color = '';
                                btn.disabled = false;
                                btn.removeAttribute('aria-disabled');
                            }
                        }, 2200);
                    } else {
                        // show server-provided error details when possible
                        const errMsg = (data.error || data.message || 'We could not process your request. Please try again later.');
                        messagesEl.innerHTML = `<div class="alert alert-danger small p-3" role="alert">${errMsg}</div>`;
                        messagesEl.setAttribute('aria-live', 'polite');
                        try { messagesEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (err) {}
                        if (btn) {
                            btn.innerHTML = origHtml;
                            btn.disabled = false;
                            btn.removeAttribute('aria-disabled');
                        }
                    }
                })
                .catch((err) => {
                    console.error('Audit submit error:', err);
                    messagesEl.innerHTML = `<div class="alert alert-danger small p-3" role="alert">A network error occurred. Please check your connection and try again.</div>`;
                    messagesEl.setAttribute('aria-live', 'polite');
                    try { messagesEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
                    if (btn) {
                        btn.innerHTML = origHtml;
                        btn.disabled = false;
                        btn.removeAttribute('aria-disabled');
                    }
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
