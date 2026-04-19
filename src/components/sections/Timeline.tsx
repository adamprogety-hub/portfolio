'use client';

import { motion } from 'framer-motion';

const timelineData = [
  {
    year: '2024 — Н.В.',
    title: 'МЗТА Технопарк',
    description:
      'Генеративный дизайн, внедрение Kandinsky и Midjourney в продакшен-пайплайн. Визуальная стратегия бренда со 100-летней историей. 5+ презентаций для B2B-направления.',
    accent: 'var(--accent-lime)',
    tags: ['Kandinsky', 'Figma', 'AI Production'],
  },
  {
    year: '2023 — 2024',
    title: 'РТК Автоматика',
    description:
      'Упаковка сложного технического контента в визуальную систему. Создал базу из 20+ адаптируемых слайдов и единый визуальный стиль для всей компании.',
    accent: 'var(--accent-cyan)',
    tags: ['PowerPoint', 'Illustrator', 'B2B'],
  },
  {
    year: '2020 — 2025',
    title: 'МАДИ — Инженер',
    description:
      'Специальность «Цифровые управляющие системы в строительстве». Поступил после армии. Здесь сделал первые 5 презентаций и начал верстать — фундамент инженерного и дизайн-мышления.',
    accent: 'var(--accent-magenta)',
    tags: ['АСУ ТП', 'SCADA', 'ПЛК'],
  },
  {
    year: 'Параллельно',
    title: 'Преподаватель и методолог',
    description:
      'Офлайн-курсы по ПЛК и SCADA для инженеров. Умение структурировать сложные массивы знаний — навык, который определяет качество каждого проекта.',
    accent: 'var(--accent-orange)',
    tags: ['Методология', 'Образование', 'ПЛК'],
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Timeline() {
  return (
    <section
      id="опыт"
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
            marginBottom: '4rem',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span
              className="text-label"
              style={{ color: 'var(--accent-orange)' }}
            >
              // 04
            </span>
            <h2 className="text-section-title" style={{ marginTop: '0.5rem' }}>
              Таймлайн
            </h2>
          </div>
          <span className="text-label">Career Path</span>
        </div>

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            paddingLeft: '3.5rem',
          }}
        >
          {/* Vertical line */}
          <div className="timeline-line" />

          {/* Items */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
            }}
          >
            {timelineData.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={itemVariants}
                style={{
                  position: 'relative',
                }}
              >
                {/* Square dot */}
                <div
                  className="timeline-dot"
                  style={{
                    background: item.accent,
                  }}
                />

                {/* Card */}
                <div
                  className="brutal-card"
                  style={{
                    padding: '2rem',
                    cursor: 'default',
                  }}
                >
                  {/* Year badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      padding: '0.3rem 0.8rem',
                      border: `2px solid ${item.accent}`,
                      marginBottom: '1rem',
                    }}
                  >
                    <span
                      className="text-label"
                      style={{
                        color: item.accent,
                        letterSpacing: '0.1em',
                      }}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--fg-muted)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      maxWidth: '600px',
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Tags */}
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
                    {item.tags.map((tag, i) => (
                      <span key={tag} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <span style={{ color: 'var(--fg)' }}>{tag}</span>
                        {i < item.tags.length - 1 && (
                          <span style={{ color: item.accent, margin: '0 0 0 0.5rem' }}>//</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
