/**
 * Update all social media links across the site
 */
const fs = require('fs');
const path = require('path');

const root = process.cwd();
let updated = 0;

function walk(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        
        if (file.isDirectory()) {
            walk(fullPath);
        } else if (file.name.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const original = content;
            
            // Update LinkedIn links
            content = content.replace(
                /href="https?:\/\/#"/g,
                'href="https://www.linkedin.com/company/pabitra-technology/"'
            );
            
            // Update Twitter links  
            content = content.replace(
                /href="https?:\/\/#"\s+class="[^"]*\btwitter\b/g,
                (match) => match.replace(/#"/, 'x.com/PabitraTech2025"')
            );
            content = content.replace(
                /href="#"\s+aria-label="Twitter"/g,
                'href="https://x.com/PabitraTech2025" aria-label="Twitter"'
            );
            
            // Update YouTube links
            content = content.replace(
                /href="https:\/\/www\.youtube\.com\/"/g,
                'href="https://www.youtube.com/@PabitraTechnology"'
            );
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`✅ Updated: ${path.relative(root, fullPath)}`);
                updated++;
            }
        }
    }
}

walk(root);
console.log(`\n🎉 Updated ${updated} HTML files with new social media links.`);
