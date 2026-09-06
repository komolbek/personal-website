import { siteConfig } from '@/config/site';
import { ADDONS, PKG, PROGRAM_IDS, SITE_IDS } from '@/config/calculator';
import { getCalcText } from '@/locales/calc';
import { siteConfig as site } from '@/config/site';

// Programs before sites, as on /pricing.
const CATALOG = [...PROGRAM_IDS, ...SITE_IDS];

// Rendered in the root layout, which has no locale context — the switcher is a
// client-side preference, not a route. Russian is the canonical language, so
// that is what the markup describes.
const catalogText = getCalcText(site.defaultLocale);

export function JsonLd() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressCountry: 'UZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.2995,
      longitude: 69.2401,
    },
    areaServed: [
      { '@type': 'Country', name: 'Uzbekistan' },
      { '@type': 'Country', name: 'Kazakhstan' },
      { '@type': 'Country', name: 'Russia' },
    ],
    knowsLanguage: ['en', 'ru', 'uz'],
    priceRange: '$$',
    serviceType: [
      'Web Development',
      'Software Development',
      'Business Automation',
      'CRM Development',
      'Mobile App Development',
      'AI Integration',
      'E-commerce Development',
      'IT Consulting',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Программы, сайты и приложения',
      // Almost no studio in Tashkent publishes a fixed price (see
      // Business/market_analysis_tashkent.md). Putting real figures in the
      // markup is the whole position, so they belong here too — read from
      // src/config/calculator.ts, never retyped.
      itemListElement: CATALOG.map((id) => ({
        '@type': 'Offer',
        price: String(PKG[id].price),
        priceCurrency: 'UZS',
        // The price holds until it is written into a contract; it is not a
        // standing public offer with no end date.
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/pricing`,
        itemOffered: {
          '@type': 'Service',
          name: catalogText.pkg[id].name,
          description: catalogText.pkg[id].why,
          provider: { '@type': 'Organization', name: siteConfig.name },
          areaServed: { '@type': 'City', name: 'Tashkent' },
        },
      })).concat(
        ADDONS.map((a) => ({
          '@type': 'Offer',
          price: String(a.p),
          priceCurrency: 'UZS',
          availability: 'https://schema.org/InStock',
          url: `${siteConfig.url}/pricing`,
          itemOffered: {
            '@type': 'Service',
            name: catalogText.addons[a.id].n,
            description: catalogText.addons[a.id].s,
            provider: { '@type': 'Organization', name: siteConfig.name },
            areaServed: { '@type': 'City', name: 'Tashkent' },
          },
        }))
      ),
    },
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      availableLanguage: ['English', 'Russian', 'Uzbek'],
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: ['en', 'ru', 'uz'],
    // The SearchAction that used to live here pointed at /portfolio?q=, which
    // never existed — no page on this site reads a q parameter. Markup for a
    // feature that is not there is the same problem as a price that is not
    // real, so it is gone rather than repointed at /works.
  };

  // The FAQPage block that used to sit here described the homepage FAQ
  // section, which the redesign replaced with the calculator. Google requires
  // FAQ markup to match Q&A visible on the page, so it is removed rather than
  // left describing a section that no longer exists. If the «Как мы работаем»
  // panels (§7) are ever rewritten as questions and answers, it can come back.

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
