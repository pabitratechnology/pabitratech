const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const htmlDir = path.join(rootDir, 'html');

// Recursive HTML finder
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

// Custom SEO mappings for core pages
const customSEO = {
    'index.html': {
        title: 'Pabitra Technology | Leading IT Services & Digital Marketing Agency in Bhubaneswar',
        description: "Pabitra Technology is Bhubaneswar's premier IT services, web development, and digital marketing agency. We build modern websites, scale apps, and grow brands with advanced SEO & PPC.",
        keywords: 'IT services Bhubaneswar, digital marketing agency, website development Odisha, SEO company Bhubaneswar, mobile app development, Pabitra Technology, IT solutions India'
    },
    'blog.html': {
        title: 'Latest Tech & Marketing Insights | Pabitra Technology Blog',
        description: 'Explore expert articles, tips, and trends in digital marketing, SEO, web design, cloud migration, and custom software from the engineering team at Pabitra Technology.',
        keywords: 'Pabitra Technology blog, tech trends, digital marketing insights, web development tips, SEO strategies 2026, software engineering blog'
    },
    'portfolio.html': {
        title: 'Our Work & Case Studies Portfolio | Pabitra Technology',
        description: 'Browse our portfolio of custom software, high-converting websites, mobile apps, and successful 360° digital marketing campaigns delivered globally and in Odisha.',
        keywords: 'Pabitra Technology portfolio, web development projects, client case studies, custom software portfolio, digital marketing success stories'
    },
    'contact.html': {
        title: 'Contact Us for Free Website Audit & IT Consultation | Pabitra Technology',
        description: 'Get in touch with Pabitra Technology in Bhubaneswar, Odisha. Schedule a free website performance audit, SEO consultation, or start your custom IT project today.',
        keywords: 'contact Pabitra Technology, hire developers Bhubaneswar, free website audit, IT consultation Odisha, SEO audit request'
    },
    'careers.html': {
        title: 'Join Our Team: Careers & Jobs in Bhubaneswar | Pabitra Technology',
        description: 'Start your career with Pabitra Technology. Explore active job openings for web developers, SEO specialists, UI/UX designers, and project managers in Bhubaneswar.',
        keywords: 'Pabitra Technology careers, IT jobs Bhubaneswar, hire web developers Odisha, digital marketing vacancies, software engineer jobs'
    },
    'about.html': {
        title: 'About Our Team & Vision | Pabitra Technology Bhubaneswar',
        description: "Learn about Pabitra Technology's journey, team of certified experts, awards, and core mission. We are Odisha's most trusted partner for premium digital solutions.",
        keywords: 'Pabitra Technology story, digital agency team Bhubaneswar, IT company Odisha, mission and values, IT awards recognition'
    },
    'about-story.html': {
        title: 'Our Story & Journey | Pabitra Technology Bhubaneswar',
        description: 'Discover how Pabitra Technology grew from a local startup to Bhubaneswar’s leading IT services and digital marketing partner for global businesses.',
        keywords: 'Pabitra Technology story, IT startup Bhubaneswar, company growth timeline, digital agency history'
    },
    'about-team.html': {
        title: 'Meet Our Expert IT & Marketing Team | Pabitra Technology',
        description: 'Get to know our certified engineers, creative UI/UX designers, and high-performance digital marketing strategists driving success at Pabitra Technology.',
        keywords: 'Pabitra Technology team, software developers Bhubaneswar, SEO specialists Odisha, company leadership, IT experts'
    },
    'about-values.html': {
        title: 'Mission, Vision & Core Values | Pabitra Technology',
        description: 'Explore the core values of integrity, technical excellence, and client-first commitment that guide our team at Pabitra Technology every single day.',
        keywords: 'company core values, mission statement, business ethics, customer satisfaction commitment'
    },
    'about-awards.html': {
        title: 'Awards, Certifications & Recognition | Pabitra Technology',
        description: 'Pabitra Technology is an ISO 9001:2015 certified company and recognized partner. View our awards and corporate milestones of excellence.',
        keywords: 'ISO certification, business awards, Google Partner badge, corporate recognition, milestones'
    },
    'services.html': {
        title: '30+ Corporate IT & Digital Marketing Services | Pabitra Technology',
        description: 'Comprehensive suite of custom web & mobile development, 360° digital marketing, cloud hosting, DevSecOps, cyber security, and AI solutions from Pabitra Technology.',
        keywords: 'IT services suite, digital marketing packages, cloud solutions company, custom software development services, Pabitra Technology services'
    },
    'faqs.html': {
        title: 'Frequently Asked Questions & Support | Pabitra Technology',
        description: 'Have questions about website design, digital marketing costs, or custom software timelines? Read our comprehensive FAQ list for quick answers.',
        keywords: 'Pabitra Technology FAQ, website design costs, digital marketing support, custom software timeline, IT consulting help'
    },
    'privacy.html': {
        title: 'Privacy Policy & Data Security Standards | Pabitra Technology',
        description: 'Learn how Pabitra Technology protects your personal data, secures enterprise information, and complies with modern global privacy regulations.',
        keywords: 'privacy policy, data protection, security standards, GDPR compliance, terms of data use'
    },
    'terms.html': {
        title: 'Terms of Service & Engagement Guidelines | Pabitra Technology',
        description: 'Read our terms of service and project engagement guidelines for custom software development, digital marketing campaigns, and cloud hosting SLA.',
        keywords: 'terms of service, legal terms, project agreement, service level agreement, user guidelines'
    },
    'partners.html': {
        title: 'Our Partners, Clients & Affiliations | Pabitra Technology',
        description: 'Explore the network of industry leaders, global enterprise clients, and specialized technical affiliations that partner with Pabitra Technology.',
        keywords: 'corporate partners, client list, technology affiliations, business collaborations, trust badges'
    },
    'case-studies.html': {
        title: 'Case Studies: Real Growth & Traffic Success | Pabitra Technology',
        description: 'Detailed analysis of our successful website launches, organic traffic growth, custom ERP systems, and massive ROI delivered to our enterprise partners.',
        keywords: 'business case studies, web development success, SEO traffic growth, custom ERP implementation, conversion rate optimization study'
    }
};

