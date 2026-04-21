import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Projects() {
  useEffect(() => {
    // shihab_toggleAccordion: accordion open/close handler for sshihabb007's projects list
    window.shihab_toggleAccordion = function(sshihabb007_element) {
      const mehedi_row = sshihabb007_element.parentElement;
      const shihab_details = sshihabb007_element.nextElementSibling;
      const sshihabb007_icon = sshihabb007_element.querySelector('.col-toggle i');
      document.querySelectorAll('.project-row.active').forEach(mehedi_item => {
          if(mehedi_item !== mehedi_row) {
              mehedi_item.classList.remove('active');
              mehedi_item.querySelector('.project-details').style.maxHeight = null;
              mehedi_item.querySelector('.col-toggle i').classList.replace('fa-chevron-up', 'fa-chevron-down');
          }
      });
      if (mehedi_row.classList.contains('active')) {
          mehedi_row.classList.remove('active');
          shihab_details.style.maxHeight = null;
          sshihabb007_icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
      } else {
          mehedi_row.classList.add('active');
          shihab_details.style.maxHeight = shihab_details.scrollHeight + "px";
          sshihabb007_icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
      }
    };
  }, []);
  return (
    <>


    {/* Navbar */}
    <Navbar />

    {/* Page Header */}
    <header className="page-header">
        <h1>Notable Projects</h1>
        <p>A detailed collection of my work, experiments, and open-source contributions. Click any row to expand details.</p>
    </header>

    {/* Projects List */}
    <main className="projects-container">
        {/* Desktop Header Row */}
        <div className="projects-header-row">
            <div>TITLE / TECH STACK</div>
            <div>TAGS</div>
            <div>TYPE</div>
            <div>LINK</div>
        </div>

        {/* Project 1 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>ReactJs Online SmartPhone Shop</h3>
                    <div className="tech-stack">React.js • JavaScript</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-blue">REACT</span>
                    <span className="tag tag-purple">E-COMMERCE</span>
                </div>
                <div className="col-type">Frontend App</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/ReactJs---Online-SmartPhone-Shop" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>A modern, modular e-commerce interface built natively using React.js. Provides users with a dynamic, highly responsive smartphone shopping and catalog-browsing experience across devices.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li><strong>Component-Based Layout:</strong> Reusable React components rendering cart logistics and store catalog displays cleanly.</li>
                        <li><strong>State Management:</strong> Real-time user shopping cart functionality tracking items seamlessly over user navigation.</li>
                        <li><strong>Reactive UI:</strong> Smooth DOM rendering powered by Virtual DOM logic ensuring rapid visual updates and zero-reload product filtering.</li>
                    </ul>
                </div>
            </div>
        </div>{/* Project 2 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>SHIHAB-SmartBook</h3>
                    <div className="tech-stack">Java</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-blue">JAVA</span>
                    <span className="tag tag-green">APPLICATION</span>
                </div>
                <div className="col-type">Desktop App</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/SHIHAB-SmartBook" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>SHIHAB SmartBook Application: A core Java application illustrating object-oriented programming methodologies encompassing typical directory tasks.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>Extensive file I/O operations storing local directory datasets.</li>
                        <li>Complex array processing algorithms manipulating addresses and telephone registers.</li>
                        <li>Implementation of MVC software patterns relying gracefully strictly on Java Swing GUIs.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 3 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>AIUB Online Forum</h3>
                    <div className="tech-stack">ASP.NET • SQL Server</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-green">WEB DEV</span>
                    <span className="tag tag-purple">SOCIAL</span>
                </div>
                <div className="col-type">Academic Platform</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/AIUB-Online-Forum-ASP.NET-" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>An online forum functioning like a social website. Registered users can post, like, comment, report, and seamlessly interact with each other.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>Secure user authentication and authorization system.</li>
                        <li>Interactive posting mechanism supporting likes and threaded comments.</li>
                        <li>Robust backend database constructed with SQL Server.</li>
                        <li>Admin moderation tools allowing content control and user management.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 4 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>Online Smartphone Shop</h3>
                    <div className="tech-stack">PHP • JavaScript • AJAX • jQuery</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-blue">E-COMMERCE</span>
                    <span className="tag tag-orange">PHP STACK</span>
                </div>
                <div className="col-type">E-Commerce</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/Online-Smartphone-Shop-PhP-JAVASCRIPT-AJAX-Jquery-CSS-" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>A dynamic e-commerce website where customers can buy various smartphones securely, and admins exercise full control over product management.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>Dynamic product catalog loading with AJAX for seamless filtering without page reloads.</li>
                        <li>Interactive UI powered by jQuery and JavaScript for cart management.</li>
                        <li>Comprehensive PHP backend handling secure order processing.</li>
                        <li>Admin dashboard to add, edit, or remove inventory and manage users.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 5 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>AI English Test Assistance</h3>
                    <div className="tech-stack">Node.js • WebSockets • Vertex AI</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-orange">AI</span>
                    <span className="tag tag-blue">CHATBOT</span>
                </div>
                <div className="col-type">Education Tech</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/AIELTS" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>An immersive English practice application offering real-time mock tests. It integrates the Google Gemini Live API leveraging Vertex AI for automated evaluations and real-time voice streaming interactions. Provides full-screen simulated testing scenarios for Reading, Writing, and Speaking modules.</p>
                    <br />
                    <h4>Key Features & Technologies</h4>
                    <ul>
                        <li><strong>Real-time Voice Chat:</strong> Implements WebSockets (via Node.js and a PHP proxy) to stream audio data back and forth communicating with the Gemini Live API.</li>
                        <li><strong>Automated Assessment:</strong> Grades text and spoken simulated tasks dynamically using official language test band descriptors governed by robust system instructions.</li>
                        <li><strong>Speech Integration:</strong> Includes full utilization of browser SpeechRecognition and SpeechSynthesis APIs to smoothly replicate examiner interactions.</li>
                        <li><strong>Tech Stack:</strong> Node.js WebSocket proxies, comprehensive PHP backends processing asynchronous events, secure OAuth2 key authentication, React-based interfaces, and Express endpoints.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 6 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>Hospital Management System</h3>
                    <div className="tech-stack">Oracle PL/SQL • C#</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-purple">DESKTOP APP</span>
                    <span className="tag tag-green">DATABASE</span>
                </div>
                <div className="col-type">Management System</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/Hospital-Management-System-by-Oracle-10G-and-PLSQL" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>A robust C#-based desktop application integrated deeply with an Oracle Database architecture.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>Custom triggers, procedures, & functions developed in PL/SQL.</li>
                        <li>Detailed tracking of patient admission, discharge, and history.</li>
                        <li>Efficient billing system calculating costs interactively.</li>
                        <li>Reliable database architecture capable of resolving concurrently updated records efficiently.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 7 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>Inventory Management System</h3>
                    <div className="tech-stack">C# • .NET</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-purple">DESKTOP APP</span>
                    <span className="tag tag-orange">UTILITY</span>
                </div>
                <div className="col-type">Management System</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/Inventory_Management_System_C-" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>A localized desktop application streamlining daily goods transactions and facilitating advanced admin inventory tracking.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>Intuitive UI developed with C# Windows Forms.</li>
                        <li>Real-time stock level monitoring.</li>
                        <li>Supplier and product registration.</li>
                        <li>Automated reports generation for regular sales margins.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 8 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>ASP.NET Projects Demo</h3>
                    <div className="tech-stack">ASP.NET • HTML • C#</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-pink">ASP.NET</span>
                    <span className="tag tag-green">C#</span>
                </div>
                <div className="col-type">Demo Package</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/ASP.NET-projects-HTML-demo" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>Repository tracking custom classes and complex HTML structural mappings utilized repeatedly during full-stack developmental tests regarding ASP.NET solutions.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>HTML boilerplate arrays explicitly modular validating quick full-stack deployment tests.</li>
                        <li>C# controllers tracking session configurations precisely.</li>
                        <li>Architectural demonstrations structuring code cleanly avoiding tight couplings.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 9 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>WAI APAC Awards Rasa Chatbot</h3>
                    <div className="tech-stack">Python • Rasa 2.1.2 • TensorFlow</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-orange">AI</span>
                    <span className="tag tag-blue">CHATBOT</span>
                </div>
                <div className="col-type">Virtual Assistant</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/AI-CHATBOT-PROJECT" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>A conversational AI assistant (chatbot) built using the open-source Rasa framework. It is designed to answer frequently asked questions and assist users regarding the Women in AI (WAI) APAC Awards 2023.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>Understands and manages a wide array of intents: Application Deadlines, Fees, Judging Process, and Location Restrictions.</li>
                        <li>NLU Pipeline utilizing CountVectorsFeaturizer, DIETClassifier, and FallbackClassifier.</li>
                        <li>Dialogue Management using TEDPolicy, MemoizationPolicy, and RulePolicy.</li>
                        <li>Trained and built with Python 3.7.13, Tensorflow 2.3.4, and Scikit-Learn 0.23.2.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 10 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>Budget Shop & Care Connects</h3>
                    <div className="tech-stack">WordPress • PHP • Bootstrap</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-green">WORDPRESS</span>
                    <span className="tag tag-blue">PAYMENTS</span>
                </div>
                <div className="col-type">Professional Websites</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>Multiple professional online tech and e-commerce websites built heavily relying on robust CMS implementations.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>Handling of real-time payments via Bkash, Rocket, and Bank Transfers.</li>
                        <li>Development of customized themes with Bootstrap for maximum responsiveness.</li>
                        <li>Extending WordPress capabilities dynamically through tailored PHP plugins.</li>
                        <li>Optimization for high concurrency web-traffic load.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 11 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>Shihab Site Auditor Pro</h3>
                    <div className="tech-stack">JavaScript • HTML • CSS</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-orange">JAVASCRIPT</span>
                    <span className="tag tag-purple">WEB TOOL</span>
                </div>
                <div className="col-type">SEO Tool</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/Shihab-Site-Auditor-pro" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>An advanced SEO and site auditing tool designed to fetch granular web page metrics for optimization tracking.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>DOM manipulation algorithms evaluating keyword density, heading structure, and meta properties.</li>
                        <li>Reporting system returning detailed action points for optimization.</li>
                        <li>Pure JavaScript solution executing securely on the client-side without a persistent database.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 12 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>SITE-ANALYTICS-BY-SHIHAB</h3>
                    <div className="tech-stack">PHP • MySQL</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-pink">PHP</span>
                    <span className="tag tag-orange">ANALYTICS</span>
                </div>
                <div className="col-type">Tracking Tool</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/SITE-ANALYTICS-BY-SHIHAB" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>Custom Site Analytics tool formulated via pure PHP ensuring zero-overhead while tracking site metrics effectively.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>IP tracking processing geo-locations via associated metadata.</li>
                        <li>Session monitoring logic estimating unique page impressions.</li>
                        <li>MySQL persistent tracking mechanism structured highly normalized.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 13 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>PC Power Calculator</h3>
                    <div className="tech-stack">HTML • JavaScript</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-green">HTML</span>
                    <span className="tag tag-purple">CALCULATOR</span>
                </div>
                <div className="col-type">Web Tool</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/PC-Power-Calculator" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>A web-based tool seamlessly providing dynamically calculated PC power consumptions estimates based on selected hardware arrays.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>Dynamic event listeners calculating real-time numeric shifts on varied component selection.</li>
                        <li>Extensive mock database detailing hundreds of exact product energy ratings (TDP).</li>
                        <li>PWA scalable web design enabling fully responsive layouts hosted entirely on GitHub Pages.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 14 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>TAX-Calculator</h3>
                    <div className="tech-stack">HTML • JavaScript</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-green">HTML</span>
                    <span className="tag tag-blue">FINANCE</span>
                </div>
                <div className="col-type">Finance App</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/TAX-Calculator" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>A web-based financial aid mapping multi-tier tax brackets algorithms to securely determine final user tax liabilities.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>Tiered marginal tracking utilizing sophisticated conditional flow arrays.</li>
                        <li>Robust form validation algorithms prior calculations triggering.</li>
                        <li>Instantaneous metric processing with clean modular JavaScript UI rendering.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 15 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>google-photos-album-url-fetch</h3>
                    <div className="tech-stack">Node.js • NPM</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-green">NPM</span>
                    <span className="tag tag-purple">API</span>
                </div>
                <div className="col-type">Library / Package</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/google-photos-album-image-url-fetch" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>A utility package resolving programmatic extractions of image URLs off Google Photos Albums architectures.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>Puppeteer usage scripting web manipulation navigating unauthenticated environments.</li>
                        <li>Scraping module retrieving explicit high-res CDN URIs efficiently.</li>
                        <li>NPM global publishing and semantic version tracking implementations.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 16 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>AIUB-Grading-System</h3>
                    <div className="tech-stack">C++</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-blue">C++</span>
                    <span className="tag tag-orange">EDUCATION</span>
                </div>
                <div className="col-type">Utility Tool</div>
                <div className="col-link">
                    <a  href="https://github.com/sshihabb007/AIUB-Grading-System-C-" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fab fa-github"></i> Source code</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>C++ project heavily structured upon dynamic arrays interpreting precise grading parameters scaling algorithmically towards entire universities.</p>
                    <br />
                    <h4>Key Features & Implementation</h4>
                    <ul>
                        <li>Struct and Class implementation forming student profiles dynamically upon console allocations.</li>
                        <li>CGPA conversion metrics mathematically tracking precision floats safely.</li>
                        <li>Pure generic C++ logic demonstrating highly optimized heap storage allocations.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 17 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>Hypex Web Platform & Subnetworks</h3>
                    <div className="tech-stack">WordPress • PHP • Custom Plugins</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-pink">WORDPRESS</span>
                    <span className="tag tag-blue">PHP</span>
                </div>
                <div className="col-type">Production Site</div>
                <div className="col-link">
                    <a  href="https://hypex.co.uk/" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fas fa-globe"></i> Visit Website</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>A comprehensive ecosystem of WordPress-based platforms developed for Hypex. The project covers the main site as well as integrated secondary networks.</p>
                    <br />
                    <h4>Key Features & Responsibilities</h4>
                    <ul>
                        <li><strong>Theme Customization:</strong> Delivered a styled and converted WordPress theme built to match specific branding operations across the main domain and subsites.</li>
                        <li><strong>Plugin Development & PHP:</strong> Programmed custom WordPress plugins and modified core PHP logic to introduce new technical capabilities.</li>
                        <li><strong>Subsite Connectivity:</strong> Deployed and managed interconnected platforms including <a  href="https://axing.uk/" target="_blank" style={{color: 'var(--highlight)'}}>Axing UK</a> and the <a  href="https://blog.hypex.co.uk/" target="_blank" style={{color: 'var(--highlight)'}}>Hypex Blog</a>.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 18 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>BERI Bangladesh</h3>
                    <div className="tech-stack">WordPress • PHP • UI/UX Design</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-pink">WORDPRESS</span>
                    <span className="tag tag-green">WEB DESIGN</span>
                </div>
                <div className="col-type">Corporate Website</div>
                <div className="col-link">
                    <a  href="https://www.beri.com.bd/" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fas fa-globe"></i> Visit Website</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>Designed, developed, and currently maintain the official corporate web presence for the Bangladesh Education and Research Institute (BERI). The platform scales institutional initiatives, service descriptions, and corporate branding through a highly optimized WordPress architecture.</p>
                    <br />
                    <h4>Key Features & Responsibilities</h4>
                    <ul>
                        <li><strong>Complete WordPress Build:</strong> Architected the entire CMS structure, handling bespoke theme deployments, multi-device responsiveness tuning, and systematic page hierarchies.</li>
                        <li><strong>Corporate Branding & UI:</strong> Delivered customized web design assets and seamless frontend integrations reflecting BERI's official institutional guidelines.</li>
                        <li><strong>Performance & PHP Integrations:</strong> Modifying and maintaining the backend PHP infrastructure securely to ensure rapid rendering, contact optimizations, and enterprise-level reliability.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 19 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>MAC Technology Australia</h3>
                    <div className="tech-stack">WordPress • PHP • UI/UX Design</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-pink">WORDPRESS</span>
                    <span className="tag tag-green">WEB DESIGN</span>
                </div>
                <div className="col-type">Corporate Website</div>
                <div className="col-link">
                    <a  href="https://mactechnology.com.au/" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fas fa-globe"></i> Visit Website</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>Designed and developed the official corporate web presence for MAC Technology Australia. The platform showcases IT services, technology consulting solutions, and modern software product lines via a highly optimized WordPress build.</p>
                    <br />
                    <h4>Key Features & Responsibilities</h4>
                    <ul>
                    </ul>
                </div>
            </div>
        </div>

        {/* Project 20 */}
        <div className="project-row">
            <div className="project-summary" onClick={(e) => window.shihab_toggleAccordion(e.currentTarget)}>
                <div className="col-title">
                    <h3>Locus Services</h3>
                    <div className="tech-stack">WordPress • Cyber Security • PHP</div>
                </div>
                <div className="col-tags">
                    <span className="tag tag-pink">WORDPRESS</span>
                    <span className="tag tag-orange">SECURITY</span>
                </div>
                <div className="col-type">Production Backup & Fix</div>
                <div className="col-link">
                    <a href="https://locusservices.com.au/" target="_blank" onClick={(e) => e.stopPropagation()}><i className="fas fa-globe"></i> Visit Website</a>
                </div>
                <div className="col-toggle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className="project-details">
                <div className="project-details-content">
                    <h4>Overview</h4>
                    <p>Performed extensive WP theme and plugin customization. Most critically, orchestrated a full cybersecurity recovery of the platform after detecting severe malware backdoors and SEO spam injections orchestrated by black-hat hackers.</p>
                    <br />
                    <h4>Key Security Recovery & Implementations</h4>
                    <ul>
                        <li><strong>Removed "Tiny File Manager" Backdoors:</strong> Identified and purged disguised remote-access scripts (<code>index-info.php</code>, <code>functions-dns.php</code>, <code>functions-character.php</code>) left by attackers.</li>
                        <li><strong>Eradicated PHP "Dropper" Malware:</strong> Tracked down and permanently deleted obfuscated payload generators (e.g., <code>scorpion.php</code>, <code>gorilla.php</code>) hidden deep in the <code>wp-content/uploads/</code> directories.</li>
                        <li><strong>Cleaned SEO Spam Injection & Restored Dashboard:</strong> Excised a malicious code block hooked into <code>pre_get_posts</code> inside the Hello Elementor functions.php file, which deliberately hid spam pages from the WordPress Admin dashboard. Eliminated over 19,000+ generated spam blog posts.</li>
                        <li><strong>Deep System & User Audit:</strong> Ran database queries to ensure <code>Locusadmin</code> remained the sole authorized user. Validated the integrity of core files (<code>wp-config.php</code>, <code>.htaccess</code>) and actively scanned the entire WP installation for eval/base64 malware signatures.</li>
                        <li><strong>Fixed WPvivid Backup Plugin Crash:</strong> Adjusted the native <code>php.ini</code> server configuration to uncover the native zip extension, circumventing PclZip memory crashes during large 143MB database extraction requests.</li>
                    </ul>
                </div>
            </div>
        </div>

    </main>

    {/* Footer */}
    <footer style={{textAlign: 'center', padding: '40px 20px', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
        <div style={{marginBottom: '20px'}}>
            <Link to="/contact" className="btn btn-outline" style={{fontSize: '0.85rem', padding: '8px 16px'}}><i className="fas fa-envelope"></i> Contact Me</Link>
        </div>
        <p>&copy; 2024 Mehedi Hasan Shihab. All rights reserved.</p>
    </footer>


    </>
  );
}
