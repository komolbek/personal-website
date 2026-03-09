import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Company Stats
  const stats = [
    { key: 'years', value: 5, label_en: 'Years of Experience', label_ru: 'Лет опыта', label_uz: 'Yillik tajriba', suffix: '+', order: 1 },
    { key: 'projects', value: 50, label_en: 'Projects Completed', label_ru: 'Завершённых проектов', label_uz: 'Tugallangan loyihalar', suffix: '+', order: 2 },
    { key: 'clients', value: 30, label_en: 'Happy Clients', label_ru: 'Довольных клиентов', label_uz: 'Mamnun mijozlar', suffix: '+', order: 3 },
    { key: 'satisfaction', value: 98, label_en: 'Client Satisfaction', label_ru: 'Удовлетворённость клиентов', label_uz: 'Mijozlar mamnuniyati', suffix: '%', order: 4 },
  ];

  for (const stat of stats) {
    await prisma.companyStat.upsert({
      where: { key: stat.key },
      update: stat,
      create: stat,
    });
  }
  console.log('  Stats seeded');

  // Seed Products (Solutions)
  const products = [
    {
      slug: 'yuridix',
      title_en: 'Yuridix',
      title_ru: 'Yuridix',
      title_uz: 'Yuridix',
      shortDesc_en: 'Comprehensive legal practice management system for law firms. Manage cases, clients, billing, and documents in one place.',
      shortDesc_ru: 'Комплексная система управления юридической практикой для адвокатских фирм. Управление делами, клиентами, биллингом и документами в одном месте.',
      shortDesc_uz: 'Yuridik firmalar uchun huquqiy amaliyotni boshqarish tizimi. Ishlar, mijozlar, billing va hujjatlarni bir joyda boshqaring.',
      fullDesc_en: 'Yuridix is a comprehensive legal practice management system built specifically for law firms in Uzbekistan. It consolidates case management, client relations, time tracking, billing, and document storage into a single unified platform. With features like conflict checking, automated invoice generation, and team collaboration tools, Yuridix helps law firms streamline their operations, save time, and increase profitability.',
      fullDesc_ru: 'Yuridix — это комплексная система управления юридической практикой, разработанная специально для адвокатских фирм Узбекистана. Она объединяет управление делами, работу с клиентами, учёт времени, биллинг и хранение документов в единую платформу. Благодаря проверке конфликтов, автоматической генерации счетов и инструментам командной работы, Yuridix помогает юридическим фирмам оптимизировать процессы, экономить время и увеличивать прибыль.',
      fullDesc_uz: "Yuridix — O'zbekistondagi yuridik firmalar uchun maxsus yaratilgan huquqiy amaliyotni boshqarish tizimi. U ishlarni boshqarish, mijozlar bilan munosabatlar, vaqtni kuzatish, billing va hujjatlarni saqlashni yagona platformaga birlashtiradi. Konfliktlarni tekshirish, avtomatik hisob-faktura yaratish va jamoaviy hamkorlik vositalari bilan Yuridix yuridik firmalarga jarayonlarni optimallashtirish, vaqtni tejash va daromadni oshirishda yordam beradi.",
      icon: 'crm',
      features_en: [
        'Dashboard analytics with real-time statistics',
        'Client management with tags and fast search',
        'One-click billable time tracking',
        'Professional invoice generation',
        'Unified calendar with automated reminders',
        'Instant conflict checking across all cases',
        'Cloud document storage with fast search',
        'Team collaboration and access control',
      ],
      features_ru: [
        'Аналитическая панель со статистикой в реальном времени',
        'Управление клиентами с тегами и быстрым поиском',
        'Учёт оплачиваемого времени в один клик',
        'Профессиональная генерация счетов',
        'Единый календарь с автоматическими напоминаниями',
        'Мгновенная проверка конфликтов по всем делам',
        'Облачное хранилище документов с быстрым поиском',
        'Командная работа и контроль доступа',
      ],
      features_uz: [
        'Real vaqtda statistika bilan analitik panel',
        'Teglar va tez qidiruv bilan mijozlarni boshqarish',
        "Bir bosish bilan haq to'lanadigan vaqtni kuzatish",
        'Professional hisob-faktura yaratish',
        'Avtomatik eslatmalar bilan yagona kalendar',
        "Barcha ishlar bo'yicha tezkor konflikt tekshiruvi",
        'Tez qidiruv bilan bulutli hujjatlar ombori',
        'Jamoaviy hamkorlik va kirish nazorati',
      ],
      benefits_en: [
        'All-in-one platform for legal practice',
        'Automated billing saves hours weekly',
        'Conflict checking prevents ethical violations',
        'Multi-language support: Russian, Uzbek, English',
      ],
      benefits_ru: [
        'Единая платформа для юридической практики',
        'Автоматический биллинг экономит часы еженедельно',
        'Проверка конфликтов предотвращает нарушения',
        'Многоязычная поддержка: русский, узбекский, английский',
      ],
      benefits_uz: [
        'Yuridik amaliyot uchun yagona platforma',
        'Avtomatik billing har hafta soatlarni tejaydi',
        'Konflikt tekshiruvi buzilishlarni oldini oladi',
        "Ko'p tilli qo'llab-quvvatlash: ruscha, o'zbekcha, inglizcha",
      ],
      order: 1,
      isVisible: true,
    },
    {
      slug: 'ordo',
      title_en: 'Ordo',
      title_ru: 'Ordo',
      title_uz: 'Ordo',
      shortDesc_en: 'Universal online booking and appointment scheduling platform for service-based businesses.',
      shortDesc_ru: 'Универсальная платформа онлайн-бронирования и записи для сервисных компаний.',
      shortDesc_uz: "Xizmat ko'rsatuvchi bizneslar uchun universal onlayn bron qilish va yozilish platformasi.",
      fullDesc_en: 'Ordo is a multi-tenant online booking platform that allows service-based businesses to accept appointments digitally. From wellness centers and clinics to salons and consulting firms, Ordo provides a structured five-step booking flow that guides customers through service selection, provider choice, scheduling, and confirmation. Each business gets its own branded booking page with a customizable service catalog.',
      fullDesc_ru: 'Ordo — это мультитенантная платформа онлайн-бронирования, которая позволяет сервисным компаниям принимать записи онлайн. От оздоровительных центров и клиник до салонов красоты и консалтинговых фирм — Ordo предоставляет структурированный пятишаговый процесс бронирования, направляя клиентов через выбор услуги, специалиста, даты и подтверждение. Каждый бизнес получает собственную брендированную страницу бронирования с настраиваемым каталогом услуг.',
      fullDesc_uz: "Ordo — xizmat ko'rsatuvchi bizneslarning onlayn yozuvlarni qabul qilishiga imkon beruvchi ko'p ijarachi onlayn bron qilish platformasi. Sog'lomlashtirish markazlari va klinikalardan tortib sartaroshxonalar va maslahat firmalarigacha — Ordo mijozlarni xizmat tanlash, mutaxassis tanlash, sana belgilash va tasdiqlashga yo'naltiruvchi tizimli besh bosqichli bron qilish jarayonini taqdim etadi.",
      icon: 'automation',
      features_en: [
        'Five-step guided booking flow',
        'Individual services and package bundles',
        'Provider/master selection system',
        'Flexible date and time scheduling',
        'Multi-tenant architecture for multiple businesses',
        'Custom branding for each business',
        'Admin panel for service management',
        'SEO-optimized booking pages',
      ],
      features_ru: [
        'Пошаговый процесс бронирования из 5 шагов',
        'Индивидуальные услуги и пакеты',
        'Система выбора мастера/специалиста',
        'Гибкое расписание по датам и времени',
        'Мультитенантная архитектура для нескольких бизнесов',
        'Индивидуальный брендинг для каждого бизнеса',
        'Админ-панель для управления услугами',
        'SEO-оптимизированные страницы бронирования',
      ],
      features_uz: [
        '5 bosqichli bron qilish jarayoni',
        'Individual xizmatlar va paketlar',
        'Mutaxassis/usta tanlash tizimi',
        'Moslashuvchan sana va vaqt rejalashtirish',
        "Bir nechta bizneslar uchun ko'p ijarachi arxitektura",
        'Har bir biznes uchun individual brendlash',
        'Xizmatlarni boshqarish uchun admin panel',
        'SEO-optimallashtirilgan bron sahifalari',
      ],
      benefits_en: [
        'Digitize appointment scheduling instantly',
        'Reduce no-shows with confirmations',
        'Multi-business platform with one admin',
        'Mobile-friendly for customers on the go',
      ],
      benefits_ru: [
        'Мгновенная цифровизация записей на приём',
        'Снижение неявок с помощью подтверждений',
        'Мультибизнес платформа с одним админом',
        'Удобно для клиентов на мобильных устройствах',
      ],
      benefits_uz: [
        "Yozuvlarni bir zumda raqamlashtiring",
        'Tasdiqlash bilan kelmagan holatlarni kamaytiring',
        "Bitta admin bilan ko'p biznes platformasi",
        'Mobil qurilmalarda mijozlar uchun qulay',
      ],
      order: 2,
      isVisible: true,
    },
    {
      slug: 'talimx',
      title_en: 'TalimX',
      title_ru: 'TalimX',
      title_uz: 'TalimX',
      shortDesc_en: 'All-in-one management system for educational centers. Students, scheduling, finances, and analytics.',
      shortDesc_ru: 'Комплексная система управления для образовательных центров. Студенты, расписание, финансы и аналитика.',
      shortDesc_uz: "Ta'lim markazlari uchun yagona boshqaruv tizimi. Talabalar, jadval, moliya va tahlil.",
      fullDesc_en: 'TalimX is a comprehensive management system designed specifically for educational centers in Uzbekistan. It centralizes student administration, scheduling, financial tracking, and analytics into a single platform. With features like one-click attendance tracking, automatic payment reminders, conflict-free scheduling, and detailed analytics dashboards, TalimX helps educational centers operate more efficiently and scale their operations. Available as both a web platform and a mobile app.',
      fullDesc_ru: 'TalimX — комплексная система управления, разработанная специально для образовательных центров Узбекистана. Она централизует управление студентами, расписание, финансовый учёт и аналитику на единой платформе. Благодаря учёту посещаемости в один клик, автоматическим напоминаниям об оплате, бесконфликтному расписанию и детальным аналитическим панелям, TalimX помогает образовательным центрам работать эффективнее и масштабировать деятельность. Доступен как веб-платформа и мобильное приложение.',
      fullDesc_uz: "TalimX — O'zbekistondagi ta'lim markazlari uchun maxsus yaratilgan keng qamrovli boshqaruv tizimi. U talabalarni boshqarish, jadval tuzish, moliyaviy kuzatuv va tahlilni yagona platformaga jamlaydi. Bir bosishda davomat yuritish, avtomatik to'lov eslatmalari, ziddiyatsiz jadval va batafsil tahlil panellari bilan TalimX ta'lim markazlariga samarali ishlash va faoliyatni kengaytirishda yordam beradi. Veb-platforma va mobil ilova sifatida mavjud.",
      icon: 'website',
      features_en: [
        'Complete student management with profiles',
        'Group and course management with capacity tracking',
        'Financial control with automatic payment tracking',
        'Visual scheduling with conflict detection',
        'One-click attendance tracking',
        'Analytics dashboard with key metrics',
        'Mobile app for on-the-go management',
        'Debt management with late payment reminders',
      ],
      features_ru: [
        'Полное управление студентами с профилями',
        'Управление группами и курсами с учётом вместимости',
        'Финансовый контроль с автоматическим учётом платежей',
        'Визуальное расписание с обнаружением конфликтов',
        'Учёт посещаемости в один клик',
        'Аналитическая панель с ключевыми показателями',
        'Мобильное приложение для управления на ходу',
        'Управление долгами с напоминаниями о просрочке',
      ],
      features_uz: [
        "Profillar bilan to'liq talabalarni boshqarish",
        "Sig'imni kuzatish bilan guruh va kurslarni boshqarish",
        "Avtomatik to'lov kuzatuvi bilan moliyaviy nazorat",
        'Ziddiyatlarni aniqlash bilan vizual jadval',
        'Bir bosishda davomat yuritish',
        "Asosiy ko'rsatkichlar bilan tahlil paneli",
        'Harakatda boshqarish uchun mobil ilova',
        "Kechikkan to'lov eslatmalari bilan qarzlarni boshqarish",
      ],
      benefits_en: [
        'Centralize all center operations',
        'Automate financial tracking and reminders',
        'Eliminate scheduling conflicts',
        'Multi-language: Russian, Uzbek, English',
      ],
      benefits_ru: [
        'Централизация всех операций центра',
        'Автоматизация финансового учёта и напоминаний',
        'Устранение конфликтов в расписании',
        'Многоязычность: русский, узбекский, английский',
      ],
      benefits_uz: [
        'Markaz operatsiyalarini markazlashtirish',
        'Moliyaviy hisobni va eslatmalarni avtomatlashtirish',
        'Jadval ziddiyatlarini bartaraf etish',
        "Ko'p tilli: ruscha, o'zbekcha, inglizcha",
      ],
      order: 3,
      isVisible: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log('  Products seeded');

  // Seed Client Projects
  const clientProjects = [
    {
      slug: 'memomind',
      title_en: 'MemoMind AI - Smart Voice Notes',
      title_ru: 'MemoMind AI - Умные голосовые заметки',
      title_uz: 'MemoMind AI - Aqlli ovozli eslatmalar',
      category: 'ai',
      desc_en: 'An intelligent voice memo app that uses AI to automatically transcribe, summarize, and organize recordings. Perfect for professionals, students, and anyone who wants to capture ideas on the go.',
      desc_ru: 'Умное приложение для голосовых заметок, использующее ИИ для автоматической транскрипции, резюмирования и организации записей. Идеально для профессионалов, студентов и всех, кто хочет фиксировать идеи на ходу.',
      desc_uz: "Sun'iy intellekt yordamida yozuvlarni avtomatik transkripsiya qilish, xulosa chiqarish va tartibga solish uchun aqlli ovozli eslatma ilovasi.",
      challenge_en: 'Voice memos are convenient to record but time-consuming to review and organize. The challenge was to leverage AI to automatically extract valuable information from voice recordings while keeping data private and secure.',
      challenge_ru: 'Голосовые заметки удобно записывать, но требуется много времени на просмотр и организацию. Задача состояла в использовании ИИ для автоматического извлечения ценной информации из голосовых записей при сохранении конфиденциальности.',
      challenge_uz: "Ovozli eslatmalarni yozish qulay, lekin ko'rib chiqish va tartibga solish ko'p vaqt talab qiladi. Vazifa AI yordamida ovozli yozuvlardan qimmatli ma'lumotlarni avtomatik ajratib olish edi.",
      solution_en: 'We developed an AI-powered mobile app using advanced speech-to-text and natural language processing. The app automatically transcribes recordings, generates summaries of different lengths, extracts key points and action items, and suggests relevant tags for easy organization.',
      solution_ru: 'Мы разработали мобильное приложение на основе ИИ с использованием передовых технологий преобразования речи в текст и обработки естественного языка. Приложение автоматически транскрибирует записи, генерирует резюме разной длины, извлекает ключевые моменты и задачи.',
      solution_uz: "Biz ilg'or nutqni matnga aylantirish va tabiiy tilni qayta ishlash texnologiyalari yordamida AI-quvvatli mobil ilovasini ishlab chiqdik. Ilova yozuvlarni avtomatik transkripsiya qiladi, turli uzunlikdagi xulosalar yaratadi.",
      results_en: 'Users report saving 2-3 hours per week on note-taking and review. The AI accurately extracts key points and action items, making voice memos actionable rather than just archives.',
      results_ru: 'Пользователи сообщают об экономии 2-3 часов в неделю на ведении заметок и просмотре. ИИ точно извлекает ключевые моменты и задачи, делая голосовые заметки действительно полезными.',
      results_uz: "Foydalanuvchilar eslatmalarni yozish va ko'rib chiqishda haftada 2-3 soat tejashni xabar qilishadi. AI asosiy fikrlar va vazifalarni aniq ajratib oladi.",
      images: [
        '/projects/memomind/screenshot-1.png',
        '/projects/memomind/screenshot-2.png',
        '/projects/memomind/screenshot-3.png',
        '/projects/memomind/screenshot-4.png',
        '/projects/memomind/screenshot-5.png',
        '/projects/memomind/screenshot-6.png',
        '/projects/memomind/screenshot-7.png',
      ],
      thumbnail: '/projects/memomind/screenshot-1.png',
      appStoreUrl: 'https://apps.apple.com/app/memomind',
      featured: true,
      completedDate: new Date('2024-01-01'),
      order: 1,
      isVisible: true,
    },
    {
      slug: '4event',
      title_en: '4Event - Event Equipment Rental',
      title_ru: '4Event - Аренда оборудования для мероприятий',
      title_uz: '4Event - Tadbirlar uchun jihozlar ijarasi',
      category: 'ecommerce',
      desc_en: 'An event equipment rental platform based in Tashkent. Customers can browse, select, and rent equipment for events — including furnishings, decor, lighting, and audio systems — with delivery within the city.',
      desc_ru: 'Платформа аренды оборудования для мероприятий в Ташкенте. Клиенты могут просматривать, выбирать и арендовать оборудование для мероприятий — включая мебель, декор, освещение и аудиосистемы — с доставкой по городу.',
      desc_uz: "Toshkentda tadbirlar uchun jihozlar ijarasi platformasi. Mijozlar mebel, dekor, yoritish va audio tizimlarni — shahar bo'ylab yetkazib berish bilan ko'rib chiqish, tanlash va ijaraga olishlari mumkin.",
      challenge_en: 'Event organizers in Tashkent needed a reliable digital platform to browse and rent equipment with transparent pricing, delivery options, and a streamlined ordering process instead of relying on phone calls and manual coordination.',
      challenge_ru: 'Организаторам мероприятий в Ташкенте нужна была надёжная цифровая платформа для просмотра и аренды оборудования с прозрачными ценами, вариантами доставки и упрощённым процессом заказа вместо телефонных звонков и ручной координации.',
      challenge_uz: "Toshkentdagi tadbir tashkilotchilariga telefon qo'ng'iroqlari va qo'lda muvofiqlashtirishga tayanish o'rniga, shaffof narxlar, yetkazib berish variantlari va soddalashtirilgan buyurtma jarayoni bilan jihozlarni ko'rib chiqish va ijaraga olish uchun ishonchli raqamli platforma kerak edi.",
      solution_en: 'We built a full-featured e-commerce platform with a visual catalog of rental equipment, category-based filtering, shopping cart, user accounts, and multiple payment options. The platform features express delivery within Tashkent and clear rental terms with a comprehensive FAQ section.',
      solution_ru: 'Мы создали полнофункциональную платформу электронной коммерции с визуальным каталогом арендного оборудования, фильтрацией по категориям, корзиной покупок, аккаунтами пользователей и различными способами оплаты. Платформа предлагает экспресс-доставку по Ташкенту и чёткие условия аренды.',
      solution_uz: "Biz vizual ijaraga olish jihozlari katalogi, kategoriya bo'yicha filtrlash, savatcha, foydalanuvchi akkauntlari va turli to'lov usullari bilan to'liq funksionalli elektron tijorat platformasini yaratdik.",
      results_en: 'The platform streamlined the rental process for event organizers, reducing order time and improving customer experience with a user-friendly interface and reliable delivery tracking.',
      results_ru: 'Платформа оптимизировала процесс аренды для организаторов мероприятий, сократив время заказа и улучшив клиентский опыт с помощью удобного интерфейса и отслеживания доставки.',
      results_uz: "Platforma tadbir tashkilotchilari uchun ijara jarayonini optimallashtirdi, buyurtma vaqtini qisqartirdi va qulay interfeys va yetkazib berish kuzatuvi bilan mijozlar tajribasini yaxshiladi.",
      images: [
        '/projects/4event/screenshot-1.png',
        '/projects/4event/screenshot-2.png',
        '/projects/4event/screenshot-3.png',
      ],
      thumbnail: '/projects/4event/screenshot-1.png',
      websiteUrl: 'https://raadarenda-production.up.railway.app/orders',
      featured: true,
      completedDate: new Date('2024-01-01'),
      order: 2,
      isVisible: true,
    },
    {
      slug: 'standai',
      title_en: 'StandAI - AI Exhibition Booth Designer',
      title_ru: 'StandAI - ИИ дизайнер выставочных стендов',
      title_uz: "StandAI - AI ko'rgazma stendlari dizayneri",
      category: 'ai',
      desc_en: 'An AI-powered platform that designs exhibition booth stands. Users describe their requirements through an AI assistant, and the system generates multiple unique design visualizations within minutes, replacing the traditional slow and expensive booth design process.',
      desc_ru: 'Платформа на базе ИИ для проектирования выставочных стендов. Пользователи описывают свои требования через ИИ-ассистента, и система генерирует несколько уникальных визуализаций дизайна за считанные минуты, заменяя традиционный медленный и дорогой процесс проектирования.',
      desc_uz: "Ko'rgazma stendlarini loyihalash uchun AI-quvvatli platforma. Foydalanuvchilar talablarini AI-yordamchi orqali tavsiflab beradilar va tizim bir necha daqiqada bir nechta noyob dizayn vizualizatsiyalarini yaratadi.",
      challenge_en: 'Companies preparing for exhibitions face a slow and expensive design process for creating booth stands. They need fast turnaround, multiple design options, and affordable solutions — all while maintaining professional quality.',
      challenge_ru: 'Компании, готовящиеся к выставкам, сталкиваются с медленным и дорогим процессом проектирования стендов. Им нужна быстрая работа, несколько вариантов дизайна и доступные решения — при сохранении профессионального качества.',
      challenge_uz: "Ko'rgazmalarga tayyorlanayotgan kompaniyalar stendlar yaratish uchun sekin va qimmat dizayn jarayoniga duch keladi. Ularga tez ish, bir nechta dizayn variantlari va hamyonbop yechimlar kerak.",
      solution_en: 'We developed an AI-powered platform with a three-step workflow: an AI assistant gathers information about the company, exhibition, preferred style, and budget; then the AI generates multiple unique booth design options; finally users select a design and receive a quote within 24 hours. The platform dramatically reduces design time from weeks to minutes.',
      solution_ru: 'Мы разработали платформу на базе ИИ с трёхэтапным рабочим процессом: ИИ-ассистент собирает информацию о компании, выставке, предпочтительном стиле и бюджете; затем ИИ генерирует несколько уникальных вариантов дизайна стенда; наконец, пользователи выбирают дизайн и получают коммерческое предложение в течение 24 часов.',
      solution_uz: "Biz uch bosqichli ish jarayoni bilan AI-quvvatli platforma ishlab chiqdik: AI-yordamchi kompaniya, ko'rgazma, afzal ko'rilgan uslub va byudjet haqida ma'lumot to'playdi; keyin AI bir nechta noyob stend dizayni variantlarini yaratadi; nihoyat foydalanuvchilar dizaynni tanlaydi va 24 soat ichida narx taklifini oladi.",
      results_en: 'The platform reduced exhibition booth design time from weeks to minutes and provides multiple design options at a fraction of the traditional cost, making professional booth design accessible to businesses of all sizes.',
      results_ru: 'Платформа сократила время проектирования выставочных стендов с недель до минут и предоставляет несколько вариантов дизайна за долю традиционной стоимости, делая профессиональный дизайн стендов доступным для бизнеса любого размера.',
      results_uz: "Platforma ko'rgazma stendlari dizayni vaqtini haftalardan daqiqalargacha qisqartirdi va an'anaviy narxning bir qismida bir nechta dizayn variantlarini taqdim etadi.",
      images: [
        '/projects/standai/screenshot-1.png',
        '/projects/standai/screenshot-2.png',
        '/projects/standai/screenshot-3.png',
        '/projects/standai/screenshot-4.png',
      ],
      thumbnail: '/projects/standai/screenshot-1.png',
      websiteUrl: 'https://expostandai-production.up.railway.app',
      featured: true,
      completedDate: new Date('2025-01-01'),
      order: 3,
      isVisible: true,
    },
  ];

  for (const project of clientProjects) {
    await prisma.clientProject.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log('  Client projects seeded');

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