// Custom SEO mappings for recently created technical blog posts
const customBlogs = {
    'blog-post-cloud-migration.html': {
        title: 'Enterprise Cloud Migration Checklist for Odisha Businesses | Pabitra Technology',
        description: 'A complete, step-by-step enterprise cloud migration checklist for businesses in Odisha. Plan a secure, efficient, and cost-effective transition to AWS, Azure, or GCP.',
        keywords: 'cloud migration checklist, AWS migration Odisha, business cloud strategy, cloud computing Bhubaneswar, enterprise database migration, cloud security transition'
    },
    'blog-post-pagespeed-optimization.html': {
        title: 'Website Speed Optimization Guide: 100/100 Google PageSpeed Score | Pabitra Technology',
        description: 'Uncover the elite technical strategies to optimize Core Web Vitals (LCP, INP, CLS) and achieve a perfect 100/100 score on Google PageSpeed Insights in 2026.',
        keywords: 'PageSpeed Insights 100/100, website speed optimization, Core Web Vitals audit, LCP optimization, reduce interaction to next paint, visual shift stability'
    },
    'blog-post-social-commerce-india.html': {
        title: 'Social Commerce in India: Sell on Instagram & WhatsApp | Pabitra Technology',
        description: 'A comprehensive guide to scaling social commerce storefronts on Instagram, WhatsApp, and Facebook for Indian D2C brands in 2026. Learn setup, UPI, and DM automations.',
        keywords: 'social commerce India, sell on WhatsApp, Instagram shopping catalog, Meta Commerce Manager, UPI chat payments, D2C sales Odisha'
    },
    'blog-post-ai-content-strategy.html': {
        title: 'Generative AI Content Strategy: Safe SEO for ChatGPT & Gemini | Pabitra Technology',
        description: 'How to build a high-performance generative AI content strategy without search engine penalties. Integrate ChatGPT and Google Gemini into your SEO workflow safely.',
        keywords: 'generative AI SEO, ChatGPT content strategy, Google Gemini SEO, search engine helpful content, AI blog automation, AI editorial workflow'
    },
    'blog-post-digital-marketing-audit.html': {
        title: 'Step-by-Step Digital Marketing Audit to Maximize ROI | Pabitra Technology',
        description: 'A rigorous, agency-grade digital marketing audit guide to evaluate your search campaigns, paid social channels, conversion tracking (GA4), and landing pages.',
        keywords: 'digital marketing audit, Google Ads audit checklist, GA4 conversion tracking audit, paid social ROI, content library audit, conversion rate marketing'
    },
    'blog-post-google-core-update.html': {
        title: '2026 Google Core Update Survival & Recovery Guide | Pabitra Technology',
        description: 'Step-by-step strategy to protect your traffic and recover search rankings from Google Core Updates. Master EEAT criteria, helpful content guidelines, and crawl audits.',
        keywords: 'Google Core Update 2026, search ranking recovery, EEAT SEO checklist, Google helpful content system, crawl error audit, brand authority build'
    }
};

