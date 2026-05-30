const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'html');

const categoryDetails = {
    marketing: {
        roadmap: `<!-- Section: High-Fidelity Agile Roadmap -->
        <section class="py-6 bg-dark-primary" style="background-color: var(--bg-dark-primary) !important; border-top: 1px solid rgba(255,255,255,0.03);">
            <div class="container">
                <div class="text-center mb-5" data-aos="fade-up">
                    <span class="section-eyebrow"><i class="fas fa-route me-1"></i> Campaign Lifecycle</span>
                    <h2 class="display-6 fw-bold text-light">Strategy Roadmap &amp; Execution</h2>
                    <p class="text-muted mx-auto" style="max-width: 600px;">Our systematic performance roadmap ensures your campaigns achieve predictable growth and maximum acquisition ROI.</p>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="roadmap-stepper-container">
                            <div class="roadmap-step-item" data-aos="fade-up">
                                <div class="roadmap-step-node">01</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-magnifying-glass-chart text-info me-2"></i>Audit &amp; Competitor Intelligence</h5>
                                    <p class="small text-muted mb-0">High-fidelity crawlers analyze organic positions, competitor backlink profiles, current domain authority, and target search impressions to identify performance gaps.</p>
                                </div>
                            </div>
                            <div class="roadmap-step-item" data-aos="fade-up" data-aos-delay="100">
                                <div class="roadmap-step-node">02</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-bullseye text-warning me-2"></i>Intent-Driven Keyword Mapping</h5>
                                    <p class="small text-muted mb-0">We isolate search queries with high transaction intent, optimize landing page assets, and structure ad-spend budgets to match precise traffic streams.</p>
                                </div>
                            </div>
                            <div class="roadmap-step-item" data-aos="fade-up" data-aos-delay="200">
                                <div class="roadmap-step-node">03</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-rocket text-success me-2"></i>Integrated Multi-Channel Launch</h5>
                                    <p class="small text-muted mb-0">Search campaigns go live on Google, display retargeting grids are initialized on Meta, and content calendars are pushed to social channels synchronously.</p>
                                </div>
                            </div>
                            <div class="roadmap-step-item" data-aos="fade-up" data-aos-delay="300">
                                <div class="roadmap-step-node">04</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-gauge-high text-danger me-2"></i>Performance Optimization &amp; Scaling</h5>
                                    <p class="small text-muted mb-0">GA4 event models track custom client actions, AI bidding strategies reduce cost-per-lead, and high-performance channels are scaled vertically.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section: Advanced Tech Stack & Tool Integrations -->
        <section class="py-6 bg-dark-secondary" style="background-color: var(--bg-dark-secondary) !important; border-top: 1px solid rgba(255,255,255,0.03);">
            <div class="container">
                <div class="text-center mb-5" data-aos="fade-up">
                    <span class="section-eyebrow"><i class="fas fa-toolbox me-1"></i> Technical Suite</span>
                    <h2 class="display-6 fw-bold text-light">Analytics &amp; Campaign Tools</h2>
                    <p class="text-muted mx-auto" style="max-width: 600px;">We leverage industry-leading data engines and tracking platforms to drive campaign diagnostics and scale traffic.</p>
                </div>
                <div class="tech-stack-icon-grid" data-aos="zoom-in">
                    <div class="tech-stack-icon-card">
                        <i class="fab fa-google tech-icon-marketing"></i>
                        <h6 class="fw-bold text-light mb-1">Google Analytics 4</h6>
                        <span class="small text-muted">Conversion Tracking</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fas fa-magnifying-glass-chart tech-icon-marketing"></i>
                        <h6 class="fw-bold text-light mb-1">SEMrush Suite</h6>
                        <span class="small text-muted">Keyword &amp; Links</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fab fa-facebook tech-icon-marketing"></i>
                        <h6 class="fw-bold text-light mb-1">Meta Business Hub</h6>
                        <span class="small text-muted">Paid Social Ads</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fas fa-tags tech-icon-marketing"></i>
                        <h6 class="fw-bold text-light mb-1">Google Tag Manager</h6>
                        <span class="small text-muted">Pixel Automations</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fas fa-users-gear tech-icon-marketing"></i>
                        <h6 class="fw-bold text-light mb-1">HubSpot CRM</h6>
                        <span class="small text-muted">Lead Funnel Sync</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fas fa-envelope-open-text tech-icon-marketing"></i>
                        <h6 class="fw-bold text-light mb-1">ActiveCampaign</h6>
                        <span class="small text-muted">Lifecycle Newsletters</span>
                    </div>
                </div>
            </div>
        </section>`,
    },
    development: {
        roadmap: `<!-- Section: High-Fidelity Agile Roadmap -->
        <section class="py-6 bg-dark-primary" style="background-color: var(--bg-dark-primary) !important; border-top: 1px solid rgba(255,255,255,0.03);">
            <div class="container">
                <div class="text-center mb-5" data-aos="fade-up">
                    <span class="section-eyebrow"><i class="fas fa-route me-1"></i> Agile Lifecycle</span>
                    <h2 class="display-6 fw-bold text-light">Software Sprint &amp; Delivery Roadmap</h2>
                    <p class="text-muted mx-auto" style="max-width: 600px;">Our rigorous, component-driven engineering methodology guarantees stable software delivered on budget and on schedule.</p>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="roadmap-stepper-container">
                            <div class="roadmap-step-item" data-aos="fade-up">
                                <div class="roadmap-step-node">01</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-laptop-code text-info me-2"></i>Architectural Blueprint &amp; Specs</h5>
                                    <p class="small text-muted mb-0">We draft structural specs, design user-flows, map API microservices, configure database schemas, and align responsive layouts.</p>
                                </div>
                            </div>
                            <div class="roadmap-step-item" data-aos="fade-up" data-aos-delay="100">
                                <div class="roadmap-step-node">02</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-palette text-warning me-2"></i>UI/UX &amp; High-Fidelity Figma Prototyping</h5>
                                    <p class="small text-muted mb-0">Our creative design lab translates wireframes into high-end, responsive dark-space visual tokens, assets, and component mockups.</p>
                                </div>
                            </div>
                            <div class="roadmap-step-item" data-aos="fade-up" data-aos-delay="200">
                                <div class="roadmap-step-node">03</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-terminal text-success me-2"></i>Agile Coding Sprints &amp; CI Pipeline</h5>
                                    <p class="small text-muted mb-0">Senior engineers write modular, semantic code, integrate secure relational databases, and set up automatic continuous delivery checks.</p>
                                </div>
                            </div>
                            <div class="roadmap-step-item" data-aos="fade-up" data-aos-delay="300">
                                <div class="roadmap-step-node">04</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-shield-halved text-danger me-2"></i>OWASP Hardening &amp; Production Launch</h5>
                                    <p class="small text-muted mb-0">We conduct strict unit testing, optimize database query speed, perform penetration diagnostics, install SSL, and deploy server containers.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section: Advanced Tech Stack & Tool Integrations -->
        <section class="py-6 bg-dark-secondary" style="background-color: var(--bg-dark-secondary) !important; border-top: 1px solid rgba(255,255,255,0.03);">
            <div class="container">
                <div class="text-center mb-5" data-aos="fade-up">
                    <span class="section-eyebrow"><i class="fas fa-toolbox me-1"></i> Technical Stack</span>
                    <h2 class="display-6 fw-bold text-light">Supported Languages &amp; Core Frameworks</h2>
                    <p class="text-muted mx-auto" style="max-width: 600px;">We leverage production-grade, highly-scalable software frameworks to build fast, robust corporate platforms.</p>
                </div>
                <div class="tech-stack-icon-grid" data-aos="zoom-in">
                    <div class="tech-stack-icon-card">
                        <i class="fab fa-html5 tech-icon-development"></i>
                        <h6 class="fw-bold text-light mb-1">HTML5 &amp; CSS3</h6>
                        <span class="small text-muted">Semantic Structures</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fab fa-js-square tech-icon-development"></i>
                        <h6 class="fw-bold text-light mb-1">JavaScript (ES6)</h6>
                        <span class="small text-muted">Dynamic Web Core</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fab fa-node-js tech-icon-development"></i>
                        <h6 class="fw-bold text-light mb-1">Node.js / React</h6>
                        <span class="small text-muted">Scale Backends &amp; UIs</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fab fa-wordpress tech-icon-development"></i>
                        <h6 class="fw-bold text-light mb-1">WordPress Engine</h6>
                        <span class="small text-muted">Advanced Headless CMS</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fas fa-mobile-button tech-icon-development"></i>
                        <h6 class="fw-bold text-light mb-1">Flutter Core</h6>
                        <span class="small text-muted">Native Cross-OS App</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fab fa-github tech-icon-development"></i>
                        <h6 class="fw-bold text-light mb-1">Git Versioning</h6>
                        <span class="small text-muted">CI/CD Deployments</span>
                    </div>
                </div>
            </div>
        </section>`,
    },
    technology: {
        roadmap: `<!-- Section: High-Fidelity Agile Roadmap -->
        <section class="py-6 bg-dark-primary" style="background-color: var(--bg-dark-primary) !important; border-top: 1px solid rgba(255,255,255,0.03);">
            <div class="container">
                <div class="text-center mb-5" data-aos="fade-up">
                    <span class="section-eyebrow"><i class="fas fa-route me-1"></i> Infrastructure Cycle</span>
                    <h2 class="display-6 fw-bold text-light">DevSecOps &amp; System Lifecycle Roadmap</h2>
                    <p class="text-muted mx-auto" style="max-width: 600px;">We map robust cloud structures and maintain continuous system protection to ensure zero data downtime.</p>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="roadmap-stepper-container">
                            <div class="roadmap-step-item" data-aos="fade-up">
                                <div class="roadmap-step-node">01</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-network-wired text-info me-2"></i>Topology Architecture Planning</h5>
                                    <p class="small text-muted mb-0">We inspect existing server layers, map cloud networking grids, select scaling nodes, and outline backup strategies.</p>
                                </div>
                            </div>
                            <div class="roadmap-step-item" data-aos="fade-up" data-aos-delay="100">
                                <div class="roadmap-step-node">02</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-cubes text-warning me-2"></i>Infrastructure-as-Code Setup</h5>
                                    <p class="small text-muted mb-0">Senior DevOps specialists write clean Terraform definitions, Dockerize application nodes, and orchestrate Kubernetes grids.</p>
                                </div>
                            </div>
                            <div class="roadmap-step-item" data-aos="fade-up" data-aos-delay="200">
                                <div class="roadmap-step-node">03</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-lock text-success me-2"></i>Security Hardening &amp; Firewalls</h5>
                                    <p class="small text-muted mb-0">Implementing network security protocols, setting up Cloudflare WAF, configuring secure SSL keys, and hardening endpoint access rules.</p>
                                </div>
                            </div>
                            <div class="roadmap-step-item" data-aos="fade-up" data-aos-delay="300">
                                <div class="roadmap-step-node">04</div>
                                <div class="roadmap-content-box">
                                    <h5 class="fw-bold text-light mb-2"><i class="fas fa-chart-line text-danger me-2"></i>24/7 Operations &amp; Standby Sync</h5>
                                    <p class="small text-muted mb-0">We establish active Prometheus database alerts, configure automated hourly backups, and activate standby servers for instant hot-failover.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section: Advanced Tech Stack & Tool Integrations -->
        <section class="py-6 bg-dark-secondary" style="background-color: var(--bg-dark-secondary) !important; border-top: 1px solid rgba(255,255,255,0.03);">
            <div class="container">
                <div class="text-center mb-5" data-aos="fade-up">
                    <span class="section-eyebrow"><i class="fas fa-toolbox me-1"></i> Tech Suite</span>
                    <h2 class="display-6 fw-bold text-light">Cloud &amp; Security Engineering Tools</h2>
                    <p class="text-muted mx-auto" style="max-width: 600px;">We leverage cutting-edge global IT systems to deliver bulletproof data structures and secure code execution.</p>
                </div>
                <div class="tech-stack-icon-grid" data-aos="zoom-in">
                    <div class="tech-stack-icon-card">
                        <i class="fab fa-aws tech-icon-technology"></i>
                        <h6 class="fw-bold text-light mb-1">Amazon Web Services</h6>
                        <span class="small text-muted">Global Cloud Deploy</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fab fa-docker tech-icon-technology"></i>
                        <h6 class="fw-bold text-light mb-1">Docker Containers</h6>
                        <span class="small text-muted">Sandboxed Micro-nodes</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fab fa-linux tech-icon-technology"></i>
                        <h6 class="fw-bold text-light mb-1">Linux Server Core</h6>
                        <span class="small text-muted">Secure OS Environment</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fas fa-chart-line tech-icon-technology"></i>
                        <h6 class="fw-bold text-light mb-1">Prometheus &amp; Grafana</h6>
                        <span class="small text-muted">24/7 Metric Logging</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fas fa-cubes tech-icon-technology"></i>
                        <h6 class="fw-bold text-light mb-1">Terraform Specs</h6>
                        <span class="small text-muted">Infrastructure-as-Code</span>
                    </div>
                    <div class="tech-stack-icon-card">
                        <i class="fas fa-lock tech-icon-technology"></i>
                        <h6 class="fw-bold text-light mb-1">SSL &amp; Cryptography</h6>
                        <span class="small text-muted">A+ Encrypted Shielding</span>
                    </div>
                </div>
            </div>
        </section>`,
    }
};

