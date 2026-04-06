'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const skillsRow1 = [
  'Kandinsky',
  'Midjourney',
  'Stable Diffusion',
  'Three.js',
  'WebGL',
  'Figma',
  'MS PowerPoint',
  'Adobe Illustrator',
  'SCADA',
  'ПЛК',
];

const skillsRow2 = [
  'React',
  'Next.js',
  'GSAP',
  'Framer Motion',
  'TypeScript',
  'GLSL Shaders',
  'Blender',
  'Node.js',
  'Vercel',
  'Git',
];

const skillTooltips: Record<string, string> = {
  'Kandinsky': 'Нейросеть для генерации изображений.',
  'Midjourney': 'Передовая AI-модель для создания артов.',
  'Stable Diffusion': 'Open-source нейросеть для контролируемых генераций.',
  'Three.js': 'Библиотека поверх WebGL для создания 3D в браузере.',
  'WebGL': 'Низкоуровневый API для рендеринга сложной 3D-графики.',
  'Figma': 'Ключевой инструмент для проектирования интерфейсов.',
  'MS PowerPoint': 'Стандарт индустрии для упаковки B2B-материалов.',
  'Adobe Illustrator': 'Векторная графика, иконки и типографика.',
  'SCADA': 'Программные комплексы для диспетчеризации и управления.',
  'ПЛК': 'Программируемые логические контроллеры (мозги автоматики).',
  'React': 'Популярная библиотека для декларативного построения UI.',
  'Next.js': 'Мощный фреймворк поверх React с быстрой загрузкой (SSR).',
  'GSAP': 'Индустриальный стандарт для создания web-анимаций.',
  'Framer Motion': 'Инструмент для плавных интерфейсных хореографий.',
  'TypeScript': 'Строго типизированный JS. Исключает многие баги.',
  'GLSL Shaders': 'Шейдеры видеокарт для визуальных спецэффектов.',
  'Blender': 'Профессиональный 3D-пакет для моделирования.',
  'Node.js': 'Выполнение JavaScript на сервере backend.',
  'Vercel': 'Платформа для мгновенного деплоя и хостинга сайтов.',
  'Git': 'Система контроля версий для безопасной разработки.',
};

function MarqueeRow({
  items,
  direction,
  onHoverItem,
  onLeaveItem,
}: {
  items: string[];
  direction: 'left' | 'right';
  onHoverItem: (item: string) => void;
  onLeaveItem: () => void;
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: 'hidden',
        borderBottom: '2px solid var(--border)',
        padding: '1.5rem 0',
      }}
    >
      <div
        className={`marquee-track ${
          direction === 'left' ? 'marquee-left' : 'marquee-right'
        }`}
        style={{ gap: '1rem' }}
      >
        {doubled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              border: '2px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--fg)',
              whiteSpace: 'nowrap',
              marginRight: '1rem',
              transition: 'all 0.15s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--accent-cyan)';
              el.style.color = 'var(--accent-cyan)';
              el.style.boxShadow = '3px 3px 0 var(--accent-cyan)';
              onHoverItem(skill);
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--border)';
              el.style.color = 'var(--fg)';
              el.style.boxShadow = 'none';
              onLeaveItem();
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const translateX = useTransform(mouseX, (v) => {
    if (typeof window === 'undefined') return `${v + 15}px`;
    return v > window.innerWidth / 2 ? `calc(${v}px - 100% - 15px)` : `${v + 15}px`;
  });

  const translateY = useTransform(mouseY, (v) => {
    if (typeof window === 'undefined') return `${v + 15}px`;
    return v > window.innerHeight - 100 ? `calc(${v}px - 100% - 15px)` : `${v + 15}px`;
  });

  const boxShadow = useTransform(mouseX, (v) => {
    if (typeof window === 'undefined') return '4px 4px 0 var(--accent-magenta)';
    return v > window.innerWidth / 2 ? '-4px 4px 0 var(--accent-magenta)' : '4px 4px 0 var(--accent-magenta)';
  });

  const tooltipStyleBase: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'var(--fg)',
    color: 'var(--bg)',
    padding: '0.6rem 1rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    pointerEvents: 'none',
    zIndex: 9999,
    whiteSpace: 'nowrap',
  };

  return (
    <section
      id="навыки"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
      style={{
        borderBottom: '2px solid var(--border)',
        position: 'relative',
      }}
    >
      {/* Dynamic Cursor Tooltip */}
      {hoveredSkill && skillTooltips[hoveredSkill] && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            ...tooltipStyleBase,
            x: translateX,
            y: translateY,
            boxShadow,
          }}
        >
          {skillTooltips[hoveredSkill]}
        </motion.div>
      )}
      {/* Section Header */}
      <div
        className="section-container"
        style={{ paddingBottom: '2rem' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span
              className="text-label"
              style={{ color: 'var(--accent-magenta)' }}
            >
              // 03
            </span>
            <h2 className="text-section-title" style={{ marginTop: '0.5rem' }}>
              Инструменты и навыки
            </h2>
          </div>
          <span className="text-label">Full Stack Creative</span>
        </div>
      </div>

      {/* Marquee Rows — full-bleed */}
      <div style={{ borderTop: '2px solid var(--border)' }}>
        <MarqueeRow items={skillsRow1} direction="left" onHoverItem={setHoveredSkill} onLeaveItem={() => setHoveredSkill(null)} />
        <MarqueeRow items={skillsRow2} direction="right" onHoverItem={setHoveredSkill} onLeaveItem={() => setHoveredSkill(null)} />
      </div>
    </section>
  );
}
