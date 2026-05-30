/**
 * Pabitra Technology — Breadcrumb Auto-Injector
 * Inserts a styled breadcrumb <nav> into each page's hero section.
 * Detects page type by filename to build the correct hierarchy.
 */
const fs   = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, 'html');

// ── Breadcrumb map: filename → { crumbs: [{label, href}...], current: string }
const breadcrumbMap = {
  // General pages
  'about.html':           { crumbs: [{label:'Home',href:'index.html'}],                                         current: 'About Us' },
  'about-story.html':     { crumbs: [{label:'Home',href:'index.html'},{label:'About',href:'about.html'}],       current: 'Our Story' },
  'about-team.html':      { crumbs: [{label:'Home',href:'index.html'},{label:'About',href:'about.html'}],       current: 'Our Team' },
  'about-awards.html':    { crumbs: [{label:'Home',href:'index.html'},{label:'About',href:'about.html'}],       current: 'Awards & Recognition' },
  'about-values.html':    { crumbs: [{label:'Home',href:'index.html'},{label:'About',href:'about.html'}],       current: 'Mission & Values' },
  'services.html':        { crumbs: [{label:'Home',href:'index.html'}],                                         current: 'All Services' },
  'portfolio.html':       { crumbs: [{label:'Home',href:'index.html'}],                                         current: 'Portfolio' },
  'blog.html':            { crumbs: [{label:'Home',href:'index.html'}],                                         current: 'Blog & Insights' },
  'contact.html':         { crumbs: [{label:'Home',href:'index.html'}],                                         current: 'Contact Us' },
  'careers.html':         { crumbs: [{label:'Home',href:'index.html'}],                                         current: 'Careers' },
  'case-studies.html':    { crumbs: [{label:'Home',href:'index.html'}],                                         current: 'Case Studies' },
  'partners.html':        { crumbs: [{label:'Home',href:'index.html'}],                                         current: 'Partners & Clients' },
  'faqs.html':            { crumbs: [{label:'Home',href:'index.html'}],                                         current: 'FAQs' },
  'privacy.html':         { crumbs: [{label:'Home',href:'index.html'}],                                         current: 'Privacy Policy' },
  'terms.html':           { crumbs: [{label:'Home',href:'index.html'}],                                         current: 'Terms of Service' },
  '404.html':             { crumbs: [{label:'Home',href:'index.html'}],                                         current: '404 — Page Not Found' },

  // Services — Digital Marketing
  'service-digital-marketing-360.html': { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Digital Marketing',href:'services.html'}], current: '360° Digital Marketing' },
  'service-seo.html':               { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Digital Marketing',href:'services.html'}], current: 'SEO Services' },
  'service-ppc.html':               { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Digital Marketing',href:'services.html'}], current: 'PPC & Google Ads' },
  'service-smm.html':               { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Digital Marketing',href:'services.html'}], current: 'Social Media Marketing' },
  'service-email.html':             { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Digital Marketing',href:'services.html'}], current: 'Email Marketing' },
  'service-content-marketing.html': { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Digital Marketing',href:'services.html'}], current: 'Content Marketing' },
  'service-orm.html':               { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Digital Marketing',href:'services.html'}], current: 'ORM & Reputation' },
  'service-influencer-marketing.html': { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Digital Marketing',href:'services.html'}], current: 'Influencer Marketing' },

  // Services — Web & App Dev
  'service-web-dev.html':       { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Web & App Dev',href:'services.html'}], current: 'Website Development' },
  'service-app-dev.html':       { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Web & App Dev',href:'services.html'}], current: 'Mobile App Development' },
  'service-ecommerce.html':     { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Web & App Dev',href:'services.html'}], current: 'E-commerce Development' },
  'service-graphics-uiux.html': { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Web & App Dev',href:'services.html'}], current: 'UI/UX & Graphic Design' },
  'service-api-cms.html':       { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Web & App Dev',href:'services.html'}], current: 'API & CMS Integration' },
  'service-custom-software.html': { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Web & App Dev',href:'services.html'}], current: 'Custom Software Dev' },
  'service-pwa.html':           { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Web & App Dev',href:'services.html'}], current: 'PWA Development' },
  'service-saas.html':          { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'Web & App Dev',href:'services.html'}], current: 'SaaS Development' },

  // Services — IT & Technology
  'service-cloud.html':          { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'IT & Technology',href:'services.html'}], current: 'Cloud Solutions' },
  'service-devops.html':         { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'IT & Technology',href:'services.html'}], current: 'DevOps & CI/CD' },
  'service-security.html':       { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'IT & Technology',href:'services.html'}], current: 'Cyber Security' },
  'service-automation.html':     { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'IT & Technology',href:'services.html'}], current: 'AI & Automation' },
  'service-data-analytics.html': { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'IT & Technology',href:'services.html'}], current: 'Data Analytics & BI' },
  'service-machine-learning.html': { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'IT & Technology',href:'services.html'}], current: 'Machine Learning / AI' },
  'service-iot.html':            { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'IT & Technology',href:'services.html'}], current: 'IoT Solutions' },
  'service-blockchain.html':     { crumbs: [{label:'Home',href:'index.html'},{label:'Services',href:'services.html'},{label:'IT & Technology',href:'services.html'}], current: 'Blockchain Development' },

  // Solutions
  'solution-startups.html':      { crumbs: [{label:'Home',href:'index.html'},{label:'Solutions',href:'services.html'}], current: 'For Startups' },
  'solution-sme.html':           { crumbs: [{label:'Home',href:'index.html'},{label:'Solutions',href:'services.html'}], current: 'For SMEs' },
  'solution-enterprise.html':    { crumbs: [{label:'Home',href:'index.html'},{label:'Solutions',href:'services.html'}], current: 'Enterprise Solutions' },
  'solution-education.html':     { crumbs: [{label:'Home',href:'index.html'},{label:'Solutions',href:'services.html'}], current: 'Education / EdTech' },
  'solution-healthcare.html':    { crumbs: [{label:'Home',href:'index.html'},{label:'Solutions',href:'services.html'}], current: 'Healthcare Systems' },
  'solution-ecommerce.html':     { crumbs: [{label:'Home',href:'index.html'},{label:'Solutions',href:'services.html'}], current: 'Retail & E-commerce' },
  'solution-hospitality.html':   { crumbs: [{label:'Home',href:'index.html'},{label:'Solutions',href:'services.html'}], current: 'Hospitality & Travel' },
  'solution-finance.html':       { crumbs: [{label:'Home',href:'index.html'},{label:'Solutions',href:'services.html'}], current: 'Financial Services' },
  'solution-manufacturing.html': { crumbs: [{label:'Home',href:'index.html'},{label:'Solutions',href:'services.html'}], current: 'Manufacturing ERP' },
  'solution-realestate.html':    { crumbs: [{label:'Home',href:'index.html'},{label:'Solutions',href:'services.html'}], current: 'Real Estate Portals' },

  // Blogs
  'blog-post-cloud-migration.html':        { crumbs: [{label:'Home',href:'index.html'},{label:'Blog',href:'blog.html'}], current: 'Cloud Migration Guide' },
  'blog-post-detail-6.html':               { crumbs: [{label:'Home',href:'index.html'},{label:'Blog',href:'blog.html'}], current: 'Blog Post' },
  'blog-post-local-seo.html':              { crumbs: [{label:'Home',href:'index.html'},{label:'Blog',href:'blog.html'}], current: 'Local SEO Guide' },
  'blog-post-mobile-first.html':           { crumbs: [{label:'Home',href:'index.html'},{label:'Blog',href:'blog.html'}], current: 'Mobile-First Design' },
  'blog-post-native-vs-cross-platform.html': { crumbs: [{label:'Home',href:'index.html'},{label:'Blog',href:'blog.html'}], current: 'Native vs Cross-Platform' },
  'blog-post-pmax.html':                   { crumbs: [{label:'Home',href:'index.html'},{label:'Blog',href:'blog.html'}], current: 'Performance Max Ads' },
};

