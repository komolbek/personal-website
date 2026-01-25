import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'oqyol',
    title: {
      en: "OqYo'l - Taxi Booking App",
      ru: "OqYo'l - Приложение для заказа такси",
      uz: "OqYo'l - Taksi buyurtma ilovasi",
    },
    category: 'mobile',
    description: {
      en: 'A modern taxi booking application designed to make urban transportation seamless and efficient. With features like real-time driver tracking, multiple payment options, and fare estimation, getting around the city has never been easier.',
      ru: 'Современное приложение для заказа такси, созданное для удобного и эффективного передвижения по городу. С функциями отслеживания водителя в реальном времени, различными способами оплаты и предварительным расчётом стоимости.',
      uz: "Shahar transportini qulay va samarali qilish uchun yaratilgan zamonaviy taksi buyurtma berish ilovasi. Real vaqtda haydovchini kuzatish, turli to'lov usullari va narxni oldindan hisoblash kabi funksiyalar bilan.",
    },
    challenge: {
      en: 'The client needed a reliable, user-friendly taxi booking app that could handle real-time GPS tracking, multiple payment methods, and seamless driver-passenger matching while providing a smooth experience across both iOS and Android platforms.',
      ru: 'Клиенту требовалось надёжное, удобное приложение для заказа такси с отслеживанием GPS в реальном времени, различными способами оплаты и эффективным соединением водителей с пассажирами на платформах iOS и Android.',
      uz: "Mijozga real vaqtda GPS kuzatuvi, turli to'lov usullari va haydovchi-yo'lovchi mosligini ta'minlaydigan ishonchli, foydalanuvchilarga qulay taksi buyurtma ilovasi kerak edi.",
    },
    solution: {
      en: 'We developed a cross-platform mobile application using React Native with real-time GPS tracking powered by Google Maps API. The app features an intuitive booking flow, live driver tracking, multiple payment integrations, and a robust backend to handle concurrent requests efficiently.',
      ru: 'Мы разработали кроссплатформенное мобильное приложение на React Native с отслеживанием GPS в реальном времени на базе Google Maps API. Приложение имеет интуитивный процесс бронирования, отслеживание водителя в реальном времени, интеграции с платёжными системами и надёжный бэкенд.',
      uz: "Biz Google Maps API orqali real vaqtda GPS kuzatuvi bilan React Native yordamida krossplatforma mobil ilovasini ishlab chiqdik. Ilova intuitiv buyurtma jarayoni, haydovchini jonli kuzatish va to'lov integratsiyalariga ega.",
    },
    results: {
      en: '10,000+ downloads within the first 6 months, 4.5-star rating on both app stores, and 30% increase in daily bookings compared to the previous solution.',
      ru: 'Более 10 000 скачиваний за первые 6 месяцев, рейтинг 4.5 звезды в обоих магазинах приложений и увеличение ежедневных заказов на 30% по сравнению с предыдущим решением.',
      uz: "Birinchi 6 oy ichida 10,000+ yuklab olishlar, ikkala ilovalar do'konida 4.5 yulduzli reyting va oldingi yechimga nisbatan kunlik buyurtmalarning 30% o'sishi.",
    },
    techStack: ['React Native', 'TypeScript', 'Node.js', 'MongoDB', 'Google Maps API', 'Socket.io', 'Redis'],
    images: [
      '/projects/oqyol/screenshot-1.png',
      '/projects/oqyol/screenshot-2.png',
      '/projects/oqyol/screenshot-3.png',
    ],
    thumbnail: '/projects/oqyol/thumbnail.png',
    links: {
      appStore: 'https://apps.apple.com/app/oqyol',
      playStore: 'https://play.google.com/store/apps/details?id=com.oqyol',
    },
    featured: true,
    completedDate: '2024',
    relatedSolutions: ['mobile-apps'],
  },
  {
    slug: 'money-control',
    title: {
      en: 'Money Control - Personal Finance Tracker',
      ru: 'Money Control - Персональный финансовый трекер',
      uz: 'Money Control - Shaxsiy moliya trekeri',
    },
    category: 'mobile',
    description: {
      en: 'A simple yet powerful app designed to help users track personal debts and IOUs. With an intuitive interface and smart reminders, users never forget who owes them or who they owe.',
      ru: 'Простое, но мощное приложение, разработанное для отслеживания личных долгов. С интуитивным интерфейсом и умными напоминаниями пользователи никогда не забудут, кто им должен или кому должны они.',
      uz: "Shaxsiy qarzlarni kuzatishga yordam beradigan oddiy, lekin kuchli ilova. Intuitiv interfeys va aqlli eslatmalar bilan foydalanuvchilar hech qachon kim ularga qarz yoki kimga qarzdorligini unutmaydi.",
    },
    challenge: {
      en: 'Many people struggle to keep track of informal loans between friends and family. The challenge was to create an app that makes debt tracking simple, non-intrusive, and secure while maintaining privacy with local-only data storage.',
      ru: 'Многие люди с трудом отслеживают неформальные займы между друзьями и семьёй. Задача состояла в создании приложения, которое делает отслеживание долгов простым, ненавязчивым и безопасным, сохраняя конфиденциальность с локальным хранением данных.',
      uz: "Ko'p odamlar do'stlar va oila a'zolari o'rtasidagi norasmiy qarzlarni kuzatishda qiynaladi. Vazifa qarzlarni kuzatishni oddiy, bezovta qilmaydigan va xavfsiz qiladigan ilovani yaratish edi.",
    },
    solution: {
      en: 'We built a clean, minimalist mobile app that focuses on the core functionality of tracking who owes what. The app features local data storage for privacy, smart categorization, and an intuitive interface that makes adding and settling debts quick and easy.',
      ru: 'Мы создали чистое, минималистичное мобильное приложение, сосредоточенное на основной функциональности отслеживания долгов. Приложение имеет локальное хранение данных для конфиденциальности, умную категоризацию и интуитивный интерфейс.',
      uz: "Biz kim qarz ekanligini kuzatishning asosiy funksiyasiga e'tibor qaratgan toza, minimalist mobil ilovasini yaratdik. Ilova maxfiylik uchun mahalliy ma'lumotlarni saqlash va intuitiv interfeysga ega.",
    },
    results: {
      en: 'Highly rated app with positive user reviews praising its simplicity and privacy-focused approach. Users report significantly better tracking of personal finances and fewer forgotten debts.',
      ru: 'Высоко оценённое приложение с положительными отзывами пользователей, хвалящих его простоту и подход, ориентированный на конфиденциальность.',
      uz: "Foydalanuvchilar tomonidan yuqori baholangan ilova, soddaligi va maxfiylikka yo'naltirilgan yondashuvi uchun ijobiy sharhlar olgan.",
    },
    techStack: ['React Native', 'TypeScript', 'AsyncStorage', 'Expo', 'React Navigation'],
    images: [
      '/projects/money-control/screenshot-1.png',
      '/projects/money-control/screenshot-2.png',
    ],
    thumbnail: '/projects/money-control/thumbnail.png',
    links: {
      appStore: 'https://apps.apple.com/app/money-control',
    },
    featured: true,
    completedDate: '2024',
    relatedSolutions: ['mobile-apps'],
  },
  {
    slug: 'memomind',
    title: {
      en: 'MemoMind - AI Voice Notes',
      ru: 'MemoMind - Голосовые заметки с ИИ',
      uz: 'MemoMind - AI ovozli eslatmalar',
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
    ],
    thumbnail: '/projects/memomind/thumbnail.png',
    links: {
      appStore: 'https://apps.apple.com/app/memomind',
    },
    featured: true,
    completedDate: '2024',
    relatedSolutions: ['mobile-apps', 'ai-integration'],
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

export const projectCategories: { value: string; label: Record<'en' | 'ru' | 'uz', string> }[] = [
  { value: 'all', label: { en: 'All', ru: 'Все', uz: 'Barchasi' } },
  { value: 'mobile', label: { en: 'Mobile Apps', ru: 'Мобильные приложения', uz: 'Mobil ilovalar' } },
  { value: 'website', label: { en: 'Websites', ru: 'Веб-сайты', uz: 'Veb-saytlar' } },
  { value: 'crm', label: { en: 'CRM Systems', ru: 'CRM системы', uz: 'CRM tizimlar' } },
  { value: 'ai', label: { en: 'AI Solutions', ru: 'ИИ решения', uz: 'AI yechimlar' } },
  { value: 'ecommerce', label: { en: 'E-commerce', ru: 'Электронная коммерция', uz: 'Elektron tijorat' } },
];
