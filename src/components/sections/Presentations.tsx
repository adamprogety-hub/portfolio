'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import SlidePreview from '../ui/SlidePreview';

const projects = [
  {
    id: 'mzta',
    title: 'МЗТА: ЭКОСИСТЕМА АСУ ТП',
    description:
      'Генеративный дизайн экосистемы автоматизации. Управление визуальной стратегией бренда со 100-летней&nbsp;историей.',
    tools: ['Figma', 'Kandinsky', 'PowerPoint'],
    accent: 'var(--accent-lime)',
    slideCount: 8,
    images: Array.from({length: 8}, (_, i) => `/images/presentations/mzta/${i + 1}.png`),
  },
  {
    id: 'rtk',
    title: 'РТК АВТОМАТИКА: B2B ПИТЧИ',
    description:
      'Упаковка сложного технического контента. Создание базы 20+ адаптируемых слайдов и единого визуального стиля.',
    tools: ['Figma', 'PowerPoint', 'Illustrator'],
    accent: 'var(--accent-cyan)',
    slideCount: 20,
    images: Array.from({length: 5}, (_, i) => `/images/presentations/rtk/${i + 1}.png`),
  },
  {
    id: 'invest',
    title: 'ИНВЕСТ-ПРЕЗЕНТАЦИИ',
    description:
      'Финансовые питч-деки для привлечения раундов. Структурирование данных и нарратива.',
    tools: ['PowerPoint', 'Figma', 'Midjourney'],
    accent: 'var(--accent-magenta)',
    slideCount: 15,
    images: Array.from({length: 12}, (_, i) => `/images/presentations/invest/${i + 1}.png`),
  },
  {
    id: 'courses',
    title: 'КУРСЫ ПЛК И SCADA',
    description:
      'Методология и визуальные материалы для офлайн-курсов по промышленной автоматизации.',
    tools: ['Figma', 'Kandinsky', 'Illustrator'],
    accent: 'var(--accent-orange)',
    slideCount: 24,
    images: Array.from({length: 7}, (_, i) => `/images/presentations/courses/${i + 1}.png`),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Presentations() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="presentations"
      style={{
        borderBottom: '2px solid var(--border)',
      }}
    >
      <div className="section-container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span className="text-label" style={{ color: 'var(--accent-lime)' }}>
              // 01
            </span>
            <h2 className="text-section-title" style={{ marginTop: '0.5rem' }}>
              Презентации
            </h2>
          </div>
          <span className="text-label">Slide Design & Strategy</span>
        </div>

        {/* Grid */}
        <div className="presentations-grid">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              className="brutal-card presentation-card"
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                cursor: 'pointer', // Indicates interaction
              }}
            >
              {/* Interactive Presentation Deck */}
              <SlidePreview 
                isHovered={hoveredCard === project.id} 
                accent={project.accent} 
                images={(project as any).images} 
                slideCount={project.slideCount}
              />

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--fg-muted)',
                  lineHeight: 1.6,
                  flex: 1,
                }}
                dangerouslySetInnerHTML={{ __html: project.description }}
              />

              {/* Tool tags */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  flexWrap: 'wrap',
                  columnGap: '0.5rem',
                  rowGap: '0.2rem',
                  alignItems: 'center',
                }}
              >
                {project.tools.map((tool, i) => (
                  <span key={tool} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span style={{ color: 'var(--fg)' }}>{tool}</span>
                    {i < project.tools.length - 1 && (
                      <span style={{ color: project.accent, margin: '0 0 0 0.5rem' }}>//</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
