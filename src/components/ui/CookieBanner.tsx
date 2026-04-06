'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Small delay before showing so it doesn't pop in instantly on load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999,
            background: 'var(--bg)',
            border: '2px solid var(--border)',
            padding: '1.5rem',
            maxWidth: '350px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
          className="cookie-banner-wrapper"
        >
          {/* Decorative Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span className="text-label" style={{ color: 'var(--accent-lime)' }}>
               [ DATAPOLICY // COOKIES ]
             </span>
             {/* Small visual decoration */}
             <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: 6, height: 6, background: 'var(--border)' }} />
                <div style={{ width: 6, height: 6, background: 'var(--accent-cyan)' }} />
             </div>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--fg-muted)',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Этот цифровой опыт использует cookie-файлы для анализа трафика и рендеринга персонального контента. Оставаясь на сайте, вы соглашаетесь с обработкой данных.
          </p>

          <button
            onClick={handleAccept}
            className="brutal-btn"
            style={{
              padding: '0.8rem 1rem',
              fontSize: '0.8rem',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            ПРИНЯТЬ
          </button>

          <style jsx>{`
            @media (max-width: 600px) {
              .cookie-banner-wrapper {
                bottom: 1rem !important;
                right: 1rem !important;
                left: 1rem !important;
                max-width: none !important;
                width: calc(100% - 2rem) !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
