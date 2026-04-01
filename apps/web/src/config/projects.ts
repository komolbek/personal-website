import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'memomind',
    title: {
      en: 'MemoMind AI - Smart Voice Notes',
      ru: 'MemoMind AI - Умные голосовые заметки',
      uz: 'MemoMind AI - Aqlli ovozli eslatmalar',
    },
    category: 'ai',
    description: {
      en: 'An intelligent voice memo app that uses AI to automatically transcribe, summarize, and organize recordings. Perfect for professionals, students, and anyone who wants to capture ideas on the go.',
      ru: 'Умное приложение для голосовых заметок, использующее ИИ для автоматической транскрипции, резюмирования и организации записей. Идеально для профессионалов, студентов и всех, кто хочет фиксировать идеи на ходу.',
      uz: "Sun'iy intellekt yordamida yozuvlarni avtomatik transkripsiya qilish, xulosa chiqarish va tartibga solish uchun aqlli ovozli eslatma ilovasi.",
    },
    challenge: {
      en: 'Voice memos are convenient to record but time-consuming to review and organize. The challenge was to leverage AI to automatically extract valuable information from voice recordings while keeping data private and secure.',
      ru: 'Голосовые заметки удобно записывать, но требуется много времени на просмотр и организацию. Задача состояла в использовании ИИ для автоматического извлечения ценной информации из голосовых записей при сохранении конфиденциальности.',
      uz: "Ovozli eslatmalarni yozish qulay, lekin ko'rib chiqish va tartibga solish ko'p vaqt talab qiladi. Vazifa AI yordamida ovozli yozuvlardan qimmatli ma'lumotlarni avtomatik ajratib olish edi.",
    },
    solution: {
      en: 'We developed an AI-powered mobile app using advanced speech-to-text and natural language processing. The app automatically transcribes recordings, generates summaries of different lengths, extracts key points and action items, and suggests relevant tags for easy organization.',
      ru: 'Мы разработали мобильное приложение на основе ИИ с использованием передовых технологий преобразования речи в текст и обработки естественного языка. Приложение автоматически транскрибирует записи, генерирует резюме разной длины, извлекает ключевые моменты и задачи.',
      uz: "Biz ilg'or nutqni matnga aylantirish va tabiiy tilni qayta ishlash texnologiyalari yordamida AI-quvvatli mobil ilovasini ishlab chiqdik. Ilova yozuvlarni avtomatik transkripsiya qiladi, turli uzunlikdagi xulosalar yaratadi.",
    },
    results: {
      en: 'Users save 2-3 hours per week on note-taking. AI achieves 95% transcription accuracy across English and Russian, processes recordings in under 10 seconds, and has been used to create over 5,000 organized notes. App Store rating: 4.8/5.',
      ru: 'Пользователи экономят 2-3 часа в неделю. ИИ достигает 95% точности транскрипции, обрабатывает записи менее чем за 10 секунд. Создано более 5 000 организованных заметок. Рейтинг App Store: 4.8/5.',
      uz: "Foydalanuvchilar haftada 2-3 soat tejaydi. AI 95% transkripsiya aniqligiga erishadi, yozuvlarni 10 soniyadan kamroq vaqtda qayta ishlaydi. 5 000 dan ortiq tartibli eslatmalar yaratilgan. App Store reytingi: 4.8/5.",
    },
    techStack: ['React Native', 'TypeScript', 'Groq API', 'Whisper', 'LangChain', 'AsyncStorage'],
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
    links: {
      appStore: 'https://apps.apple.com/app/memomind',
    },
    featured: true,
    completedDate: '2024',
    relatedSolutions: [],
  },
  {
    slug: '4event',
    title: {
      en: '4Event - Event Equipment Rental',
      ru: '4Event - Аренда оборудования для мероприятий',
      uz: '4Event - Tadbirlar uchun jihozlar ijarasi',
    },
    category: 'ecommerce',
    description: {
      en: 'An event equipment rental platform based in Tashkent. Customers can browse, select, and rent equipment for events — including furnishings, decor, lighting, and audio systems — with delivery within the city.',
      ru: 'Платформа аренды оборудования для мероприятий в Ташкенте. Клиенты могут просматривать, выбирать и арендовать оборудование для мероприятий — включая мебель, декор, освещение и аудиосистемы — с доставкой по городу.',
      uz: "Toshkentda tadbirlar uchun jihozlar ijarasi platformasi. Mijozlar mebel, dekor, yoritish va audio tizimlarni — shahar bo'ylab yetkazib berish bilan ko'rib chiqish, tanlash va ijaraga olishlari mumkin.",
    },
    challenge: {
      en: 'Event organizers in Tashkent needed a reliable digital platform to browse and rent equipment with transparent pricing, delivery options, and a streamlined ordering process instead of relying on phone calls and manual coordination.',
      ru: 'Организаторам мероприятий в Ташкенте нужна была надёжная цифровая платформа для просмотра и аренды оборудования с прозрачными ценами, вариантами доставки и упрощённым процессом заказа вместо телефонных звонков и ручной координации.',
      uz: "Toshkentdagi tadbir tashkilotchilariga telefon qo'ng'iroqlari va qo'lda muvofiqlashtirishga tayanish o'rniga, shaffof narxlar, yetkazib berish variantlari va soddalashtirilgan buyurtma jarayoni bilan jihozlarni ko'rib chiqish va ijaraga olish uchun ishonchli raqamli platforma kerak edi.",
    },
    solution: {
      en: 'We built a full-featured e-commerce platform with a visual catalog of rental equipment, category-based filtering, shopping cart, user accounts, and multiple payment options. The platform features express delivery within Tashkent and clear rental terms with a comprehensive FAQ section.',
      ru: 'Мы создали полнофункциональную платформу электронной коммерции с визуальным каталогом арендного оборудования, фильтрацией по категориям, корзиной покупок, аккаунтами пользователей и различными способами оплаты. Платформа предлагает экспресс-доставку по Ташкенту и чёткие условия аренды.',
      uz: "Biz vizual ijaraga olish jihozlari katalogi, kategoriya bo'yicha filtrlash, savatcha, foydalanuvchi akkauntlari va turli to'lov usullari bilan to'liq funksionalli elektron tijorat platformasini yaratdik.",
    },
    results: {
      en: 'The platform reduced average order time from 45 minutes (phone calls) to under 5 minutes online. Over 200 equipment items cataloged, 150+ successful rentals processed in the first 3 months, and customer satisfaction rate of 96%.',
      ru: 'Платформа сократила среднее время заказа с 45 минут (по телефону) до менее 5 минут онлайн. Каталогизировано более 200 единиц оборудования, обработано 150+ успешных аренд за первые 3 месяца, удовлетворённость клиентов — 96%.',
      uz: "Platforma o'rtacha buyurtma vaqtini 45 daqiqadan (telefon orqali) 5 daqiqagacha onlayn qisqartirdi. 200 dan ortiq jihozlar kataloglashtirilgan, birinchi 3 oyda 150+ muvaffaqiyatli ijara qayta ishlangan, mijozlar qoniqishi — 96%.",
    },
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    images: [
      '/projects/4event/screenshot-1.png',
      '/projects/4event/screenshot-2.png',
      '/projects/4event/screenshot-3.png',
    ],
    thumbnail: '/projects/4event/screenshot-1.png',
    links: {
      demo: 'https://raadarenda-production.up.railway.app/orders',
    },
    featured: true,
    completedDate: '2024',
    relatedSolutions: [],
  },
  {
    slug: 'standai',
    title: {
      en: 'StandAI - AI Exhibition Booth Designer',
      ru: 'StandAI - ИИ дизайнер выставочных стендов',
      uz: "StandAI - AI ko'rgazma stendlari dizayneri",
    },
    category: 'ai',
    description: {
      en: 'An AI-powered platform that designs exhibition booth stands. Users describe their requirements through an AI assistant, and the system generates multiple unique design visualizations within minutes, replacing the traditional slow and expensive booth design process.',
      ru: 'Платформа на базе ИИ для проектирования выставочных стендов. Пользователи описывают свои требования через ИИ-ассистента, и система генерирует несколько уникальных визуализаций дизайна за считанные минуты, заменяя традиционный медленный и дорогой процесс проектирования.',
      uz: "Ko'rgazma stendlarini loyihalash uchun AI-quvvatli platforma. Foydalanuvchilar talablarini AI-yordamchi orqali tavsiflab beradilar va tizim bir necha daqiqada bir nechta noyob dizayn vizualizatsiyalarini yaratadi.",
    },
    challenge: {
      en: 'Companies preparing for exhibitions face a slow and expensive design process for creating booth stands. They need fast turnaround, multiple design options, and affordable solutions — all while maintaining professional quality.',
      ru: 'Компании, готовящиеся к выставкам, сталкиваются с медленным и дорогим процессом проектирования стендов. Им нужна быстрая работа, несколько вариантов дизайна и доступные решения — при сохранении профессионального качества.',
      uz: "Ko'rgazmalarga tayyorlanayotgan kompaniyalar stendlar yaratish uchun sekin va qimmat dizayn jarayoniga duch keladi. Ularga tez ish, bir nechta dizayn variantlari va hamyonbop yechimlar kerak.",
    },
    solution: {
      en: 'We developed an AI-powered platform with a three-step workflow: an AI assistant gathers information about the company, exhibition, preferred style, and budget; then the AI generates multiple unique booth design options; finally users select a design and receive a quote within 24 hours. The platform dramatically reduces design time from weeks to minutes.',
      ru: 'Мы разработали платформу на базе ИИ с трёхэтапным рабочим процессом: ИИ-ассистент собирает информацию о компании, выставке, предпочтительном стиле и бюджете; затем ИИ генерирует несколько уникальных вариантов дизайна стенда; наконец, пользователи выбирают дизайн и получают коммерческое предложение в течение 24 часов.',
      uz: "Biz uch bosqichli ish jarayoni bilan AI-quvvatli platforma ishlab chiqdik: AI-yordamchi kompaniya, ko'rgazma, afzal ko'rilgan uslub va byudjet haqida ma'lumot to'playdi; keyin AI bir nechta noyob stend dizayni variantlarini yaratadi; nihoyat foydalanuvchilar dizaynni tanlaydi va 24 soat ichida narx taklifini oladi.",
    },
    results: {
      en: 'Design time reduced from 2-3 weeks to under 15 minutes. Each session generates 4-6 unique booth visualizations. Cost savings of up to 70% compared to traditional design agencies. Over 50 exhibition booths designed in the first quarter.',
      ru: 'Время проектирования сокращено с 2-3 недель до менее 15 минут. Каждая сессия генерирует 4-6 уникальных визуализаций стенда. Экономия до 70% по сравнению с традиционными дизайн-агентствами. Более 50 стендов спроектировано за первый квартал.',
      uz: "Dizayn vaqti 2-3 haftadan 15 daqiqagacha qisqartirildi. Har bir sessiya 4-6 ta noyob stend vizualizatsiyasini yaratadi. An'anaviy dizayn agentliklariga nisbatan 70% gacha tejash. Birinchi chorakda 50 dan ortiq ko'rgazma stendlari loyihalashtirildi.",
    },
    techStack: ['Next.js', 'React', 'TypeScript', 'OpenAI', 'Node.js', 'Python', 'Tailwind CSS'],
    images: [
      '/projects/standai/screenshot-1.png',
      '/projects/standai/screenshot-2.png',
      '/projects/standai/screenshot-3.png',
      '/projects/standai/screenshot-4.png',
    ],
    thumbnail: '/projects/standai/screenshot-1.png',
    links: {
      demo: 'https://expostandai-production.up.railway.app',
    },
    featured: true,
    completedDate: '2025',
    relatedSolutions: [],
  },
  {
    slug: 'glamora',
    title: {
      en: 'Glamora - Cosmetics Marketplace',
      ru: 'Glamora - Маркетплейс косметики',
      uz: 'Glamora - Kosmetika marketplace',
    },
    category: 'ecommerce',
    description: {
      en: 'A multi-vendor cosmetics marketplace connecting beauty brands with customers across Uzbekistan. Features a Telegram mini-app for mobile shopping, an admin panel for vendor management, and a product catalog with advanced filtering.',
      ru: 'Мультивендорный маркетплейс косметики, связывающий бьюти-бренды с покупателями по всему Узбекистану. Telegram мини-приложение для мобильных покупок, админ-панель для управления продавцами и каталог товаров с расширенной фильтрацией.',
      uz: 'Go\'zallik brendlarini butun O\'zbekiston bo\'ylab mijozlar bilan bog\'laydigan ko\'p sotuvchili kosmetika marketplace. Mobil xaridlar uchun Telegram mini-ilova, sotuvchilarni boshqarish uchun admin panel va kengaytirilgan filtrlashli mahsulotlar katalogi.',
    },
    challenge: {
      en: 'Uzbekistan\'s cosmetics market lacked a unified digital platform where multiple beauty brands could sell directly to consumers. Customers had to visit multiple stores or rely on informal social media channels with no product guarantees.',
      ru: 'На рынке косметики Узбекистана не было единой цифровой платформы, где несколько бьюти-брендов могли бы продавать напрямую потребителям. Покупателям приходилось посещать множество магазинов или полагаться на социальные сети без гарантий качества.',
      uz: 'O\'zbekiston kosmetika bozorida bir nechta go\'zallik brendlari bevosita iste\'molchilarga sotishi mumkin bo\'lgan yagona raqamli platforma yo\'q edi. Xaridorlar ko\'plab do\'konlarni ziyorat qilishi yoki sifat kafolatlari bo\'lmagan ijtimoiy tarmoqlarga tayanishi kerak edi.',
    },
    solution: {
      en: 'We built a full-featured multi-vendor marketplace with a Telegram mini-app for seamless mobile commerce, a dedicated admin panel for managing brands and inventory, and an automated pre-order and fulfillment system. The platform supports product categorization, search, and secure checkout.',
      ru: 'Мы создали полнофункциональный мультивендорный маркетплейс с Telegram мини-приложением для мобильной коммерции, выделенной админ-панелью для управления брендами и инвентарём, а также автоматизированной системой предзаказов и фулфилмента.',
      uz: 'Biz mobil tijorat uchun Telegram mini-ilova, brendlar va inventarni boshqarish uchun maxsus admin panel hamda avtomatlashtirilgan oldindan buyurtma va yetkazib berish tizimi bilan to\'liq funksional ko\'p sotuvchili marketplace yaratdik.',
    },
    results: {
      en: 'Launched with multiple beauty brands onboarded. The Telegram mini-app drove 70% of total orders. Average order processing time reduced from days to minutes. Customer satisfaction rate of 94%.',
      ru: 'Запущен с подключением нескольких бьюти-брендов. Telegram мини-приложение обеспечило 70% всех заказов. Среднее время обработки заказа сократилось с дней до минут. Удовлетворённость клиентов — 94%.',
      uz: 'Bir nechta go\'zallik brendlari bilan ishga tushirildi. Telegram mini-ilova barcha buyurtmalarning 70% ni ta\'minladi. O\'rtacha buyurtmani qayta ishlash vaqti kunlardan daqiqalarga qisqardi. Mijozlar qoniqishi — 94%.',
    },
    techStack: ['Next.js', 'React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Telegram Bot API'],
    images: [
      '/projects/glamora/screenshot-1.png',
    ],
    thumbnail: '/projects/glamora/screenshot-1.png',
    links: {},
    featured: true,
    completedDate: '2025',
    relatedSolutions: [],
  },
  {
    slug: 'climateasia',
    title: {
      en: 'ClimateAsia - HVAC Business ERP',
      ru: 'ClimateAsia - ERP для климатического бизнеса',
      uz: 'ClimateAsia - Iqlim biznesi uchun ERP',
    },
    category: 'crm',
    description: {
      en: 'A comprehensive ERP system for HVAC and climate equipment businesses. Manages the full lifecycle from warehouse inventory and supplier relations to client orders, installation scheduling, and after-sales service tracking.',
      ru: 'Комплексная ERP-система для бизнеса в сфере климатического оборудования. Управляет полным циклом — от складского учёта и работы с поставщиками до заказов клиентов, планирования монтажа и отслеживания постпродажного обслуживания.',
      uz: 'Iqlim uskunalari biznesi uchun keng qamrovli ERP tizimi. Ombor hisobi va yetkazib beruvchilar bilan munosabatlardan tortib mijoz buyurtmalari, montaj rejalashtirish va sotuvdan keyingi xizmatni kuzatishgacha to\'liq tsiklni boshqaradi.',
    },
    challenge: {
      en: 'HVAC businesses in Uzbekistan managed operations using spreadsheets and paper-based systems, leading to inventory discrepancies, missed service appointments, and difficulty tracking profitability across projects.',
      ru: 'Компании климатического оборудования в Узбекистане управляли операциями с помощью таблиц и бумажных систем, что приводило к расхождениям в инвентаре, пропущенным визитам обслуживания и сложностям с отслеживанием прибыльности проектов.',
      uz: 'O\'zbekistondagi iqlim uskunalari kompaniyalari operatsiyalarni jadvallar va qog\'oz tizimlari yordamida boshqargan, bu esa inventar nomuvofiqliklariga, o\'tkazib yuborilgan xizmat uchrashuvlariga va loyihalar bo\'yicha daromadlilikni kuzatishda qiyinchiliklarga olib kelgan.',
    },
    solution: {
      en: 'We developed a tailored ERP system with modules for warehouse management, procurement, client CRM, project costing, installation scheduling, and warranty tracking. Real-time dashboards provide business owners with instant visibility into every aspect of operations.',
      ru: 'Мы разработали специализированную ERP-систему с модулями складского учёта, закупок, клиентского CRM, расчёта стоимости проектов, планирования монтажа и отслеживания гарантий. Панели мониторинга в реальном времени обеспечивают владельцам бизнеса полную видимость всех аспектов операций.',
      uz: 'Biz ombor boshqaruvi, xaridlar, mijozlar CRM, loyiha narxini hisoblash, montaj rejalashtirish va kafolat kuzatuvi modullari bilan maxsus ERP tizimini ishlab chiqdik. Real vaqtdagi boshqaruv panellari biznes egalariga operatsiyalarning barcha jihatlariga tezkor ko\'rinishni ta\'minlaydi.',
    },
    results: {
      en: 'Inventory accuracy improved from 78% to 99%. Service appointment scheduling efficiency increased by 60%. Management reporting time reduced from weekly manual compilation to real-time automated dashboards.',
      ru: 'Точность инвентаризации улучшилась с 78% до 99%. Эффективность планирования визитов обслуживания выросла на 60%. Время подготовки отчётов сократилось с еженедельной ручной компиляции до автоматических панелей в реальном времени.',
      uz: 'Inventar aniqligi 78% dan 99% ga oshdi. Xizmat uchrashuvlarini rejalashtirish samaradorligi 60% ga oshdi. Boshqaruv hisobotlari vaqti haftalik qo\'lda tuzishdan real vaqtdagi avtomatik panellarga qisqardi.',
    },
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    images: [
      '/projects/climateasia/screenshot-1.png',
    ],
    thumbnail: '/projects/climateasia/screenshot-1.png',
    links: {},
    featured: true,
    completedDate: '2024',
    relatedSolutions: [],
  },
  {
    slug: 'sportbooking',
    title: {
      en: 'SportBooking - Sports Facility Reservations',
      ru: 'SportBooking - Бронирование спортивных объектов',
      uz: 'SportBooking - Sport inshootlarini bron qilish',
    },
    category: 'saas',
    description: {
      en: 'An online booking platform for sports facilities — football fields, tennis courts, swimming pools, and gyms. Facility owners manage availability and pricing while players book and pay in a few taps.',
      ru: 'Платформа онлайн-бронирования спортивных объектов — футбольных полей, теннисных кортов, бассейнов и тренажёрных залов. Владельцы управляют доступностью и ценами, а игроки бронируют и оплачивают в несколько нажатий.',
      uz: 'Sport inshootlarini onlayn bron qilish platformasi — futbol maydonlari, tennis kortlari, suzish havzalari va sport zallari. Mulkdorlar mavjudlik va narxlarni boshqaradi, o\'yinchilar esa bir necha bosishda bron qiladi va to\'laydi.',
    },
    challenge: {
      en: 'Sports facility booking in Tashkent relied on phone calls and messaging apps, causing double bookings, no-shows, and lost revenue for facility owners. Players had no way to discover available venues in real time.',
      ru: 'Бронирование спортивных объектов в Ташкенте зависело от телефонных звонков и мессенджеров, что приводило к двойным бронированиям, неявкам и потере выручки для владельцев. У игроков не было возможности найти доступные площадки в реальном времени.',
      uz: 'Toshkentda sport inshootlarini bron qilish telefon qo\'ng\'iroqlari va messenjerlar orqali amalga oshirilgan, bu esa ikki marta bron qilish, kelmay qolish va mulkdorlar uchun daromad yo\'qotishga olib kelgan.',
    },
    solution: {
      en: 'We created a two-sided platform: facility owners get a management dashboard with calendar views, pricing controls, and booking analytics; players get a searchable directory with real-time availability, instant booking, and payment integration.',
      ru: 'Мы создали двустороннюю платформу: владельцы получают панель управления с календарём, настройкой цен и аналитикой бронирований; игроки получают каталог с поиском, доступностью в реальном времени, мгновенным бронированием и интеграцией оплаты.',
      uz: 'Biz ikki tomonlama platforma yaratdik: mulkdorlar kalendar ko\'rinishi, narx boshqaruvi va bron analitikasi bilan boshqaruv panelini oladi; o\'yinchilar esa qidiruvli katalog, real vaqtdagi mavjudlik, tezkor bron qilish va to\'lov integratsiyasini oladi.',
    },
    results: {
      en: 'Platform onboarded 30+ sports venues in the first two months. Double bookings eliminated entirely. Facility owners reported 25% increase in utilization rates thanks to real-time visibility.',
      ru: 'За первые два месяца подключено 30+ спортивных площадок. Двойные бронирования полностью устранены. Владельцы отмечают рост загрузки на 25% благодаря видимости в реальном времени.',
      uz: 'Birinchi ikki oyda 30+ sport maydonchalari ulandi. Ikki marta bron qilish to\'liq bartaraf etildi. Mulkdorlar real vaqtdagi ko\'rinish tufayli foydalanish darajasining 25% ga oshganini qayd etdi.',
    },
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    images: [
      '/projects/sportbooking/screenshot-1.png',
    ],
    thumbnail: '/projects/sportbooking/screenshot-1.png',
    links: {},
    featured: false,
    completedDate: '2024',
    relatedSolutions: ['ordo'],
  },
  {
    slug: 'giftsign',
    title: {
      en: 'GiftSign - Digital Gift Card Designer',
      ru: 'GiftSign - Дизайнер цифровых подарочных открыток',
      uz: 'GiftSign - Raqamli sovg\'a karta dizayneri',
    },
    category: 'website',
    description: {
      en: 'A browser-based design tool for creating custom digital gift cards and certificates. Features a drag-and-drop canvas editor similar to Canva, with templates, custom text, images, and instant sharing via link or download.',
      ru: 'Браузерный инструмент для создания цифровых подарочных карт и сертификатов. Редактор холста с перетаскиванием, шаблоны, пользовательский текст, изображения и мгновенная отправка по ссылке или скачивание.',
      uz: 'Maxsus raqamli sovg\'a kartalar va sertifikatlar yaratish uchun brauzerga asoslangan dizayn vositasi. Sudrab tashlash bilan kanvas muharriri, shablonlar, maxsus matn, rasmlar va havola orqali tezkor ulashish yoki yuklab olish.',
    },
    challenge: {
      en: 'Businesses in Uzbekistan needed an affordable way to create branded digital gift cards without hiring a designer. Existing international tools were too complex and expensive for the local market.',
      ru: 'Бизнесам в Узбекистане нужен был доступный способ создавать брендированные цифровые подарочные карты без найма дизайнера. Существующие международные инструменты были слишком сложными и дорогими для местного рынка.',
      uz: 'O\'zbekistondagi bizneslar dizayner yollamasdan brendlangan raqamli sovg\'a kartalarni yaratishning hamyonbop usulini talab qildi. Mavjud xalqaro vositalar mahalliy bozor uchun juda murakkab va qimmat edi.',
    },
    solution: {
      en: 'We developed an intuitive canvas-based editor using Fabric.js with pre-built templates, custom branding options, QR code generation, and one-click export. The platform supports both individual users and businesses with bulk creation capabilities.',
      ru: 'Мы разработали интуитивный редактор на основе холста с использованием Fabric.js с готовыми шаблонами, опциями брендирования, генерацией QR-кодов и экспортом в один клик. Платформа поддерживает как индивидуальных пользователей, так и бизнес с возможностью массового создания.',
      uz: 'Biz Fabric.js yordamida tayyor shablonlar, brend variantlari, QR kod yaratish va bir bosishda eksport bilan intuitiv kanvasga asoslangan muharrir ishlab chiqdik.',
    },
    results: {
      en: 'Over 500 unique gift card designs created in the first month. Average design time under 3 minutes. Adopted by 15+ local businesses for branded gift card programs.',
      ru: 'За первый месяц создано более 500 уникальных дизайнов подарочных карт. Среднее время создания — менее 3 минут. Принято 15+ местными компаниями для программ брендированных подарочных карт.',
      uz: 'Birinchi oyda 500 dan ortiq noyob sovg\'a karta dizayni yaratildi. O\'rtacha dizayn vaqti 3 daqiqadan kam. 15+ mahalliy kompaniyalar brendlangan sovg\'a karta dasturlari uchun qabul qildi.',
    },
    techStack: ['Next.js', 'React', 'TypeScript', 'Fabric.js', 'Node.js', 'PostgreSQL', 'Prisma'],
    images: [
      '/projects/giftsign/screenshot-1.png',
    ],
    thumbnail: '/projects/giftsign/screenshot-1.png',
    links: {},
    featured: false,
    completedDate: '2024',
    relatedSolutions: [],
  },
  {
    slug: 'wealthwise',
    title: {
      en: 'WealthWise - Financial Management Platform',
      ru: 'WealthWise - Платформа управления финансами',
      uz: 'WealthWise - Moliyaviy boshqaruv platformasi',
    },
    category: 'saas',
    description: {
      en: 'A wealth management and financial tracking platform for individuals and small businesses. Provides expense categorization, income tracking, budget planning, financial goal setting, and visual analytics dashboards.',
      ru: 'Платформа управления благосостоянием и финансового учёта для физических лиц и малого бизнеса. Категоризация расходов, учёт доходов, планирование бюджета, постановка финансовых целей и визуальные аналитические панели.',
      uz: 'Jismoniy shaxslar va kichik biznes uchun boylik boshqaruvi va moliyaviy hisobot platformasi. Xarajatlar kategoriyalash, daromadlarni kuzatish, byudjet rejalashtirish, moliyaviy maqsadlar belgilash va vizual analitik panellar.',
    },
    challenge: {
      en: 'Small business owners and individuals in Uzbekistan lacked accessible financial management tools in their local language. International apps didn\'t support local currency (UZS) or banking integrations relevant to the market.',
      ru: 'Владельцы малого бизнеса и частные лица в Узбекистане не имели доступных инструментов финансового управления на родном языке. Международные приложения не поддерживали местную валюту (UZS) и банковские интеграции.',
      uz: 'O\'zbekistondagi kichik biznes egalari va jismoniy shaxslarda ona tilida mavjud moliyaviy boshqaruv vositalari yo\'q edi. Xalqaro ilovalar mahalliy valyuta (UZS) yoki bank integratsiyalarini qo\'llab-quvvatlamadi.',
    },
    solution: {
      en: 'We built a localized financial management platform with UZS support, multi-currency tracking, intuitive dashboards for income vs. expenses, automated budget alerts, and exportable financial reports. Available in Russian, Uzbek, and English.',
      ru: 'Мы создали локализованную платформу финансового управления с поддержкой UZS, мультивалютным учётом, интуитивными панелями доходов и расходов, автоматическими оповещениями о бюджете и экспортируемыми финансовыми отчётами.',
      uz: 'Biz UZS qo\'llab-quvvatlashi, ko\'p valyutali hisobot, daromad va xarajatlar uchun intuitiv panellar, avtomatik byudjet ogohlantirishlari va eksport qilinadigan moliyaviy hisobotlar bilan lokalizatsiyalangan moliyaviy boshqaruv platformasini yaratdik.',
    },
    results: {
      en: 'Users reported saving 15% more on average within the first 3 months of use. Financial report generation reduced from hours of manual work to one-click automated exports.',
      ru: 'Пользователи сообщают о 15% увеличении сбережений в среднем за первые 3 месяца использования. Генерация финансовых отчётов сократилась с часов ручной работы до автоматического экспорта в один клик.',
      uz: 'Foydalanuvchilar foydalanishning birinchi 3 oyida o\'rtacha 15% ko\'proq tejash haqida xabar berdi. Moliyaviy hisobot yaratish soatlab qo\'lda ishlashdan bir bosishda avtomatik eksportga qisqardi.',
    },
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Recharts'],
    images: [
      '/projects/wealthwise/screenshot-1.png',
    ],
    thumbnail: '/projects/wealthwise/screenshot-1.png',
    links: {},
    featured: false,
    completedDate: '2024',
    relatedSolutions: [],
  },
  {
    slug: 'avtobox',
    title: {
      en: 'AvtoBox - Automotive Marketplace',
      ru: 'AvtoBox - Автомобильный маркетплейс',
      uz: 'AvtoBox - Avtomobil marketplace',
    },
    category: 'ecommerce',
    description: {
      en: 'A digital marketplace for buying and selling vehicles and automotive parts in Uzbekistan. Features advanced search filters, dealer storefronts, vehicle inspection reports, and a comparison tool for informed purchasing decisions.',
      ru: 'Цифровой маркетплейс для покупки и продажи автомобилей и автозапчастей в Узбекистане. Расширенные фильтры поиска, витрины дилеров, отчёты об осмотре автомобилей и инструмент сравнения для принятия обоснованных решений.',
      uz: 'O\'zbekistonda avtomobillar va avtomobil ehtiyot qismlarini sotib olish va sotish uchun raqamli marketplace. Kengaytirilgan qidiruv filtrlari, diler vitrinlari, avtomobilni tekshirish hisobotlari va ongli xarid qilish qarorlari uchun taqqoslash vositasi.',
    },
    challenge: {
      en: 'The automotive market in Uzbekistan was fragmented across Telegram groups, classifieds, and physical bazaars. Buyers had no reliable way to compare vehicles, verify conditions, or connect directly with trusted sellers.',
      ru: 'Автомобильный рынок в Узбекистане был разрознен между Telegram-группами, досками объявлений и физическими базарами. У покупателей не было надёжного способа сравнивать автомобили, проверять состояние или связываться с проверенными продавцами.',
      uz: 'O\'zbekistondagi avtomobil bozori Telegram guruhlari, e\'lonlar taxtasi va jismoniy bozorlar bo\'ylab tarqoq edi. Xaridorlar avtomobillarni taqqoslash, holatini tekshirish yoki ishonchli sotuvchilar bilan bevosita bog\'lanishning ishonchli usuli yo\'q edi.',
    },
    solution: {
      en: 'We developed a structured automotive marketplace with detailed vehicle listings, multi-parameter search and filtering, dealer verification, side-by-side comparison tools, and a messaging system for buyer-seller communication.',
      ru: 'Мы разработали структурированный автомобильный маркетплейс с детальными объявлениями, многопараметрическим поиском и фильтрацией, верификацией дилеров, инструментами сравнения и системой сообщений для связи покупателей и продавцов.',
      uz: 'Biz batafsil avtomobil e\'lonlari, ko\'p parametrli qidiruv va filtrlash, diler verifikatsiyasi, yonma-yon taqqoslash vositalari va xaridor-sotuvchi aloqasi uchun xabar almashish tizimi bilan tuzilgan avtomobil marketplace ishlab chiqdik.',
    },
    results: {
      en: 'Platform attracted 1,000+ vehicle listings within the first quarter. Search-to-contact conversion rate of 18%, significantly above the industry average. Average time to sell reduced by 40% compared to traditional channels.',
      ru: 'Платформа привлекла 1 000+ объявлений об автомобилях за первый квартал. Конверсия из поиска в контакт — 18%, значительно выше среднеотраслевого. Среднее время продажи сократилось на 40% по сравнению с традиционными каналами.',
      uz: 'Platforma birinchi chorakda 1 000+ avtomobil e\'lonlarini jalb qildi. Qidiruvdan aloqaga konversiya 18%, soha o\'rtachasidan sezilarli darajada yuqori. O\'rtacha sotish vaqti an\'anaviy kanallarga nisbatan 40% ga qisqardi.',
    },
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    images: [
      '/projects/avtobox/screenshot-1.png',
    ],
    thumbnail: '/projects/avtobox/screenshot-1.png',
    links: {},
    featured: false,
    completedDate: '2025',
    relatedSolutions: [],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
