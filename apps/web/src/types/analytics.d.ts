// The analytics snippets injected in src/app/layout.tsx attach these to
// window. Declared once here rather than re-declared in each component that
// fires an event.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  }
}

export {};
