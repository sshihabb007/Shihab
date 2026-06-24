'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState('dark');
  const [activeColor, setActiveColor] = useState('default');
  const [showPalette, setShowPalette] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme and color on mount
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('mehedi_theme') || 'dark';
    const storedColor = localStorage.getItem('mehedi_color') || 'default';
    
    setTheme(storedTheme);
    if (storedTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    applyColor(storedColor);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('mehedi_theme', nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  const applyColor = (colorHex) => {
    setActiveColor(colorHex);
    localStorage.setItem('mehedi_color', colorHex);
    if (colorHex === 'default') {
      document.body.style.removeProperty('--primary-color');
      document.body.style.removeProperty('--text-main');
      document.body.style.removeProperty('--cursor-color');
    } else {
      document.body.style.setProperty('--primary-color', colorHex);
      document.body.style.setProperty('--text-main', colorHex);
      document.body.style.setProperty('--cursor-color', colorHex);
    }
  };

  // Close palette on clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.color-switcher-container')) {
        setShowPalette(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const colorOptions = [
    { name: 'default', color: '#F8FAFC', label: 'Default theme', style: { background: '#F8FAFC', border: '1px solid #ccc' } },
    { name: 'cyan', color: '#0EA5E9', label: 'Cyan theme', style: { background: '#0EA5E9' } },
    { name: 'blue', color: '#3B82F6', label: 'Blue theme', style: { background: '#3B82F6' } },
    { name: 'purple', color: '#A855F7', label: 'Purple theme', style: { background: '#A855F7' } },
    { name: 'pink', color: '#EC4899', label: 'Pink theme', style: { background: '#EC4899' } },
    { name: 'green', color: '#10B981', label: 'Green theme', style: { background: '#10B981' } },
    { name: 'orange', color: '#F59E0B', label: 'Orange theme', style: { background: '#F59E0B' } }
  ];

  const tools = [
    { href: '/advanced-calculator', label: 'Advanced Calculator', icon: 'fas fa-square-root-alt' },
    { href: '/compressor', label: 'Image & Audio Converter', icon: 'fas fa-image' },
    { href: '/audio-to-text', label: 'Audio to Text', icon: 'fas fa-microphone' },
    { href: '/tax-calculator', label: 'Tax Calculator', icon: 'fas fa-calculator' },
    { href: '/power-calculator', label: 'Power Calculator', icon: 'fas fa-plug' },
    { href: '/age-calculator', label: 'Age Calculator Pro', icon: 'fas fa-calendar-alt' },
    { href: '/bmi-calculator', label: 'BMI Calculator', icon: 'fas fa-weight' },
    { href: '/land-calculator', label: 'Land Calculator', icon: 'fas fa-map-marked-alt' },
    { href: '/currency-converter', label: 'Currency Converter', icon: 'fas fa-money-bill-wave' },
    { href: '/qr-generator', label: 'QR Generator Pro', icon: 'fas fa-qrcode' },
    { href: '/universal-downloader', label: 'Universal Downloader', icon: 'fas fa-download' }
  ];

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="nav-brand" style={{ textDecoration: 'none' }}>
          <span>Mehedi Hasan</span>Shihab
        </Link>
        <div className="nav-links">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
          <Link href="/projects" className={pathname === '/projects' ? 'active' : ''}>Notable Projects</Link>
          <Link href="/#experience">Experience</Link>
          <div className="nav-dropdown">
            <a>
              Tools <i className="fas fa-chevron-down" style={{ fontSize: '0.7rem' }}></i>
            </a>
            <div className="nav-dropdown-content">
              {tools.map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <i className={tool.icon}></i> {tool.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            id="sshihabb007-theme-toggle"
            className="btn btn-outline"
            style={{
              fontSize: '0.9rem',
              padding: '8px 12px',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
              background: 'transparent',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {mounted && theme === 'light' ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
          <Link href="/contact" className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
            <i className="fas fa-envelope"></i> Contact Me
          </Link>
        </div>
      </nav>

      {/* Color Switcher (fixed, bottom-left) */}
      <div className="color-switcher-container">
        <div 
          className="color-palette" 
          id="color-palette" 
          style={{ display: showPalette ? 'flex' : 'none' }}
        >
          {colorOptions.map((opt) => (
            <button
              key={opt.name}
              className={`color-btn ${activeColor === opt.color || (opt.name === 'default' && activeColor === 'default') ? 'active' : ''}`}
              style={opt.style}
              onClick={() => applyColor(opt.name === 'default' ? 'default' : opt.color)}
              aria-label={opt.label}
            ></button>
          ))}
        </div>
        <div className="switcher-controls">
          <button 
            id="palette-toggle" 
            className="icon-btn" 
            onClick={() => setShowPalette(!showPalette)}
            aria-label="Open color palette"
          >
            <i className="fas fa-palette"></i>
          </button>
        </div>
      </div>
    </>
  );
}
