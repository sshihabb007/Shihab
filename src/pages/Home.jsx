import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>


    {/* Navbar */}
    <Navbar />

    {/* Hero */}
    <header className="hero">
        <div className="hero-content">
            <div className="hero-profile-wrapper">
                <img src="/asset/Shihab.jpg" alt="Mehedi Hasan Shihab" className="hero-profile-img" />
                <div className="hero-profile-info">
                    <h2 className="hero-name"><a  href="https://www.linkedin.com/in/mehedi-hasan-shihab-30a445b6/"
                            target="_blank" style={{color: 'inherit', textDecoration: 'none'}}>Mehedi Hasan Shihab</a></h2>
                    <p className="hero-subtitle">Sr. Software Engineer | Full-Stack Developer | AI Developer</p>
                    <div className="social-btn-group">
                        <a  href="https://www.linkedin.com/in/mehedi-hasan-shihab-30a445b6/" target="_blank"
                            className="btn-social btn-linkedin">LINKEDIN</a>
                        <a  href="https://github.com/sshihabb007" target="_blank" className="btn-social btn-github"><i
                                className="fab fa-github"></i> GITHUB</a>
                        <a  href="mailto:sshihabb007@gmail.com" className="btn-social btn-email"><span
                                style={{fontWeight: '900', fontFamily: 'Arial,sans-serif', fontSize: '0.9rem'}}>M</span>
                            EMAIL</a>
                        <a  href="https://www.facebook.com/sshihabb007/" target="_blank"
                            className="btn-social btn-facebook"><i className="fab fa-facebook-f"></i> FACEBOOK</a>
                    </div>
                </div>
            </div>
            <hr className="hero-divider" style={{marginBottom: '40px'}} />

            <h1>Track What Matters in My Output</h1>
            <p>A hard-working, fast learner and self-motivated Web & Software Developer.Exploring Web Development,
                Gemini/OpenAI LLM model Training, Javascript, React.js, Node.js, Php, ASP.NET, MySQL, and beyond.</p>
            <div className="btn-group">
                <Link to="/projects" className="btn btn-primary">Browse Projects</Link>
                <a  href="#experience" className="btn btn-outline">Explore Experience</a>
                <a  href="/asset/shihabCV.pdf" target="_blank" className="btn btn-outline" style={{border: '1px solid white'}}><i
                        className="fas fa-download"></i> Download Resume</a>
            </div>
        </div>
    </header>

    {/* Stats Banner */}
    <section className="stats-banner">
        <div className="stat-box">
            <h2>18+</h2>
            <p>Notable<br />Projects</p>
        </div>
        <div className="stat-box">
            <h2>7+</h2>
            <p>Years<br />Experience</p>
        </div>
        <div className="stat-box">
            <h2>14</h2>
            <p>Technical<br />Proficiencies</p>
        </div>
        <div className="stat-box">
            <h2>3.77</h2>
            <p>M.Sc.<br />CGPA</p>
        </div>
        <div className="stat-box">
            <h2>3.65</h2>
            <p>B.Sc.<br />CGPA</p>
        </div>
    </section>

    {/* Main Content */}
    <main className="container">
        {/* Left Column */}
        <div className="content-left">
            <div className="section-head">
                <i className="fas fa-trophy"></i> Top Projects
            </div>

            <div className="data-list" id="projects">
                {/* Project 1 */}
                <div className="data-row">
                    <div className="row-number">1</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/ReactJs---Online-SmartPhone-Shop" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>ReactJs Online SmartPhone Shop <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">React.js • JavaScript • Frontend</p>
                        <p className="desc">A modern, responsive e-commerce interface built using React for seamlessly
                            browsing and interacting with a smartphone marketplace.</p>
                        <div className="tags">
                            <span className="tag tag-blue">REACT</span>
                            <span className="tag tag-orange">JAVASCRIPT</span>
                            <span className="tag tag-purple">E-COMMERCE</span>
                        </div>
                    </div>
                </div>{/* Project 2 */}
                <div className="data-row">
                    <div className="row-number">2</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/SHIHAB-SmartBook" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>SHIHAB-SmartBook <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">Java • GitHub Repo</p>
                        <p className="desc">SHIHAB SmartBook Application.</p>
                        <div className="tags">
                            <span className="tag tag-blue">JAVA</span>
                            <span className="tag tag-green">APPLICATION</span>
                        </div>
                    </div>
                </div>

                {/* Project 3 */}
                <div className="data-row">
                    <div className="row-number">3</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/AIUB-Online-Forum-ASP.NET-" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>AIUB Online Forum <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">ASP.NET • Academic Platform</p>
                        <p className="desc">An online forum functioning like a social website. Registered users can post,
                            like, comment, report, and seamlessly interact with each other.</p>
                        <div className="tags">
                            <span className="tag tag-green">WEB DEVELOPMENT</span>
                            <span className="tag tag-purple">SOCIAL PLATFORM</span>
                        </div>
                    </div>
                </div>

                {/* Project 4 */}
                <div className="data-row">
                    <div className="row-number">4</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/Online-Smartphone-Shop-PhP-JAVASCRIPT-AJAX-Jquery-CSS-"
                                target="_blank" style={{color: 'inherit', textDecoration: 'none'}}>Online Smartphone Shop <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">PHP • JavaScript • AJAX • jQuery</p>
                        <p className="desc">A dynamic e-commerce website where customers can buy various smartphones
                            securely, and admins exercise full control over product management.</p>
                        <div className="tags">
                            <span className="tag tag-blue">E-COMMERCE</span>
                            <span className="tag tag-orange">PHP STACK</span>
                        </div>
                    </div>
                </div>

                {/* Project 5 */}
                <div className="data-row">
                    <div className="row-number">5</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/AIELTS" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>AI English Test Assistance - Gemini
                                Chatbot <i className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">Node.js • React • PHP • WebSockets</p>
                        <p className="desc">Real-time English test practice application featuring fully automated Speaking,
                            Reading, and Writing test simulations evaluated by Vertex AI.</p>
                        <div className="tags">
                            <span className="tag tag-orange">AI</span>
                            <span className="tag tag-blue">CHATBOT</span>
                            <span className="tag tag-green">EDUCATION</span>
                        </div>
                    </div>
                </div>

                {/* Project 6 */}
                <div className="data-row">
                    <div className="row-number">6</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/Hospital-Management-System-by-Oracle-10G-and-PLSQL"
                                target="_blank" style={{color: 'inherit', textDecoration: 'none'}}>Hospital Management
                                System <i className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">Oracle PL/SQL • C#</p>
                        <p className="desc">A robust C#-based desktop application. Custom triggers, procedures, & functions
                            were developed for a comprehensive database ecosystem.</p>
                        <div className="tags">
                            <span className="tag tag-purple">DESKTOP APP</span>
                            <span className="tag tag-green">DATABASE MANAGEMENT</span>
                        </div>
                    </div>
                </div>

                {/* Project 7 */}
                <div className="data-row">
                    <div className="row-number">7</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/Inventory_Management_System_C-" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>Inventory Management System <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">C#</p>
                        <p className="desc">A localized desktop application streamlining daily goods transactions and
                            facilitating advanced admin inventory tracking.</p>
                        <div className="tags">
                            <span className="tag tag-purple">DESKTOP APP</span>
                            <span className="tag tag-orange">UTILITY</span>
                        </div>
                    </div>
                </div>

                {/* Project 8 */}
                <div className="data-row">
                    <div className="row-number">8</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/ASP.NET-projects-HTML-demo" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>ASP.NET-projects-HTML-demo <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">C# / HTML • GitHub Repo</p>
                        <p className="desc">C# Classes and ASP.NET project HTML UI demonstrations.</p>
                        <div className="tags">
                            <span className="tag tag-pink">ASP.NET</span>
                            <span className="tag tag-green">C#</span>
                        </div>
                    </div>
                </div>

                {/* Project 9 */}
                <div className="data-row">
                    <div className="row-number">9</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/AI-CHATBOT-PROJECT" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>WAI APAC Awards 2023 - Rasa Chatbot <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">Python • Rasa • Machine Learning</p>
                        <p className="desc">A trained conversational AI assistant built using the open-source Rasa framework
                            to guide users through the WAI APAC Awards process.</p>
                        <div className="tags">
                            <span className="tag tag-orange">AI</span>
                            <span className="tag tag-blue">CHATBOT</span>
                        </div>
                    </div>
                </div>

                {/* Project 10 */}
                <div className="data-row">
                    <div className="row-number">10</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>Budget Shop & Care Connects <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">WordPress • PHP • Bootstrap</p>
                        <p className="desc">Multiple professional online tech and e-commerce websites handling payments via
                            Bkash, Rocket, and Bank Transfers.</p>
                        <div className="tags">
                            <span className="tag tag-green">WORDPRESS</span>
                            <span className="tag tag-blue">PAYMENT GATEWAYS</span>
                        </div>
                    </div>
                </div>

                {/* Project 11 */}
                <div className="data-row">
                    <div className="row-number">11</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/Shihab-Site-Auditor-pro" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>Shihab Site Auditor pro <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">JavaScript • GitHub Repo</p>
                        <p className="desc">Advanced SEO and site auditing tool.</p>
                        <div className="tags">
                            <span className="tag tag-orange">JAVASCRIPT</span>
                            <span className="tag tag-purple">WEB TOOL</span>
                        </div>
                    </div>
                </div>

                {/* Project 12 */}
                <div className="data-row">
                    <div className="row-number">12</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/SITE-ANALYTICS-BY-SHIHAB" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>SITE-ANALYTICS-BY-SHIHAB <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">PHP • GitHub Repo</p>
                        <p className="desc">Custom Site Analytics tool for tracking metrics.</p>
                        <div className="tags">
                            <span className="tag tag-pink">PHP</span>
                            <span className="tag tag-orange">ANALYTICS</span>
                        </div>
                    </div>
                </div>

                {/* Project 13 */}
                <div className="data-row">
                    <div className="row-number">13</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/PC-Power-Calculator" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>PC-Power-Calculator <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">HTML / JavaScript • GitHub Pages</p>
                        <p className="desc">A web-based tool to dynamically calculate PC power consumption.</p>
                        <div className="tags">
                            <span className="tag tag-green">HTML</span>
                            <span className="tag tag-purple">CALCULATOR</span>
                        </div>
                    </div>
                </div>

                {/* Project 14 */}
                <div className="data-row">
                    <div className="row-number">14</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/TAX-Calculator" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>TAX-Calculator <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">HTML / JavaScript • GitHub Pages</p>
                        <p className="desc">A web-based finance app to rapidly calculate tax liabilities.</p>
                        <div className="tags">
                            <span className="tag tag-green">HTML</span>
                            <span className="tag tag-blue">FINANCE</span>
                        </div>
                    </div>
                </div>

                {/* Project 15 */}
                <div className="data-row">
                    <div className="row-number">15</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/Pricevisible" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>Pricevisible <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">PHP • GitHub Repo</p>
                        <p className="desc">PHP based application repository.</p>
                        <div className="tags">
                            <span className="tag tag-pink">PHP</span>
                        </div>
                    </div>
                </div>

                {/* Project 16 */}
                <div className="data-row">
                    <div className="row-number">16</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/google-photos-album-image-url-fetch" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>google-photos-album-url-fetch <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">Forked NPM Package • Node.js</p>
                        <p className="desc">A utility package to fetch image URLs from Google Photos Albums.</p>
                        <div className="tags">
                            <span className="tag tag-green">NPM</span>
                            <span className="tag tag-purple">API</span>
                        </div>
                    </div>
                </div>

                {/* Project 17 */}
                <div className="data-row">
                    <div className="row-number">17</div>
                    <div className="row-content">
                        <h3><a  href="https://github.com/sshihabb007/AIUB-Grading-System-C-" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>AIUB-Grading-System <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">C++ • GitHub Repo</p>
                        <p className="desc">C++ project designed for processing the grading system at AIUB.</p>
                        <div className="tags">
                            <span className="tag tag-blue">C++</span>
                            <span className="tag tag-orange">EDUCATION</span>
                        </div>
                    </div>
                </div>

                {/* Project 18 */}
                <div className="data-row">
                    <div className="row-number">18</div>
                    <div className="row-content">
                        <h3><a  href="https://hypex.co.uk/" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>Hypex Web Platform & Subnetworks <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">WordPress • PHP • Plugin Development</p>
                        <p className="desc">A dynamic WordPress platform featuring deep theme customization, custom plugin
                            development, and core PHP adjustments. Includes connected subsites like Axing UK and Hypex
                            Blog.</p>
                        <div className="tags">
                            <span className="tag tag-pink">WORDPRESS</span>
                            <span className="tag tag-blue">PHP</span>
                        </div>
                    </div>
                </div>

                {/* Project 19 */}
                <div className="data-row">
                    <div className="row-number">19</div>
                    <div className="row-content">
                        <h3><a  href="https://mactechnology.com.au/" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>MAC Technology Australia <i
                                    className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">WordPress • Web Design • PHP</p>
                        <p className="desc">Engineered and visually designed the official corporate website for MAC
                            Technology Australia, implementing robust WordPress structures and responsive UI components.
                        </p>
                        <div className="tags">
                            <span className="tag tag-pink">WORDPRESS</span>
                            <span className="tag tag-blue">PHP</span>
                            <span className="tag tag-green">WEB DESIGN</span>
                        </div>
                    </div>
                </div>

                {/* Project 20 */}
                <div className="data-row">
                    <div className="row-number">20</div>
                    <div className="row-content">
                        <h3><a  href="https://www.beri.com.bd/" target="_blank"
                                style={{color: 'inherit', textDecoration: 'none'}}>BERI - Bangladesh Education and Research
                                Institute <i className="fas fa-external-link-alt" style={{fontSize: '0.7em'}}></i></a></h3>
                        <p className="meta">WordPress • Web Design • PHP</p>
                        <p className="desc">Architected and actively maintain the official corporate web presence for BERI,
                            deploying custom UI features and robust WordPress integrations.</p>
                        <div className="tags">
                            <span className="tag tag-pink">WORDPRESS</span>
                            <span className="tag tag-blue">PHP</span>
                            <span className="tag tag-green">WEB DESIGN</span>
                        </div>
                    </div>
                </div>



            </div>

            <div className="section-head" style={{marginTop: '40px'}}>
                <i className="fas fa-briefcase"></i> Work Experience
            </div>
            <div className="data-list" id="experience">
                {/* Exp 1 */}
                <div className="data-row">
                    <div className="row-number"><i className="fas fa-building" style={{fontSize: '0.9rem'}}></i></div>
                    <div className="row-content">
                        <h3>Senior Software Engineer @ Bangladesh Education and Research Institute (BERI)</h3>
                        <p className="meta">Mar 2022 - Present • Dhaka, Bangladesh</p>
                        <p className="desc">Spearheaded Web Development and Application Maintenance. Additionally involved
                            in technical content writing, programming implementations, and executing video edits for
                            media outreach.</p>
                        <div className="tags">
                            <span className="tag tag-blue">FULL TIME</span>
                            <span className="tag tag-green">WEB DEV</span>
                        </div>
                    </div>
                </div>

                {/* Exp 2 */}
                <div className="data-row">
                    <div className="row-number"><i className="fas fa-building" style={{fontSize: '0.9rem'}}></i></div>
                    <div className="row-content">
                        <h3>Web Developer (Remote) @ MAC Technology Australia Pty Ltd.</h3>
                        <p className="meta">Nov 2022 - Present • Nailsworth, SA</p>
                        <p className="desc">Handled remote web development projects, client-specific feature
                            implementations, high-level IT Support, and graphic designing tasks.</p>
                        <div className="tags">
                            <span className="tag tag-orange">REMOTE</span>
                            <span className="tag tag-blue">IT SUPPORT</span>
                        </div>
                    </div>
                </div>

                {/* Exp 3 */}
                <div className="data-row">
                    <div className="row-number"><i className="fas fa-building" style={{fontSize: '0.9rem'}}></i></div>
                    <div className="row-content">
                        <h3>Officer, IT @ i - Global Services</h3>
                        <p className="meta">Sep 2019 - Mar 2020 • Mirpur-10, Dhaka, Bangladesh</p>
                        <p className="desc">Responsibilities included Web Development and Maintenance, IT Support, and
                            Graphics Designing.</p>
                        <div className="tags">
                            <span className="tag tag-pink">WEB DEV</span>
                            <span className="tag tag-blue">IT SUPPORT</span>
                            <span className="tag tag-green">DESIGN</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="content-right">

            <div className="sidebar-panel">
                <h3><i className="fas fa-chart-line"></i> Trending Skills</h3>
                <div className="pill-tags">
                    <span className="pill">JavaScript (AJAX/jQuery)</span>
                    <span className="pill">C/C++</span>
                    <span className="pill">Java</span>
                    <span className="pill">C#</span>
                    <span className="pill">Python</span>
                    <span className="pill">PHP</span>
                    <span className="pill">ASP.NET</span>
                    <span className="pill">WordPress</span>
                    <span className="pill">Vertex AI</span>
                    <span className="pill">AI Model Training</span>
                    <span className="pill">AI Automation</span>
                    <span className="pill">Oracle PL/SQL</span>
                    <span className="pill">CRM</span>
                    <span className="pill">Video Editing</span>
                    <span className="pill">Graphics Designing</span>
                </div>
            </div>

            <div className="sidebar-panel">
                <h3><i className="fas fa-user-graduate"></i> Academic Journey</h3>

                <div className="list-item">
                    <div className="list-icon" style={{color: '#A855F7'}}>M</div>
                    <div className="list-text">
                        <h4>M.Sc. in Computer Science</h4>
                        <p>AIUB • CGPA: 3.77</p>
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-icon" style={{color: '#3B82F6'}}>B</div>
                    <div className="list-text">
                        <h4>B.Sc. in Computer Science and Engineering</h4>
                        <p>AIUB • CGPA: 3.65</p>
                    </div>
                </div>
                <div className="list-item" style={{borderBottom: 'none'}}>
                    <div className="list-text">
                        <p style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>
                            HSC GPA: 4.90<br />SSC GPA: 5.00<br />Safiuddin Sarkar Academy & College (SSAC)
                        </p>
                    </div>
                </div>
            </div>

            <div className="sidebar-panel">
                <h3><i className="fas fa-cog"></i> Other Skills</h3>
                <div
                    style={{border: '1px solid var(--border-color)', background: 'var(--bg-hover)', padding: '16px', borderRadius: '6px', marginBottom: '24px'}}>
                    <ul
                        style={{listStyle: 'none', paddingLeft: '0', margin: '0', fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '500'}}>
                        <li style={{marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <i className="fas fa-bezier-curve"
                                style={{color: '#0284C7', fontSize: '1.1rem', width: '22px', textAlign: 'center'}}></i>
                            Graphics Designing
                        </li>
                        <li style={{marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <span
                                style={{background: '#001e36', color: '#31A8FF', padding: '2px', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold', borderRadius: '3px'}}>Ps</span>
                            Adobe Photoshop
                        </li>
                        <li style={{marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <span
                                style={{background: '#330000', color: '#FF9A00', padding: '2px', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold', borderRadius: '3px'}}>Ai</span>
                            Adobe Illustrator
                        </li>
                        <li style={{marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <span
                                style={{background: 'linear-gradient(135deg, #00C4CC, #7D2AE8)', color: 'white', padding: '2px', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: '50%'}}>C</span>
                            Canva
                        </li>
                        <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <i className="fab fa-figma"
                                style={{color: '#F24E1E', fontSize: '1.2rem', width: '22px', textAlign: 'center'}}></i> Figma
                        </li>
                    </ul>
                </div>

                {/* Soft Skills with Dot indicators */}
                <div style={{marginBottom: '18px'}}>
                    <div style={{fontSize: '1.05rem', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '500'}}>
                        Project Management</div>
                    <div style={{display: 'flex', gap: '6px'}}>
                        {/* 6 active, 1 inactive */}
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--border-color)'}}>
                        </div>
                    </div>
                </div>

                <div style={{marginBottom: '18px'}}>
                    <div style={{fontSize: '1.05rem', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '500'}}>
                        Problem Solving</div>
                    <div style={{display: 'flex', gap: '6px'}}>
                        {/* 6 active, 1 inactive */}
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--border-color)'}}>
                        </div>
                    </div>
                </div>

                <div style={{marginBottom: '18px'}}>
                    <div style={{fontSize: '1.05rem', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '500'}}>
                        Creativity</div>
                    <div style={{display: 'flex', gap: '6px'}}>
                        {/* 5 active, 2 inactive */}
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--border-color)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--border-color)'}}>
                        </div>
                    </div>
                </div>

                <div style={{marginBottom: '18px'}}>
                    <div style={{fontSize: '1.05rem', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '500'}}>
                        Leadership</div>
                    <div style={{display: 'flex', gap: '6px'}}>
                        {/* 5 active, 2 inactive */}
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--border-color)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--border-color)'}}>
                        </div>
                    </div>
                </div>

                <div style={{marginBottom: '8px'}}>
                    <div style={{fontSize: '1.05rem', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '500'}}>
                        Digital Marketing</div>
                    <div style={{display: 'flex', gap: '6px'}}>
                        {/* 4 active, 3 inactive */}
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--border-color)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--border-color)'}}>
                        </div>
                        <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--border-color)'}}>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar-panel">
                <h3><i className="fas fa-code-branch"></i> Most Used Languages (Git)</h3>

                {/* Progress Bar */}
                <div
                    style={{display: 'flex', width: '100%', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: '24px'}}>
                    <div style={{width: '30.71%', backgroundColor: '#f1e05a'}} title="JavaScript 30.71%"></div>
                    <div style={{width: '27.00%', backgroundColor: '#563d7c'}} title="CSS 27.00%"></div>
                    <div style={{width: '17.02%', backgroundColor: '#e34c26'}} title="HTML 17.02%"></div>
                    <div style={{width: '15.17%', backgroundColor: '#178600'}} title="C# 15.17%"></div>
                    <div style={{width: '5.83%', backgroundColor: '#4F5D95'}} title="PHP 5.83%"></div>
                    <div style={{width: '4.28%', backgroundColor: '#b07219'}} title="Java 4.28%"></div>
                </div>

                {/* Legend */}
                <div
                    style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 10px', fontSize: '0.9rem', fontWeight: '500'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span
                            style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f1e05a', display: 'inline-block'}}></span>
                        <span style={{color: 'var(--text-main)'}}>JavaScript 30.71%</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span
                            style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#178600', display: 'inline-block'}}></span>
                        <span style={{color: 'var(--text-main)'}}>C# 15.17%</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span
                            style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#563d7c', display: 'inline-block'}}></span>
                        <span style={{color: 'var(--text-main)'}}>CSS 27.00%</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span
                            style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4F5D95', display: 'inline-block'}}></span>
                        <span style={{color: 'var(--text-main)'}}>PHP 5.83%</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span
                            style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e34c26', display: 'inline-block'}}></span>
                        <span style={{color: 'var(--text-main)'}}>HTML 17.02%</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span
                            style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#b07219', display: 'inline-block'}}></span>
                        <span style={{color: 'var(--text-main)'}}>Java 4.28%</span>
                    </div>
                </div>
            </div>

            <div className="sidebar-panel">
                <h3><i className="fas fa-heart"></i> Interests</h3>
                <ul
                    style={{listStyle: 'none', paddingLeft: '0', margin: '0', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-microchip"
                            style={{width: '20px', color: 'var(--tag-blue-text)'}}></i> Artificial Intelligence</li>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-laptop-code"
                            style={{width: '20px', color: 'var(--tag-green-text)'}}></i> Web Development</li>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-search"
                            style={{width: '20px', color: 'var(--tag-purple-text)'}}></i> Research in AI</li>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-robot"
                            style={{width: '20px', color: 'var(--tag-orange-text)'}}></i> Machine Learning</li>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-project-diagram"
                            style={{width: '20px', color: 'var(--tag-pink-text)'}}></i> New Projects and Challenges</li>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-paint-brush"
                            style={{width: '20px', color: 'var(--tag-blue-text)'}}></i> Graphics Designing</li>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-video"
                            style={{width: '20px', color: 'var(--tag-green-text)'}}></i> Video Editing</li>
                    <li style={{marginBottom: '2px'}}><i className="fas fa-bullhorn"
                            style={{width: '20px', color: 'var(--tag-purple-text)'}}></i> Digital Marketing</li>
                </ul>
            </div>

            <div className="sidebar-panel">
                <h3><i className="fas fa-user-circle"></i> Personal Summary</h3>
                <ul
                    style={{listStyle: 'none', paddingLeft: '0', margin: '0', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-walking"
                            style={{width: '20px', color: 'var(--tag-blue-text)'}}></i> Hardworking</li>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-brain"
                            style={{width: '20px', color: 'var(--tag-green-text)'}}></i> Fast Learner</li>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-stopwatch"
                            style={{width: '20px', color: 'var(--tag-purple-text)'}}></i> Punctual</li>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-users"
                            style={{width: '20px', color: 'var(--tag-orange-text)'}}></i> Good Team Player</li>
                    <li style={{marginBottom: '8px'}}><i className="fas fa-weight-hanging"
                            style={{width: '20px', color: 'var(--tag-pink-text)'}}></i> Able to work under pressure</li>
                    <li style={{marginBottom: '2px'}}><i className="fas fa-compress-arrows-alt"
                            style={{width: '20px', color: 'var(--text-color)'}}></i> Firm Principles with flexible attitude
                    </li>
                </ul>
            </div>

            <div className="sidebar-panel">
                <h3><i className="fas fa-head-side-comment"></i> Language Proficiency</h3>
                <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', marginTop: '5px'}}>
                    Excellent written and Oral competence in both-</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px'}}>
                    <img src="https://flagcdn.com/w20/us.png" alt="US Flag"
                        style={{borderRadius: '2px', boxShadow: '0 0 2px rgba(0,0,0,0.5)'}} />
                    <span style={{fontSize: '0.9rem', color: 'var(--text-color)', fontWeight: '500'}}>English &</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <img src="https://flagcdn.com/w20/bd.png" alt="BD Flag"
                        style={{borderRadius: '2px', boxShadow: '0 0 2px rgba(0,0,0,0.5)'}} />
                    <span style={{fontSize: '0.9rem', color: 'var(--text-color)', fontWeight: '500'}}>Bengali</span>
                </div>
            </div>

            <div className="sidebar-panel">
                <h3><i className="fas fa-users-cog"></i> References</h3>

                <div className="list-item" style={{padding: '10px 0'}}>
                    <div className="list-text">
                        <h4 style={{fontSize: '0.85rem', textTransform: 'uppercase'}}>Dr. Khandaker Tabin Hasan</h4>
                        <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4'}}>
                            Professor, Head of Graduate Program, CS & Dept. of MIS.<br />
                            Faculty of Science and Technology<br />
                            American International University - Bangladesh<br />
                            Email: <a  href="mailto:tabin@aiub.edu"
                                style={{color: 'var(--tag-blue-text)', textDecoration: 'none'}}>tabin@aiub.edu</a>
                        </p>
                    </div>
                </div>

                <div className="list-item" style={{borderBottom: 'none', padding: '10px 0 0 0'}}>
                    <div className="list-text">
                        <h4 style={{fontSize: '0.85rem', textTransform: 'uppercase'}}>Dr. S. M. Hasan Mahmud</h4>
                        <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4'}}>
                            Assistant Professor<br />
                            Faculty of Science and Technology<br />
                            Dafodil International University <br />
                            American International University - Bangladesh (AIUB)<br />
                            Email: <a  href="mailto:hasan.swe@aiub.edu"
                                style={{color: 'var(--tag-blue-text)', textDecoration: 'none'}}>hasan.swe@aiub.edu</a>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </main>

    {/* Footer */}
    <footer
        style={{textAlign: 'center', padding: '40px 20px', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
        <div style={{marginBottom: '20px'}}>
            <Link to="/contact" className="btn btn-outline" style={{fontSize: '0.85rem', padding: '8px 16px'}}><i
                    className="fas fa-envelope"></i> Contact Me</Link>
        </div>
        <p>&copy; 2024 Mehedi Hasan Shihab. All rights reserved.</p>
    </footer>

    `n    

    </>
  );
}