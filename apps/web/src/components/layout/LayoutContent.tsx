'use client';

import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg">
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
