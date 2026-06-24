'use client';

import React, { useState } from 'react';

const projects = [
  {
    num: 1,
    title: 'ReactJs Online SmartPhone Shop',
    tech: 'React.js • JavaScript',
    tags: ['REACT', 'E-COMMERCE'],
    tagClasses: ['tag-blue', 'tag-purple'],
    type: 'Frontend App',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/ReactJs---Online-SmartPhone-Shop',
    overview: 'A modern, modular e-commerce interface built natively using React.js. Provides users with a dynamic, highly responsive smartphone shopping and catalog-browsing experience across devices.',
    features: [
      'Component-Based Layout: Reusable React components rendering cart logistics and store catalog displays cleanly.',
      'State Management: Real-time user shopping cart functionality tracking items seamlessly over user navigation.',
      'Reactive UI: Smooth DOM rendering powered by Virtual DOM logic ensuring rapid visual updates and zero-reload product filtering.'
    ]
  },
  {
    num: 2,
    title: 'AI English Teaching Platform by Gemini',
    tech: 'Node.js • WebSockets • Vertex AI',
    tags: ['AI', 'CHATBOT'],
    tagClasses: ['tag-orange', 'tag-blue'],
    type: 'Education Tech',
    linkText: 'Visit Website',
    linkIcon: 'fas fa-globe',
    linkHref: 'http://aielts.com.au/',
    overview: 'An immersive English practice application offering real-time mock tests. It integrates the Google Gemini Live API leveraging Vertex AI for automated evaluations and real-time voice streaming interactions. Provides full-screen simulated testing scenarios for Reading, Writing, and Speaking modules.',
    features: [
      'Real-time Voice Chat: Implements WebSockets (via Node.js and a PHP proxy) to stream audio data back and forth communicating with the Gemini Live API.',
      'Automated Assessment: Grades text and spoken simulated tasks dynamically using official language test band descriptors governed by robust system instructions.',
      'Speech Integration: Includes full utilization of browser SpeechRecognition and SpeechSynthesis APIs to smoothly replicate examiner interactions.',
      'Tech Stack: Node.js WebSocket proxies, comprehensive PHP backends processing asynchronous events, secure OAuth2 key authentication, React-based interfaces, and Express endpoints.'
    ]
  },
  {
    num: 3,
    title: 'Agentic AI OpenClaw',
    tech: 'Python • Agentic AI • OpenClaw',
    tags: ['AI AUTOMATION', 'AGENTIC AI'],
    tagClasses: ['tag-orange', 'tag-blue'],
    type: 'AI Agent',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/AgenticAI-OpenClaw',
    overview: 'An advanced automation platform powered by Agentic AI and OpenClaw. This project focuses on building autonomous AI agents capable of performing complex daily tasks such as email management, calendar scheduling, and workflow automations without manual intervention.',
    features: [
      'Email Automation: Autonomous reading, drafting, and managing of professional emails using AI.',
      'Calendar Management: Intelligent agents scheduling, rescheduling, and organizing calendar events dynamically.',
      'Agentic AI Integration: Utilizing the OpenClaw framework to deploy context-aware, goal-oriented AI agents.',
      'Workflow Efficiency: Replacing repetitive administrative tasks with robust, continuous AI automation pipelines.'
    ]
  },
  {
    num: 4,
    title: 'SHIHAB-SmartBook',
    tech: 'Java',
    tags: ['JAVA', 'APPLICATION'],
    tagClasses: ['tag-blue', 'tag-green'],
    type: 'Desktop App',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/SHIHAB-SmartBook',
    overview: 'SHIHAB SmartBook Application: A core Java application illustrating object-oriented programming methodologies encompassing typical directory tasks.',
    features: [
      'Extensive file I/O operations storing local directory datasets.',
      'Complex array processing algorithms manipulating addresses and telephone registers.',
      'Implementation of MVC software patterns relying gracefully strictly on Java Swing GUIs.'
    ]
  },
  {
    num: 5,
    title: 'AIUB Online Forum',
    tech: 'ASP.NET • SQL Server',
    tags: ['WEB DEV', 'SOCIAL'],
    tagClasses: ['tag-green', 'tag-purple'],
    type: 'Academic Platform',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/AIUB-Online-Forum-ASP.NET-',
    overview: 'An online forum functioning like a social website. Registered users can post, like, comment, report, and seamlessly interact with each other.',
    features: [
      'Secure user authentication and authorization system.',
      'Interactive posting mechanism supporting likes and threaded comments.',
      'Robust backend database constructed with SQL Server.',
      'Admin moderation tools allowing content control and user management.'
    ]
  },
  {
    num: 6,
    title: 'MERN E-Commerce Website',
    tech: 'MongoDB • Express • React • Node.js',
    tags: ['REACT', 'MERN STACK'],
    tagClasses: ['tag-blue', 'tag-orange'],
    type: 'Full-Stack App',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/MERN-WEBSITE-E-COMMERCE',
    overview: 'A comprehensive e-commerce platform built natively with the modern MERN stack. It replaces legacy architectures with a scalable React frontend, an Express/Node.js backend API, and a MongoDB database for maximum performance.',
    features: [
      'MERN Architecture: Seamless integration between MongoDB, Express, React, and Node.js for a robust full-stack solution.',
      'RESTful API: Custom Node.js/Express backend endpoints securely managing product inventory and shopping cart queries.',
      'React Frontend: Dynamic client-side routing, modular UI components, and state management for zero-reload cart tracking.',
      'MongoDB Database: NoSQL schemas optimized for dynamic product filtering, brand queries, and catalog rendering.'
    ]
  },
  {
    num: 7,
    title: 'Online Smartphone Shop',
    tech: 'PHP • JavaScript • AJAX • jQuery',
    tags: ['E-COMMERCE', 'PHP STACK'],
    tagClasses: ['tag-blue', 'tag-orange'],
    type: 'E-Commerce',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/Online-Smartphone-Shop-PhP-JAVASCRIPT-AJAX-Jquery-CSS-',
    overview: 'A dynamic e-commerce website where customers can buy various smartphones securely, and admins exercise full control over product management.',
    features: [
      'Dynamic product catalog loading with AJAX for seamless filtering without page reloads.',
      'Interactive UI powered by jQuery and JavaScript for cart management.',
      'Comprehensive PHP backend handling secure order processing.',
      'Admin dashboard to add, edit, or remove inventory and manage users.'
    ]
  },
  {
    num: 8,
    title: 'Modern Online Device Shop',
    tech: 'Laravel • PHP • MySQL • Tailwind CSS',
    tags: ['LARAVEL', 'E-COMMERCE'],
    tagClasses: ['tag-pink', 'tag-orange'],
    type: 'Full-Stack App',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/MODERN-ONLINE-DEVICE-SHOP',
    overview: 'A modernized version of an online device shop migrated to the Laravel framework. It provides a robust backend architecture, secure user authentication, and a responsive frontend interface.',
    features: [
      'Laravel MVC Architecture: Implements Model-View-Controller patterns for clean, maintainable backend logic.',
      'Secure Authentication: Built-in Laravel authentication mechanisms protecting user data and admin routes.',
      'Database Migrations & Seeders: Structured database schemas handling product inventories, orders, and users efficiently.',
      'Responsive UI: Blade templates combined with modern CSS frameworks for an interactive shopping experience.'
    ]
  },
  {
    num: 9,
    title: 'Hospital Management System',
    tech: 'Oracle PL/SQL • C#',
    tags: ['DESKTOP APP', 'DATABASE'],
    tagClasses: ['tag-purple', 'tag-green'],
    type: 'Management System',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/Hospital-Management-System-by-Oracle-10G-and-PLSQL',
    overview: 'A robust C#-based desktop application integrated deeply with an Oracle Database architecture.',
    features: [
      'Custom triggers, procedures, & functions developed in PL/SQL.',
      'Detailed tracking of patient admission, discharge, and history.',
      'Efficient billing system calculating costs interactively.',
      'Reliable database architecture capable of resolving concurrently updated records efficiently.'
    ]
  },
  {
    num: 10,
    title: 'Inventory Management System',
    tech: 'C# • .NET',
    tags: ['DESKTOP APP', 'UTILITY'],
    tagClasses: ['tag-purple', 'tag-orange'],
    type: 'Management System',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/Inventory_Management_System_C-',
    overview: 'A localized desktop application streamlining daily goods transactions and facilitating advanced admin inventory tracking.',
    features: [
      'Intuitive UI developed with C# Windows Forms.',
      'Real-time stock level monitoring.',
      'Supplier and product registration.',
      'Automated reports generation for regular sales margins.'
    ]
  },
  {
    num: 11,
    title: 'ASP.NET Projects Demo',
    tech: 'ASP.NET • HTML • C#',
    tags: ['ASP.NET', 'C#'],
    tagClasses: ['tag-pink', 'tag-green'],
    type: 'Demo Package',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/ASP.NET-projects-HTML-demo',
    overview: 'Repository tracking custom classes and complex HTML structural mappings utilized repeatedly during full-stack developmental tests regarding ASP.NET solutions.',
    features: [
      'HTML boilerplate arrays explicitly modular validating quick full-stack deployment tests.',
      'C# controllers tracking session configurations precisely.',
      'Architectural demonstrations structuring code cleanly avoiding tight couplings.'
    ]
  },
  {
    num: 12,
    title: 'WAI APAC Awards Rasa Chatbot',
    tech: 'Python • Rasa 2.1.2 • TensorFlow',
    tags: ['AI', 'CHATBOT'],
    tagClasses: ['tag-orange', 'tag-blue'],
    type: 'Virtual Assistant',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/AI-CHATBOT-PROJECT',
    overview: 'A conversational AI assistant (chatbot) built using the open-source Rasa framework. It is designed to answer frequently asked questions and assist users regarding the Women in AI (WAI) APAC Awards 2023.',
    features: [
      'Understands and manages a wide array of intents: Application Deadlines, Fees, Judging Process, and Location Restrictions.',
      'NLU Pipeline utilizing CountVectorsFeaturizer, DIETClassifier, and FallbackClassifier.',
      'Dialogue Management using TEDPolicy, MemoizationPolicy, and RulePolicy.',
      'Trained and built with Python 3.7.13, Tensorflow 2.3.4, and Scikit-Learn 0.23.2.'
    ]
  },
  {
    num: 13,
    title: 'Budget Shop & Care Connects',
    tech: 'WordPress • PHP • Bootstrap',
    tags: ['WORDPRESS', 'PAYMENTS'],
    tagClasses: ['tag-green', 'tag-blue'],
    type: 'Professional Websites',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007',
    overview: 'Multiple professional online tech and e-commerce websites built heavily relying on robust CMS implementations.',
    features: [
      'Handling of real-time payments via Bkash, Rocket, and Bank Transfers.',
      'Development of customized themes with Bootstrap for maximum responsiveness.',
      'Extending WordPress capabilities dynamically through tailored PHP plugins.',
      'Optimization for high concurrency web-traffic load.'
    ]
  },
  {
    num: 14,
    title: 'Shihab Site Auditor Pro',
    tech: 'JavaScript • HTML • CSS',
    tags: ['JAVASCRIPT', 'WEB TOOL'],
    tagClasses: ['tag-orange', 'tag-purple'],
    type: 'SEO Tool',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/Shihab-Site-Auditor-pro',
    overview: 'An advanced SEO and site auditing tool designed to fetch granular web page metrics for optimization tracking.',
    features: [
      'DOM manipulation algorithms evaluating keyword density, heading structure, and meta properties.',
      'Reporting system returning detailed action points for optimization.',
      'Pure JavaScript solution executing securely on the client-side without a persistent database.'
    ]
  },
  {
    num: 15,
    title: 'SITE-ANALYTICS-BY-SHIHAB',
    tech: 'PHP • MySQL',
    tags: ['PHP', 'ANALYTICS'],
    tagClasses: ['tag-pink', 'tag-orange'],
    type: 'Tracking Tool',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/SITE-ANALYTICS-BY-SHIHAB',
    overview: 'Custom Site Analytics tool formulated via pure PHP ensuring zero-overhead while tracking site metrics effectively.',
    features: [
      'IP tracking processing geo-locations via associated metadata.',
      'Session monitoring logic estimating unique page impressions.',
      'MySQL persistent tracking mechanism structured highly normalized.'
    ]
  },
  {
    num: 16,
    title: 'PC Power Calculator',
    tech: 'HTML • JavaScript',
    tags: ['HTML', 'CALCULATOR'],
    tagClasses: ['tag-green', 'tag-purple'],
    type: 'Web Tool',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/PC-Power-Calculator',
    overview: 'A web-based tool seamlessly providing dynamically calculated PC power consumptions estimates based on selected hardware arrays.',
    features: [
      'Dynamic event listeners calculating real-time numeric shifts on varied component selection.',
      'Extensive mock database detailing hundreds of exact product energy ratings (TDP).',
      'PWA scalable web design enabling fully responsive layouts hosted entirely on GitHub Pages.'
    ]
  },
  {
    num: 17,
    title: 'TAX-Calculator',
    tech: 'HTML • JavaScript',
    tags: ['HTML', 'FINANCE'],
    tagClasses: ['tag-green', 'tag-blue'],
    type: 'Finance App',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/TAX-Calculator',
    overview: 'A web-based financial aid mapping multi-tier tax brackets algorithms to securely determine final user tax liabilities.',
    features: [
      'Tiered marginal tracking utilizing sophisticated conditional flow arrays.',
      'Robust form validation algorithms prior calculations triggering.',
      'Instantaneous metric processing with clean modular JavaScript UI rendering.'
    ]
  },
  {
    num: 18,
    title: 'google-photos-album-url-fetch',
    tech: 'Node.js • NPM',
    tags: ['NPM', 'API'],
    tagClasses: ['tag-green', 'tag-purple'],
    type: 'Library / Package',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/google-photos-album-image-url-fetch',
    overview: 'A utility package resolving programmatic extractions of image URLs off Google Photos Albums architectures.',
    features: [
      'Puppeteer usage scripting web manipulation navigating unauthenticated environments.',
      'Scraping module retrieving explicit high-res CDN URIs efficiently.',
      'NPM global publishing and semantic version tracking implementations.'
    ]
  },
  {
    num: 19,
    title: 'AIUB-Grading-System',
    tech: 'C++',
    tags: ['C++', 'EDUCATION'],
    tagClasses: ['tag-blue', 'tag-orange'],
    type: 'Utility Tool',
    linkText: 'Source code',
    linkIcon: 'fab fa-github',
    linkHref: 'https://github.com/sshihabb007/AIUB-Grading-System-C-',
    overview: 'C++ project heavily structured upon dynamic arrays interpreting precise grading parameters scaling algorithmically towards entire universities.',
    features: [
      'Struct and Class implementation forming student profiles dynamically upon console allocations.',
      'CGPA conversion metrics mathematically tracking precision floats safely.',
      'Pure generic C++ logic demonstrating highly optimized heap storage allocations.'
    ]
  },
  {
    num: 20,
    title: 'Hypex Web Platform & Subnetworks',
    tech: 'WordPress • PHP • Custom Plugins',
    tags: ['WORDPRESS', 'PHP'],
    tagClasses: ['tag-pink', 'tag-blue'],
    type: 'Production Site',
    linkText: 'Visit Website',
    linkIcon: 'fas fa-globe',
    linkHref: 'https://hypex.co.uk/',
    overview: 'A comprehensive ecosystem of WordPress-based platforms developed for Hypex. The project covers the main site as well as integrated secondary networks.',
    features: [
      'Theme Customization: Delivered a styled and converted WordPress theme built to match specific branding operations across the main domain and subsites.',
      'Plugin Development & PHP: Programmed custom WordPress plugins and modified core PHP logic to introduce new technical capabilities.',
      'Subsite Connectivity: Deployed and managed interconnected platforms including Axing UK and the Hypex Blog.'
    ]
  },
  {
    num: 21,
    title: 'BERI Bangladesh',
    tech: 'WordPress • PHP • UI/UX Design',
    tags: ['WORDPRESS', 'WEB DESIGN'],
    tagClasses: ['tag-pink', 'tag-green'],
    type: 'Corporate Website',
    linkText: 'Visit Website',
    linkIcon: 'fas fa-globe',
    linkHref: 'https://www.beri.com.bd/',
    overview: 'Designed, developed, and currently maintain the official corporate web presence for the Bangladesh Education and Research Institute (BERI). The platform scales institutional initiatives, service descriptions, and corporate branding through a highly optimized WordPress architecture.',
    features: [
      'Complete WordPress Build: Architected the entire CMS structure, handling bespoke theme deployments, multi-device responsiveness tuning, and systematic page hierarchies.',
      'Corporate Branding & UI: Delivered customized web design assets and seamless frontend integrations reflecting BERI\'s official institutional guidelines.',
      'Performance & PHP Integrations: Modifying and maintaining the backend PHP infrastructure securely to ensure rapid rendering, contact optimizations, and enterprise-level reliability.'
    ]
  },
  {
    num: 22,
    title: 'MAC Technology Australia',
    tech: 'WordPress • PHP • UI/UX Design',
    tags: ['WORDPRESS', 'WEB DESIGN'],
    tagClasses: ['tag-pink', 'tag-green'],
    type: 'Corporate Website',
    linkText: 'Visit Website',
    linkIcon: 'fas fa-globe',
    linkHref: 'https://mactechnology.com.au/',
    overview: 'Designed and developed the official corporate web presence for MAC Technology Australia. The platform showcases IT services, technology consulting solutions, and modern software product lines via a highly optimized WordPress build.',
    features: [
      'Complete WordPress Build: Explicitly architected the entire CMS structure, handling theme implementation, responsiveness tuning, and page hierarchy.',
      'Corporate Branding & UI: Delivered customized web design assets and CSS integrations reflecting MAC Technology\'s brand guidelines.',
      'Performance & PHP Integrations: Maintained underlying PHP infrastructure to ensure rapid load times, contact form security, and enterprise-level reliability.'
    ]
  },
  {
    num: 23,
    title: 'Locus Services',
    tech: 'WordPress • PHP • Cyber Security',
    tags: ['WORDPRESS', 'SECURITY'],
    tagClasses: ['tag-pink', 'tag-green'],
    type: 'Malware Recovery & Customisation',
    linkText: 'Visit Website',
    linkIcon: 'fas fa-shield-alt',
    linkHref: 'https://locusservices.com.au/',
    overview: 'Engineered comprehensive WordPress theme plugin customization and executed a major malware recovery operation. Successfully rescued the platform from hackers by identifying malicious payloads, stripping out remote backdoors, and thoroughly securing the server environment against future intrusions.',
    features: [
      'Removed "Tiny File Manager" Backdoors: Tracked down and deleted backdoor scripts masquerading as legitimate files.',
      'Eradicated PHP "Dropper" Malware: Wiped obfuscated PHP droppers hidden deep within uploads directory.',
      'Cleaned SEO Spam Injection: Removed malicious hooks from Hello Elementor functions.php that hid spam pages from the dashboard.',
      'Performed Deep Audits: direct database audits to confirm only authorized admins remain, scanned codebase for signatures.',
      'Fixed WPvivid Plugin Crash: Configured server parameters to support native zip compression, resolving memory/timeout failures.'
    ]
  },
  {
    num: 24,
    title: 'Themis Family Lawyers',
    tech: 'WordPress • Cyber Security • Malware Recovery',
    tags: ['WORDPRESS', 'SECURITY'],
    tagClasses: ['tag-pink', 'tag-green'],
    type: 'Malware Recovery & Development',
    linkText: 'Visit Website',
    linkIcon: 'fas fa-shield-alt',
    linkHref: 'https://themisfamilylawyers.com.au/',
    overview: 'Developed the complete WordPress website and later executed a critical cyber security recovery. Rescued the platform from hackers by identifying and removing unauthorized administrative accounts, cleaning injected malware from the backend, and properly securing the system.',
    features: [
      'Complete WordPress Development: Designed website focused on client presentation and responsiveness.',
      'Rogue Admin Audits: Found and removed unauthorized users in DB.',
      'System Hardening: Structured strict security configurations blocking future attacks.'
    ]
  }
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div>
      <header className="page-header">
        <div data-aos="fade-up">
          <h1>Notable Projects</h1>
          <p>
            A detailed collection of my work, experiments, and open-source contributions. Click any row to expand details.
          </p>
        </div>
      </header>

      <main className="projects-container">
        <div className="projects-header-row">
          <div>TITLE / TECH STACK</div>
          <div>TAGS</div>
          <div>TYPE</div>
          <div>LINK</div>
        </div>

        {projects.map((proj, index) => {
          const isActive = activeIndex === index;
          return (
            <div 
              key={proj.num} 
              className={`project-row ${isActive ? 'active' : ''}`} 
              data-aos="fade-up"
            >
              <div className="project-summary" onClick={() => toggleAccordion(index)}>
                <div className="col-title">
                  <h3>{proj.title}</h3>
                  <div className="tech-stack">{proj.tech}</div>
                </div>
                <div className="col-tags">
                  {proj.tags.map((t, idx) => (
                    <span key={t} className={`tag ${proj.tagClasses[idx] || 'tag-blue'}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="col-type">{proj.type}</div>
                <div className="col-link">
                  <a 
                    href={proj.linkHref} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className={proj.linkIcon}></i> {proj.linkText}
                  </a>
                </div>
                <div className="col-toggle">
                  <i className={`fas ${isActive ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </div>
              </div>
              <div 
                className="project-details" 
                style={{ 
                  maxHeight: isActive ? '1000px' : '0px', 
                  overflow: 'hidden', 
                  transition: 'max-height 0.4s ease-out' 
                }}
              >
                <div className="project-details-content">
                  <h4>Overview</h4>
                  <p>{proj.overview}</p>
                  <br />
                  <h4>Key Features & Implementation</h4>
                  <ul>
                    {proj.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        {feat.includes(':') ? (
                          <>
                            <strong>{feat.split(':')[0]}:</strong>
                            {feat.split(':').slice(1).join(':')}
                          </>
                        ) : (
                          feat
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
