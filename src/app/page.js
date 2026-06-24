import React from 'react';
import Link from 'next/link';

export default function Home() {
  const projects = [
    {
      num: '1',
      title: 'ReactJs Online SmartPhone Shop',
      href: 'https://github.com/sshihabb007/ReactJs---Online-SmartPhone-Shop',
      meta: 'React.js • JavaScript • Frontend',
      desc: 'A modern, responsive e-commerce interface built using React for seamlessly browsing and interacting with a smartphone marketplace.',
      tags: [
        { label: 'REACT', class: 'tag-blue' },
        { label: 'JAVASCRIPT', class: 'tag-orange' },
        { label: 'E-COMMERCE', class: 'tag-purple' }
      ]
    },
    {
      num: '2',
      title: 'AI English Teaching Platform by Gemini',
      href: 'http://aielts.com.au/',
      meta: 'Node.js • React • PHP • WebSockets',
      desc: 'Real-time English test practice application featuring fully automated Speaking, Reading, and Writing test simulations evaluated by Vertex AI.',
      tags: [
        { label: 'AI', class: 'tag-orange' },
        { label: 'CHATBOT', class: 'tag-blue' },
        { label: 'EDUCATION', class: 'tag-green' }
      ]
    },
    {
      num: '3',
      title: 'Agentic AI OpenClaw',
      href: 'https://github.com/sshihabb007/AgenticAI-OpenClaw',
      meta: 'Python • Agentic AI • OpenClaw',
      desc: 'Agentic AI platform utilizing OpenClaw to perform complex email and calendar automations. Builds autonomous AI agents to manage daily workflows efficiently.',
      tags: [
        { label: 'AI AUTOMATION', class: 'tag-orange' },
        { label: 'AGENTIC AI', class: 'tag-blue' },
        { label: 'OPENCLAW', class: 'tag-green' }
      ]
    },
    {
      num: '4',
      title: 'SHIHAB-SmartBook',
      href: 'https://github.com/sshihabb007/SHIHAB-SmartBook',
      meta: 'Java • GitHub Repo',
      desc: 'SHIHAB SmartBook Application.',
      tags: [
        { label: 'JAVA', class: 'tag-blue' },
        { label: 'APPLICATION', class: 'tag-green' }
      ]
    },
    {
      num: '5',
      title: 'AIUB Online Forum',
      href: 'https://github.com/sshihabb007/AIUB-Online-Forum-ASP.NET-',
      meta: 'ASP.NET • Academic Platform',
      desc: 'An online forum functioning like a social website. Registered users can post, like, comment, report, and seamlessly interact with each other.',
      tags: [
        { label: 'WEB DEVELOPMENT', class: 'tag-green' },
        { label: 'SOCIAL PLATFORM', class: 'tag-purple' }
      ]
    },
    {
      num: '6',
      title: 'MERN E-Commerce Website',
      href: 'https://github.com/sshihabb007/MERN-WEBSITE-E-COMMERCE',
      meta: 'MongoDB • Express • React • Node.js',
      desc: 'A full-stack MERN e-commerce application featuring product cataloging, brand filtering, and reactive shopping cart logic.',
      tags: [
        { label: 'REACT', class: 'tag-blue' },
        { label: 'NODE.JS', class: 'tag-green' },
        { label: 'MERN STACK', class: 'tag-orange' }
      ]
    },
    {
      num: '7',
      title: 'Online Smartphone Shop',
      href: 'https://github.com/sshihabb007/Online-Smartphone-Shop-PhP-JAVASCRIPT-AJAX-Jquery-CSS-',
      meta: 'PHP • JavaScript • AJAX • jQuery',
      desc: 'A dynamic e-commerce website where customers can buy various smartphones securely, and admins exercise full control over product management.',
      tags: [
        { label: 'E-COMMERCE', class: 'tag-blue' },
        { label: 'PHP STACK', class: 'tag-orange' }
      ]
    },
    {
      num: '8',
      title: 'Modern Online Device Shop',
      href: 'https://github.com/sshihabb007/MODERN-ONLINE-DEVICE-SHOP',
      meta: 'Laravel • PHP • MySQL • Tailwind',
      desc: 'A modern e-commerce platform rebuilt with Laravel for dynamic routing, secure authentication, and advanced product inventory management.',
      tags: [
        { label: 'LARAVEL', class: 'tag-pink' },
        { label: 'PHP', class: 'tag-blue' },
        { label: 'E-COMMERCE', class: 'tag-orange' }
      ]
    },
    {
      num: '9',
      title: 'Hospital Management System',
      href: 'https://github.com/sshihabb007/Hospital-Management-System-by-Oracle-10G-and-PLSQL',
      meta: 'Oracle PL/SQL • C#',
      desc: 'A robust C#-based desktop application. Custom triggers, procedures, & functions were developed for a comprehensive database ecosystem.',
      tags: [
        { label: 'DESKTOP APP', class: 'tag-purple' },
        { label: 'DATABASE MANAGEMENT', class: 'tag-green' }
      ]
    },
    {
      num: '10',
      title: 'Inventory Management System',
      href: 'https://github.com/sshihabb007/Inventory_Management_System_C-',
      meta: 'C#',
      desc: 'A localized desktop application streamlining daily goods transactions and facilitating advanced admin inventory tracking.',
      tags: [
        { label: 'DESKTOP APP', class: 'tag-purple' },
        { label: 'UTILITY', class: 'tag-orange' }
      ]
    }
  ];

  const experiences = [
    {
      title: 'Senior Software Engineer @ Bangladesh Education and Research Institute (BERI)',
      meta: 'Mar 2022 - Present • Dhaka, Bangladesh',
      desc: 'Spearheaded Web Development and Application Maintenance. Additionally involved in technical content writing, programming implementations, and executing video edits for media outreach.',
      tags: ['FULL TIME', 'WEB DEV']
    },
    {
      title: 'Web Developer (Remote) @ MAC Technology Australia Pty Ltd.',
      meta: 'Nov 2022 - Present • Nailsworth, SA',
      desc: 'Handled remote web development projects, client-specific feature implementations, high-level IT Support, and graphic designing tasks.',
      tags: ['REMOTE', 'IT SUPPORT']
    },
    {
      title: 'Officer, IT @ i - Global Services',
      meta: 'Sep 2019 - Mar 2020 • Mirpur-10, Dhaka, Bangladesh',
      desc: 'Responsibilities included Web Development and Maintenance, IT Support, and Graphics Designing.',
      tags: ['WEB DEV', 'IT SUPPORT', 'DESIGN']
    }
  ];

  return (
    <div>
      {/* Hero */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-profile-wrapper" data-aos="fade-up">
            <img 
              src="/asset/Shihab.jpg" 
              alt="Mehedi Hasan Shihab - Senior Software Engineer at BERI"
              className="hero-profile-img"
            />
            <div className="hero-profile-info">
              <h1 className="hero-name">
                <a 
                  href="https://www.linkedin.com/in/mehedi-hasan-shihab" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Mehedi Hasan Shihab
                </a>
              </h1>
              <p className="hero-subtitle">Sr. Software Engineer | Full-Stack Developer | BERI</p>
              <div className="social-btn-group">
                <a href="https://www.linkedin.com/in/mehedi-hasan-shihab" target="_blank" rel="noopener noreferrer" className="btn-social btn-linkedin">LINKEDIN</a>
                <a href="https://github.com/sshihabb007" target="_blank" rel="noopener noreferrer" className="btn-social btn-github"><i className="fab fa-github"></i> GITHUB</a>
                <a href="mailto:sshihabb007@gmail.com" className="btn-social btn-email"><span style={{ fontWeight: 900, fontFamily: 'Arial,sans-serif', fontSize: '0.9rem' }}>M</span> EMAIL</a>
                <a href="https://www.facebook.com/sshihabb007/" target="_blank" rel="noopener noreferrer" className="btn-social btn-facebook"><i className="fab fa-facebook-f"></i> FACEBOOK</a>
              </div>
            </div>
          </div>
          <hr className="hero-divider" style={{ marginBottom: '40px' }} />

          <div data-aos="fade-up" data-aos-delay="200">
            <h2>Track What Matters in My Output</h2>
            <p>
              A hard-working, fast learner and self-motivated Web & Software Developer. Exploring Web Development, 
              Gemini/OpenAI LLM model Training, Javascript, React.js, Node.js, Php, ASP.NET, MySQL, and beyond.
            </p>
            <div className="btn-group">
              <Link href="/projects" className="btn btn-primary">Browse Projects</Link>
              <a href="#experience" className="btn btn-outline">Explore Experience</a>
              <a href="/asset/shihabCV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ border: '1px solid white' }}>
                <i className="fas fa-download"></i> Download Resume
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Banner */}
      <section className="stats-banner" data-aos="fade-up">
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
            {projects.map((proj) => (
              <div key={proj.num} className="data-row" data-aos="fade-right">
                <div className="row-number">{proj.num}</div>
                <div className="row-content">
                  <h3>
                    <a 
                      href={proj.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {proj.title} <i className="fas fa-external-link-alt" style={{ fontSize: '0.7em' }}></i>
                    </a>
                  </h3>
                  <p className="meta">{proj.meta}</p>
                  <p className="desc">{proj.desc}</p>
                  <div className="tags">
                    {proj.tags.map((tag) => (
                      <span key={tag.label} className={`tag ${tag.class}`}>{tag.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-head" style={{ marginTop: '40px' }}>
            <i className="fas fa-briefcase"></i> Work Experience
          </div>
          <div className="data-list" id="experience">
            {experiences.map((exp, idx) => (
              <div key={idx} className="data-row" data-aos="fade-right">
                <div className="row-number"><i className="fas fa-building" style={{ fontSize: '0.9rem' }}></i></div>
                <div className="row-content">
                  <h3>{exp.title}</h3>
                  <p className="meta">{exp.meta}</p>
                  <p className="desc">{exp.desc}</p>
                  <div className="tags">
                    {exp.tags.map((t) => (
                      <span key={t} className="tag tag-blue">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="content-right">
          <div className="sidebar-panel" data-aos="fade-left">
            <h3><i className="fas fa-chart-line"></i> Trending Skills</h3>
            <div className="pill-tags">
              {['JavaScript (AJAX/jQuery)', 'C/C++', 'Java', 'C#', 'Python', 'PHP', 'ASP.NET', 'WordPress', 'Vertex AI', 'AI Model Training', 'AI Automation', 'Oracle PL/SQL', 'CRM', 'Video Editing', 'Graphics Designing', 'OpenClaw', 'Agentic AI'].map((skill) => (
                <span key={skill} className="pill">{skill}</span>
              ))}
            </div>
          </div>

          <div className="sidebar-panel" data-aos="fade-left">
            <h3><i className="fas fa-user-graduate"></i> Academic Journey</h3>
            <div className="list-item">
              <div className="list-icon" style={{ color: '#A855F7' }}>M</div>
              <div className="list-text">
                <h4>M.Sc. in Computer Science</h4>
                <p>AIUB • CGPA: 3.77</p>
              </div>
            </div>
            <div className="list-item">
              <div className="list-icon" style={{ color: '#3B82F6' }}>B</div>
              <div className="list-text">
                <h4>B.Sc. in Computer Science and Engineering</h4>
                <p>AIUB • CGPA: 3.65</p>
              </div>
            </div>
            <div className="list-item" style={{ borderBottom: 'none' }}>
              <div className="list-text">
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  HSC GPA: 4.90<br />SSC GPA: 5.00<br />Safiuddin Sarkar Academy & College (SSAC)
                </p>
              </div>
            </div>
          </div>

          <div className="sidebar-panel" data-aos="fade-left">
            <h3><i className="fas fa-cog"></i> Other Skills</h3>
            <div style={{ border: '1px solid var(--border-color)', background: 'var(--bg-hover)', padding: '16px', borderRadius: '6px', marginBottom: '24px' }}>
              <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 500 }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignEvent: 'center', gap: '10px' }}>
                  <i className="fas fa-bezier-curve" style={{ color: '#0284C7', fontSize: '1.1rem', width: '22px', textAlign: 'center' }}></i> Graphics Designing
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignEvent: 'center', gap: '10px' }}>
                  <span style={{ background: '#001e36', color: '#31A8FF', padding: '2px', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold', borderRadius: '3px' }}>Ps</span> Adobe Photoshop
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignEvent: 'center', gap: '10px' }}>
                  <span style={{ background: '#330000', color: '#FF9A00', padding: '2px', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold', borderRadius: '3px' }}>Ai</span> Adobe Illustrator
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignEvent: 'center', gap: '10px' }}>
                  <span style={{ background: '#000000', color: '#FFFFFF', padding: '2px', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold', borderRadius: '3px' }}>Cc</span> Capcut
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignEvent: 'center', gap: '10px' }}>
                  <span style={{ background: '#3AB39D', color: '#FFFFFF', padding: '2px', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold', borderRadius: '3px' }}>Fm</span> Filmora
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignEvent: 'center', gap: '10px' }}>
                  <span style={{ background: 'linear-gradient(135deg, #00C4CC, #7D2AE8)', color: 'white', padding: '2px', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: '50%' }}>C</span> Canva
                </li>
                <li style={{ display: 'flex', alignEvent: 'center', gap: '10px' }}>
                  <i className="fab fa-figma" style={{ color: '#F24E1E', fontSize: '1.2rem', width: '22px', textAlign: 'center' }}></i> Figma
                </li>
              </ul>
            </div>

            {/* Soft Skills */}
            {[
              { label: 'Project Management', dots: 6 },
              { label: 'Problem Solving', dots: 6 },
              { label: 'Prompt Engineering', dots: 5 },
              { label: 'Creativity', dots: 5 },
              { label: 'Leadership', dots: 5 },
              { label: 'Digital Marketing', dots: 4 }
            ].map((skill, idx) => (
              <div key={idx} style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '1.05rem', marginBottom: '8px', color: 'var(--text-main)', fontWeight: 500 }}>
                  {skill.label}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {Array.from({ length: 7 }).map((_, dIdx) => (
                    <div 
                      key={dIdx} 
                      style={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        background: dIdx < skill.dots ? 'var(--text-muted)' : 'var(--border-color)' 
                      }} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-panel" data-aos="fade-left">
            <h3><i className="fas fa-code-branch"></i> Most Used Languages (Git)</h3>
            <div style={{ display: 'flex', width: '100%', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: '24px' }}>
              <div style={{ width: '30.71%', backgroundColor: '#f1e05a' }} title="JavaScript 30.71%"></div>
              <div style={{ width: '27.00%', backgroundColor: '#563d7c' }} title="CSS 27.00%"></div>
              <div style={{ width: '17.02%', backgroundColor: '#e34c26' }} title="HTML 17.02%"></div>
              <div style={{ width: '15.17%', backgroundColor: '#178600' }} title="C# 15.17%"></div>
              <div style={{ width: '5.83%', backgroundColor: '#4F5D95' }} title="PHP 5.83%"></div>
              <div style={{ width: '4.28%', backgroundColor: '#b07219' }} title="Java 4.28%"></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 10px', fontSize: '0.9rem', fontWeight: 500 }}>
              {[
                { lang: 'JavaScript 30.71%', color: '#f1e05a' },
                { lang: 'C# 15.17%', color: '#178600' },
                { lang: 'CSS 27.00%', color: '#563d7c' },
                { lang: 'PHP 5.83%', color: '#4F5D95' },
                { lang: 'HTML 17.02%', color: '#e34c26' },
                { lang: 'Java 4.28%', color: '#b07219' }
              ].map((l) => (
                <div key={l.lang} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: l.color, display: 'inline-block' }}></span>
                  <span style={{ color: 'var(--text-main)' }}>{l.lang}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-panel" data-aos="fade-left">
            <h3><i className="fas fa-heart"></i> Interests</h3>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {[
                { name: 'Artificial Intelligence', icon: 'fas fa-microchip', color: 'var(--tag-blue-text)' },
                { name: 'Web Development', icon: 'fas fa-laptop-code', color: 'var(--tag-green-text)' },
                { name: 'Research in AI', icon: 'fas fa-search', color: 'var(--tag-purple-text)' },
                { name: 'Machine Learning', icon: 'fas fa-robot', color: 'var(--tag-orange-text)' },
                { name: 'New Projects and Challenges', icon: 'fas fa-project-diagram', color: 'var(--tag-pink-text)' },
                { name: 'Graphics Designing', icon: 'fas fa-paint-brush', color: 'var(--tag-blue-text)' },
                { name: 'Video Editing', icon: 'fas fa-video', color: 'var(--tag-green-text)' },
                { name: 'Digital Marketing', icon: 'fas fa-bullhorn', color: 'var(--tag-purple-text)' }
              ].map((interest) => (
                <li key={interest.name} style={{ marginBottom: '8px' }}>
                  <i className={interest.icon} style={{ width: '20px', color: interest.color }}></i> {interest.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-panel" data-aos="fade-left">
            <h3><i className="fas fa-user-circle"></i> Personal Summary</h3>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {[
                { name: 'Hardworking', icon: 'fas fa-walking', color: 'var(--tag-blue-text)' },
                { name: 'Fast Learner', icon: 'fas fa-brain', color: 'var(--tag-green-text)' },
                { name: 'Punctual', icon: 'fas fa-stopwatch', color: 'var(--tag-purple-text)' },
                { name: 'Friendly & Cooperative', icon: 'fas fa-users', color: 'var(--tag-orange-text)' },
                { name: 'Creative', icon: 'fas fa-paint-brush', color: 'var(--tag-pink-text)' }
              ].map((sum) => (
                <li key={sum.name} style={{ marginBottom: '8px' }}>
                  <i className={sum.icon} style={{ width: '20px', color: sum.color }}></i> {sum.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
