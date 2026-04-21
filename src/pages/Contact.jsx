import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <>


    {/* Navbar */}
    <Navbar />

    {/* Page Header & Content */}
    <main style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px 20px 60px'}}>
        <div className="contact-card" style={{textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '50px', maxWidth: '600px', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.3)'}}>
            
            <img src="/asset/Shihab.jpg" alt="Mehedi Hasan Shihab" className="contact-avatar" style={{width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--border-color)', marginBottom: '24px', boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'}} />
            
            <h1 style={{fontSize: '2.8rem', marginBottom: '10px'}}>Get In Touch</h1>
            <p style={{color: 'var(--text-muted)', fontSize: '1.15rem', marginBottom: '30px', lineHeight: '1.6'}}>I'm always open to discussing web development work, AI opportunities, or potential partnerships!</p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', marginBottom: '40px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontSize: '1.2rem'}}>
                    <i className="fas fa-envelope" style={{color: '#ea4335'}}></i> sshihabb007@gmail.com
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontSize: '1.2rem'}}>
                    <i className="fas fa-map-marker-alt" style={{color: 'var(--primary-color)'}}></i> Dhaka, Bangladesh
                </div>
            </div>

            <div className="social-btn-group" style={{justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '30px'}}>
                <a  href="https://www.linkedin.com/in/mehedi-hasan-shihab-30a445b6/" target="_blank" className="btn-social btn-linkedin" style={{padding: '10px 14px', fontSize: '0.8rem'}}>LINKEDIN</a>
                <a  href="https://github.com/sshihabb007" target="_blank" className="btn-social btn-github" style={{padding: '10px 14px', fontSize: '0.8rem'}}><i className="fab fa-github"></i> GITHUB</a>
                <a  href="mailto:sshihabb007@gmail.com" className="btn-social btn-email" style={{padding: '10px 14px', fontSize: '0.8rem'}}><span style={{fontWeight: '900', fontFamily: 'Arial,sans-serif', fontSize: '0.9rem', marginRight: '4px'}}>M</span> EMAIL</a>
                <a  href="https://www.facebook.com/sshihabb007/" target="_blank" className="btn-social btn-facebook" style={{padding: '10px 14px', fontSize: '0.8rem'}}><i className="fab fa-facebook-f"></i> FACEBOOK</a>
            </div>

            <div>
                <a  href="/asset/shihabCV.pdf" target="_blank" className="btn btn-outline" style={{border: '1px solid white'}}><i className="fas fa-download"></i> Download Resume</a>
            </div>

        </div>
    </main>

    {/* Footer */}
    <footer style={{textAlign: 'center', padding: '40px 20px', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
        <div style={{marginBottom: '20px'}}>
            <Link to="/contact" className="btn btn-outline" style={{fontSize: '0.9rem', padding: '8px 16px'}}><i className="fas fa-envelope"></i> Contact Me</Link>
        </div>
        <p>&copy; 2024 Mehedi Hasan Shihab. All rights reserved.</p>
    </footer>

    </>
  );
}