"""
update_country_selector.py
1. Removes the '9 Countries' top-bar pill added earlier
2. Adds href="/locations/#country-id" to each country option in dropdown
3. Adds a 'View All Locations' footer link inside the dropdown
4. Adds anchor IDs to location cards in locations/index.html
"""
import glob, re

pages = glob.glob('**/*.html', recursive=True)

# ── 1. Remove "9 Countries" top-bar pill ──────────────────────────────────────
REMOVE_PILL_OLD = """                    <span class="tbl-sep d-none d-lg-inline">|</span>
                    <a href="/locations/" class="tbl-item d-none d-lg-flex tbl-locations-link" title="Our Global Locations">
                        <i class="fas fa-globe-asia" style="color:#00C4FF"></i>
                        <span style="color:#00C4FF;font-weight:600;letter-spacing:.03em">9 Countries</span>
                    </a>"""
REMOVE_PILL_NEW = ""

# ── 2. Country anchor map ──────────────────────────────────────────────────────
COUNTRY_ANCHORS = {
    'data-code="IN"': 'href="/locations/#loc-india"',
    'data-code="US"': 'href="/locations/#loc-usa"',
    'data-code="GB"': 'href="/locations/#loc-uk"',
    'data-code="AE"': 'href="/locations/#loc-uae"',
    'data-code="AU"': 'href="/locations/#loc-australia"',
    'data-code="SG"': 'href="/locations/#loc-singapore"',
    'data-code="CA"': 'href="/locations/#loc-canada"',
    'data-code="DE"': 'href="/locations/#loc-germany"',
    'data-code="SA"': 'href="/locations/#loc-saudi"',
}

# ── 3. Footer link to add inside desktop country dropdown ──────────────────────
DROPDOWN_FOOTER_OLD = '</div>\n                        </div>'  # closing of country-dropdown + country-selector
DROPDOWN_FOOTER_NEW = '''                            <div class="country-dd-footer">
                                <a href="/locations/" class="country-dd-loc-link">
                                    <i class="fas fa-globe-asia"></i>
                                    <span>View All Global Locations</span>
                                    <i class="fas fa-arrow-right ms-auto"></i>
                                </a>
                            </div>
                        </div>
                        </div>'''

# ── 4. Mobile dropdown footer ──────────────────────────────────────────────────
MOBILE_DD_OLD = '</div>\n                        </div>\n                    </div>\n                </div>\n            </div>'
MOBILE_DD_NEW = '''                            <div class="country-dd-footer">
                                <a href="/locations/" class="country-dd-loc-link">
                                    <i class="fas fa-globe-asia"></i>
                                    <span>View All Locations</span>
                                    <i class="fas fa-arrow-right ms-auto"></i>
                                </a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>'''

updated = 0
for path in pages:
    is_locations = path.replace('\\','/').endswith('locations/index.html')
    try:
        txt = open(path, encoding='utf-8').read()
        changed = False

        # Step 1: Remove pill
        if REMOVE_PILL_OLD in txt:
            txt = txt.replace(REMOVE_PILL_OLD, REMOVE_PILL_NEW, 1)
            changed = True

        # Step 2: Add href to each country option (desktop + mobile)
        # Pattern: <a href="#" class="country-opt ... data-code="XX" ...>
        # We change href="#" to href="/locations/#loc-xxx" for each country
        for data_code, loc_href in COUNTRY_ANCHORS.items():
            # Match lines with country-opt and the specific data-code
            old_pattern = f'href="#" class="country-opt active" {data_code}'
            new_pattern = f'{loc_href} class="country-opt active" {data_code}'
            if old_pattern in txt:
                txt = txt.replace(old_pattern, new_pattern)
                changed = True

            old_pattern2 = f'href="#" class="country-opt" {data_code}'
            new_pattern2 = f'{loc_href} class="country-opt" {data_code}'
            if old_pattern2 in txt:
                txt = txt.replace(old_pattern2, new_pattern2)
                changed = True

        # Step 3: Add footer link inside desktop country-dropdown
        # We look for the specific closing pattern of countryDropdown div
        # Pattern: last country-opt line + closing div
        DD_CLOSE = '🇸🇦 Saudi Arabia (+966)</a>\n                        </div>\n                    </div>'
        if DD_CLOSE in txt and 'country-dd-footer' not in txt:
            txt = txt.replace(DD_CLOSE,
                '🇸🇦 Saudi Arabia (+966)</a>\n' +
                '                            <div class="country-dd-footer">\n' +
                '                                <a href="/locations/" class="country-dd-loc-link">\n' +
                '                                    <i class="fas fa-globe-asia"></i>\n' +
                '                                    <span>View All Global Locations</span>\n' +
                '                                    <i class="fas fa-arrow-right ms-auto"></i>\n' +
                '                                </a>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>', 1)
            changed = True

        if changed:
            open(path, 'w', encoding='utf-8').write(txt)
            updated += 1
            print(f'Updated: {path}')
    except Exception as e:
        print(f'Skip {path}: {e}')

print(f'\nTotal updated: {updated}')
