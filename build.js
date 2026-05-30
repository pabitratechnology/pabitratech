/**
 * PABITRA TECHNOLOGY — STATIC COMPONENT BUILDER
 * 
 * This script automates the injection of header.html and footer.html
 * components directly into all HTML pages in the /html/ directory.
 * 
 * Why?
 * 1. Solves CORS browser block when opening pages locally (via file:// protocol).
 * 2. Delivers instant load times & maximum SEO performance.
 * 3. Keeps your source modular (edit components once, run script to update all pages).
 */

const fs = require('fs');
const path = require('path');

const HTML_DIR = path.join(__dirname, 'html');
const HEADER_PATH = path.join(__dirname, 'components', 'header.html');
const FOOTER_PATH = path.join(__dirname, 'components', 'footer.html');

// Read templates
if (!fs.existsSync(HEADER_PATH) || !fs.existsSync(FOOTER_PATH)) {
    console.error('Error: header.html or footer.html not found in /components/ directory.');
    process.exit(1);
}

const headerContent = fs.readFileSync(HEADER_PATH, 'utf8');
const footerContent = fs.readFileSync(FOOTER_PATH, 'utf8');

// Define insertion templates
const HEADER_START = '<!-- START_HEADER_COMPONENT -->';
const HEADER_END = '<!-- END_HEADER_COMPONENT -->';
const FOOTER_START = '<!-- START_FOOTER_COMPONENT -->';
const FOOTER_END = '<!-- END_FOOTER_COMPONENT -->';

const headerReplacement = `${HEADER_START}\n${headerContent}\n${HEADER_END}`;
const footerReplacement = `${FOOTER_START}\n${footerContent}\n${FOOTER_END}`;

// Find all HTML files recursively in the html/ folder
function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

if (!fs.existsSync(HTML_DIR)) {
    console.error('Error: html/ directory not found.');
    process.exit(1);
}

const htmlFiles = getHtmlFiles(HTML_DIR);
console.log(`\n🚀 Starting static component injection for ${htmlFiles.length} pages...`);

let updatedCount = 0;

htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // --- Clean redundant old hardcoded headers ---
    const oldHeaderRegex = /<header class="header-sticky[\s\S]*?<\/header>/gi;
    if (oldHeaderRegex.test(content)) {
        content = content.replace(oldHeaderRegex, '');
    }

    // --- Clean redundant old hardcoded footers ---
    const oldFooterRegex = /<footer class="footer-section[\s\S]*?<\/footer>/gi;
    if (oldFooterRegex.test(content)) {
        content = content.replace(oldFooterRegex, '');
    }

    // --- Inject Header ---
    // Match placeholder or already injected component
    const headerRegex = new RegExp(`${HEADER_START}[\\s\\S]*?${HEADER_END}`, 'g');
    const headerPlaceholder = '<div id="site-header-placeholder"></div>';

    if (content.includes(headerPlaceholder)) {
        content = content.replace(headerPlaceholder, headerReplacement);
    } else if (headerRegex.test(content)) {
        content = content.replace(headerRegex, headerReplacement);
    } else {
        // If neither exists, let's inject it right after Google Tag Manager body or at the start of <body>
        const bodyTag = '<body>';
        if (content.includes(bodyTag)) {
            content = content.replace(bodyTag, `${bodyTag}\n${headerReplacement}`);
        }
    }

    // --- Inject Footer ---
    const footerRegex = new RegExp(`${FOOTER_START}[\\s\\S]*?${FOOTER_END}`, 'g');
    const footerPlaceholder = '<div id="site-footer-placeholder"></div>';

    if (content.includes(footerPlaceholder)) {
        content = content.replace(footerPlaceholder, footerReplacement);
    } else if (footerRegex.test(content)) {
        content = content.replace(footerRegex, footerReplacement);
    } else {
        // If neither exists, inject it before </body>
        const bodyCloseTag = '</body>';
        if (content.includes(bodyCloseTag)) {
            content = content.replace(bodyCloseTag, `${footerReplacement}\n${bodyCloseTag}`);
        }
    }

    // --- Ensure Components CSS is linked ---
    if (!/CSS\/components\.css/i.test(content)) {
        content = content.replace('</head>', '    <link rel="stylesheet" href="../CSS/components.css">\n</head>');
    }

    // --- Ensure Components JS is loaded ---
    if (!/JS\/components\.js/i.test(content)) {
        content = content.replace('</body>', '    <script src="../JS/components.js"></script>\n</body>');
    }

    // Write file back if changes were made
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${path.relative(__dirname, filePath)}`);
        updatedCount++;
    } else {
        console.log(`ℹ️ No changes needed: ${path.relative(__dirname, filePath)}`);
    }
});

console.log(`\n🎉 Completed! Successfully injected components into ${updatedCount} pages.`);
