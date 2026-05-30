"""
move_locations_nav.py
— Removes standalone Locations nav item from main navbar
— Adds Locations link into the top-bar (ultra-top-bar) with a globe icon
— Also adds it inside the 'More' dropdown for discoverability
"""
import glob

pages = glob.glob('**/*.html', recursive=True)

# ── REMOVE standalone Locations nav item ──────────────────────────────────────
REMOVE_OLD = """
                    <!-- Locations -->
                    <li class="nav-item">
                        <a class="nav-link-custom" href="/locations/">
                            <i class="fas fa-globe-asia me-1" style="color:#00C4FF;font-size:.8em"></i>Locations
                        </a>
                    </li>

                    <!-- More Pages -->"""

REMOVE_NEW = """
                    <!-- More Pages -->"""

# ── ADD Locations to top-bar (after the address span, before closing of top-bar-left) ──
TOPBAR_OLD = """                    <span class="tbl-item d-none d-lg-flex">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Bhubaneswar, Odisha, India</span>
                    </span>
                </div>"""

TOPBAR_NEW = """                    <span class="tbl-item d-none d-lg-flex">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Bhubaneswar, Odisha, India</span>
                    </span>
                    <span class="tbl-sep d-none d-lg-inline">|</span>
                    <a href="/locations/" class="tbl-item d-none d-lg-flex tbl-locations-link" title="Our Global Locations">
                        <i class="fas fa-globe-asia" style="color:#00C4FF"></i>
                        <span style="color:#00C4FF;font-weight:600;letter-spacing:.03em">9 Countries</span>
                    </a>
                </div>"""

# ── ADD Locations to 'More' dropdown ─────────────────────────────────────────
MORE_OLD = """                            <a href="/terms/" class="simple-item">
                                <i class="fas fa-file-contract"></i>
                                <span><strong>Terms of Service</strong><small>Our usage terms</small></span>
                            </a>
                        </div>
                    </li>"""

MORE_NEW = """                            <a href="/terms/" class="simple-item">
                                <i class="fas fa-file-contract"></i>
                                <span><strong>Terms of Service</strong><small>Our usage terms</small></span>
                            </a>
                            <a href="/locations/" class="simple-item locations-nav-item">
                                <i class="fas fa-globe-asia" style="color:#00C4FF"></i>
                                <span><strong>Global Locations</strong><small>9 countries we serve</small></span>
                            </a>
                        </div>
                    </li>"""

updated = 0
for path in pages:
    if 'locations\\index.html' == path or 'locations/index.html' == path:
        continue
    try:
        txt = open(path, encoding='utf-8').read()
        changed = False

        if REMOVE_OLD in txt:
            txt = txt.replace(REMOVE_OLD, REMOVE_NEW, 1)
            changed = True

        if TOPBAR_OLD in txt and 'tbl-locations-link' not in txt:
            txt = txt.replace(TOPBAR_OLD, TOPBAR_NEW, 1)
            changed = True

        if MORE_OLD in txt and 'Global Locations' not in txt:
            txt = txt.replace(MORE_OLD, MORE_NEW, 1)
            changed = True

        if changed:
            open(path, 'w', encoding='utf-8').write(txt)
            updated += 1
            print(f'Updated: {path}')
    except Exception as e:
        print(f'Skip {path}: {e}')

print(f'\nTotal updated: {updated}')
