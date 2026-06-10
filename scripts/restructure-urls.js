const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const htmlDir = path.join(workspaceRoot, 'html');

const fileMap = {
  '404.html': '404.html',
  'about-awards.html': 'about/awards/index.html',
  'about-story.html': 'about/story/index.html',
  'about-team.html': 'about/team/index.html',
  'about-values.html': 'about/values/index.html',
  'about.html': 'about/index.html',
  'blog-post-ai-content-strategy.html': 'blog/ai-content-strategy/index.html',
  'blog-post-ai-ecommerce.html': 'blog/ai-ecommerce/index.html',
  'blog-post-cloud-migration.html': 'blog/cloud-migration/index.html',
  'blog-post-detail-6.html': 'blog/detail-6/index.html',
  'blog-post-digital-marketing-audit.html': 'blog/digital-marketing-audit/index.html',
  'blog-post-edge-computing.html': 'blog/edge-computing/index.html',
  'blog-post-google-core-update.html': 'blog/google-core-update/index.html',
  'blog-post-local-seo.html': 'blog/local-seo/index.html',
  'blog-post-mobile-first.html': 'blog/mobile-first/index.html',
  'blog-post-native-vs-cross-platform.html': 'blog/native-vs-cross-platform/index.html',
  'blog-post-pagespeed-optimization.html': 'blog/pagespeed-optimization/index.html',
  'blog-post-pmax.html': 'blog/pmax/index.html',
  'blog-post-social-commerce-india.html': 'blog/social-commerce-india/index.html',
  'blog-post-video-marketing.html': 'blog/video-marketing/index.html',
  'blog-post-web3-india.html': 'blog/web3-india/index.html',
  'blog-post-whatsapp-marketing.html': 'blog/whatsapp-marketing/index.html',
  'blog.html': 'blog/index.html',
  'careers.html': 'careers/index.html',
  'case-studies.html': 'case-studies/index.html',
  'contact.html': 'contact/index.html',
  'faqs.html': 'faqs/index.html',
  'index.html': 'index.html',
  'new.html': 'news/index.html',
  'partners.html': 'partners/index.html',
  'portfolio.html': 'portfolio/index.html',
  'privacy.html': 'privacy/index.html',
  'service-api-cms.html': 'services/api-cms/index.html',
  'service-app-dev.html': 'services/app-dev/index.html',
  'service-automation.html': 'services/automation/index.html',
  'service-blockchain.html': 'services/blockchain/index.html',
  'service-cloud.html': 'services/cloud/index.html',
  'service-content-marketing.html': 'services/content-marketing/index.html',
  'service-custom-software.html': 'services/custom-software/index.html',
  'service-data-analytics.html': 'services/data-analytics/index.html',
  'service-devops.html': 'services/devops/index.html',
  'service-digital-marketing-360.html': 'services/digital-marketing-360/index.html',
  'service-ecommerce.html': 'services/ecommerce/index.html',
  'service-email.html': 'services/email/index.html',
  'service-graphics-uiux.html': 'services/graphics-uiux/index.html',
  'service-influencer-marketing.html': 'services/influencer-marketing/index.html',
  'service-iot.html': 'services/iot/index.html',
  'service-machine-learning.html': 'services/machine-learning/index.html',
  'service-orm.html': 'services/orm/index.html',
  'service-ppc.html': 'services/ppc/index.html',
  'service-pwa.html': 'services/pwa/index.html',
  'service-saas.html': 'services/saas/index.html',
  'service-security.html': 'services/security/index.html',
  'service-seo.html': 'services/seo/index.html',
  'service-smm.html': 'services/smm/index.html',
  'service-web-dev.html': 'services/web-dev/index.html',
  'services.html': 'services/index.html',
  'solution-ecommerce.html': 'solutions/ecommerce/index.html',
  'solution-education.html': 'solutions/education/index.html',
  'solution-enterprise.html': 'solutions/enterprise/index.html',
  'solution-finance.html': 'solutions/finance/index.html',
  'solution-healthcare.html': 'solutions/healthcare/index.html',
  'solution-hospitality.html': 'solutions/hospitality/index.html',
  'solution-manufacturing.html': 'solutions/manufacturing/index.html',
  'solution-realestate.html': 'solutions/realestate/index.html',
  'solution-sme.html': 'solutions/sme/index.html',
  'solution-startups.html': 'solutions/startups/index.html',
  'terms.html': 'terms/index.html'
};

function slugToUrl(targetFile) {
  if (targetFile === 'index.html') return '/';
  if (targetFile.endsWith('/index.html')) return '/' + targetFile.slice(0, -'index.html'.length);
  return '/' + targetFile;
}

function ensureDir(filename) {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
}

function getFiles(dir, blacklist=[]) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (blacklist.includes(entry.name)) continue;
      results = results.concat(getFiles(fullPath, blacklist));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

