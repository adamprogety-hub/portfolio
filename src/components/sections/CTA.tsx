'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/* ─────────────────────────────────────────────
   CTA Banner — full-width strip between sections
   ───────────────────────────────────────────── */
export function CTABanner({
  text,
  buttonText,
  href,
  accent = 'var(--accent-lime)',
}: {
  text: string;
  buttonText: string;
  href: string;
  accent?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        borderTop: `2px solid ${hovered ? accent : 'var(--border)'}`,
        borderBottom: `2px solid ${hovered ? accent : 'var(--border)'}`,
        background: hovered
          ? `linear-gradient(90deg, transparent 0%, ${accent}08 50%, transparent 100%)`
          : 'var(--bg-elevated)',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="cta-banner-inner">
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0, overflow: 'visible' }}
          >
            <motion.path 
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
              stroke={accent} 
              strokeWidth="2" 
              strokeLinejoin="bevel"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 2vw, 1.25rem)',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.02em',
              color: 'var(--fg)',
            }}
          >
            {text}
          </span>
        </div>

        {/* Right — button */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.1em',
            color: hovered ? '#000' : accent,
            padding: '0.6rem 1.4rem',
            border: `2px solid ${accent}`,
            background: hovered ? accent : 'transparent',
            boxShadow: hovered ? `3px 3px 0 var(--fg)` : 'none',
            transform: hovered ? 'translate(-2px, -2px)' : 'none',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap' as const,
          }}
        >
          {buttonText}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </span>
      </div>

      <style jsx>{`
        .cta-banner-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.8rem var(--section-pad-x);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 768px) {
          .cta-banner-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   Mega CTA — strict modern brutalism style
   ───────────────────────────────────────────── */
export function MegaCTA() {
  const contacts = [
    { label: 'Telegram', href: 'https://t.me/asphxdel', accent: 'var(--accent-lime)' },
    { label: 'MAX', href: 'https://max.ru/u/f9LHodD0cOLEAEG1ML1Kb6x0hwUhaitgr4dsB3wLArlv_Mv31pgEbufpBx8', accent: 'var(--accent-magenta)' },
    { label: 'Email', href: 'mailto:i@asphxdel.ru', accent: 'var(--accent-cyan)' },
    { label: '+7 977 266-20-07', href: 'tel:+79772662007', accent: 'var(--accent-orange)' },
  ];

  const stats = [
    { value: '20+', label: 'Презентаций' },
    { value: '3D', label: 'WebGL сайты' },
    { value: 'AI', label: 'В продакшене' },
    { value: '24ч', label: 'Время ответа' },
  ];

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '2px solid var(--border)',
        background: 'var(--bg)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 0',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ padding: '0 var(--section-pad-x)' }}>
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: 'var(--accent-lime)',
              display: 'block',
              marginBottom: '2rem',
            }}
          >
            // ГОТОВЫ НАЧАТЬ?
          </motion.span>

          {/* MASSIVE headline — strict monochrome style with clean air */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.1,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="mega-cta-headline"
          >
            ДАВАЙТЕ
            <br />
            РАБОТАТЬ
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, var(--accent-lime), var(--accent-cyan))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                position: 'relative',
                display: 'inline-block',
                marginTop: '0.1rem',
              }}
            >
              ВМЕСТЕ
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
              color: 'var(--fg-muted)',
              lineHeight: 1.7,
              maxWidth: 550,
              marginBottom: '4rem',
            }}
          >
            Генеративный дизайн, 3D&#8209;интерфейсы, AI&#8209;продакшен.
            Превращаю сложный технический контент в визуальную систему.
          </motion.p>
        </div>

        {/* Structured Grid for Contacts & Stats -> Pure Brutalism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            borderTop: '2px solid var(--border)',
            borderBottom: '2px solid var(--border)',
          }}
        >
          {/* Stats Row */}
          <div className="mega-grid-row">
            {stats.map((stat) => (
              <div key={stat.label} className="mega-grid-cell">
                <span className="stat-val">{stat.value}</span>
                <span className="stat-lbl">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Contacts Row */}
          <div className="mega-grid-row" style={{ borderTop: '2px solid var(--border)' }}>
            {contacts.map((contact, i) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mega-grid-link"
                style={{
                  '--hover-accent': contact.accent,
                } as React.CSSProperties}
              >
                {contact.label}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="arrow-icon">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
