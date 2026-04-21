import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const themeBtnRef = useRef(null);

  useEffect(() => {
    // Re-initialize theme logic from theme.js since React re-mounts the button
    if (window.mehedi_initTheme) {
      window.mehedi_initTheme();
    }
  }, []);

  return (
    <nav className="navbar">
        <Link to="/" className="nav-brand" style={{textDecoration: 'none', color: 'inherit'}}><span>Mehedi Hasan</span>Shihab</Link>
        <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/projects">Notable Projects</Link>
            <Link to="/#experience">Experience</Link>
        </div>
        <div className="nav-actions" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <button id="sshihabb007-theme-toggle" ref={themeBtnRef} className="btn btn-outline"
                style={{fontSize: '0.9rem', padding: '8px 12px', borderColor: 'var(--border-color)', color: 'var(--text-main)', background: 'transparent', cursor: 'pointer', borderRadius: '4px'}}
                aria-label="Toggle Theme"><i className="fas fa-moon"></i></button>
            <Link to="/contact" className="btn btn-outline" style={{fontSize: '0.9rem', padding: '8px 16px'}}><i
                    className="fas fa-envelope"></i> Contact Me</Link>
        </div>
    </nav>
  );
}
