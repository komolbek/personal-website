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
      en: 'Users report saving 2-3 hours per week on note-taking and review. The AI accurately extracts key points and action items, making voice memos actionable rather than just archives.',
      ru: 'Пользователи сообщают об экономии 2-3 часов в неделю на ведении заметок и просмотре. ИИ точно извлекает ключевые моменты и задачи, делая голосовые заметки действительно полезными.',
      uz: "Foydalanuvchilar eslatmalarni yozish va ko'rib chiqishda haftada 2-3 soat tejashni xabar qilishadi. AI asosiy fikrlar va vazifalarni aniq ajratib oladi.",
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
      en: 'The platform streamlined the rental process for event organizers, reducing order time and improving customer experience with a user-friendly interface and reliable delivery tracking.',
      ru: 'Платформа оптимизировала процесс аренды для организаторов мероприятий, сократив время заказа и улучшив клиентский опыт с помощью удобного интерфейса и отслеживания доставки.',
      uz: "Platforma tadbir tashkilotchilari uchun ijara jarayonini optimallashtirdi, buyurtma vaqtini qisqartirdi va qulay interfeys va yetkazib berish kuzatuvi bilan mijozlar tajribasini yaxshiladi.",
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
      en: 'The platform reduced exhibition booth design time from weeks to minutes and provides multiple design options at a fraction of the traditional cost, making professional booth design accessible to businesses of all sizes.',
      ru: 'Платформа сократила время проектирования выставочных стендов с недель до минут и предоставляет несколько вариантов дизайна за долю традиционной стоимости, делая профессиональный дизайн стендов доступным для бизнеса любого размера.',
      uz: "Platforma ko'rgazma stendlari dizayni vaqtini haftalardan daqiqalargacha qisqartirdi va an'anaviy narxning bir qismida bir nechta dizayn variantlarini taqdim etadi.",
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
