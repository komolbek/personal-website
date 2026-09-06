// Funnel events for the calculator — REDESIGN.md §8.
//
// The point of the redesign is enquiries, so it is measured by step rather than
// by pageview. calc_area matters most: over a month it is a live list of what
// business owners in Tashkent say their main problem is.
//
// These go to whichever analytics snippets layout.tsx has configured (GA4 and
// Yandex.Metrica). Hub has no event intake endpoint — only the lead intake in
// src/lib/hub-lead.ts — so per-event data does not reach Hub. What does reach
// it is the full answer set attached to every submitted quote, which is enough
// to recover the areas and package for anyone who actually enquired.

export type CalcEvent =
  | 'calc_start'
  | 'calc_area'
  | 'calc_result'
  | 'calc_ladder'
  | 'calc_drop'
  | 'calc_submit'
  | 'tab_open';

type Payload = Record<string, string | number | undefined>;

export function trackCalc(event: CalcEvent, payload: Payload = {}): void {
  if (typeof window === 'undefined') return;

  try {
    window.gtag?.('event', event, { event_category: 'calculator', ...payload });
  } catch {
    // Analytics must never break the tool the visitor is using.
  }
  try {
    window.ym?.(Number(process.env.NEXT_PUBLIC_YM_ID), 'reachGoal', event, payload);
  } catch {
    // As above.
  }
}
