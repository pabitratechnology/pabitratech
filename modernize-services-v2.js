const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'html');

const servicesData = {
    // DIGITAL MARKETING
    'service-digital-marketing-360.html': {
        category: 'marketing',
        title: '360° Digital Marketing Agency in Bhubaneswar',
        lead: 'Drive multi-channel customer acquisition with data-backed digital campaigns. Our full-funnel digital marketing services in Bhubaneswar include search, social, brand strategy, and performance-based marketing designed to maximize your ROI.',
        tech: 'Google Analytics 4, Meta Ads Manager, SEMrush',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '500+', label: 'Campaigns Launched' },
            { num: '10M+', label: 'Combined Reach' },
            { num: '4.5x', label: 'Average ROI Boost' },
            { num: '15+', label: 'Certified Experts' }
        ],
        extraTitle: 'Integrated Digital Marketing Architecture',
        extraLead: 'We synthesize search, social, and programmatic ad assets to build a predictable buyer journey that converts visitors into brand loyalists.',
        localKeywords: 'Bhubaneswar, Cuttack, Puri, Khordha, Odisha, India',
        parameters: [
            { name: 'Lead Velocity Target', value: '3.5x YoY Growth' },
            { name: 'Avg Acquisition Cost Reduction', value: '28% Saved' },
            { name: 'Google Ads Quality Score Target', value: '9/10 Metric' },
            { name: 'Conversion Rate Optimization (CRO)', value: 'Active Tracking' }
        ],
        widgetTitle: 'LIVE ROI ENGINE ACTIVE',
        widgetMetric: '+350% YoY',
        widgetBar1Name: 'Lead Conversion Velocity',
        widgetBar1Val: '94%',
        widgetBar2Name: 'Target Acquisition Cost',
        widgetBar2Val: 'Optimized (-28%)',
        widgetPillName: 'Quality Score Index',
        widgetPillVal: '9.2 / 10 Target'
    },
    'service-seo.html': {
        category: 'marketing',
        title: 'Best SEO Services in Bhubaneswar',
        lead: 'Dominate search engine rankings and secure high-value organic traffic. As the best SEO company in Bhubaneswar, Odisha, we specialize in technical SEO, local SEO audits, on-page optimization, and authoritative link building.',
        tech: 'Screaming Frog, Google Search Console, Ahrefs',
        image: 'https://images.unsplash.com/photo-1571844307560-f551fa3182d4?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '95%', label: 'Top 10 Rankings' },
            { num: '3x', label: 'Avg Traffic Growth' },
            { num: '150+', label: 'Ranked Websites' },
            { num: '100%', label: 'Google Safe White-Hat' }
        ],
        extraTitle: 'Advanced Organic Search Optimization',
        extraLead: 'Our ranking engineering uses search intent mapping, deep technical crawl remediation, and robust link campaigns to secure long-term index positions.',
        localKeywords: 'Bhubaneswar, Odisha, India, Cuttack, Rourkela',
        parameters: [
            { name: 'Technical Crawl Success Rate', value: '99.8% Success' },
            { name: 'Average Indexation Speed', value: '48 Hours' },
            { name: 'Local Search Visibility Boost', value: '180% Avg' },
            { name: 'Core Web Vitals Optimization', value: 'Passed SLA' }
        ],
        widgetTitle: 'SEO ALGORITHM ENGINE ACTIVE',
        widgetMetric: '98.5% Index',
        widgetBar1Name: 'Organic Traffic Rank Velocity',
        widgetBar1Val: '96%',
        widgetBar2Name: 'Technical Crawl Optimization',
        widgetBar2Val: '99.8% Passed',
        widgetPillName: 'Core Web Vitals Index',
        widgetPillVal: 'Passed (100/100)'
    },
    'service-ppc.html': {
        category: 'marketing',
        title: 'PPC & Google Ads Management in Bhubaneswar',
        lead: 'Generate instant qualified leads and maximize ad spend efficiency. Our pay-per-click specialists design high-converting Google Search campaigns, display networks, YouTube video ads, and target remarketing channels.',
        tech: 'Google Ads Network, Meta Ads Manager',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '₹10Cr+', label: 'Ad Spend Managed' },
            { num: '12%', label: 'Avg Conversion Rate' },
            { num: '24h', label: 'Campaign Setup' },
            { num: '100%', label: 'Transparent Reporting' }
        ],
        extraTitle: 'Paid Media Performance Engine',
        extraLead: 'We build micro-targeted sales triggers and dynamic landing pages to ensure that every rupee spent on Google and Meta ads yields maximum sales conversion.',
        localKeywords: 'Bhubaneswar, Odisha, Khordha, India',
        parameters: [
            { name: 'Click-Through Rate (CTR) Target', value: '6.5% average' },
            { name: 'Cost-Per-Lead (CPL) Target', value: '25% decrease' },
            { name: 'Ad Copy Variant Testing', value: 'A/B Testing active' },
            { name: 'Tag Manager Event Tracking', value: '100% verified' }
        ],
        widgetTitle: 'PPC BID CONTROLLER ACTIVE',
        widgetMetric: '12.4% Conv',
        widgetBar1Name: 'Target Ad Click Velocity',
        widgetBar1Val: '88%',
        widgetBar2Name: 'Cost Per Acquisition Drop',
        widgetBar2Val: 'Reduced (-25%)',
        widgetPillName: 'Quality Lead Score Index',
        widgetPillVal: '9.0 / 10 Target'
    },
    'service-smm.html': {
        category: 'marketing',
        title: 'Social Media Marketing Agency in Bhubaneswar',
        lead: 'Build an active, loyal digital community and amplify brand authority. We create custom content strategies, visual graphics, and organic engagement routines across Instagram, Facebook, LinkedIn, and YouTube.',
        tech: 'Meta Suite, Canva Pro, Adobe Illustrator',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '5M+', label: 'Combined Reach' },
            { num: '350%', label: 'Engagement Increase' },
            { num: '8+', label: 'Social Channels' },
            { num: '24/7', label: 'Sentiments Monitored' }
        ],
        extraTitle: 'Social Dominance & Community Building',
        extraLead: 'We produce hyper-relevant visual narratives, custom Reels, and B2B LinkedIn assets that capture attention and build genuine brand authority.',
        localKeywords: 'Bhubaneswar, Cuttack, Odisha, India',
        parameters: [
            { name: 'Community Growth Rate', value: '18% Monthly' },
            { name: 'Avg Engagement Rate', value: '4.8% SLA' },
            { name: 'Custom Reels Delivery', value: '12/Month' },
            { name: 'Direct Message (DM) Lead Capture', value: 'Automated Hub' }
        ],
        widgetTitle: 'SOCIAL SENTIMENT SENTINEL',
        widgetMetric: '4.8% SLA',
        widgetBar1Name: 'Community Engagement Lift',
        widgetBar1Val: '92%',
        widgetBar2Name: 'Voter Sentiment Health',
        widgetBar2Val: '98% Positive',
        widgetPillName: 'Multi-Channel Growth',
        widgetPillVal: '+350% YoY'
    },
    'service-email.html': {
        category: 'marketing',
        title: 'Email Marketing Services in Bhubaneswar',
        lead: 'Nurture leads, recover abandoned carts, and foster strong customer loyalty with automated, high-ROI newsletters. We build targeted subscription lists, design professional templates, and optimize deliverability.',
        tech: 'ActiveCampaign, Mailchimp, HubSpot',
        image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '99.8%', label: 'Deliverability Rate' },
            { num: '28%', label: 'Avg Open Rate' },
            { num: '1.2M+', label: 'Emails Dispatched' },
            { num: '5x', label: 'Average ROI' }
        ],
        extraTitle: 'Automated Lifecycle Funnel Delivery',
        extraLead: 'We engineer secure transactional layouts, abandoned cart sequences, and cold business development funnels that land directly in the primary inbox.',
        localKeywords: 'Bhubaneswar, Odisha, India, Global Markets',
        parameters: [
            { name: 'Inbox Placement Target', value: '99.8% Success' },
            { name: 'Average Click-To-Open Rate', value: '14.2% Metric' },
            { name: 'Domain Reputation Health', value: 'Neutral/Excellent' },
            { name: 'Spam Trap Filtering Audits', value: 'Weekly Automated' }
        ],
        widgetTitle: 'DELIVERABILITY HUB ENGINE',
        widgetMetric: '99.8% Inbox',
        widgetBar1Name: 'Average Email Open Rate',
        widgetBar1Val: '85%',
        widgetBar2Name: 'Sender Domain Reputation',
        widgetBar2Val: 'Excellent (100%)',
        widgetPillName: 'Lifecycle ROI Velocity',
        widgetPillVal: '5.2x Average Boost'
    },
    'service-content-marketing.html': {
        category: 'marketing',
        title: 'Content Marketing Services in Bhubaneswar',
        lead: 'Attract, engage, and convert your ideal audience with high-value technical blogs, creative landing pages, conversion copy, and detailed whitepapers. Our writers research deep to position your business as an industry authority.',
        tech: 'Grammarly Premium, Surfer SEO, WordPress',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '2M+', label: 'Words Generated' },
            { num: '4x', label: 'Traffic Multiplying' },
            { num: '200+', label: 'Ranked Articles' },
            { num: '100%', label: 'Unique Creative Copy' }
        ],
        extraTitle: 'High-Impact SEO Copywriting & Content Hub',
        extraLead: 'We transform complex enterprise solutions into easily digestible, highly engaging digital narratives that answer user queries and drive clicks.',
        localKeywords: 'Bhubaneswar, Odisha, India, Cuttack',
        parameters: [
            { name: 'Content Originality Target', value: '100% Checked' },
            { name: 'Avg Keyword Optimization Score', value: '80/100 Surfer' },
            { name: 'Lead Magnet Conversions', value: 'Active funnels' },
            { name: 'Search Query Index Success', value: '100% Rate' }
        ],
        widgetTitle: 'CONTENT COPY COMPASS ACTIVE',
        widgetMetric: '100% Plag-Free',
        widgetBar1Name: 'SEO Optimization Score',
        widgetBar1Val: '90%',
        widgetBar2Name: 'User Scroll Depth Time',
        widgetBar2Val: 'Extended (+4.2m)',
        widgetPillName: 'Rank Indexed Articles',
        widgetPillVal: '100% Google Indexed'
    },
    'service-orm.html': {
        category: 'marketing',
        title: 'ORM & Online Reputation Management in Bhubaneswar',
        lead: 'Protect your brand identity, build consumer trust, and suppress negative online search results. We implement positive PR campaigns, encourage active 5-star customer reviews, and monitor reviews 24/7.',
        tech: 'Brand24 Monitor, Google Alerts, Trustpilot',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '98%', label: 'Positive Sentiment' },
            { num: '1500+', label: 'Reviews Managed' },
            { num: '24/7', label: 'Sentinel Alerts' },
            { num: '95%', label: 'Rating Improvements' }
        ],
        extraTitle: 'Corporate Crisis & Brand Trust Shielding',
        extraLead: 'We build defensive online architectures, clean search results of negative keywords, and build proactive feedback cycles that elevate brand credibility.',
        localKeywords: 'Bhubaneswar, Odisha, India, Khordha',
        parameters: [
            { name: 'Critical Mentions Alerts Response', value: '< 15 Minutes' },
            { name: 'Review Portal Rating Target', value: '4.8+ Stars' },
            { name: 'Negative SERP Suppression', value: 'Active campaigns' },
            { name: 'Proactive Positive PR Reach', value: 'Monthly Push' }
        ],
        widgetTitle: 'SENTIMENT SENTINEL HUB ACTIVE',
        widgetMetric: '98% Positive',
        widgetBar1Name: 'Critical Mentions Scrub Velocity',
        widgetBar1Val: '95%',
        widgetBar2Name: 'Positive Feedback Multiplier',
        widgetBar2Val: 'Active (4.9 Stars)',
        widgetPillName: 'Brand Trust Protection',
        widgetPillVal: '24/7 Active Auditing'
    },
    'service-influencer-marketing.html': {
        category: 'marketing',
        title: 'Influencer Marketing Agency in Bhubaneswar',
        lead: 'Connect your brand with leading content creators, vloggers, and social media influencers to drive authentic reach. We negotiate contracts, coordinate product reviews, and optimize campaign ROI.',
        tech: 'Meta Ads Manager, Creator Graph API',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '200+', label: 'Influencer Connections' },
            { num: '10M+', label: 'Combined Views' },
            { num: '18%', label: 'ROI Growth Rate' },
            { num: '100%', label: 'Authentic Campaigns' }
        ],
        extraTitle: 'Authority & Micro-Creator Endorsement',
        extraLead: 'We broker secure contracts and coordinate high-conversion viral video scripts with regional and global influencers to skyrocket sales velocity.',
        localKeywords: 'Bhubaneswar, Odisha, India, Rourkela',
        parameters: [
            { name: 'Vetted Creator Target', value: '0% Fake followers' },
            { name: 'Average Cost-Per-View (CPV)', value: 'Optimized SLA' },
            { name: 'Content Delivery Tracking', value: 'Live Sheet Sync' },
            { name: 'Promo Code ROI Diagnostics', value: 'Integrated Hub' }
        ],
        widgetTitle: 'CREATOR MATRIX DISPATCHER',
        widgetMetric: '0% Fake Follows',
        widgetBar1Name: 'Authentic Engagement Reach',
        widgetBar1Val: '90%',
        widgetBar2Name: 'Conversion Code Performance',
        widgetBar2Val: 'Active (+18% ROI)',
        widgetPillName: 'Influencer Core Network',
        widgetPillVal: '200+ Vetted Creators'
    },

    // WEB & APP DEV
    'service-web-dev.html': {
        category: 'development',
        title: 'Website Development Company in Bhubaneswar',
        lead: 'Get responsive, fast, and secure business websites built by senior developers. As the leading website development company in Bhubaneswar, Odisha, we design custom corporate portals, WordPress sites, and dynamic HTML5/CSS3 pages.',
        tech: 'HTML5 & CSS3, ES6 JavaScript, WordPress CMS',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '500+', label: 'Websites Delivered' },
            { num: '1.8s', label: 'Average Page Load' },
            { num: '100%', label: 'Mobile Responsive' },
            { num: '8+', label: 'Years Experience' }
        ],
        extraTitle: 'Enterprise Web Engineering Standard',
        extraLead: 'Our code matrix utilizes semantic HTML5 hierarchies, clean CSS3 typography, and lightweight JavaScript systems to deliver 100/100 Core Web Vitals.',
        localKeywords: 'Bhubaneswar, Odisha, India, Cuttack, Puri, Khordha',
        parameters: [
            { name: 'Core Web Vitals Speed Score', value: '98%+ Passed' },
            { name: 'Responsive Layout Breakpoints', value: '100% Scalable' },
            { name: 'Administrative CMS Control', value: 'Full Handover' },
            { name: 'SSL Certificate & Security Config', value: 'Active SSL A+' }
        ]
    },
    'service-app-dev.html': {
        category: 'development',
        title: 'Mobile App Development Company in Bhubaneswar',
        lead: 'Build high-performance native iOS, Android, and cross-platform mobile applications. Our senior mobile engineers in Bhubaneswar build secure, scalable mobile assets with seamless API integrations and responsive UI/UX structures.',
        tech: 'Flutter Framework, React Native, Swift & Kotlin',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '45+', label: 'Applications Live' },
            { num: '1M+', label: 'Combined Installs' },
            { num: '4.8★', label: 'App Store Ratings' },
            { num: '100%', label: 'Native Experience' }
        ],
        extraTitle: 'Cross-Platform App Development Excellence',
        extraLead: 'We engineer fluid mobile assets with robust offline rendering support, real-time push notification endpoints, and rapid backend APIs.',
        localKeywords: 'Bhubaneswar, Odisha, India, Khordha',
        parameters: [
            { name: 'Average Rendering Frame-Rate', value: '60 FPS Native' },
            { name: 'API Payload Uptime Delivery', value: '99.99% Target' },
            { name: 'Cross-OS Code Synchronization', value: 'Flutter Core' },
            { name: 'Vulnerability Pentest Checklist', value: 'Passed OWASP' }
        ]
    },
    'service-ecommerce.html': {
        category: 'development',
        title: 'E-commerce Website Development in Bhubaneswar',
        lead: 'Launch your high-conversion online store with seamless payment gateway integrations, responsive shopping carts, and intuitive inventory management. We develop secure WooCommerce, Shopify, and custom Node.js systems.',
        tech: 'WooCommerce & Shopify, Node.js, Razorpay',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '120+', label: 'Active eStores' },
            { num: '₹50Cr+', label: 'Transactions Processed' },
            { num: '99.9%', label: 'Checkout Uptime' },
            { num: '100%', label: 'Secure PCI-DSS Standards' }
        ],
        extraTitle: 'Secure Transactional Retail Systems',
        extraLead: 'We design frictionless shopping carts, multi-channel payment systems, automated invoice generation layers, and automated inventory sync alerts.',
        localKeywords: 'Bhubaneswar, Odisha, India, Global retail',
        parameters: [
            { name: 'Payment Integrity Security', value: 'PCI-DSS Compliant' },
            { name: 'Add-to-Cart Conversion Target', value: '3.8% Average' },
            { name: 'Checkout Page Speeds', value: '< 1.5 Seconds' },
            { name: 'ERP Inventory Synchronizer', value: 'Real-time Linked' }
        ]
    },
    'service-graphics-uiux.html': {
        category: 'development',
        title: 'UI/UX & Graphic Design Agency in Bhubaneswar',
        lead: 'Craft stunning visual interfaces, dynamic product wireframes, and memorable brand identities. Our creative design team in Bhubaneswar utilizes advanced Figma paradigms to build prototypes that deliver seamless user journeys.',
        tech: 'Figma Pro, Adobe Suite, Prototyping Systems',
        image: 'https://images.unsplash.com/photo-1581291518655-9523c932ebcf?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '300+', label: 'Design Prototypes' },
            { num: '100%', label: 'Bespoke Brand Assets' },
            { num: '4.9★', label: 'Satisfied Ratings' },
            { num: '24h', label: 'First Prototype Turnaround' }
        ],
        extraTitle: 'High-Fidelity Visual Systems & Design Tokens',
        extraLead: 'We develop highly organized visual assets with robust design variables, modular UI grids, and responsive components built specifically to ease coding.',
        localKeywords: 'Bhubaneswar, Odisha, India, Cuttack',
        parameters: [
            { name: 'Design Asset Scalability Support', value: 'Vector Source Handover' },
            { name: 'User Experience Usability Testing', value: 'Integrated Testing' },
            { name: 'Figma Code Component Library', value: 'Fully Documented' },
            { name: 'Theme Compatibility Outlines', value: 'Dark/Light Compliant' }
        ]
    },
    'service-api-cms.html': {
        category: 'development',
        title: 'API & CMS Integration Services in Bhubaneswar',
        lead: 'Link your legacy business systems and automate databases with fast, secure API architectures and custom content platforms. We configure secure headless CMS engines and RESTful/GraphQL microservice integrations.',
        tech: 'RESTful & GraphQL APIs, Strapi CMS, Postman',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '1000+', label: 'API Endpoints Linked' },
            { num: '99.99%', label: 'Database Sync Success' },
            { num: '100%', label: 'Secure Data Pipelines' },
            { num: '50+', label: 'Headless Sites Active' }
        ],
        extraTitle: 'Headless CMS Architecture & Microservices',
        extraLead: 'We sever front-end displays from back-end database servers using high-performance API mesh nodes, reducing latency and vulnerability risks.',
        localKeywords: 'Bhubaneswar, Odisha, India, Enterprise systems',
        parameters: [
            { name: 'REST/GraphQL API Response Time', value: '< 200 Milliseconds' },
            { name: 'Database Replication Operations', value: 'Real-time Async' },
            { name: 'Third-Party Webhook Integrations', value: '100% Reliable' },
            { name: 'Headless Server Decoupling', value: 'Strapi/WordPress' }
        ]
    },
    'service-custom-software.html': {
        category: 'development',
        title: 'Custom Software Development Company in Bhubaneswar',
        lead: 'Accelerate operational efficiency with secure, bespoke enterprise software, customer relation suites (CRM), and cloud resource planners (ERP). Built with robust technical architectures designed for ultimate scalability.',
        tech: 'Node.js & Express, Python Django, PostgreSQL',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '80+', label: 'Bespoke Platforms' },
            { num: '100k+', label: 'Daily Active Users' },
            { num: '0%', label: 'Data Vulnerabilities' },
            { num: '99.99%', label: 'SLA Active Uptime' }
        ],
        extraTitle: 'Bespoke Business Software Systems',
        extraLead: 'We engineer complex, multi-tenant software tools tailored to map out and streamline your internal corporate operations.',
        localKeywords: 'Bhubaneswar, Odisha, India, Cuttack, Khordha',
        parameters: [
            { name: 'Backend System Scalability Limit', value: '50k Concurrent Users' },
            { name: 'Software Development Life Cycle Standard', value: 'Agile Continuous Sprint' },
            { name: 'Database Query Cost Reductions', value: '45% Saved' },
            { name: 'Pentesting Security Standards', value: 'Passed OWASP Top 10' }
        ]
    },
    'service-pwa.html': {
        category: 'development',
        title: 'Progressive Web App (PWA) Development in Bhubaneswar',
        lead: 'Deliver blazing fast, app-like experiences directly inside web browsers. Our progressive web applications run offline, support instant push notifications, and require zero App Store downloads.',
        tech: 'React.js & Next.js, Service Workers API, Workbox',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '40+', label: 'PWAs Deployed' },
            { num: '80%', label: 'Faster Page Speed' },
            { num: '60%', label: 'Data Consumption Saved' },
            { num: '100/100', label: 'Lighthouse Audited' }
        ],
        extraTitle: 'Modern Offline-First Web Applications',
        extraLead: 'We build high-performance web products that install on mobile home screens, cache files instantly, and trigger push alerts.',
        localKeywords: 'Bhubaneswar, Odisha, India, Mobile web',
        parameters: [
            { name: 'Offline Core Uptime Operation', value: 'Service Worker Active' },
            { name: 'Average Application Package Size', value: '< 2.5 Megabytes' },
            { name: 'Core Web Vitals Performance', value: '99/100 Lighthouse' },
            { name: 'Cache Layer Sync Latency', value: 'Background Async' }
        ]
    },
    'service-saas.html': {
        category: 'development',
        title: 'SaaS Development Company in Bhubaneswar',
        lead: 'Architect scalable, multi-tenant cloud software products. We develop robust SaaS platforms featuring automated subscription management, deep customer analytics dashboards, and secure RESTful backend APIs.',
        tech: 'Next.js & Node.js, Amazon Web Services, Stripe Billing',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '25+', label: 'Global Platforms' },
            { num: '$15M+', label: 'ARR Managed' },
            { num: '99.99%', label: 'Server Scalability' },
            { num: '100%', label: 'SOC 2 Security Standard' }
        ],
        extraTitle: 'Scalable Software-as-a-Service Systems',
        extraLead: 'We write modular cloud solutions with robust micro-billing layers, sandboxed client schemas, and secure dashboard monitors.',
        localKeywords: 'Bhubaneswar, Odisha, India, Global Cloud',
        parameters: [
            { name: 'Subscription Gateway System', value: 'Stripe/Razorpay API' },
            { name: 'Microservice Deployment Spec', value: 'Docker & Kubernetes' },
            { name: 'Database Sandboxing Protocol', value: 'Multi-Tenant Encrypted' },
            { name: 'Server Auto-Scaling Trigger', value: '>75% CPU Usage' }
        ]
    },

    // IT & TECHNOLOGY
    'service-cloud.html': {
        category: 'technology',
        title: 'Cloud Infrastructure & Solutions in Bhubaneswar',
        lead: 'Migrate legacy servers, configure microservices, and optimize hosting costs with modern AWS, Google Cloud, and Azure architectures. We ensure perfect high availability, automated database backups, and security configurations.',
        tech: 'AWS Services, Google Cloud GCP, Terraform',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '150+', label: 'Successful Migrations' },
            { num: '60%', label: 'Cost Reduction Target' },
            { num: '99.99%', label: 'Guaranteed SLA Uptime' },
            { num: '24/7', label: 'Active Security Center' }
        ],
        extraTitle: 'DevSecOps & High Availability Cloud Mesh',
        extraLead: 'We deploy secure, code-driven cloud layers (IaC) that eliminate human server provisioning errors and maximize software scaling speed.',
        localKeywords: 'Bhubaneswar, Cuttack, Khordha, Odisha, India',
        parameters: [
            { name: 'Server Downtime Failover', value: '< 2.5 Seconds' },
            { name: 'Automated Database Backup Cycle', value: 'Hourly Offsite Sync' },
            { name: 'Network Latency Optimization', value: 'Cloudflare CDN Mesh' },
            { name: 'Cloud Infrastructure Cost Audit', value: 'Weekly Automated' }
        ]
    },
    'service-devops.html': {
        category: 'technology',
        title: 'DevOps & CI/CD Automation Company in Bhubaneswar',
        lead: 'Automate code deployments, eliminate server downtime, and scale high-load clusters. We establish continuous integration and continuous delivery (CI/CD) pipelines, Docker assets, and secure system automation triggers.',
        tech: 'Docker & Kubernetes, GitHub Actions, Jenkins',
        image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '80%', label: 'Faster Deployments' },
            { num: '0', label: 'Downtime Incidents' },
            { num: '200+', label: 'Automated CI Pipelines' },
            { num: '24/7', label: 'Prometheus Monitoring' }
        ],
        extraTitle: 'Continuous Deployment & Orchestration Systems',
        extraLead: 'We design unified developer cycles, automate unit test integrations, and optimize Kubernetes container orchestration modules.',
        localKeywords: 'Bhubaneswar, Odisha, India, DevOps engineering',
        parameters: [
            { name: 'Continuous Delivery Cycle Duration', value: '< 6 Minutes Auto' },
            { name: 'Orchestrator Cluster Health', value: 'Active Kubernetes' },
            { name: 'Automated Build Failure Rollback', value: '100% Instant' },
            { name: 'Real-time Alert Notification Hub', value: 'Slack/Discord API' }
        ]
    },
    'service-security.html': {
        category: 'technology',
        title: 'Cybersecurity & Web Protection Services in Bhubaneswar',
        lead: 'Secure your critical business databases, web portals, and system networks. We deliver comprehensive penetration testing, vulnerability assessments, security configurations, and 24/7 firewall protection monitors.',
        tech: 'OWASP Top 10 Audit, Nessus Scanner, Cloudflare WAF',
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '0', label: 'Data Breaches Recorded' },
            { num: '500+', label: 'Vulnerability Audits' },
            { num: '100%', label: 'GDPR & ISO Standard' },
            { num: '24/7', label: 'Active Web Shielding' }
        ],
        extraTitle: 'Enterprise Threat Diagnostics & Cyber Defense',
        extraLead: 'We construct active network shielding, secure server entry layers, and run automated script pen-tests to block hackers and protect customer records.',
        localKeywords: 'Bhubaneswar, Odisha, India, cybersecurity audit',
        parameters: [
            { name: 'Intrusion Detection Response', value: 'Real-time Blocked' },
            { name: 'Vulnerability Scan Schedule', value: 'Weekly Automated' },
            { name: 'Secure Encrypted Server Layer', value: 'SSL AES-256 Bit' },
            { name: 'Disaster Database Recovery Time', value: '< 1 Hour SLA' }
        ]
    },
    'service-automation.html': {
        category: 'technology',
        title: 'AI & Business Automation Solutions in Bhubaneswar',
        lead: 'Eliminate repetitive manual data entry, streamline operations, and boost workflow efficiency with custom AI automation scripts. We connect CRM platforms, trigger webhooks, and automate complex pipelines.',
        tech: 'Python Scripts, Zapier Enterprise, Make.com',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '100k+', label: 'Hours Saved' },
            { num: '99.9%', label: 'Automation Accuracy' },
            { num: '150+', label: 'Automated Connectors' },
            { num: '24h', label: 'Workflow Prototyping' }
        ],
        extraTitle: 'Robotic Process Automation & AI Pipelines',
        extraLead: 'We build high-performance data workflows, link legacy APIs, and configure smart triggers that execute 24/7 without manual errors.',
        localKeywords: 'Bhubaneswar, Odisha, India, Cuttack',
        parameters: [
            { name: 'Data Pipeline Synced Accuracy', value: '99.99% Target' },
            { name: 'Custom Workflow Integration Time', value: '< 48 Hours' },
            { name: 'Active API Connectors Monitored', value: 'Live Sentinel' },
            { name: 'Automated Chatbot Engagement', value: 'GPT-4o API Hook' }
        ]
    },
    'service-data-analytics.html': {
        category: 'technology',
        title: 'Data Analytics & Business Intelligence in Bhubaneswar',
        lead: 'Convert messy operational databases into actionable executive dashboards, detailed sales funnels, and real-time marketing metrics. We build secure database analytics layers and custom Power BI views.',
        tech: 'Python Pandas, SQL Engines, Power BI & Tableau',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '80M+', label: 'Data Points Tracked' },
            { num: '40%', label: 'Operational Discoveries' },
            { num: '50+', label: 'BI Panels Published' },
            { num: '24/7', label: 'Live Data Refreshing' }
        ],
        extraTitle: 'Corporate Data Engineering & Analytics Framework',
        extraLead: 'We aggregate multi-channel transaction databases and compile interactive visual managers that help executives make rapid, data-backed actions.',
        localKeywords: 'Bhubaneswar, Odisha, India, BI Consulting',
        parameters: [
            { name: 'Database Query Execution Speed', value: '< 400 Milliseconds' },
            { name: 'Analytical Model Refresh Interval', value: 'Real-time Linked' },
            { name: 'Data Cleansing Error Rate', value: '< 0.05% Error' },
            { name: 'Corporate Decision Accelerators', value: 'Dashboard Active' }
        ]
    },
    'service-machine-learning.html': {
        category: 'technology',
        title: 'Machine Learning & AI Development in Bhubaneswar',
        lead: 'Embed smart predictive models, natural language processing (NLP), and custom recommendation engines directly inside your software products. Built using secure, cutting-edge AI architectures.',
        tech: 'TensorFlow, PyTorch, LangChain, OpenAI API',
        image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '30+', label: 'ML Models Deployed' },
            { num: '98%', label: 'Predictive Accuracy' },
            { num: '5M+', label: 'AI Model Queries' },
            { num: '100%', label: 'Audited Data Security' }
        ],
        extraTitle: 'Advanced Neural Networks & Generative AI',
        extraLead: 'We build bespoke deep learning models, fine-tune open-source LLMs, and structure vector databases to solve hard enterprise calculations.',
        localKeywords: 'Bhubaneswar, Odisha, India, AI Engineering',
        parameters: [
            { name: 'Predictive Algorithm Confidence Limit', value: '98.5% Checked' },
            { name: 'Vector DB Semantic Query Latency', value: '< 180 Milliseconds' },
            { name: 'Custom LLM Fine-Tuning Protocols', value: 'Completed SLA' },
            { name: 'Data Isolation Encryption Standard', value: 'Fully Localized' }
        ]
    },
    'service-iot.html': {
        category: 'technology',
        title: 'IoT Hardware & Software Integration in Bhubaneswar',
        lead: 'Bridge the gap between hardware devices and software applications. We build secure WebSockets controllers, real-time dashboard trackers, and configure robust sensory data pipelines.',
        tech: 'MQTT Broker, Raspberry Pi SDK, AWS IoT Core',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '10k+', label: 'Sensors Online' },
            { num: '100%', label: 'Real-Time Syncing' },
            { num: '25+', label: 'Custom Smart Setups' },
            { num: '99.9%', label: 'Data Stream Uptime' }
        ],
        extraTitle: 'Internet of Things Gateway & Telemetry Systems',
        extraLead: 'We program reliable sensory telemetry streams, compile responsive mobile panels, and integrate secure industrial MQTT messaging brokers.',
        localKeywords: 'Bhubaneswar, Odisha, India, IoT developer',
        parameters: [
            { name: 'Data Payload Transmit Uptime', value: '99.999% SLA' },
            { name: 'Device Command Delivery Delay', value: '< 40 Milliseconds' },
            { name: 'Secure Device TLS Cryptography', value: 'TLS 1.3 Active' },
            { name: 'Edge Node Caching Storage', value: 'Offline Cache Enabled' }
        ]
    },
    'service-blockchain.html': {
        category: 'technology',
        title: 'Blockchain & Smart Contract Development in Bhubaneswar',
        lead: 'Build secure, decentralized systems, immutable ledgers, and audited smart contracts. We architect high-performance DApps, deploy custom tokens, and integrate crypto-payment solutions.',
        tech: 'Solidity, Web3.js / Ethers.js, HardHat',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1920&auto=format&fit=crop',
        stats: [
            { num: '15+', label: 'Decentralized Apps Live' },
            { num: '200+', label: 'Smart Contracts Audited' },
            { num: '0', label: 'Vulnerability Record' },
            { num: '100%', label: 'Immutable Data Security' }
        ],
        extraTitle: 'Cryptographic Ledger & Smart Contract Security',
        extraLead: 'We write fully optimized, mathematically secure Solidity smart contracts and compile Web3 portals that integrate with modern wallets.',
        localKeywords: 'Bhubaneswar, Odisha, India, Web3 developer',
        parameters: [
            { name: 'Smart Contract Gas Optimization', value: 'Optimized Level' },
            { name: 'Ledger Decentralized Compliance', value: 'Audited Security' },
            { name: 'Web3 Wallet API Integrations', value: 'MetaMask WalletConnect' },
            { name: 'Cryptographic Consensus Protocol', value: 'Proof-of-Stake Spec' }
        ]
    }
};

