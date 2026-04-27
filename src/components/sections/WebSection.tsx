'use client';

import { motion, useInView } from 'framer-motion';
import { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PortfolioScene, GosLendScene, AspScene, KomegaScene } from '../3d/WebScenes';

const webProjects = [
  {
    id: 'web3d-portfolio',
    title: 'ПОРТФОЛИО: BRUTALIST EDITION',
    subtitle: 'WebGL & Framer Motion',
    scope: 'Дизайн / Код / 3D / Хостинг',
    description:
      'Этот сайт. Персональное портфолио в индустриальном брутализме с интерактивными 3D-сценами на React Three Fiber, покадровыми анимациями и видеобэкграундами. Полностью адаптивная вёрстка, кастомный курсор и превью презентаций.',
    stack: ['Next.js', 'React Three Fiber', 'Framer Motion', 'Tailwind', 'Vercel'],
    url: '/', // Current site
    accent: 'var(--accent-cyan)',
    displayUrl: 'khaimin.ru',
    videoSrc: '/projects/portfolio.mp4',
  },
  {
    id: 'gos-lend',
    title: 'ЗЕЛЁНЫЙ КОНТУР',
    subtitle: 'Лендинг дезинсекции & арбористики',
    scope: 'Дизайн / Код / Логотип / Копирайтинг / Домен / Хостинг',
    description:
      'Премиальный лендинг для компании по обработке земельных участков от клещей, борщевика и вредителей. 10 услуг, интерактивный квиз-калькулятор, секция команды и отзывов, Bento-grid UI, мобильный sticky CTA и SEO-оптимизация под Москву и МО.',
    stack: ['Next.js', 'React Three Fiber', 'GSAP', 'Tailwind', 'Supabase'],
    url: 'https://portfolio-37do.vercel.app',
    accent: 'var(--accent-lime)',
    displayUrl: 'portfolio-37do.vercel.app',
    videoSrc: '/projects/gos-lend.mp4',
  },
  {
    id: 'asp-cleaning',
    title: 'АУРАЧИСТОТЫ.РФ',
    subtitle: 'Экстренный клининг 24/7',
    scope: 'Дизайн / Код / Логотип / Копирайтинг / Домен / Хостинг',
    description:
      'Сайт для компании экстренной уборки после смерти, пожара и затопления. Тёмный премиальный дизайн, 6 направлений услуг, протокол работы, блок «дилетанты = угроза» для формирования доверия, форма экстренной связи и Schema.org разметка.',
    stack: ['Next.js', 'Supabase', 'Framer Motion', 'SSR', 'Tailwind'],
    url: 'https://portfolio-b2bo.vercel.app',
    accent: 'var(--accent-magenta)',
    displayUrl: 'portfolio-b2bo.vercel.app',
    videoSrc: '/projects/asp.mp4',
  },
  {
    id: 'komega-lab',
    title: 'КОМЕГА — 3D ЛАБОРАТОРИЯ',
    subtitle: 'Интерактивный 3D-конфигуратор ПЛК',
    scope: 'Дизайн / Код / 3D / Анимация / Хостинг',
    description:
      'Веб-лаборатория промышленных контроллеров МЗТА с интерактивным 3D-просмотром. Четыре модели ПЛК на вращающемся подиуме, HMI-дашборды на экранах контроллеров, кинематографические переходы между продуктами и детальные спецификации.',
    stack: ['Next.js', 'React Three Fiber', 'GSAP', 'Tailwind', 'Vercel'],
    url: 'https://komega.vercel.app',
    accent: 'var(--accent-cyan)',
    displayUrl: 'komega.vercel.app',
    videoSrc: '/projects/komega.mp4',
  },
];

