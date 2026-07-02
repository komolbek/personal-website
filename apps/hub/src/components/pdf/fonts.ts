import { Font } from '@react-pdf/renderer';

// The built-in Helvetica font has no Cyrillic glyphs, so Russian PDFs would
// render as blank boxes. Register Roboto (full Latin + Cyrillic coverage) from
// a hosted TTF. @react-pdf fetches it once and caches it for the process, which
// keeps this working under the standalone build where local asset files are not
// copied into the runtime image.
const ROBOTO_REGULAR =
  'https://cdn.jsdelivr.net/npm/@expo-google-fonts/roboto/Roboto_400Regular.ttf';
const ROBOTO_BOLD =
  'https://cdn.jsdelivr.net/npm/@expo-google-fonts/roboto/Roboto_700Bold.ttf';

export const PDF_FONT_FAMILY = 'Roboto';

let registered = false;

export function registerPdfFonts() {
  if (registered) return;
  Font.register({
    family: PDF_FONT_FAMILY,
    fonts: [
      { src: ROBOTO_REGULAR, fontWeight: 'normal' },
      { src: ROBOTO_BOLD, fontWeight: 'bold' },
    ],
  });
  // Keep long words (URLs, IDs) from being split character-by-character.
  Font.registerHyphenationCallback((word) => [word]);
  registered = true;
}
