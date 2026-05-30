const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const fileMap = {
  '404.html': '/',
  'about-awards.html': '/about/awards/',
  'about-story.html': '/about/story/',
  'about-team.html': '/about/team/',
  'about-values.html': '/about/values/',
  'about.html': '/about/',
  'blog-post-ai-content-strategy.html': '/blog/ai-content-strategy/',
  'blog-post-ai-ecommerce.html': '/blog/ai-ecommerce/',
  'blog-post-cloud-migration.html': '/blog/cloud-migration/',
  'blog-post-detail-6.html': '/blog/detail-6/',
  'blog-post-digital-marketing-audit.html': '/blog/digital-marketing-audit/',
  'blog-post-edge-computing.html': '/blog/edge-computing/',
  'blog-post-google-core-update.html': '/blog/google-core-update/',
  'blog-post-local-seo.html': '/blog/local-seo/',
  'blog-post-mobile-first.html': '/blog/mobile-first/',
  'blog-post-native-vs-cross-platform.html': '/blog/native-vs-cross-platform/',
  'blog-post-pagespeed-optimization.html': '/blog/pagespeed-optimization/',
  'blog-post-pmax.html': '/blog/pmax/',
  'blog-post-social-commerce-india.html': '/blog/social-commerce-india/',
  'blog-post-video-marketing.html': '/blog/video-marketing/',
  'blog-post-web3-india.html': '/blog/web3-india/',
  'blog-post-whatsapp-marketing.html': '/blog/whatsapp-marketing/',
  'blog.html': '/blog/',
  'careers.html': '/careers/',
  'case-studies.html': '/case-studies/',
  'contact.html': '/contact/',
  'faqs.html': '/faqs/',
  'index.html': '/',
  'new.html': '/news/',
  'partners.html': '/partners/',
  'portfolio.html': '/portfolio/',
  'privacy.html': '/privacy/',
  'service-api-cms.html': '/services/api-cms/',
  'service-app-dev.html': '/services/app-dev/',
  'service-automation.html': '/services/automation/',
  'service-blockchain.html': '/services/blockchain/',
  'service-cloud.html': '/services/cloud/',
  'service-content-marketing.html': '/services/content-marketing/',
  'service-custom-software.html': '/services/custom-software/',
  'service-data-analytics.html': '/services/data-analytics/',
  'service-devops.html': '/services/devops/',
  'service-digital-marketing-360.html': '/services/digital-marketing-360/',
  'service-ecommerce.html': '/services/ecommerce/',
  'service-email.html': '/services/email/',
  'service-graphics-uiux.html': '/services/graphics-uiux/',
  'service-influencer-marketing.html': '/services/influencer-marketing/',
  'service-iot.html': '/services/iot/',
  'service-machine-learning.html': '/services/machine-learning/',
  'service-orm.html': '/services/orm/',
  'service-ppc.html': '/services/ppc/',
  'service-pwa.html': '/services/pwa/',
  'service-saas.html': '/services/saas/',
  'service-security.html': '/services/security/',
  'service-seo.html': '/services/seo/',
  'service-smm.html': '/services/smm/',
  'service-web-dev.html': '/services/web-dev/',
  'services.html': '/services/',
  'solution-ecommerce.html': '/solutions/ecommerce/',
  'solution-education.html': '/solutions/education/',
  'solution-enterprise.html': '/solutions/enterprise/',
  'solution-finance.html': '/solutions/finance/',
  'solution-healthcare.html': '/solutions/healthcare/',
  'solution-hospitality.html': '/solutions/hospitality/',
  'solution-manufacturing.html': '/solutions/manufacturing/',
  'solution-realestate.html': '/solutions/realestate/',
  'solution-sme.html': '/solutions/sme/',
  'solution-startups.html': '/solutions/startups/',
  'terms.html': '/terms/'
};

function getHtmlFiles(dir, blacklist = []) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (blacklist.includes(entry.name)) continue;
      results = results.concat(getHtmlFiles(fullPath, blacklist));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const allHtmlFiles = getHtmlFiles(workspaceRoot, ['CSS', 'JS', 'images', 'node_modules']);
const replacements = [
  { re: /href=(['"])(?:\.\.\/)+CSS\//g, rep: 'href=$1/CSS/' },
  { re: /href=(['"])(?:\.\.\/)+JS\//g, rep: 'href=$1/JS/' },
  { re: /src=(['"])(?:\.\.\/)+JS\//g, rep: 'src=$1/JS/' },
  { re: /src=(['"])(?:\.\.\/)+images\//g, rep: 'src=$1/images/' },
  { re: /href=(['"])(?:\.\.\/)+images\//g, rep: 'href=$1/images/' },
  { re: /href=(['"])(?:\.\.\/)+fonts\//g, rep: 'href=$1/fonts/' },
  { re: /<link rel="icon" href="(?:\.\.\/)+images\//g, rep: '<link rel="icon" href="/images/' },
  { re: /Asset paths assume page is inside \/html\/ folder\./g, rep: '' },
  { re: /content="0; url=html\/index\.html"/g, rep: 'content="0; url=/"' },
  { re: /window\.location\.href\s*=\s*"html\/index\.html"/g, rep: 'window.location.href = "/"' }
];

function normalizeLink(target) {
  if (target === '/') return '/';
  if (target.endsWith('/')) return target;
  return `${target}/`;
}

function createLinkRegex(oldFile) {
  const escaped = oldFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(href|src)=(['\"])(${escaped}|html\/${escaped})(['\"])`, 'g');
}

console.log(`🔧 Fixing asset references in ${allHtmlFiles.length} HTML files...`);
let count = 0;
for (const filePath of allHtmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = content;

  for (const { re, rep } of replacements) {
    updated = updated.replace(re, rep);
  }

  for (const [oldFile, targetUrl] of Object.entries(fileMap)) {
    const regex = createLinkRegex(oldFile);
    updated = updated.replace(regex, (match, attr, quote, ref, closingQuote) => {
      return `${attr}=${quote}${normalizeLink(targetUrl)}${closingQuote}`;
    });
  }

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✅ Fixed ${path.relative(workspaceRoot, filePath)}`);
    count++;
  }
}

console.log(`\n🎉 Done. Updated ${count} files.`);
