/**
 * Complete social media link update - more thorough version
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
            
            // Replace LinkedIn placeholder with actual link
            content = content.replace(
                /href="#"\s+class="tb-social linkedin"/g,
                'href="https://www.linkedin.com/company/pabitra-technology/" class="tb-social linkedin"'
            );
            content = content.replace(
                /href="#"\s+class="footer-social-icon linkedin"/g,
                'href="https://www.linkedin.com/company/pabitra-technology/" class="footer-social-icon linkedin"'
            );
            
            // Replace Twitter placeholder with actual link
            content = content.replace(
                /href="#"\s+class="tb-social twitter"/g,
                'href="https://x.com/PabitraTech2025" class="tb-social twitter"'
            );
            content = content.replace(
                /href="#"\s+class="footer-social-icon twitter"/g,
                'href="https://x.com/PabitraTech2025" class="footer-social-icon twitter"'
            );
            
            // Replace YouTube link
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
console.log(`\n✨ Final pass: Updated ${updated} HTML files with social media links.`);
