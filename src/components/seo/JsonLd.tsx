import { siteConfig } from '@/config/site';

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
      name: 'IT Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Development / Разработка сайтов / Sayt yaratish',
            description: 'Custom website development for businesses in Uzbekistan and Central Asia',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Automation / Автоматизация бизнеса / Biznes avtomatlashtirish',
            description: 'End-to-end business process automation solutions',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CRM Systems / CRM системы / CRM tizimlari',
            description: 'Custom CRM system development and implementation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development / Мобильные приложения / Mobil ilovalar',
            description: 'iOS and Android mobile application development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Integration / Интеграция ИИ / AI integratsiya',
            description: 'Artificial intelligence integration for business processes',
          },
        },
      ],
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
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/portfolio?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

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
