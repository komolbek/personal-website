import type { CalcText } from './types';

// English. The site's third language, and the least used of the three by the
// buyers this page is written for — kept complete so the switcher never falls
// back to Russian mid-page.

export const calcEn: CalcText = {
  eyebrow: 'Business software, websites and apps · Tashkent',
  h1: 'Find out the price in a minute',
  intro:
    'Tick what is going wrong — we will show the package, the price and the timeline. No phone number needed.',
  currency: 'UZS',
  andWord: 'and',

  header: {
    wedge: 'Prices are on the site. Exact ones, not "from"',
    telegram: 'Message us on Telegram',
  },

  footer: {
    works: 'Our work',
    pricing: 'Prices',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy policy',
    terms: 'Terms of use',
    city: 'Tashkent',
    phoneLabel: 'Phone',
  },

  q: {
    area: { t: 'What is going worst in your business?', hint: 'tick everything that applies' },
    size: { t: 'How many people will work in the system?' },
    kind: { t: 'What do you need from a website?' },
    data: { t: 'Where does your data live now?', hint: 'more than one is fine' },
    addon: { t: 'Anything to add?', hint: 'more than one is fine' },
    support: { t: 'Do you need support after launch?', hint: 'the first month is already included' },
  },

  areas: {
    zayavki: 'We lose enquiries and customers',
    sklad: 'Stock never matches the paperwork',
    raspisanie: 'The schedule is a mess',
    vyezd: 'I cannot see what happens off-site',
    docs: 'Half a day typing documents in by hand',
    site: 'Nobody finds us online',
  },
  areaShort: { zayavki: 'enquiries', sklad: 'stock', raspisanie: 'scheduling' },

  sizes: { s: 'Up to 5 people', m: '5–15, a whole department', l: 'More than 15, several departments' },
  siteKinds: { land: 'One page', corp: 'Several pages', shop: 'A shop with payments' },
  dataLocations: {
    head: 'In a notebook or in Telegram',
    excel: 'In Excel',
    prog: 'In another system',
  },

  addons: {
    migr: { n: 'Data migration', s: 'from Excel or from your old system' },
    '1c': { n: 'Link to 1C', s: 'figures reach the accountant on their own' },
    bot: { n: 'Telegram bot', s: 'enquiries and statuses in the messenger' },
    pay: { n: 'Card payments', s: 'Payme, Click, Uzum' },
    train: { n: 'Team training', s: 'a two-hour session' },
  },

  support: {
    no: 'Not needed yet',
    base: 'Basic — {price}/month',
    plus: 'With changes — {price}/month',
  },

  pkg: {
    task: {
      name: 'A system for one job',
      term: '2 weeks',
      why: 'One job end to end — bookings, say, and nothing else. In two weeks you are working in it.',
      inc: [
        '**One job**, one screen, up to 5 people',
        'Works on a phone and on a computer',
        'We train your team and answer questions for a month',
        '**Credited against a larger package** if you order one within 3 months',
      ],
    },
    dept: {
      name: 'A system for one department',
      term: '4–6 weeks',
      why: 'One place where every enquiry is visible: who called, who was never called back, what is urgent.',
      inc: [
        '**No enquiry gets lost** — each has a status and an owner',
        '**A manager sees their own, the director sees everyone.** Nobody downloads the database on their way out',
        'Any report exports to Excel with one button',
        'Up to 10 people, training, a month of support',
      ],
    },
    all: {
      name: 'A system for the whole company',
      term: '10–14 weeks',
      why: 'Departments stop emailing each other spreadsheets and arguing about whose version is right.',
      inc: [
        '**3–5 departments**, the same figures for everyone',
        '**One screen for the director** — what is happening right now',
        'Permissions by role: who sees what and who can change it',
        'Three months of support included',
      ],
    },
    mob: {
      name: 'A mobile app',
      term: '8–12 weeks',
      why: 'The engineer marks the job done from their phone on site, and the office sees it that minute.',
      inc: [
        'iPhone and Android',
        'Published to the App Store and Google Play under your company',
        'A management page — you change the content yourself',
        'Two months of support',
      ],
    },
    docs: {
      name: 'Automatic document processing',
      term: '2–4 weeks',
      why: 'Invoices and delivery notes enter themselves. Your staff check them instead of typing them.',
      inc: [
        'Reads documents and enters the data',
        'Answers customers’ routine questions',
        'Sorts enquiries by topic and owner',
        'Fits onto a system you already run',
      ],
    },
    land: {
      name: 'A one-page website',
      term: '5 working days',
      why: 'One page that explains who you are and delivers the enquiry straight to Telegram.',
      inc: [
        'Designed for you, not a bought template',
        'Three languages: Uzbek, Russian, English',
        'Enquiries arrive in Telegram',
        'Domain and hosting for a year included',
      ],
    },
    corp: {
      name: 'A company website',
      term: '10 working days',
      why: 'Services, news, about the company — and you change the text yourself without calling us.',
      inc: [
        'Up to 10 pages',
        'A management page: you change text and photos yourself',
        'Three languages',
        'Set up so Google finds you',
      ],
    },
    shop: {
      name: 'An online shop',
      term: '15 working days',
      why: 'A catalogue, a basket and money in the account — without the "so how do I pay you" calls.',
      inc: [
        'Catalogue with search and filters',
        'Payment: Payme, Click, Uzum',
        'Order tracking',
        'Manage products and prices',
      ],
    },
  },

  card: {
    emptyTitle: 'Your figure will appear here',
    emptyHint: 'Answer the questions and your figure appears here.',
    emptyHintStarted: 'One more answer and the figure appears here.',
    ranges: { programs: 'Systems', sites: 'Websites', term: 'Timeline' },
    rangeValues: {
      programs: '15–90 million UZS',
      sites: '5–14 million UZS',
      term: 'from 2 weeks',
    },
    fits: 'This is what fits',
    set: {
      '2': 'You need two things',
      '3': 'You need three things',
      '4': 'You need four things',
    },
    whyTitle: 'Why this',
    total: 'Total',
    term: 'Timeline',
    termMulti: 'up to {weeks} weeks',
    upfront: '50% upfront',
    monthly: 'Support',
    perMonth: '/mo',
    remove: 'Remove "{name}"',
    removeTitle: 'Remove',
    stageNoteBold: 'You do not have to do it all at once.',
    stageNoteRest:
      'Start with one part, launch it and add the rest later — each price is fixed and will not grow.',
    ladderNote: 'the options either side',
    ladderTo: '{name} — {price}',
    cta: 'Get the quote',
    guarantees: [
      'This figure goes into the contract',
      '50% upfront, not 100%',
      'The code and the access stay yours',
    ],
    autoLabel: 'from your answer',
  },

  reasons: {
    threeAreas: 'Three areas ticked — **{areas}**. That is past one department.',
    twoAll:
      'Two areas — **{areas}** — and more than 5 people. One department’s system will not cover it.',
    twoDept: 'Two areas, but a team of up to 5 — **one system will cover it**.',
    oneTask: 'One area (**{areas}**) and up to 5 people — the smallest one is enough.',
    oneDept: 'One area (**{areas}**) for a whole department — exactly this package.',
    big: 'More than 15 people across departments — **you need the shared system**.',
    mob: 'Work off-site is invisible from the office — hence **a separate app**.',
    docs: 'Typing documents in by hand is removed by **a separate part** that fits onto any system.',
    site: 'The website is here so **enquiries land in the system**, not in an inbox.',
    excel: 'Data is in Excel — we included **migration** so nobody retypes it.',
    prog: 'There is another system — we added **migration and the 1C link**.',
    head: 'Nothing to migrate — **we start from a clean sheet**, which is a week faster.',
  },

  dialog: {
    title: 'Get the quote',
    lead: 'Leave one contact — we will send the quote and suggest a time to meet. A reply within 24 hours.',
    label: 'Phone or Telegram',
    placeholder: '+998 __ ___ __ __  or  @username',
    send: 'Send',
    sending: 'Sending…',
    sentTitle: 'Sent',
    sentBody: 'We have the quote. We will reply within 24 hours.',
    close: 'Close',
    error: 'It did not send. Message us on Telegram — the quote is already worked out.',
    tooShort: 'Enter a phone number or a Telegram handle so we can reply.',
  },

  mobile: {
    parts: { '2': 'Two things', '3': 'Three things', '4': 'Four things' },
    show: 'View',
  },

  tabsHeading: 'What people usually ask',
  tabs: {
    how: 'How we work',
    price: 'Full price list',
    not: 'What is not included',
    why: 'Why not in 3 days',
  },

  panels: {
    how: {
      title: 'Five steps — and you see what is happening the whole way',
      items: [
        '**A meeting, one hour.** Free. Sometimes we use it to say "you do not need this".',
        '**Quote and contract in 2 days.** Price and timeline are fixed. The scope does not change, the price does not change.',
        '**A demo every week.** The working system in a browser, not a progress report.',
        '**Launch and training.** We migrate the data, train the team, stay close for two weeks.',
        '**Handover.** The source code and every login are yours. You can leave at any point.',
      ],
    },
    price: {
      programs: 'Systems',
      sites: 'Websites',
      addons: 'Add-ons',
      support: 'Support, per month',
      base: 'Basic',
      plus: 'With changes',
    },
    not: {
      title: 'What is paid for separately',
      items: [
        '**Server and domain** — from 500,000 UZS a year, paid to the provider directly.',
        '**Third-party services** — SMS, payment processing and their fees.',
        '**New requests after the contract** — quoted separately, in writing.',
      ],
      budget:
        '**If the budget is smaller** — say so plainly, it is not awkward. A job can often be narrowed to a system for one job at 15,000,000 UZS.',
    },
    why: {
      q: 'Why six weeks, when that lot build a website in three days?',
      p1: 'In three days you get a bought template — we do those too, in 5 days for 5,000,000 UZS.',
      p2: 'A department system starts with us working out how your business actually runs. That part cannot be sped up, only skipped — and then you get a handsome system nobody works in. Also: half of the "CRM for 12 million" in Tashkent is somebody else’s software configured for you, with a licence you pay every month. We write yours, and it stays yours.',
    },
  },

  summary: {
    heading: 'Quote from the website',
    total: 'Total: {sum} UZS',
    term: 'Timeline: {term}',
    monthly: 'Support: {sum}/month',
    answers: 'Answers:',
    areas: 'What is going worst: {v}',
    size: 'How many people: {v}',
    kind: 'What is needed from a website: {v}',
    data: 'Where the data is now: {v}',
    support: 'Support: {v}',
  },

  pricing: {
    h1: 'Prices',
    lead: 'Every price is in UZS and fixed. The price is written into the contract before work starts: the scope does not change, the price does not change. 50% upfront, 50% on handover.',
    hint: 'Not sure which of these fits you? ',
    hintLink: 'Answer a few questions',
    hintTail: ' — in a minute you will have your package, your figure and your timeline.',
    programsTitle: 'Systems to run the company on',
    programsLead:
      'When the work lives in Excel, WhatsApp and a notebook, we move it into one system where everything is visible and nothing gets lost.',
    sitesTitle: 'Websites',
    addonsTitle: 'What you can add',
    addonsLead: 'To any package, or on its own.',
    supportTitle: 'Support after launch',
    supportLead:
      'So that everything keeps working: we watch the server, take daily backups and fix things when they break. The first month (or two to three, depending on the package) is already in the development price.',
    supportSite: 'For a website',
    supportSiteWhat: 'Server, daily backups, updates, small edits',
    supportBase: 'For a system, basic',
    supportBaseWhat:
      'Server, daily backups, monitoring, bug fixes, a reply within 1 working day',
    supportPlus: 'For a system, extended',
    supportPlusWhat: 'Everything in basic plus 10 hours of changes a month',
    perMonth: '/ month',
    notTitle: 'What the price does not include',
    notItems: [
      'Server and domain for the systems — from 500,000 UZS a year, paid to the provider directly.',
      'Paid third-party services: SMS, payment processing and their fees, AI access.',
      'New requests after the contract is signed — quoted separately, in writing.',
    ],
    lessTitle: 'If the budget is smaller',
    lessBody:
      'Say so plainly. A job can often be narrowed to a system for one job at 15,000,000 UZS, so you can see how it works before spending more. We would rather say "this is not for us" than take a project we cannot do well.',
    cta: 'Work out your price',
    colPackage: 'Package',
    colPrice: 'Price',
    colTerm: 'Timeline',
    captionPrograms: 'Prices for business systems',
    captionSites: 'Prices for websites',
  },

  works: {
    lead: 'The products we build and run ourselves, and the systems, websites and apps we have built for clients.',
    productsLead: 'We designed them, wrote them and run them — they work every day.',
    projectsLead: 'Built for one company\'s particular job.',
    open: 'View',
    stripLabel: 'Our products',
    overview: 'About the product',
    screenshots: 'What it looks like',
    howItWorks: 'How it works',
    categories: {
      mobile: 'Mobile app',
      website: 'Website',
      crm: 'CRM',
      ai: 'AI',
      ecommerce: 'Online shop',
      event: 'Events',
      saas: 'SaaS',
    },
  },

  about: {
    h1: 'About the studio',
    p1: 'Necto Automations is a software studio in Tashkent. We build the systems a company runs on: enquiries, stock, scheduling, job sheets. Websites and mobile apps too.',
    p2: 'We work in Russian, Uzbek and English.',
    productsTitle: 'Three of our own products in production',
    products: {
      yuridix: 'cases, clients and billing for law firms',
      ordo: 'online booking for businesses that run on appointments',
      talimx: 'education centres: students, scheduling, money',
    },
    howTitle: 'How we work',
    how: [
      'The price and the timeline are fixed in the contract before work starts.',
      '50% upfront, 50% on handover — not 100% in advance.',
      'Every week we show a working system, not a report on how it is going.',
      'The source code and every login stay yours. You can leave us at any point.',
    ],
  },
};
