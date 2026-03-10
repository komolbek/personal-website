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
