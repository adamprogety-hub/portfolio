'use client';

import Hero from '@/components/sections/Hero';
import Presentations from '@/components/sections/Presentations';
import WebSection from '@/components/sections/WebSection';
import Skills from '@/components/sections/Skills';
import Timeline from '@/components/sections/Timeline';
import { CTABanner, MegaCTA } from '@/components/sections/CTA';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--fg)',
      }}
    >
      <Hero />
      <Presentations />

      {/* ─── CTA: After presentations ─── */}
      <CTABanner
        text="Презентация, после которой конкуренты нервничают"
        buttonText="Обсудить"
        href="https://t.me/asphxdel"
        accent="var(--accent-lime)"
      />

      <WebSection />

      {/* ─── CTA: After web section ─── */}
      <CTABanner
        text="Сайт под ключ — от дизайна до хостинга. Без посредников"
        buttonText="Заказать"
        href="https://t.me/asphxdel"
        accent="var(--accent-cyan)"
      />

      <Skills />
      <Timeline />

      {/* ─── MEGA CTA: Final contact block ─── */}
      <MegaCTA />

      {/* ─── FOOTER ─── */}
      <footer className="site-footer">
        <span className="text-label">
          © 2026 ИЛЬЯ ХАЙМИН — ВСЕ ПРАВА ЗАЩИЩЕНЫ
        </span>
        <span
          className="text-label"
          style={{ color: 'var(--accent-lime)' }}
        >
          [ BRUTALIST_EDITION ]
        </span>

        <style jsx>{`
          .site-footer {
            padding: 3rem var(--section-pad-x);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
          }
          .footer-link {
            color: var(--fg-muted);
            text-decoration: none;
            transition: color 0.15s;
          }
          .footer-link:hover {
            color: var(--accent-lime);
          }
          @media (max-width: 768px) {
            .site-footer {
              flex-direction: column;
              align-items: flex-start;
              gap: 1.5rem;
            }
          }
        `}</style>
      </footer>
    </main>
  );
}