// Lazy loader prevents multiple WebGL contexts from crashing mobile devices
function LazyProjectCanvas({ project, hoveredCard, renderScene }: any) {
  const ref = useRef(null);
  // Mount the heavy 3D canvas only when it gets close to the viewport
  const isInView = useInView(ref, { margin: '400px' });

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      {isInView && (
        <Canvas
          style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.2]} // Capped to 1.2 to prevent thermal throttling on mobile Safari
        >
          <Suspense fallback={null}>
            {renderScene(project.id, hoveredCard === project.id)}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function WebSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [clicks, setClicks] = useState<Record<string, number>>({});

  const handlePreviewClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClicks(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const renderScene = (projectId: string, isHovered: boolean) => {
    const clickSignal = clicks[projectId] || 0;
    switch (projectId) {
      case 'web3d-portfolio':
        return <PortfolioScene isHovered={isHovered} clickSignal={clickSignal} />;
      case 'gos-lend':
        return <GosLendScene isHovered={isHovered} clickSignal={clickSignal} />;
      case 'asp-cleaning':
        return <AspScene isHovered={isHovered} clickSignal={clickSignal} />;
      case 'komega-lab':
        return <KomegaScene isHovered={isHovered} clickSignal={clickSignal} />;
      default:
        return null;
    }
  };

  return (
    <section
      id="web"
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
            <span className="text-label" style={{ color: 'var(--accent-cyan)' }}>
              // 02
            </span>
            <h2 className="text-section-title" style={{ marginTop: '0.5rem' }}>
              Интерактивный Web
            </h2>
          </div>
          <span className="text-label">3D & WebGL Sites</span>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {webProjects.map((project, i) => (
            <motion.article
              key={project.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={cardVariants}
              className="brutal-card web-project-card"
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Screenshot placeholder (now interactive) */}
              <div 
                className="web-project-preview" 
                style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                onClick={(e) => handlePreviewClick(project.id, e)}
              >
                {/* Decorative browser chrome */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2.5rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 1rem',
                    gap: '0.5rem',
                    zIndex: 10,
                  }}
                >
                  <div style={{ width: 8, height: 8, background: '#FF5F57' }} />
                  <div style={{ width: 8, height: 8, background: '#FEBC2E' }} />
                  <div style={{ width: 8, height: 8, background: '#28C840' }} />
                  <span
                    className="text-label"
                    style={{
                      marginLeft: '1rem',
                      fontSize: '0.6rem',
                      color: 'var(--fg-muted)',
                    }}
                  >
                    {project.displayUrl}
                  </span>
                </div>

                {/* 3D Interactive Scene (Lazy Loaded for Mobile Performance) */}
                <LazyProjectCanvas 
                  project={project} 
                  hoveredCard={hoveredCard} 
                  renderScene={renderScene} 
                />
              </div>

              {/* Content */}
              <div
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span
                    className="text-label"
                    style={{ color: project.accent, marginBottom: '1rem', display: 'block' }}
                  >
                    {project.subtitle}
                  </span>
                  <h3
                    style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--fg-muted)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Scope — full-cycle indicator */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: project.accent,
                      marginBottom: '1.2rem',
                      padding: '0.4rem 0.7rem',
                      border: `1px solid ${project.accent}33`,
                      background: `${project.accent}08`,
                      width: 'fit-content',
                      lineHeight: 1.4,
                    }}
                  >
                    ◆ {project.scope}
                  </div>

                  {/* Stack tags */}
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
                    {project.stack.map((tech, i) => (
                      <span key={tech} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <span style={{ color: 'var(--fg)' }}>{tech}</span>
                        {i < project.stack.length - 1 && (
                          <span style={{ color: project.accent, margin: '0 0 0 0.5rem' }}>//</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ marginTop: '2rem' }}>
                  {project.url === '/' ? (
                    <a
                      href="#hero"
                      className="brutal-btn"
                      style={{ opacity: 0.6 }}
                    >
                      [ ВЫ ЗДЕСЬ ]
                    </a>
                  ) : (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-btn"
                    >
                      Открыть сайт
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

    </section>
  );
}
