'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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
      {/* MOBILE MENU TOGGLE */}
      <button
        className="header-mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 800,
          background: 'none',
          border: '1px solid var(--border)',
          color: isMobileMenuOpen ? 'var(--accent-cyan)' : 'var(--fg)',
          padding: '0.3rem 0.8rem',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          transition: 'all 0.3s ease',
          display: 'none', // handled by media query
        }}
      >
        {isMobileMenuOpen ? '[ CLOSE ]' : '[ MENU ]'}
      </button>

      {/* CSS FOR RESPONSIVE VISIBILITY */}
      <style>{`
        @media (max-width: 768px) {
          .header-nav { display: none !important; }
          .header-mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.header>

    {/* FULL-SCREEN MOBILE OVERLAY */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 8800, // Below header
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2.5rem',
            padding: '2rem',
          }}
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: 'var(--fg)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg)')}
            >
              {link.name}
            </motion.a>
          ))}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ 
              position: 'absolute', 
              bottom: '2rem', 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.7rem', 
              color: 'var(--accent-lime)' 
            }}
          >
            SYS_MENU // READY
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
