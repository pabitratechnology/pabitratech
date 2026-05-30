import glob

pages = glob.glob('**/*.html', recursive=True)

OLD = '                    <!-- More Pages -->\n                    <li class="nav-item dropdown simple-dropdown" id="moreDropdown">'
NEW = '''                    <!-- Locations -->
                    <li class="nav-item">
                        <a class="nav-link-custom" href="/locations/">
                            <i class="fas fa-globe-asia me-1" style="color:#00C4FF;font-size:.8em"></i>Locations
                        </a>
                    </li>

                    <!-- More Pages -->
                    <li class="nav-item dropdown simple-dropdown" id="moreDropdown">'''

count = 0
for path in pages:
    if 'locations' in path:
        continue
    try:
        txt = open(path, encoding='utf-8').read()
        if OLD in txt and '/locations/' not in txt:
            open(path, 'w', encoding='utf-8').write(txt.replace(OLD, NEW, 1))
            count += 1
            print('Updated:', path)
    except Exception as e:
        print('Skip:', path, e)
print(f'Total updated: {count}')
