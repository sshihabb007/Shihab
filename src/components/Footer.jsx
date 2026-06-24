import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '40px 20px',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)',
        fontSize: '0.9rem'
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <Link href="/contact" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
          <i className="fas fa-envelope"></i> Contact Me
        </Link>
      </div>
      <p>
        &copy; 2019{' '}
        <a
          href="https://www.linkedin.com/in/mehedi-hasan-shihab"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          Mehedi Hasan Shihab
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
}
