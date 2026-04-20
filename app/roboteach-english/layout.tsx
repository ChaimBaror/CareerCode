import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const title = 'RoboTeach — למד אנגלית עם רובוט AI';
const description =
  'שיעורי אנגלית אינטראקטיביים לדוברי עברית עם מורה רובוט חכם. תרגול שיחה, אוצר מילים, דקדוק ותרגום — מדבר, מקשיב, ומעניק XP ורמות.';
const keywords = [
  'אנגלית',
  'לימוד אנגלית',
  'RoboTeach',
  'AI English teacher',
  'Hebrew speakers',
  'תרגול אנגלית',
  'שיחה באנגלית',
  'אוצר מילים',
];

export const metadata: Metadata = {
  title,
  description,
  keywords,
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'he_IL',
    siteName: 'RoboTeach',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/roboteach-english' },
};

export default function RoboTeachLayout({ children }: { children: ReactNode }) {
  return children;
}