const serviceCategoryMapping = {
    // Marketing
    'service-digital-marketing-360.html': 'marketing',
    'service-seo.html': 'marketing',
    'service-ppc.html': 'marketing',
    'service-smm.html': 'marketing',
    'service-email.html': 'marketing',
    'service-content-marketing.html': 'marketing',
    'service-orm.html': 'marketing',
    'service-influencer-marketing.html': 'marketing',
    
    // Web & App Dev
    'service-web-dev.html': 'development',
    'service-app-dev.html': 'development',
    'service-ecommerce.html': 'development',
    'service-graphics-uiux.html': 'development',
    'service-api-cms.html': 'development',
    'service-custom-software.html': 'development',
    'service-pwa.html': 'development',
    'service-saas.html': 'development',

    // IT & Tech
    'service-cloud.html': 'technology',
    'service-devops.html': 'technology',
    'service-security.html': 'technology',
    'service-automation.html': 'technology',
    'service-data-analytics.html': 'technology',
    'service-machine-learning.html': 'technology',
    'service-iot.html': 'technology',
    'service-blockchain.html': 'technology'
};

// Loop through each service page and modernize it
Object.keys(serviceCategoryMapping).forEach(filename => {
    const filePath = path.join(servicesDir, filename);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return;
    }

    let fileContent = fs.readFileSync(filePath, 'utf8');
    const category = serviceCategoryMapping[filename];
    const details = categoryDetails[category];

    // Find SLA Matrix Section comment to inject before it!
    const targetSectionComment = '<!-- Section: Academic Studio SLA & Performance Matrix -->';
    const idx = fileContent.indexOf(targetSectionComment);

    if (idx !== -1) {
        // If we haven't already injected the roadmap, let's inject it!
        if (!fileContent.includes('High-Fidelity Agile Roadmap')) {
            const beforeSla = fileContent.substring(0, idx);
            const afterSla = fileContent.substring(idx);
            
            fileContent = beforeSla + details.roadmap + '\n\n        ' + afterSla;
            fs.writeFileSync(filePath, fileContent, 'utf8');
            console.log(`Successfully injected V3 Roadmap & Tools into: ${filename}`);
        } else {
            console.log(`Roadmap already present in: ${filename}`);
        }
    } else {
        console.warn(`Could not locate SLA Matrix target comment in ${filename}`);
    }
});

console.log('All 24 service pages successfully loaded with V3 premium sections!');