// Loop through each service page and modernize it
Object.keys(servicesData).forEach(filename => {
    const filePath = path.join(servicesDir, filename);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return;
    }

    let fileContent = fs.readFileSync(filePath, 'utf8');
    const data = servicesData[filename];

    // Build the stats block
    const statsHtml = `<!-- Stats Bar -->
<section class="stats-bar">
  <div class="container">
    <div class="row g-0">
      <div class="col-6 col-md-3"><div class="stat-item"><div class="stat-number" data-aos="zoom-in">${data.stats[0].num}</div><div class="stat-label">${data.stats[0].label}</div></div></div>
      <div class="col-6 col-md-3"><div class="stat-item"><div class="stat-number" data-aos="zoom-in" data-aos-delay="100">${data.stats[1].num}</div><div class="stat-label">${data.stats[1].label}</div></div></div>
      <div class="col-6 col-md-3"><div class="stat-item"><div class="stat-number" data-aos="zoom-in" data-aos-delay="200">${data.stats[2].num}</div><div class="stat-label">${data.stats[2].label}</div></div></div>
      <div class="col-6 col-md-3"><div class="stat-item"><div class="stat-number" data-aos="zoom-in" data-aos-delay="300">${data.stats[3].num}</div><div class="stat-label">${data.stats[3].label}</div></div></div>
    </div>
  </div>
</section>`;

    // Build the hero block based on category
    let heroHtml = '';
    if (data.category === 'marketing') {
        heroHtml = `<!-- Premium Service Hero Banner -->
    <section class="service-detail-hero category-marketing-hero d-flex align-items-center text-white" style="background-image: linear-gradient(rgba(5, 15, 30, 0.82), rgba(10, 25, 47, 0.94)), url('${data.image}'); background-size: cover; background-position: center; background-attachment: fixed;">
        <div class="marketing-pulse-ring"></div>
        <div class="marketing-pulse-ring delay-2s"></div>
        
        <div class="container position-relative" style="z-index: 2;" data-aos="fade-in">
            <div class="row align-items-center text-start py-4">
                <div class="col-lg-7 text-center text-lg-start">
                    <span class="badge bg-warning text-dark mb-2 px-3 py-2 text-uppercase fw-bold" style="font-size: 0.8rem; letter-spacing: 1.5px; border-radius: 20px; box-shadow: 0 0 15px rgba(255, 193, 7, 0.4);"><i class="fas fa-chart-line me-1"></i> Digital Marketing</span>
                    <h1 class="fw-bold mb-3 animate__animated animate__fadeInDown text-center text-lg-start" style="text-shadow: 0 4px 20px rgba(255, 193, 7, 0.3);">${data.title}</h1>
                    <p class="lead mb-4 opacity-85 animate__animated animate__fadeInUp animate__delay-1s text-center text-lg-start" style="line-height: 1.7; font-size: 1.15rem; color: #C8D7EE; max-width: 750px;">
                        ${data.lead}
                    </p>
                    
                    <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mb-4 animate__animated animate__fadeInUp animate__delay-2s">
                        <span class="badge-pill border border-info rounded-pill px-3 py-2 text-info bg-dark-50" style="font-size: 0.8rem; backdrop-filter: blur(8px);"><i class="fas fa-bullseye me-1"></i> ${data.tech}</span>
                        <span class="badge-pill border border-warning rounded-pill px-3 py-2 text-warning bg-dark-50" style="font-size: 0.8rem; backdrop-filter: blur(8px);"><i class="fas fa-certificate me-1"></i> Global Search Signals</span>
                        <span class="badge-pill border border-success rounded-pill px-3 py-2 text-success bg-dark-50" style="font-size: 0.8rem; backdrop-filter: blur(8px);"><i class="fas fa-arrow-trend-up me-1"></i> Maximum ROI Focus</span>
                    </div>

                    <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 animate__animated animate__fadeInUp animate__delay-3s">
                        <button type="button" class="btn btn-warning btn-lg px-4 py-2.5 rounded-pill shadow-lg text-dark fw-bold border-0 hover-scale-up" onclick="document.getElementById('navAuditBtn').click()">
                            Request Free Audit <i class="fas fa-magnifying-glass-chart ms-2"></i>
                        </button>
                        <a href="tel:+916370584682" class="btn btn-outline-light btn-lg px-4 py-2.5 rounded-pill hover-bg-light-10">
                            <i class="fas fa-phone me-2"></i> Speak with Specialist
                        </a>
                    </div>
                </div>
                <div class="col-lg-5 d-none d-lg-block">
                    <div class="glass-hero-widget p-4 rounded-4 shadow-lg border border-white-10 animate__animated animate__fadeInRight animate__delay-1.5s" style="background: rgba(10, 25, 47, 0.4); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #FFC107;">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span class="status-indicator-green"></span>
                                <span class="small text-muted-light fw-bold" style="letter-spacing: 0.5px;">${data.widgetTitle}</span>
                            </div>
                            <span class="badge bg-success text-dark small px-2 py-1" style="font-size: 0.7rem;">${data.widgetMetric}</span>
                        </div>
                        <div class="marketing-performance-grid d-flex flex-column gap-3">
                            <div>
                                <div class="d-flex justify-content-between text-muted-light small mb-1">
                                    <span>${data.widgetBar1Name}</span>
                                    <span class="text-white fw-bold">${data.widgetBar1Val}</span>
                                </div>
                                <div class="progress" style="height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden;">
                                    <div class="progress-bar bg-warning" role="progressbar" style="width: 90%; border-radius: 10px;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between text-muted-light small mb-1">
                                    <span>${data.widgetBar2Name}</span>
                                    <span class="text-white fw-bold">${data.widgetBar2Val}</span>
                                </div>
                                <div class="progress" style="height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden;">
                                    <div class="progress-bar bg-info" role="progressbar" style="width: 80%; border-radius: 10px;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="p-2.5 rounded-3 bg-dark-50 d-flex justify-content-between align-items-center mt-1" style="border: 1px solid rgba(255,255,255,0.03);">
                                <span class="small text-muted-light"><i class="fas fa-bullseye text-warning me-1"></i> ${data.widgetPillName}</span>
                                <span class="small text-success fw-bold">${data.widgetPillVal}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    \n${statsHtml}`;
    } else if (data.category === 'development') {
        // Set specific code editor data for each development service page!
        let codeContent = '';
        if (filename === 'service-web-dev.html') {
            codeContent = `  "architecture": "HTML5 & ES6 Javascript",
  "optimization": "Core Web Vitals Passed",
  "cmsLink": "Headless Custom WordPress",
  "loadSpeedTarget": "< 1.8s SLA Done"`;
        } else if (filename === 'service-app-dev.html') {
            codeContent = `  "platform": "Flutter & React Native",
  "apiIntegration": "Fast REST/GraphQL",
  "offlineSync": "Active Cache Layer",
  "appStoreUpload": "Ready & Audited"`;
        } else if (filename === 'service-ecommerce.html') {
            codeContent = `  "storeEngine": "Secure WooCommerce/Shopify",
  "checkoutIntegrity": "PCI-DSS Compliant",
  "paymentSync": "Razorpay & Stripe API",
  "activeCartSLA": "99.9% Checkout Uptime"`;
        } else if (filename === 'service-graphics-uiux.html') {
            codeContent = `  "designParadigms": "Figma Pro Auto-Layout",
  "componentTokens": "Fully Standardized",
  "mockups": "High-Fidelity Vectors",
  "userJourneyScore": "99% Usability Approved"`;
        } else {
            codeContent = `  "engine": "Modern Node.js Backend",
  "securityAudit": "Passed OWASP Top 10",
  "scalableMesh": "Docker Containerized",
  "uptimeGuarantee": "99.99% SLA Target"`;
        }

        heroHtml = `<!-- Premium Service Hero Banner -->
    <section class="service-detail-hero category-development-hero d-flex align-items-center text-white" style="background-image: linear-gradient(rgba(8, 20, 36, 0.86), rgba(5, 10, 20, 0.96)), url('${data.image}'); background-size: cover; background-position: center; background-attachment: fixed;">
        <div class="cyber-grid-overlay"></div>
        <div class="code-matrix-float d-none d-lg-block"><code>const pabitraTech = new Studio();</code></div>
        
        <div class="container position-relative" style="z-index: 2;" data-aos="fade-in">
            <div class="row align-items-center text-start py-4">
                <div class="col-lg-7 text-center text-lg-start">
                    <span class="badge bg-primary text-white mb-2 px-3 py-2 text-uppercase fw-bold" style="font-size: 0.8rem; letter-spacing: 1.5px; border-radius: 20px; box-shadow: 0 0 15px rgba(0, 196, 255, 0.4);"><i class="fas fa-laptop-code me-1"></i> Web &amp; App Dev</span>
                    <h1 class="fw-bold mb-3 animate__animated animate__fadeInDown text-center text-lg-start" style="text-shadow: 0 4px 20px rgba(0, 196, 255, 0.3);">${data.title}</h1>
                    <p class="lead mb-4 opacity-85 animate__animated animate__fadeInUp animate__delay-1s text-center text-lg-start" style="line-height: 1.7; font-size: 1.15rem; color: #C8D7EE; max-width: 750px;">
                        ${data.lead}
                    </p>
                    
                    <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mb-4 animate__animated animate__fadeInUp animate__delay-2s">
                        <span class="badge-pill border border-info rounded-pill px-3 py-2 text-info bg-dark-50" style="font-size: 0.8rem; backdrop-filter: blur(8px);"><i class="fas fa-terminal me-1"></i> ${data.tech}</span>
                        <span class="badge-pill border border-success rounded-pill px-3 py-2 text-success bg-dark-50" style="font-size: 0.8rem; backdrop-filter: blur(8px);"><i class="fas fa-shield-halved me-1"></i> ISO 9001 Audited</span>
                        <span class="badge-pill border border-warning rounded-pill px-3 py-2 text-warning bg-dark-50" style="font-size: 0.8rem; backdrop-filter: blur(8px);"><i class="fas fa-square-check me-1"></i> 100% Custom Core</span>
                    </div>

                    <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 animate__animated animate__fadeInUp animate__delay-3s">
                        <button type="button" class="btn btn-warning btn-lg px-4 py-2.5 rounded-pill shadow-lg text-dark fw-bold border-0 hover-scale-up" onclick="document.getElementById('navAuditBtn').click()">
                            Consult Senior Developer <i class="fas fa-user-gear ms-2"></i>
                        </button>
                        <a href="contact.html" class="btn btn-outline-light btn-lg px-4 py-2.5 rounded-pill hover-bg-light-10">
                            Discuss Architecture <i class="fas fa-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-5 d-none d-lg-block">
                    <div class="glass-hero-widget p-4 rounded-4 shadow-lg border border-white-10 animate__animated animate__fadeInRight animate__delay-1.5s" style="background: rgba(8, 20, 36, 0.4); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #28c864;">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span class="status-indicator-green"></span>
                                <span class="small text-muted-light fw-bold" style="letter-spacing: 0.5px;">ACTIVE COMPILER RUNNING</span>
                            </div>
                            <span class="badge bg-primary text-white small px-2 py-1" style="font-size: 0.7rem;">SLA compliant</span>
                        </div>
                        <div class="custom-compiler-box d-flex flex-column gap-2" style="font-family: monospace; font-size: 0.8rem; line-height: 1.4;">
                            <div style="color: #6c757d;">// Building custom technical core...</div>
                            <div><span style="color: #28c864;">const</span> <span style="color: #00C4FF;">pabitraStudio</span> = <span style="color: #FFC107;">new</span> <span style="color: #bd5bf8;">TechnicalEngine</span>();</div>
                            <div><span style="color: #00C4FF;">pabitraStudio</span>.<span style="color: #FFD700;">optimize</span>({</div>
${codeContent}
                            <div>});</div>
                            <div class="p-2.5 rounded-3 bg-dark-50 d-flex justify-content-between align-items-center mt-2" style="border: 1px solid rgba(255,255,255,0.03); font-family: sans-serif;">
                                <span class="small text-muted-light"><i class="fas fa-bolt text-success me-1"></i> Development standard</span>
                                <span class="small text-success fw-bold">Senior Web Core</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    \n${statsHtml}`;
    } else {
        // Setting up cloud monitor widgets specifically for each technology page!
        let cloudTitle = 'CLOUD NODE MONITOR';
        let cloudMetric = '99.99% UPTIME';
        let param1Name = 'Core Firewall Shield';
        let param1Val = 'ACTIVE';
        let param2Name = 'Cloud Node Load';
        let param2Val = '12.8% Capacity';
        let pillName = 'Hot-Standby Failover';
        let pillVal = 'STANDBY READY';

        if (filename === 'service-security.html') {
            cloudTitle = 'CYBER SHIELD ACTIVE';
            cloudMetric = '0 BREACHES';
            param1Name = 'Penetration Sentinel';
            param1Val = 'MONITORING';
            param2Name = 'AES-256 Encryption';
            param2Val = 'FULLY ACTIVE';
            pillName = 'OWASP Top 10 Auditing';
            pillVal = 'PASSED & COMPLIANT';
        } else if (filename === 'service-devops.html') {
            cloudTitle = 'KUBERNETES DEPLOYER';
            cloudMetric = '0 DOWNTIME';
            param1Name = 'Continuous CI/CD';
            param1Val = 'SYNCHRONIZED';
            param2Name = 'Docker Containers';
            param2Val = '14 ACTIVE NODES';
            pillName = 'Uptime Deploy Trigger';
            pillVal = 'AUTO-INTEGRATED';
        } else if (filename === 'service-machine-learning.html') {
            cloudTitle = 'NEURAL NET PREDICTOR';
            cloudMetric = '98.5% CONF';
            param1Name = 'TensorFlow Deep Engine';
            param1Val = 'ACTIVE';
            param2Name = 'Semantic Vector Queries';
            param2Val = '< 180ms Latency';
            pillName = 'Model Isolation Shield';
            pillVal = '100% PRIVATE';
        }

        heroHtml = `<!-- Premium Service Hero Banner -->
    <section class="service-detail-hero category-technology-hero d-flex align-items-center text-white" style="background-image: linear-gradient(rgba(10, 5, 20, 0.82), rgba(5, 10, 20, 0.94)), url('${data.image}'); background-size: cover; background-position: center; background-attachment: fixed;">
        <div class="security-radar-overlay"></div>
        <div class="defense-shield-ring"></div>
        
        <div class="container position-relative" style="z-index: 2;" data-aos="fade-in">
            <div class="row align-items-center text-start py-4">
                <div class="col-lg-7 text-center text-lg-start">
                    <span class="badge bg-warning text-dark mb-2 px-3 py-2 text-uppercase fw-bold" style="font-size: 0.8rem; letter-spacing: 1.5px; border-radius: 20px; box-shadow: 0 0 15px rgba(255, 193, 7, 0.4);"><i class="fas fa-server me-1"></i> IT &amp; Technology</span>
                    <h1 class="fw-bold mb-3 animate__animated animate__fadeInDown text-center text-lg-start" style="text-shadow: 0 4px 20px rgba(255, 193, 7, 0.3);">${data.title}</h1>
                    <p class="lead mb-4 opacity-85 animate__animated animate__fadeInUp animate__delay-1s text-center text-lg-start" style="line-height: 1.7; font-size: 1.15rem; color: #C8D7EE; max-width: 750px;">
                        ${data.lead}
                    </p>
                    
                    <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mb-4 animate__animated animate__fadeInUp animate__delay-2s">
                        <span class="badge-pill border border-info rounded-pill px-3 py-2 text-info bg-dark-50" style="font-size: 0.8rem; backdrop-filter: blur(8px);"><i class="fas fa-microchip me-1"></i> ${data.tech}</span>
                        <span class="badge-pill border border-warning rounded-pill px-3 py-2 text-warning bg-dark-50" style="font-size: 0.8rem; backdrop-filter: blur(8px);"><i class="fas fa-lock me-1"></i> End-to-End Encryption</span>
                        <span class="badge-pill border border-success rounded-pill px-3 py-2 text-success bg-dark-50" style="font-size: 0.8rem; backdrop-filter: blur(8px);"><i class="fas fa-network-wired me-1"></i> Uptime SLA 99.99%</span>
                    </div>

                    <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 animate__animated animate__fadeInUp animate__delay-3s">
                        <button type="button" class="btn btn-warning btn-lg px-4 py-2.5 rounded-pill shadow-lg text-dark fw-bold border-0 hover-scale-up" onclick="document.getElementById('navAuditBtn').click()">
                            Deploy Cloud Architecture <i class="fas fa-cloud-arrow-up ms-2"></i>
                        </button>
                        <a href="tel:+916370584682" class="btn btn-outline-light btn-lg px-4 py-2.5 rounded-pill hover-bg-light-10">
                            <i class="fas fa-phone me-2"></i> Urgent Solutions Support
                        </a>
                    </div>
                </div>
                <div class="col-lg-5 d-none d-lg-block">
                    <div class="glass-hero-widget p-4 rounded-4 shadow-lg border border-white-10 animate__animated animate__fadeInRight animate__delay-1.5s" style="background: rgba(10, 5, 20, 0.4); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #FFC107;">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span class="status-indicator-green"></span>
                                <span class="small text-muted-light fw-bold" style="letter-spacing: 0.5px;">${cloudTitle}</span>
                            </div>
                            <span class="badge bg-warning text-dark small px-2 py-1" style="font-size: 0.7rem;">${cloudMetric}</span>
                        </div>
                        <div class="server-node-matrix d-flex flex-column gap-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="small text-muted-light"><i class="fas fa-shield-halved text-success me-1"></i> ${param1Name}</span>
                                <span class="badge bg-success text-dark small font-monospace">${param1Val}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="small text-muted-light"><i class="fas fa-server text-info me-1"></i> ${param2Name}</span>
                                <span class="text-white fw-bold small">${param2Val}</span>
                            </div>
                            <div class="p-2.5 rounded-3 bg-dark-50 d-flex justify-content-between align-items-center mt-1" style="border: 1px solid rgba(255,255,255,0.03);">
                                <span class="small text-muted-light"><i class="fas fa-rotate text-warning me-1"></i> ${pillName}</span>
                                <span class="small text-warning fw-bold">${pillVal}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    \n${statsHtml}`;
    }

    // 1. Replace Hero Section
    const heroStartStr = '<!-- Premium Service Hero Banner -->';
    const heroEndStr = '<!-- Stats Bar -->';
    const startIdx = fileContent.indexOf(heroStartStr);
    const endIdx = fileContent.indexOf(heroEndStr);

    if (startIdx !== -1 && endIdx !== -1) {
        const statsBarEndStr = '</section>';
        const statsEndIdx = fileContent.indexOf(statsBarEndStr, endIdx);
        if (statsEndIdx !== -1) {
            const beforeHero = fileContent.substring(0, startIdx);
            const afterStats = fileContent.substring(statsEndIdx + statsBarEndStr.length);
            fileContent = beforeHero + heroHtml + afterStats;
        }
    } else {
        console.warn(`Could not parse Hero Banner markers in ${filename}`);
        return;
    }

    // Save modernized page content back to the file
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`Successfully modernized V2 and localized: ${filename}`);
});

console.log('All 24 service pages successfully upgraded to V2!');
