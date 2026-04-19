import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
});

import CookieBanner from '@/components/ui/CookieBanner';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Header from '@/components/ui/Header';
import CustomCursor from '@/components/ui/CustomCursor';
import Preloader from '@/components/ui/Preloader';

export const metadata: Metadata = {
  title: 'Илья Хаймин — Сайты и презентации для бизнеса',
  description:
    'Делаю малый бизнес неотличимым от крупного. Сайты под ключ с 3D и WebGL, презентации для B2B, AI-дизайн. Москва.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} noise-overlay`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <Header />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