// ── Build the breadcrumb HTML snippet
function buildBreadcrumbHTML(crumbs, current) {
  const items = crumbs.map(c =>
    `<li><a href="${c.href}"><i class="fas fa-home me-1" style="font-size:0.7rem;"></i>${c.label}</a></li>
            <li><i class="fas fa-chevron-right"></i></li>`
  ).join('\n            ');

  return `\n        <!-- Breadcrumb Navigation -->
        <nav aria-label="breadcrumb" class="page-breadcrumb-nav" data-aos="fade-down">
            <ol class="page-breadcrumb">
                ${items}
                <li class="active" aria-current="page">${current}</li>
            </ol>
        </nav>\n`;
}

// ── Insertion anchors: look for these patterns right after the hero container opens
const HERO_CONTAINER_PATTERNS = [
  // After <!-- END_HEADER_COMPONENT --> and before the first <h1> inside hero
  /<div class="container[^"]*" [^>]*data-aos="fade-in"[^>]*>\s*\n/,
  /<div class="container position-relative"[^>]*>\s*\n/,
  /<div class="container[^"]*" style="z-index: 2;"[^>]*>\s*\n/,
  // For service detail heros - after col-lg-7 text-center div opens
  /(<div class="col-lg-7 text-center text-lg-start">)\s*\n/,
  // Fallback: after END_HEADER comment, before first badge span
  /(<span class="badge[^>]+>)(.*?<\/span>)/,
];

let updated = 0;
let skipped = 0;

for (const [filename, bc] of Object.entries(breadcrumbMap)) {
  const filePath = path.join(htmlDir, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Not found: html/${filename}`);
    skipped++;
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Skip if breadcrumb already injected
  if (html.includes('page-breadcrumb-nav') || html.includes('contact-breadcrumb')) {
    console.log(`ℹ️  Already has breadcrumb: html/${filename}`);
    skipped++;
    continue;
  }

  const crumbHTML = buildBreadcrumbHTML(bc.crumbs, bc.current);

  // Strategy 1: inject after END_HEADER_COMPONENT, before the first <h1> tag inside a section
  // Find the hero section's first <h1> and prepend breadcrumb before it
  const h1Match = html.match(/<\/header>\s*\n(?:[\s\S]*?)([ \t]*)<h1[\s\S]{0,200}/);
  
  if (h1Match) {
    const h1Index = html.indexOf(h1Match[0]);
    const insideH1 = html.indexOf('<h1', h1Index);
    if (insideH1 !== -1) {
      const indent = h1Match[1] || '            ';
      const breadcrumbBlock = crumbHTML.replace(/        /g, indent);
      html = html.slice(0, insideH1) + breadcrumbBlock + html.slice(insideH1);
      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`✅ Updated: html/${filename}`);
      updated++;
      continue;
    }
  }

  console.log(`⚠️  Could not find insertion point: html/${filename}`);
  skipped++;
}

console.log(`\n🎉 Done! Breadcrumbs added to ${updated} pages. Skipped: ${skipped}.\n`);
