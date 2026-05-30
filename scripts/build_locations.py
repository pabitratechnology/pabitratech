# build_locations_v2.py — adds anchor IDs to each location card

import os

OUT = r"D:\Pabitra Technology new website\pabitratech-main\locations\index.html"
HEADER = open(r"D:\Pabitra Technology new website\pabitratech-main\contact\index.html", encoding="utf-8").read()
start = HEADER.find("<!-- START_HEADER_COMPONENT -->")
end   = HEADER.find("<!-- END_HEADER_COMPONENT -->") + len("<!-- END_HEADER_COMPONENT -->")
HEADER_BLOCK = HEADER[start:end]

MAIN = open(r"D:\Pabitra Technology new website\pabitratech-main\index.html", encoding="utf-8").read()
fs = MAIN.find("<!-- START_FOOTER_COMPONENT -->")
fe = MAIN.find("<!-- END_FOOTER_COMPONENT -->") + len("<!-- END_FOOTER_COMPONENT -->")
FOOTER_BLOCK = MAIN[fs:fe]

LOCS = [
    {"id":"india","flag":"\U0001f1ee\U0001f1f3","name":"India","code":"+91","region":"asia","hq":True,
     "city":"Bhubaneswar, Odisha","address":"Bhubaneswar, Odisha \u2014 751001",
     "phone":"+91 6370584682","email":"infopabitratechnology@gmail.com",
     "hours":"Mon\u2013Sat: 10AM\u20136PM IST","tags":["Web Dev","SEO","App Dev","Cloud","AI/ML"],
     "map":"https://maps.google.com/?q=Bhubaneswar,Odisha,India"},
    {"id":"usa","flag":"\U0001f1fa\U0001f1f8","name":"United States","code":"+1","region":"americas","hq":False,
     "city":"Remote \u2014 USA","address":"Serving all US states",
     "phone":"+1 (650) 489-6370","email":"infopabitratechnology@gmail.com",
     "hours":"Mon\u2013Fri: 9AM\u20136PM EST","tags":["Web Dev","Digital Marketing","SaaS","Cloud","PPC"],
     "map":"https://maps.google.com/?q=United+States"},
    {"id":"uk","flag":"\U0001f1ec\U0001f1e7","name":"United Kingdom","code":"+44","region":"europe","hq":False,
     "city":"Remote \u2014 London","address":"Serving all UK regions",
     "phone":"+44 20 7946 0192","email":"infopabitratechnology@gmail.com",
     "hours":"Mon\u2013Fri: 9AM\u20135PM GMT","tags":["SEO","Web Dev","E-commerce","UI/UX","PPC"],
     "map":"https://maps.google.com/?q=London,UK"},
    {"id":"uae","flag":"\U0001f1e6\U0001f1ea","name":"UAE","code":"+971","region":"middleeast","hq":False,
     "city":"Remote \u2014 Dubai","address":"Serving Dubai & Abu Dhabi",
     "phone":"+971 4 312 9000","email":"infopabitratechnology@gmail.com",
     "hours":"Mon\u2013Fri: 9AM\u20136PM GST","tags":["Web Dev","Digital Marketing","SEO","App Dev","Branding"],
     "map":"https://maps.google.com/?q=Dubai,UAE"},
    {"id":"australia","flag":"\U0001f1e6\U0001f1fa","name":"Australia","code":"+61","region":"oceania","hq":False,
     "city":"Remote \u2014 Sydney","address":"Serving AU & NZ",
     "phone":"+61 2 9382 1111","email":"infopabitratechnology@gmail.com",
     "hours":"Mon\u2013Fri: 9AM\u20135PM AEST","tags":["Web Dev","SEO","E-commerce","Cloud","PPC"],
     "map":"https://maps.google.com/?q=Sydney,Australia"},
    {"id":"singapore","flag":"\U0001f1f8\U0001f1ec","name":"Singapore","code":"+65","region":"asia","hq":False,
     "city":"Remote \u2014 Singapore","address":"Serving SE Asia",
     "phone":"+65 6789 0123","email":"infopabitratechnology@gmail.com",
     "hours":"Mon\u2013Fri: 9AM\u20136PM SGT","tags":["FinTech","Web Dev","App Dev","Cloud","AI"],
     "map":"https://maps.google.com/?q=Singapore"},
    {"id":"canada","flag":"\U0001f1e8\U0001f1e6","name":"Canada","code":"+1","region":"americas","hq":False,
     "city":"Remote \u2014 Toronto","address":"Serving all CA provinces",
     "phone":"+1 (416) 555-0199","email":"infopabitratechnology@gmail.com",
     "hours":"Mon\u2013Fri: 9AM\u20136PM EST","tags":["Web Dev","SEO","SaaS","Cloud","Marketing"],
     "map":"https://maps.google.com/?q=Toronto,Canada"},
    {"id":"germany","flag":"\U0001f1e9\U0001f1ea","name":"Germany","code":"+49","region":"europe","hq":False,
     "city":"Remote \u2014 Berlin","address":"Serving DACH region",
     "phone":"+49 30 8973 8921","email":"infopabitratechnology@gmail.com",
     "hours":"Mon\u2013Fri: 9AM\u20136PM CET","tags":["GDPR SEO","Web Dev","ERP","DevOps","UI/UX"],
     "map":"https://maps.google.com/?q=Berlin,Germany"},
    {"id":"saudi","flag":"\U0001f1f8\U0001f1e6","name":"Saudi Arabia","code":"+966","region":"middleeast","hq":False,
     "city":"Remote \u2014 Riyadh","address":"Serving KSA & GCC",
     "phone":"+966 11 405 8920","email":"infopabitratechnology@gmail.com",
     "hours":"Sun\u2013Thu: 9AM\u20136PM AST","tags":["Web Dev","SEO","E-commerce","Branding","App Dev"],
     "map":"https://maps.google.com/?q=Riyadh,Saudi+Arabia"},
]