console.log('📦 Moving pages from html/ to clean root directories...');
for (const [oldName, newRelative] of Object.entries(fileMap)) {
  const oldPath = path.join(htmlDir, oldName);
  const newPath = path.join(workspaceRoot, newRelative);

  if (!fs.existsSync(oldPath)) {
    console.warn(`⚠️  Source missing: ${oldName}`);
    continue;
  }

  ensureDir(newPath);
  fs.copyFileSync(oldPath, newPath);
  console.log(`✅ Copied ${oldName} -> ${path.relative(workspaceRoot, newPath)}`);
}

const allPageFiles = getFiles(workspaceRoot, ['components', 'CSS', 'JS', 'images', 'node_modules', 'scripts']);
const linkMap = {};
for (const [oldName, newRelative] of Object.entries(fileMap)) {
  const newUrl = slugToUrl(newRelative);
  linkMap[oldName] = newUrl;
  linkMap[`html/${oldName}`] = newUrl;
}

function replaceAll(text, find, replace) {
  return text.split(find).join(replace);
}

console.log('\n🔗 Rewriting links in HTML files...');
for (const filePath of allPageFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = content;

  // Replace old file links to new folder-based URLs
  for (const [oldRef, newUrl] of Object.entries(linkMap)) {
    const escaped = escapeRegExp(oldRef);
    const regex = new RegExp(`(href|src)=(\\"|\\')(${escaped})(#.*?)?\\2`, 'g');
    updated = updated.replace(regex, (_, attr, quote, ref, hash='') => `${attr}=${quote}${newUrl}${hash}${quote}`);
  }

  // Fix canonical / open graph / JSON-LD URL values with html/ prefix
  updated = updated.replace(/https:\/\/pabitratechnology\.com\/html\//g, 'https://pabitratechnology.com/');
  updated = updated.replace(/content=\\"0; url=html\/index\.html\\"/g, 'content="0; url=/"');
  updated = updated.replace(/window\.location\.href\s*=\s*\"html\/index\.html\"/g, 'window.location.href = "/"');

  // Normalize asset references to root paths so nested pages work reliably
  updated = updated.replace(/(href|src)=(\\"|\\')\.\.+\/CSS\//g, '$1=$2/CSS/');
  updated = updated.replace(/(href|src)=(\\"|\\')\.\.+\/JS\//g, '$1=$2/JS/');
  updated = updated.replace(/(src)=(\\"|\\')\.\.+\/images\//g, '$1=$2/images/');

  // Update canonical tag to point to the correct new clean URL path
  const relativePath = path.relative(workspaceRoot, filePath).replace(/\\/g, '/');
  const mapEntry = Object.entries(fileMap).find(([oldName, newRelative]) => newRelative === relativePath);
  if (mapEntry) {
    const [oldName, newRelative] = mapEntry;
    const newUrl = slugToUrl(newRelative);
    const correctCanonical = `https://pabitratechnology.com${newUrl}`;
    
    if (updated.match(/<link[^>]*?rel=["']canonical["'][^>]*?>/gi)) {
      updated = updated.replace(/<link[^>]*?rel=["']canonical["'][^>]*?>/gi, `<link rel="canonical" href="${correctCanonical}">`);
    } else {
      const headEndIdx = updated.search(/<\/head>/i);
      if (headEndIdx !== -1) {
        updated = updated.substring(0, headEndIdx) + `    <link rel="canonical" href="${correctCanonical}">\n` + updated.substring(headEndIdx);
      }
    }
  }

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✅ Updated links and canonical in ${path.relative(workspaceRoot, filePath)}`);
  }
}

console.log('\n🔄 Generating SEO redirect pages for old flat HTML URLs...');
let redirectsCount = 0;
for (const [oldName, newRelative] of Object.entries(fileMap)) {
  // Skip pages that are still served at their original location
  if (oldName === '404.html' || oldName === 'index.html') {
    continue;
  }

  const newUrl = slugToUrl(newRelative);
  const targetRedirectUrl = `https://pabitratechnology.com${newUrl}`;
  const redirectFilePath = path.join(workspaceRoot, oldName);

  const redirectHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=${targetRedirectUrl}">
    <link rel="canonical" href="${targetRedirectUrl}">
    <title>Page Redirecting...</title>
    <script type="text/javascript">
        window.location.href = "${targetRedirectUrl}";
    </script>
</head>
<body>
    <p>This page has moved. If you are not redirected automatically, please <a href="${targetRedirectUrl}">click here</a>.</p>
</body>
</html>
`;

  fs.writeFileSync(redirectFilePath, redirectHtmlContent, 'utf8');
  redirectsCount++;
}
console.log(`✅ Successfully generated ${redirectsCount} SEO redirect pages.`);

console.log('\n🎉 Refactor complete. Review the new root folders and test the URLs.');

