'use client';

import { useEffect, useState } from 'react';
import { scrollBehavior } from '@/lib/motion';

/**
 * Rendered by LayoutContent, so it is on every page. It used to pull
 * framer-motion into the shared chunk for a fade on one small button, which
 * put the whole library in the critical path of the calculator too
 * (REDESIGN.md §5.6). The fade is a CSS opacity transition now.
 *
 * The button stays mounted and is hidden with `invisible` rather than
 * unmounted, so the transition has something to run on in both directions.
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
      aria-label="Наверх"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={[
        'fixed bottom-24 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full',
        'border border-line-strong bg-paper text-ink-muted shadow-lg transition-all duration-200',
        'hover:border-accent hover:text-accent',
        isVisible ? 'opacity-100' : 'invisible opacity-0',
      ].join(' ')}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