def card(loc, delay):
    hq = '<span class="loc-hq-badge">\u2b50 HQ</span>' if loc["hq"] else ""
    tags = "".join(f'<span class="loc-tag">{t}</span>' for t in loc["tags"])
    ph_clean = loc["phone"].replace(" ","").replace("(","").replace(")","").replace("-","")
    return f"""
<div class="col-md-6 col-lg-4 loc-card-wrap" id="loc-{loc['id']}" data-region="{loc['region']}" data-aos="fade-up" data-aos-delay="{delay}">
  <div class="loc-card">
    <div class="loc-card-header">
      <div class="loc-flag-wrap">{loc['flag']}</div>
      <div class="loc-card-meta">
        <h3>{loc['name']}</h3>
        <span class="country-code">{loc['code']} &bull; {loc['city']}</span>
      </div>
      {hq}
    </div>
    <div class="loc-card-body">
      <div class="loc-info-row"><div class="loc-info-icon"><i class="fas fa-map-marker-alt"></i></div><div class="loc-info-text"><strong>Address</strong><span>{loc['address']}</span></div></div>
      <div class="loc-info-row"><div class="loc-info-icon"><i class="fas fa-phone-alt"></i></div><div class="loc-info-text"><strong>Phone</strong><a href="tel:{ph_clean}">{loc['phone']}</a></div></div>
      <div class="loc-info-row"><div class="loc-info-icon"><i class="fas fa-envelope"></i></div><div class="loc-info-text"><strong>Email</strong><a href="mailto:{loc['email']}">{loc['email']}</a></div></div>
      <div class="loc-info-row"><div class="loc-info-icon"><i class="fas fa-clock"></i></div><div class="loc-info-text"><strong>Hours</strong><span>{loc['hours']}</span></div></div>
      <div class="loc-services-tags">{tags}</div>
    </div>
    <div class="loc-card-footer">
      <a href="/contact/" class="loc-btn-primary"><i class="fas fa-paper-plane"></i> Get a Quote</a>
      <a href="{loc['map']}" target="_blank" class="loc-btn-secondary"><i class="fas fa-map"></i> Map</a>
    </div>
  </div>
</div>"""

cards_html = ""
for i, loc in enumerate(LOCS):
    cards_html += card(loc, (i % 3) * 100)

map_pins = ""
for loc in LOCS:
    map_pins += f"""
    <div class="map-flag-pin" onclick="document.getElementById('loc-{loc['id']}').scrollIntoView({{behavior:'smooth',block:'center'}})">
      <div class="pin-flag">{loc['flag']}</div>
      <div class="pin-dot"></div>
      <div class="pin-label">{loc['name']}</div>
    </div>"""

marquee_items = "".join(
    f'<span><i class="fas fa-map-marker-alt"></i> {l["name"]}{" \u2014 HQ" if l["hq"] else ""}</span>'
    for l in LOCS * 2
)

