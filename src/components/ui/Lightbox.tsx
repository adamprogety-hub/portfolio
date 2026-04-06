'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LightboxProps {
  images: string[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ images, title, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when opened
  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling behind modal
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(5, 5, 5, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <style>{`
            .lightbox-top-title { display: block; }
            .lightbox-nav-btn {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              z-index: 10;
            }
            .lightbox-nav-prev { left: 2rem; }
            .lightbox-nav-next { right: 2rem; }
            @media (max-width: 768px) {
              .lightbox-top-title { display: none; } /* Hide title on small screens */
              .lightbox-nav-btn {
                top: auto;
                bottom: -3.5rem; /* Push down to bottom bar area */
                transform: none;
                width: 40px !important;
                height: 40px !important;
                padding: 0 !important;
              }
              .lightbox-nav-prev { left: 1rem; }
              .lightbox-nav-next { right: 1rem; }
            }
          `}</style>

          {/* TOP BAR */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <h3 className="lightbox-top-title" style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.8rem', 
                fontWeight: 800, 
                letterSpacing: '0.05em',
                color: 'var(--accent-cyan)'
              }}>
                {title.toUpperCase()}
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--fg-muted)' }}>
                [ HIGHLIGHTS ]
              </span>
            </div>
            
            <button
              onClick={onClose}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: 'var(--fg)',
                background: 'none',
                border: '1px solid var(--border)',
                padding: '0.4rem 0.8rem',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-red)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg)'}
            >
              [ ESC ] CLOSE
            </button>
          </div>

          {/* IMAGE VIEWPORT */}
          <div style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '5vw',
            minHeight: 0, /* CRITICAL for flex children to allow overflow control */
          }}>
            {/* Nav Left */}
            <button
              onClick={handlePrev}
              className="lightbox-nav-btn lightbox-nav-prev"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--fg)',
                background: 'rgba(10, 10, 10, 0.5)',
                border: '1px solid var(--border)',
                padding: '1rem',
                cursor: 'pointer',
                backdropFilter: 'blur(5px)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-cyan)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(10, 10, 10, 0.5)'}
            >
              {'<'}
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex} // Re-animates when index changes
                src={images[currentIndex]}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  border: '1px solid var(--border)',
                }}
                alt={`Slide ${currentIndex + 1}`}
              />
            </AnimatePresence>

            {/* Nav Right */}
            <button
              onClick={handleNext}
              className="lightbox-nav-btn lightbox-nav-next"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--fg)',
                background: 'rgba(10, 10, 10, 0.5)',
                border: '1px solid var(--border)',
                padding: '1rem',
                cursor: 'pointer',
                backdropFilter: 'blur(5px)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-cyan)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(10, 10, 10, 0.5)'}
            >
              {'>'}
            </button>
          </div>

          {/* BOTTOM BAR / COUNTER */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem',
            borderTop: '1px solid var(--border)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--fg)',
              letterSpacing: '0.1em',
            }}>
              SELECTED SLIDES: <span style={{ color: 'var(--accent-cyan)' }}>{(currentIndex + 1).toString().padStart(2, '0')}</span> / {images.length.toString().padStart(2, '0')}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
