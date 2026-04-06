'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';


// Animate each word as a block (not individual chars) to prevent mid-word breaks
const wordVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const titleWords = ['ИЛЬЯ', 'ХАЙМИН'];

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '2px solid var(--border)',
      }}
    >
      {/* ─── FULLSCREEN BACKGROUND VIDEO ─── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.65,
        }}
      >
        {/* Mobile highly compressed version (~4MB) */}
        <source src="/hero-bg-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
        {/* Desktop premium version (~55MB) */}
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ─── OVERLAY GRADIENT ─── */}
      {/* Ensures typography remains readable even if the video has bright moments */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(14,14,14,0.95) 0%, rgba(14,14,14,0.3) 50%, rgba(14,14,14,0.6) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="hero-grid" style={{ zIndex: 2, position: 'relative' }}>
        <div className="hero-content-wrapper">
          
          {/* BOTTOM LEFT — Name */}
          <div className="hero-name-block">
            {/* Animated name — word-level animation prevents mid-word breaks */}
            <h1
              style={{
                fontSize: 'clamp(3rem, 9vw, 9rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase' as const,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                margin: 0,
              }}
            >
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* BOTTOM RIGHT — Info */}
          <div className="hero-info-block">
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
                color: 'var(--fg-muted)',
                lineHeight: 1.6,
              }}
            >
              Генеративный дизайнер &<br />
              Инженер визуальных коммуникаций
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <a href="#presentations" className="brutal-btn">
                Смотреть проекты
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </motion.div>

            {/* Status line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
              }}
            >
              <span className="text-label">
                <span style={{ color: 'var(--accent-lime)' }}>●</span> Доступен
                для проектов
              </span>
              <span className="text-label">Москва, РФ</span>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ─── BOTTOM STATUS BAR ─── */}
      <div
        className="hero-status-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem var(--section-pad-x)',
          borderTop: '2px solid var(--border)',
          background: 'rgba(10, 10, 10, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          gap: '1rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span className="text-label" style={{ minWidth: '120px' }}>© 2025 KHAIMIN</span>
        <span className="text-label hide-on-mobile" style={{ textAlign: 'center' }}>
          THREE.JS // WEBGL // REACT
        </span>
        <span className="text-label" style={{ minWidth: '120px', textAlign: 'right' }}>SCROLL ↓</span>
      </div>

    </section>
  );
}