HTML = f"""<!DOCTYPE html>
<html lang="en">
<head>
<title>Global Locations | Pabitra Technology \u2014 IT Services Worldwide</title>
<meta name="description" content="Pabitra Technology serves clients in India, USA, UK, UAE, Australia, Singapore, Canada, Germany and Saudi Arabia with world-class IT services, web development and digital marketing.">
<meta name="keywords" content="Pabitra Technology locations, IT company India USA UK, web development UAE, digital marketing Australia, software company Singapore, IT services Canada Germany, Saudi Arabia IT agency, global IT solutions Bhubaneswar Odisha">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="canonical" href="https://pabitratechnology.com/locations/">
<link rel="icon" href="/images/pabitra1.png" type="image/png">
<meta property="og:title" content="Global Locations | Pabitra Technology">
<meta property="og:description" content="IT services across India, USA, UK, UAE, Australia, Singapore, Canada, Germany and Saudi Arabia.">
<meta property="og:url" content="https://pabitratechnology.com/locations/">
<meta property="og:type" content="website">
<script>(function(w,d,s,l,i){{w[l]=w[l]||[];w[l].push({{'gtm.start':new Date().getTime(),event:'gtm.js'}});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}})(window,document,'script','dataLayer','GTM-P236FM72');</script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<link rel="stylesheet" href="/CSS/components.css">
<link rel="stylesheet" href="/CSS/locations.css">
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"Organization","name":"Pabitra Technology","url":"https://pabitratechnology.com","logo":"https://pabitratechnology.com/images/pabitra250.png","areaServed":["IN","US","GB","AE","AU","SG","CA","DE","SA"],"contactPoint":{{"@type":"ContactPoint","telephone":"+916370584682","contactType":"customer service","areaServed":["IN","US","GB","AE","AU","SG","CA","DE","SA"],"availableLanguage":["en"]}}}}
</script>
</head>
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P236FM72" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

{HEADER_BLOCK}

<!-- ===== HERO ===== -->
<section class="loc-hero">
  <div class="loc-hero-particles">
    <span class="loc-particle"></span><span class="loc-particle"></span>
    <span class="loc-particle"></span><span class="loc-particle"></span>
    <span class="loc-particle"></span><span class="loc-particle"></span>
    <span class="loc-particle"></span><span class="loc-particle"></span>
  </div>
  <div class="container position-relative" style="z-index:3">
    <div class="row align-items-center g-5">
      <div class="col-lg-7" data-aos="fade-right">
        <ol class="loc-breadcrumb">
          <li><a href="/"><i class="fas fa-home me-1"></i>Home</a></li>
          <li><i class="fas fa-chevron-right mx-2" style="font-size:.7rem;opacity:.5"></i></li>
          <li class="active">Global Locations</li>
        </ol>
        <div class="loc-hero-badge"><span class="dot"></span>Serving 9+ Countries Worldwide</div>
        <h1 class="loc-hero-title">Our Global <span class="grad">Presence</span><br>&amp; Service Locations</h1>
        <p class="loc-hero-sub">Pabitra Technology delivers world-class IT services, web development, digital marketing, and software solutions to clients across 9 countries &mdash; from our headquarters in Bhubaneswar, India.</p>
        <!-- Quick country jump links -->
        <div class="loc-country-pills" data-aos="fade-up" data-aos-delay="150">
          {"".join(f'<a href="#loc-{l["id"]}" class="loc-country-pill">{l["flag"]} {l["name"]}</a>' for l in LOCS)}
        </div>
        <div class="loc-hero-stats mt-4">
          <div class="loc-hero-stat"><div class="num">9<span>+</span></div><div class="lbl">Countries Served</div></div>
          <div class="loc-hero-stat"><div class="num">500<span>+</span></div><div class="lbl">Global Clients</div></div>
          <div class="loc-hero-stat"><div class="num">7<span>+</span></div><div class="lbl">Years Excellence</div></div>
          <div class="loc-hero-stat"><div class="num">24<span>/7</span></div><div class="lbl">Support</div></div>
        </div>
      </div>
      <div class="col-lg-5 d-none d-lg-flex justify-content-center" data-aos="fade-left" data-aos-delay="200">
        <div class="loc-hero-globe">
          <div class="globe-ring"></div>
          <div class="globe-ring"></div>
          <div class="globe-ring"></div>
          <div class="globe-center"><i class="fas fa-globe-asia"></i></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== MARQUEE ===== -->
<div class="region-strip">
  <div class="region-marquee">{marquee_items}</div>
</div>

<!-- ===== FILTER ===== -->
<section class="loc-filter-section">
  <div class="container">
    <div class="text-center mb-4" data-aos="fade-up">
      <span class="loc-section-label">Our Global Network</span>
      <h2 class="loc-section-title">Find Us Around the World</h2>
      <p class="loc-section-sub mx-auto">Select a region to filter locations, or click any country above to jump directly.</p>
    </div>
    <div class="loc-filter-tabs" data-aos="fade-up" data-aos-delay="100">
      <button class="loc-tab-btn active" data-filter="all">\U0001f30d All Regions</button>
      <button class="loc-tab-btn" data-filter="asia">\U0001f30f Asia</button>
      <button class="loc-tab-btn" data-filter="europe">\U0001f30d Europe</button>
      <button class="loc-tab-btn" data-filter="americas">\U0001f30e Americas</button>
      <button class="loc-tab-btn" data-filter="middleeast">\U0001f54c Middle East</button>
      <button class="loc-tab-btn" data-filter="oceania">\U0001f998 Oceania</button>
    </div>
  </div>
</section>

<!-- ===== CARDS GRID ===== -->
<section class="loc-grid-section">
  <div class="container">
    <div class="row g-4">{cards_html}
    </div>
  </div>
</section>

<!-- ===== WORLD MAP VISUAL ===== -->
<section class="loc-map-section">
  <div class="container">
    <div class="row align-items-center g-5">
      <div class="col-lg-5" data-aos="fade-right">
        <span class="loc-section-label">Global Footprint</span>
        <h2 class="loc-section-title">Delivering Excellence<br>Across Continents</h2>
        <p class="loc-section-sub">Our remote-first delivery model gives you India-quality engineering with local timezone support &mdash; without compromise.</p>
        <ul class="mt-4" style="list-style:none;padding:0;display:flex;flex-direction:column;gap:14px">
          <li style="display:flex;align-items:center;gap:12px;color:#cdd6f4;font-size:.9rem"><i class="fas fa-check-circle" style="color:#00C4FF;font-size:1.1rem;flex-shrink:0"></i>Timezone-aligned support teams</li>
          <li style="display:flex;align-items:center;gap:12px;color:#cdd6f4;font-size:.9rem"><i class="fas fa-check-circle" style="color:#00C4FF;font-size:1.1rem;flex-shrink:0"></i>Multilingual client communication</li>
          <li style="display:flex;align-items:center;gap:12px;color:#cdd6f4;font-size:.9rem"><i class="fas fa-check-circle" style="color:#00C4FF;font-size:1.1rem;flex-shrink:0"></i>Local compliance &amp; regulation awareness</li>
          <li style="display:flex;align-items:center;gap:12px;color:#cdd6f4;font-size:.9rem"><i class="fas fa-check-circle" style="color:#00C4FF;font-size:1.1rem;flex-shrink:0"></i>24/7 emergency support across all regions</li>
        </ul>
        <div class="d-flex gap-3 mt-4 flex-wrap">
          <a href="/contact/" class="loc-cta-primary" style="font-size:.85rem;padding:12px 24px"><i class="fas fa-paper-plane"></i> Start Project</a>
          <a href="/services/" class="loc-cta-secondary" style="font-size:.85rem;padding:12px 20px"><i class="fas fa-th-large"></i> Our Services</a>
        </div>
      </div>
      <div class="col-lg-7" data-aos="fade-left" data-aos-delay="150">
        <div class="world-map-visual">
          <p style="color:#8892a4;font-size:.78rem;text-align:center;margin-bottom:16px;letter-spacing:.05em;text-transform:uppercase">Click a flag to jump to that location</p>
          <div class="map-flags-grid">{map_pins}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== TRUST STRIP ===== -->
<section style="background:rgba(255,255,255,0.01);border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);padding:50px 0">
  <div class="container">
    <div class="row g-4 text-center" data-aos="fade-up">
      <div class="col-6 col-md-3"><div style="background:rgba(0,196,255,0.06);border:1px solid rgba(0,196,255,0.12);border-radius:16px;padding:28px 16px"><i class="fas fa-bolt" style="font-size:1.8rem;color:#00C4FF;margin-bottom:12px;display:block"></i><div style="font-size:1.5rem;font-weight:800;color:#fff;font-family:Montserrat">2hr</div><div style="font-size:.78rem;color:#8892a4;margin-top:4px">Response SLA</div></div></div>
      <div class="col-6 col-md-3"><div style="background:rgba(255,193,7,0.06);border:1px solid rgba(255,193,7,0.12);border-radius:16px;padding:28px 16px"><i class="fas fa-handshake" style="font-size:1.8rem;color:#FFC107;margin-bottom:12px;display:block"></i><div style="font-size:1.5rem;font-weight:800;color:#fff;font-family:Montserrat">100%</div><div style="font-size:.78rem;color:#8892a4;margin-top:4px">NDA Protected</div></div></div>
      <div class="col-6 col-md-3"><div style="background:rgba(76,175,80,0.06);border:1px solid rgba(76,175,80,0.12);border-radius:16px;padding:28px 16px"><i class="fas fa-shield-alt" style="font-size:1.8rem;color:#4CAF50;margin-bottom:12px;display:block"></i><div style="font-size:1.5rem;font-weight:800;color:#fff;font-family:Montserrat">ISO</div><div style="font-size:.78rem;color:#8892a4;margin-top:4px">9001 Certified</div></div></div>
      <div class="col-6 col-md-3"><div style="background:rgba(156,39,176,0.06);border:1px solid rgba(156,39,176,0.12);border-radius:16px;padding:28px 16px"><i class="fas fa-rocket" style="font-size:1.8rem;color:#9C27B0;margin-bottom:12px;display:block"></i><div style="font-size:1.5rem;font-weight:800;color:#fff;font-family:Montserrat">48hr</div><div style="font-size:.78rem;color:#8892a4;margin-top:4px">Project Kickoff</div></div></div>
    </div>
  </div>
</section>

<!-- ===== CTA ===== -->
<section class="loc-cta-section">
  <div class="container">
    <div class="loc-cta-card" data-aos="zoom-in">
      <div class="loc-section-label mb-3">Get Started Today</div>
      <h2>Ready to Work with a <span style="background:linear-gradient(135deg,#00C4FF,#FFC107);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Global IT Leader?</span></h2>
      <p>Whether you're in Mumbai or Manhattan, Dubai or Berlin &mdash; our team is ready to build your next digital solution with precision, speed and world-class quality.</p>
      <div class="loc-cta-btns">
        <a href="/contact/" class="loc-cta-primary"><i class="fas fa-paper-plane"></i> Free Consultation</a>
        <a href="/services/" class="loc-cta-secondary"><i class="fas fa-th-large"></i> Explore Services</a>
        <a href="https://wa.me/916370584682" target="_blank" class="loc-cta-secondary" style="border-color:rgba(37,211,102,.3);color:#25D366"><i class="fab fa-whatsapp"></i> WhatsApp Us</a>
      </div>
    </div>
  </div>
</section>

{FOOTER_BLOCK}

<a href="https://wa.me/916370584682?text=Hello%20Pabitra%20Technology" class="whatsapp-float" target="_blank" title="Chat on WhatsApp" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i><span class="whatsapp-tooltip">Chat with us!</span></a>
<button class="back-to-top" id="backToTop" aria-label="Back to top"><i class="fas fa-chevron-up"></i></button>
<div id="scroll-tracker"><div id="scroll-dot"></div></div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script src="/JS/components.js"></script>
<script src="/JS/main.js"></script>
<script>
  document.querySelectorAll('.loc-tab-btn').forEach(btn => {{
    btn.addEventListener('click', function() {{
      document.querySelectorAll('.loc-tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const f = this.dataset.filter;
      document.querySelectorAll('.loc-card-wrap').forEach(c => {{
        c.classList.toggle('hidden', f !== 'all' && c.dataset.region !== f);
      }});
    }});
  }});
  const btt = document.getElementById('backToTop');
  if(btt){{
    window.addEventListener('scroll', ()=>btt.classList.toggle('visible', scrollY>400));
    btt.addEventListener('click', ()=>window.scrollTo({{top:0,behavior:'smooth'}}));
  }}
  // Smooth scroll for country pills
  document.querySelectorAll('.loc-country-pill').forEach(a => {{
    a.addEventListener('click', function(e) {{
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {{
        target.scrollIntoView({{behavior:'smooth', block:'center'}});
        target.querySelector('.loc-card').style.boxShadow = '0 0 0 2px #00C4FF, 0 20px 60px rgba(0,196,255,0.25)';
        setTimeout(()=>{{ target.querySelector('.loc-card').style.boxShadow = ''; }}, 2000);
      }}
    }});
  }});
  AOS.init({{duration:700, easing:'ease-out-cubic', once:true}});
</script>
</body>
</html>"""

with open(OUT, "w", encoding="utf-8") as f:
    f.write(HTML)
print(f"Done! {len(HTML)} chars")
