'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface SlidePreviewProps {
  isHovered: boolean;
  accent: string;
  images?: string[];
  slideCount?: number;
}

export default function SlidePreview({ isHovered, accent, images, slideCount = 24 }: SlidePreviewProps) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16/10',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
        overflow: 'hidden',
        background: 'var(--bg)',
        border: '1px dashed var(--border)',
      }}
    >
      {/* Bottom slide (Slide 03) */}
      <motion.div
        animate={{
          rotateZ: isHovered ? -8 : 0,
          x: isHovered ? '-15%' : 0,
          y: isHovered ? '8%' : 0,
          scale: isHovered ? 0.95 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          position: 'absolute',
          width: '75%',
          height: '75%',
          backgroundColor: '#0a0a0a',
          border: `1px solid ${accent}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        {images && images[2] ? (
          <Image src={images[2]} alt="Slide 3" fill style={{ objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--bg)', WebkitTextStroke: `1px ${accent}40`, position: 'absolute', right: '-5%', bottom: '-15%' }}>03</span>
        )}
      </motion.div>

      {/* Middle slide (Slide 02) */}
      <motion.div
        animate={{
          rotateZ: isHovered ? 5 : 0,
          x: isHovered ? '15%' : 0,
          y: isHovered ? '-5%' : 0,
          scale: isHovered ? 0.98 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.05 }}
        style={{
          position: 'absolute',
          width: '75%',
          height: '75%',
          backgroundColor: '#0f0f0f',
          border: `1px solid ${accent}80`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        {images && images[1] ? (
          <Image src={images[1]} alt="Slide 2" fill style={{ objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--bg)', WebkitTextStroke: `1px ${accent}80`, position: 'absolute', right: '-5%', bottom: '-15%' }}>02</span>
        )}
      </motion.div>

      {/* Top slide (Slide 01) - Hero Cover */}
      <motion.div
        animate={{
          rotateZ: 0,
          x: 0,
          y: isHovered ? '-10%' : 0,
          scale: 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
        style={{
          position: 'absolute',
          width: '75%',
          height: '75%',
          backgroundColor: '#111111',
          border: `2px solid ${accent}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
          overflow: 'hidden',
        }}
      >
        {/* Grid overlay mimicking specific slides */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, ${accent}20 1px, transparent 1px),
              linear-gradient(to bottom, ${accent}20 1px, transparent 1px)
            `,
            backgroundSize: '25% 25%',
          }}
        />
        {images && images[0] ? (
          <Image src={images[0]} alt="Slide 1" fill style={{ objectFit: 'cover' }} />
        ) : (
          <>
            <span className="text-label" style={{ color: accent, zIndex: 1, backgroundColor: '#111', padding: '0.25rem 0.5rem', border: `1px solid ${accent}40` }}>
              [ SLIDE_PREVIEW ]
            </span>
            <span style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--bg)', WebkitTextStroke: `2px ${accent}`, position: 'absolute', right: '-5%', bottom: '-15%' }}>01</span>
          </>
        )}
      </motion.div>

      {/* Badge Slide Count */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10
        }}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          zIndex: 4,
          backgroundColor: accent,
          color: '#000',
          padding: '2px 6px',
          fontSize: '0.6rem',
          fontWeight: 'bold',
          letterSpacing: '0.05em'
        }}
      >
        {slideCount} SLIDES
      </motion.div>
    </div>
  );
}
