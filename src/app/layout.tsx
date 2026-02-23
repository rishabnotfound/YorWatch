import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'YorWatch - Discover Movies & TV Shows',
    template: '%s | YorWatch',
  },
  description: 'Discover and explore movies and TV shows with YorWatch - a minimal, cinematic browsing experience.',
  keywords: ['movies', 'tv shows', 'streaming', 'discover', 'trending'],
  authors: [{ name: 'YorWatch' }],
  openGraph: {
    title: 'YorWatch',
    description: 'Discover and explore movies and TV shows',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
