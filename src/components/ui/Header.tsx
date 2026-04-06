'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'ГЛАВНАЯ', href: '#hero' },
  { name: 'ПРЕЗЕНТАЦИИ', href: '#presentations' },
  { name: 'ВЕБ', href: '#web' },
  { name: 'НАВЫКИ', href: '#навыки' },
  { name: 'ОПЫТ', href: '#timeline' },
];

export default function Header() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'rgba(10, 10, 10, 0.1)',
        transition: 'background 0.3s ease',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '2px solid var(--border)',
        zIndex: 8900, // Below ScrollProgress, above sections
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--section-pad-x)',
        justifyContent: 'space-between',
      }}
    >
      {/* LOGO */}
      <a
        href="#hero"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 800,
          fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          letterSpacing: '0.05em',
          textDecoration: 'none',
          color: 'var(--fg)',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        <span>ИЛЬЯ ХАЙМИН</span>
        <span style={{ color: 'var(--accent-lime)' }}>//</span>
        <span style={{ color: 'var(--fg-muted)', fontWeight: 500 }}>ASPHXDEL</span>
      </a>

      {/* DESKTOP LINKS */}
      <nav
        className="header-nav"
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onMouseEnter={() => setHoveredLink(link.name)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color:
                hoveredLink === link.name ? 'var(--accent-cyan)' : 'var(--fg)',
              transition: 'color 0.2s ease',
            }}
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Add raw CSS for hiding nav links on small screens to prevent overlap */}
      <style>{`
        @media (max-width: 768px) {
          .header-nav {
            display: none !important;
          }
        }
      `}</style>
    </motion.header>
  );
}
