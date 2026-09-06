import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Colours live in globals.css as tokens (REDESIGN.md §5.1). The former
      // `brand` (red) and `accent` (yellow) palettes and the six gradient
      // backgroundImages were never referenced anywhere and are gone.
      colors: {
        background: "var(--paper)",
        foreground: "var(--ink)",
        paper: "var(--paper)",
        "paper-alt": "var(--paper-alt)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "accent-line": "var(--accent-line)",
        "accent-ink": "var(--accent-ink)",
        ok: "var(--ok)",
        flag: "var(--flag)",
        "flag-soft": "var(--flag-soft)",
      },
    },
  },
  plugins: [],
};
export default config;
