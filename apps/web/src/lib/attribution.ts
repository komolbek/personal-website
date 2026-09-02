// Where an enquiry came from, captured on the visitor's first page and kept
// until they submit the contact form.
//
// The form used to read utm_* straight off window.location at submit time,
// which only worked when someone landed directly on the form. A visitor from
// the Instagram bio lands on the homepage, browses, then clicks through to
// /contact — and the query string is gone by then, so every enquiry recorded
// an empty source. That is why no submission has ever carried attribution.
//
// sessionStorage, not a cookie: this is read only by our own form on the same
// tab, is gone when the tab closes, and never leaves the browser except as the
// fields already stored on ContactSubmission. Nothing here needs consent.

const STORAGE_KEY = 'necto_attribution';

export interface Attribution {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  referrer: string;
}

const EMPTY: Attribution = {
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
  utmTerm: '',
  referrer: '',
};

function fromUrl(): { attribution: Attribution; hasUtm: boolean } {
  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmContent: params.get('utm_content') || '',
    utmTerm: params.get('utm_term') || '',
    referrer: document.referrer || '',
  };
  const hasUtm =
    !!attribution.utmSource ||
    !!attribution.utmMedium ||
    !!attribution.utmCampaign ||
    !!attribution.utmContent ||
    !!attribution.utmTerm;
  return { attribution, hasUtm };
}

// Storage is unavailable in some private-browsing modes and throws rather than
// returning null, so every access is guarded. Losing attribution is acceptable;
// breaking the page over it is not.
function read(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Attribution>) } : null;
  } catch {
    return null;
  }
}

function write(attribution: Attribution): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // ignored — see read()
  }
}

/**
 * Record where this visit came from. Safe to call on every page: the first
 * tagged URL of the session wins, so a later untagged page cannot erase it.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;

  const { attribution, hasUtm } = fromUrl();
  const stored = read();

  // A tagged URL always wins — someone arriving again from a different
  // campaign is telling us something newer than what we already had.
  if (hasUtm) {
    write(attribution);
    return;
  }

  // Otherwise keep the first entry's referrer, so an untagged visit still
  // records that it came from, say, a search engine.
  if (!stored) write(attribution);
}

/** What to send with the contact form. Empty strings when nothing was captured. */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return EMPTY;
  return read() ?? fromUrl().attribution;
}