// High-fidelity dynamic SEO generator
function getSEO(filename, currentTitle, currentDesc) {
    const name = path.basename(filename);
    const cleanNameWithoutExt = path.basename(filename, '.html');

    // Match exact custom map
    if (customSEO[name]) return customSEO[name];
    if (customBlogs[name]) return customBlogs[name];

    // Fallback dynamic definitions
    // 1. Service Pages
    if (cleanNameWithoutExt.startsWith('service-')) {
        let serviceName = cleanNameWithoutExt.replace('service-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (serviceName === 'Web Dev') serviceName = 'Web Development';
        if (serviceName === 'App Dev') serviceName = 'Mobile App Development';
        if (serviceName === 'Ppc') serviceName = 'PPC Advertising';
        if (serviceName === 'Smm') serviceName = 'Social Media Marketing';
        if (serviceName === 'Orm') serviceName = 'Online Reputation Management (ORM)';
        if (serviceName === 'Uiux') serviceName = 'UI/UX Design';
        if (serviceName === 'Pwa') serviceName = 'Progressive Web App (PWA)';
        if (serviceName === 'Saas') serviceName = 'SaaS Development';
        
        return {
            title: `${serviceName} Services in Bhubaneswar, Odisha | Pabitra Technology`,
            description: `Premium ${serviceName} solutions by Pabitra Technology. We design, build, and optimize high-performance corporate platforms to grow your brand globally and locally.`,
            keywords: `${serviceName} services, hire ${serviceName} developers, ${cleanNameWithoutExt.replace('service-', '').replace(/-/g, ' ')} company Bhubaneswar, corporate IT solutions, digital marketing Odisha, tech partner Bhubaneswar`
        };
    }
    
    // 2. Solution Pages
    if (cleanNameWithoutExt.startsWith('solution-')) {
        let solutionName = cleanNameWithoutExt.replace('solution-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return {
            title: `Custom IT & Software Solutions for ${solutionName} Industry | Pabitra Technology`,
            description: `Custom web development, mobile apps, and 360° digital marketing systems engineered specifically for the ${solutionName} industry to streamline and scale operations.`,
            keywords: `${solutionName} software, custom ${solutionName} platform, industrial IT solutions Bhubaneswar, business automation Odisha, digital transformation, enterprise systems`
        };
    }
    
    // 3. Blog Posts
    if (cleanNameWithoutExt.startsWith('blog-post-')) {
        let postTitle = cleanNameWithoutExt.replace('blog-post-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (currentTitle) {
            postTitle = currentTitle.split('|')[0].split('—')[0].trim();
        }
        let desc = currentDesc || `Read our expert guide on ${postTitle}. The Pabitra Technology engineering team delivers in-depth strategies and technical checksheets in 2026.`;
        return {
            title: `${postTitle} | Pabitra Technology Blog`,
            description: desc.substring(0, 160),
            keywords: `${postTitle.toLowerCase()}, pabitra technology blog, digital strategy, technical guide, modern web insights, software scaling tips`
        };
    }

    // Generic fallbacks
    let cleanTitleName = cleanNameWithoutExt.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    if (currentTitle) cleanTitleName = currentTitle.split('|')[0].trim();

    return {
        title: `${cleanTitleName} | Pabitra Technology Bhubaneswar`,
        description: currentDesc || `Premium IT services, web development, and digital marketing services from Pabitra Technology in Bhubaneswar, Odisha. Certified experts driving global success.`,
        keywords: `${cleanTitleName.toLowerCase()}, pabitra technology, IT solutions Bhubaneswar, web development company, digital transformation agency`
    };
}

// Locate all HTML files
const htmlFiles = getHtmlFiles(htmlDir);
const rootIndex = path.join(rootDir, 'index.html');
if (fs.existsSync(rootIndex)) {
    htmlFiles.push(rootIndex);
}

console.log(`Discovered ${htmlFiles.length} HTML files to modernize...`);

let updatedCount = 0;

htmlFiles.forEach(filePath => {
    const filename = path.basename(filePath);
    let relativeUrlPath = '';
    
    if (filePath === rootIndex) {
        relativeUrlPath = ''; // Root canonical is just domain
    } else {
        relativeUrlPath = `html/${filename}`;
    }

    const canonicalUrl = `https://pabitratechnology.com/${relativeUrlPath}`;
    
    let fileContent = fs.readFileSync(filePath, 'utf8');
    
    const headStartIdx = fileContent.search(/<head>/i);
    const headEndIdx = fileContent.search(/<\/head>/i);
    
    if (headStartIdx !== -1 && headEndIdx !== -1) {
        const headTagLength = fileContent.match(/<head>/i)[0].length;
        let headContent = fileContent.substring(headStartIdx + headTagLength, headEndIdx);
        
        // Extract current title & description to keep fallback context clean
        const titleMatch = headContent.match(/<title>([\s\S]*?)<\/title>/i);
        const descMatch = headContent.match(/<meta[^>]*?name=["']description["'][^>]*?content=["']([\s\S]*?)["']/i) 
                      || headContent.match(/<meta[^>]*?content=["']([\s\S]*?)["'][^>]*?name=["']description["']/i);
        
        const currentTitle = titleMatch ? titleMatch[1].trim() : '';
        const currentDesc = descMatch ? descMatch[1].trim() : '';
        
        // Clean out existing SEO tags completely to avoid duplication
        headContent = headContent.replace(/<title>[\s\S]*?<\/title>/gi, '');
        headContent = headContent.replace(/<meta[^>]*?name=["']description["'][\s\S]*?>/gi, '');
        headContent = headContent.replace(/<meta[^>]*?content=["'][\s\S]*?["'][^>]*?name=["']description["'][\s\S]*?>/gi, '');
        headContent = headContent.replace(/<meta[^>]*?name=["']keywords["'][\s\S]*?>/gi, '');
        headContent = headContent.replace(/<meta[^>]*?content=["'][\s\S]*?["'][^>]*?name=["']keywords["'][\s\S]*?>/gi, '');
        headContent = headContent.replace(/<link[^>]*?rel=["']canonical["'][\s\S]*?>/gi, '');
        
        // Get advanced customized SEO
        const seo = getSEO(filename, currentTitle, currentDesc);
        
        // Construct highly detailed and polished SEO tags
        const seoTags = `
    <!-- === ADVANCED SEO METADATA === -->
    <title>${seo.title}</title>
    <meta name="description" content="${seo.description}">
    <meta name="keywords" content="${seo.keywords}">
    <link rel="canonical" href="${canonicalUrl}">\n`;
        
        // Reconstruct head block cleanly
        const cleanedHead = seoTags + headContent.trim();
        
        const beforeHead = fileContent.substring(0, headStartIdx + headTagLength);
        const afterHead = fileContent.substring(headEndIdx);
        
        fileContent = beforeHead + cleanedHead + '\n    ' + afterHead;
        
        fs.writeFileSync(filePath, fileContent, 'utf8');
        updatedCount++;
    } else {
        console.warn(`Could not locate <head> block in: ${filename}`);
    }
});

console.log(`\nSuccessfully modernized technical SEO across ${updatedCount} Pabitra pages!`);
