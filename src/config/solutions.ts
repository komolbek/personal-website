import { Solution } from '@/types';

export const solutions: Solution[] = [
  {
    slug: 'yuridix',
    title: {
      en: 'Yuridix',
      ru: 'Yuridix',
      uz: 'Yuridix',
    },
    shortDescription: {
      en: 'Comprehensive legal practice management system for law firms. Manage cases, clients, billing, and documents in one place.',
      ru: 'Комплексная система управления юридической практикой для адвокатских фирм. Управление делами, клиентами, биллингом и документами в одном месте.',
      uz: 'Yuridik firmalar uchun huquqiy amaliyotni boshqarish tizimi. Ishlar, mijozlar, billing va hujjatlarni bir joyda boshqaring.',
    },
    fullDescription: {
      en: 'Yuridix is a comprehensive legal practice management system built specifically for law firms in Uzbekistan. It consolidates case management, client relations, time tracking, billing, and document storage into a single unified platform. With features like conflict checking, automated invoice generation, and team collaboration tools, Yuridix helps law firms streamline their operations, save time, and increase profitability.',
      ru: 'Yuridix — это комплексная система управления юридической практикой, разработанная специально для адвокатских фирм Узбекистана. Она объединяет управление делами, работу с клиентами, учёт времени, биллинг и хранение документов в единую платформу. Благодаря проверке конфликтов, автоматической генерации счетов и инструментам командной работы, Yuridix помогает юридическим фирмам оптимизировать процессы, экономить время и увеличивать прибыль.',
      uz: 'Yuridix — O\'zbekistondagi yuridik firmalar uchun maxsus yaratilgan huquqiy amaliyotni boshqarish tizimi. U ishlarni boshqarish, mijozlar bilan munosabatlar, vaqtni kuzatish, billing va hujjatlarni saqlashni yagona platformaga birlashtiradi. Konfliktlarni tekshirish, avtomatik hisob-faktura yaratish va jamoaviy hamkorlik vositalari bilan Yuridix yuridik firmalarga jarayonlarni optimallashtirish, vaqtni tejash va daromadni oshirishda yordam beradi.',
    },
    icon: 'crm',
    features: {
      en: [
        'Dashboard analytics with real-time statistics',
        'Client management with tags and fast search',
        'One-click billable time tracking',
        'Professional invoice generation',
        'Unified calendar with automated reminders',
        'Instant conflict checking across all cases',
        'Cloud document storage with fast search',
        'Team collaboration and access control',
      ],
      ru: [
        'Аналитическая панель со статистикой в реальном времени',
        'Управление клиентами с тегами и быстрым поиском',
        'Учёт оплачиваемого времени в один клик',
        'Профессиональная генерация счетов',
        'Единый календарь с автоматическими напоминаниями',
        'Мгновенная проверка конфликтов по всем делам',
        'Облачное хранилище документов с быстрым поиском',
        'Командная работа и контроль доступа',
      ],
      uz: [
        'Real vaqtda statistika bilan analitik panel',
        'Teglar va tez qidiruv bilan mijozlarni boshqarish',
        'Bir bosish bilan haq to\'lanadigan vaqtni kuzatish',
        'Professional hisob-faktura yaratish',
        'Avtomatik eslatmalar bilan yagona kalendar',
        'Barcha ishlar bo\'yicha tezkor konflikt tekshiruvi',
        'Tez qidiruv bilan bulutli hujjatlar ombori',
        'Jamoaviy hamkorlik va kirish nazorati',
      ],
    },
    benefits: {
      en: [
        'All-in-one platform for legal practice',
        'Automated billing saves hours weekly',
        'Conflict checking prevents ethical violations',
        'Multi-language support: Russian, Uzbek, English',
      ],
      ru: [
        'Единая платформа для юридической практики',
        'Автоматический биллинг экономит часы еженедельно',
        'Проверка конфликтов предотвращает нарушения',
        'Многоязычная поддержка: русский, узбекский, английский',
      ],
      uz: [
        'Yuridik amaliyot uchun yagona platforma',
        'Avtomatik billing har hafta soatlarni tejaydi',
        'Konflikt tekshiruvi buzilishlarni oldini oladi',
        'Ko\'p tilli qo\'llab-quvvatlash: ruscha, o\'zbekcha, inglizcha',
      ],
    },
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
    relatedProjects: [],
    order: 1,
    links: {
      website: 'https://yuridix.uz',
      admin: 'https://admin.yuridix.uz/login',
    },
    pricing: {
      en: 'From 4,200,000 sum/month. 7-day free trial with full access.',
      ru: 'От 4 200 000 сум/месяц. 7-дневный бесплатный пробный период с полным доступом.',
      uz: '4 200 000 so\'m/oydan boshlab. 7 kunlik to\'liq kirish bilan bepul sinov davri.',
    },
  },
  {
    slug: 'ordo',
    title: {
      en: 'Ordo',
      ru: 'Ordo',
      uz: 'Ordo',
    },
    shortDescription: {
      en: 'Universal online booking and appointment scheduling platform for service-based businesses.',
      ru: 'Универсальная платформа онлайн-бронирования и записи для сервисных компаний.',
      uz: 'Xizmat ko\'rsatuvchi bizneslar uchun universal onlayn bron qilish va yozilish platformasi.',
    },
    fullDescription: {
      en: 'Ordo is a multi-tenant online booking platform that allows service-based businesses to accept appointments digitally. From wellness centers and clinics to salons and consulting firms, Ordo provides a structured five-step booking flow that guides customers through service selection, provider choice, scheduling, and confirmation. Each business gets its own branded booking page with a customizable service catalog.',
      ru: 'Ordo — это мультитенантная платформа онлайн-бронирования, которая позволяет сервисным компаниям принимать записи онлайн. От оздоровительных центров и клиник до салонов красоты и консалтинговых фирм — Ordo предоставляет структурированный пятишаговый процесс бронирования, направляя клиентов через выбор услуги, специалиста, даты и подтверждение. Каждый бизнес получает собственную брендированную страницу бронирования с настраиваемым каталогом услуг.',
      uz: 'Ordo — xizmat ko\'rsatuvchi bizneslarning onlayn yozuvlarni qabul qilishiga imkon beruvchi ko\'p ijarachi onlayn bron qilish platformasi. Sog\'lomlashtirish markazlari va klinikalardan tortib sartaroshxonalar va maslahat firmalarigacha — Ordo mijozlarni xizmat tanlash, mutaxassis tanlash, sana belgilash va tasdiqlashga yo\'naltiruvchi tizimli besh bosqichli bron qilish jarayonini taqdim etadi.',
    },
    icon: 'automation',
    features: {
      en: [
        'Five-step guided booking flow',
        'Individual services and package bundles',
        'Provider/master selection system',
        'Flexible date and time scheduling',
        'Multi-tenant architecture for multiple businesses',
        'Custom branding for each business',
        'Admin panel for service management',
        'SEO-optimized booking pages',
      ],
      ru: [
        'Пошаговый процесс бронирования из 5 шагов',
        'Индивидуальные услуги и пакеты',
        'Система выбора мастера/специалиста',
        'Гибкое расписание по датам и времени',
        'Мультитенантная архитектура для нескольких бизнесов',
        'Индивидуальный брендинг для каждого бизнеса',
        'Админ-панель для управления услугами',
        'SEO-оптимизированные страницы бронирования',
      ],
      uz: [
        '5 bosqichli bron qilish jarayoni',
        'Individual xizmatlar va paketlar',
        'Mutaxassis/usta tanlash tizimi',
        'Moslashuvchan sana va vaqt rejalashtirish',
        'Bir nechta bizneslar uchun ko\'p ijarachi arxitektura',
        'Har bir biznes uchun individual brendlash',
        'Xizmatlarni boshqarish uchun admin panel',
        'SEO-optimallashtirilgan bron sahifalari',
      ],
    },
    benefits: {
      en: [
        'Digitize appointment scheduling instantly',
        'Reduce no-shows with confirmations',
        'Multi-business platform with one admin',
        'Mobile-friendly for customers on the go',
      ],
      ru: [
        'Мгновенная цифровизация записей на приём',
        'Снижение неявок с помощью подтверждений',
        'Мультибизнес платформа с одним админом',
        'Удобно для клиентов на мобильных устройствах',
      ],
      uz: [
        'Yozuvlarni bir zumda raqamlashtiring',
        'Tasdiqlash bilan kelmagan holatlarni kamaytiring',
        'Bitta admin bilan ko\'p biznes platformasi',
        'Mobil qurilmalarda mijozlar uchun qulay',
      ],
    },
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
    relatedProjects: [],
    order: 2,
    images: [
      '/products/ordo/screenshot-1.png',
      '/products/ordo/screenshot-2.png',
      '/products/ordo/screenshot-3.png',
      '/products/ordo/screenshot-4.png',
      '/products/ordo/screenshot-5.png',
      '/products/ordo/screenshot-6.png',
    ],
    links: {
      booking: 'https://booking.ordo.uz/hijomauzb',
      admin: 'https://admin.ordo.uz',
    },
  },
  {
    slug: 'talimx',
    title: {
      en: 'TalimX',
      ru: 'TalimX',
      uz: 'TalimX',
    },
    shortDescription: {
      en: 'All-in-one management system for educational centers. Students, scheduling, finances, and analytics.',
      ru: 'Комплексная система управления для образовательных центров. Студенты, расписание, финансы и аналитика.',
      uz: 'Ta\'lim markazlari uchun yagona boshqaruv tizimi. Talabalar, jadval, moliya va tahlil.',
    },
    fullDescription: {
      en: 'TalimX is a comprehensive management system designed specifically for educational centers in Uzbekistan. It centralizes student administration, scheduling, financial tracking, and analytics into a single platform. With features like one-click attendance tracking, automatic payment reminders, conflict-free scheduling, and detailed analytics dashboards, TalimX helps educational centers operate more efficiently and scale their operations. Available as both a web platform and a mobile app.',
      ru: 'TalimX — комплексная система управления, разработанная специально для образовательных центров Узбекистана. Она централизует управление студентами, расписание, финансовый учёт и аналитику на единой платформе. Благодаря учёту посещаемости в один клик, автоматическим напоминаниям об оплате, бесконфликтному расписанию и детальным аналитическим панелям, TalimX помогает образовательным центрам работать эффективнее и масштабировать деятельность. Доступен как веб-платформа и мобильное приложение.',
      uz: 'TalimX — O\'zbekistondagi ta\'lim markazlari uchun maxsus yaratilgan keng qamrovli boshqaruv tizimi. U talabalarni boshqarish, jadval tuzish, moliyaviy kuzatuv va tahlilni yagona platformaga jamlaydi. Bir bosishda davomat yuritish, avtomatik to\'lov eslatmalari, ziddiyatsiz jadval va batafsil tahlil panellari bilan TalimX ta\'lim markazlariga samarali ishlash va faoliyatni kengaytirishda yordam beradi. Veb-platforma va mobil ilova sifatida mavjud.',
    },
    icon: 'website',
    features: {
      en: [
        'Complete student management with profiles',
        'Group and course management with capacity tracking',
        'Financial control with automatic payment tracking',
        'Visual scheduling with conflict detection',
        'One-click attendance tracking',
        'Analytics dashboard with key metrics',
        'Mobile app for on-the-go management',
        'Debt management with late payment reminders',
      ],
      ru: [
        'Полное управление студентами с профилями',
        'Управление группами и курсами с учётом вместимости',
        'Финансовый контроль с автоматическим учётом платежей',
        'Визуальное расписание с обнаружением конфликтов',
        'Учёт посещаемости в один клик',
        'Аналитическая панель с ключевыми показателями',
        'Мобильное приложение для управления на ходу',
        'Управление долгами с напоминаниями о просрочке',
      ],
      uz: [
        'Profillar bilan to\'liq talabalarni boshqarish',
        'Sig\'imni kuzatish bilan guruh va kurslarni boshqarish',
        'Avtomatik to\'lov kuzatuvi bilan moliyaviy nazorat',
        'Ziddiyatlarni aniqlash bilan vizual jadval',
        'Bir bosishda davomat yuritish',
        'Asosiy ko\'rsatkichlar bilan tahlil paneli',
        'Harakatda boshqarish uchun mobil ilova',
        'Kechikkan to\'lov eslatmalari bilan qarzlarni boshqarish',
      ],
    },
    benefits: {
      en: [
        'Centralize all center operations',
        'Automate financial tracking and reminders',
        'Eliminate scheduling conflicts',
        'Multi-language: Russian, Uzbek, English',
      ],
      ru: [
        'Централизация всех операций центра',
        'Автоматизация финансового учёта и напоминаний',
        'Устранение конфликтов в расписании',
        'Многоязычность: русский, узбекский, английский',
      ],
      uz: [
        'Markaz operatsiyalarini markazlashtirish',
        'Moliyaviy hisobni va eslatmalarni avtomatlashtirish',
        'Jadval ziddiyatlarini bartaraf etish',
        'Ko\'p tilli: ruscha, o\'zbekcha, inglizcha',
      ],
    },
    technologies: ['Next.js', 'React', 'React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
    relatedProjects: [],
    order: 3,
    images: [
      '/products/talimx/screenshot-1.png',
      '/products/talimx/screenshot-2.png',
      '/products/talimx/screenshot-3.png',
      '/products/talimx/screenshot-4.png',
      '/products/talimx/screenshot-5.png',
      '/products/talimx/screenshot-6.png',
      '/products/talimx/screenshot-7.png',
    ],
    links: {
      website: 'https://talimx.uz',
      admin: 'https://admin.talimx.uz/login',
    },
    pricing: {
      en: 'From 4,200,000 sum/month. 7-day free trial with full access.',
      ru: 'От 4 200 000 сум/месяц. 7-дневный бесплатный пробный период с полным доступом.',
      uz: '4 200 000 so\'m/oydan boshlab. 7 kunlik to\'liq kirish bilan bepul sinov davri.',
    },
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug);
}

export function getSortedSolutions(): Solution[] {
  return [...solutions].sort((a, b) => a.order - b.order);
}
