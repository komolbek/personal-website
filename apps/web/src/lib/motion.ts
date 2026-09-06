/**
 * prefers-reduced-motion for scripted scrolling.
 *
 * The CSS media query in globals.css cannot reach `scrollTo`/`scrollIntoView`
 * with `behavior: 'smooth'` — those animate regardless of the setting. Both
 * scroll call sites on the site go through this (REDESIGN.md §9, stage 5).
 */
export function scrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto';
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}
