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

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does it take to develop a custom system?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Typical projects take 4-12 weeks depending on complexity. A simple booking platform can be ready in 4-6 weeks, while a full CRM or management system takes 8-12 weeks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer ongoing support after launch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All products include ongoing technical support, regular updates, and bug fixes. We also offer extended maintenance plans for hosting, monitoring, and feature additions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cost of your services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SaaS products start from 4,200,000 UZS/month (~$336). Custom development projects are quoted individually based on scope. We offer a free initial consultation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you integrate AI into my existing system?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We specialize in adding AI capabilities to existing systems — from chatbots and document processing to intelligent analytics and recommendation engines.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work with clients outside Uzbekistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we work with clients worldwide. Our team communicates fluently in English, Russian, and Uzbek and uses modern project management tools for smooth collaboration.',
        },
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
