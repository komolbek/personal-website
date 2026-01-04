import { App, SocialLink } from '@/types';

export const siteConfig = {
  name: 'Komolbek Ibragimov',
  title: 'Komolbek Ibragimov - Mobile App Developer',
  description: 'Solo mobile app developer creating innovative iOS and Android applications',
  url: 'https://komolbekibragimov.com',
  email: 'kamol.developer@gmail.com', // Update this
  defaultLocale: 'en' as const,
  locales: ['en', 'ru', 'uz'] as const,
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/komolbek',
    icon: 'github',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/komolllbek',
    icon: 'instagram',
  },
  {
    platform: 'Telegram',
    url: 'https://t.me/ika_uk',
    icon: 'telegram',
  },
];

// Add your apps here
export const apps: App[] = [
  {
    id: 'oqyol',
    name: "OqYo'l",
    description: {
      en: 'Taxi booking app for convenient city transportation. Book rides instantly, track your driver in real-time, and pay seamlessly.',
      ru: 'Приложение для заказа такси для удобного передвижения по городу. Мгновенный заказ, отслеживание водителя в реальном времени и удобная оплата.',
      uz: "Shahar bo'ylab qulay sayohat uchun taksi buyurtma berish ilovasi. Tezkor buyurtma, haydovchini real vaqtda kuzatish va qulay to'lov.",
    },
    longDescription: {
      en: "OqYo'l is a modern taxi booking application designed to make urban transportation seamless and efficient. With features like real-time driver tracking, multiple payment options, and fare estimation, getting around the city has never been easier. Whether you're commuting to work, heading to the airport, or exploring new neighborhoods, OqYo'l connects you with reliable drivers at the tap of a button.",
      ru: "OqYo'l - это современное приложение для заказа такси, созданное для удобного и эффективного передвижения по городу. С функциями отслеживания водителя в реальном времени, различными способами оплаты и предварительным расчётом стоимости, передвижение по городу стало проще. Будь то поездка на работу, в аэропорт или исследование новых районов, OqYo'l связывает вас с надёжными водителями одним нажатием.",
      uz: "OqYo'l - bu shahar transportini qulay va samarali qilish uchun yaratilgan zamonaviy taksi buyurtma berish ilovasi. Real vaqtda haydovchini kuzatish, turli to'lov usullari va narxni oldindan hisoblash kabi funksiyalar bilan shahar bo'ylab sayohat qilish hech qachon bunday oson bo'lmagan. Ishga, aeroportga yoki yangi mahallalarni o'rganishga borayotganingizda, OqYo'l sizni ishonchli haydovchilar bilan bitta tugma bilan bog'laydi.",
    },
    features: {
      en: [
        'Real-time driver tracking on map',
        'Multiple payment methods (cash, card, wallet)',
        'Fare estimation before booking',
        'Ride history and receipts',
        'Rate and review drivers',
        '24/7 customer support',
      ],
      ru: [
        'Отслеживание водителя на карте в реальном времени',
        'Различные способы оплаты (наличные, карта, кошелёк)',
        'Предварительный расчёт стоимости',
        'История поездок и чеки',
        'Оценка и отзывы о водителях',
        'Круглосуточная поддержка',
      ],
      uz: [
        'Xaritada real vaqtda haydovchini kuzatish',
        "Turli to'lov usullari (naqd, karta, hamyon)",
        'Buyurtmadan oldin narxni hisoblash',
        "Sayohat tarixi va kvitansiyalar",
        'Haydovchilarni baholash va sharhlash',
        'Kuniga 24 soat qo\'llab-quvvatlash',
      ],
    },
    icon: '/apps/oqyol-icon.png',
    screenshots: [
      '/apps/oqyol/screenshot-1.png',
      '/apps/oqyol/screenshot-2.png',
      '/apps/oqyol/screenshot-3.png',
    ],
    appStoreUrl: 'https://apps.apple.com/app/oqyol', // Update with real URL
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.oqyol', // Update with real URL
    category: 'Transportation',
    featured: true,
    color: '#6366f1', // Brand color for this app
  },
  {
    id: 'moneycontrol',
    name: 'Money Control',
    description: {
      en: 'Personal finance tracker to manage your debts and IOUs. Track who owes you and who you owe with ease.',
      ru: 'Персональный финансовый трекер для управления долгами. Легко отслеживайте, кто вам должен и кому должны вы.',
      uz: 'Qarzlaringizni boshqarish uchun shaxsiy moliya trekeri. Kim sizga qarz va kimga qarzdorligingizni oson kuzating.',
    },
    longDescription: {
      en: 'Money Control is a simple yet powerful app designed to help you track personal debts and IOUs. Whether you lent money to a friend or borrowed from family, Money Control keeps everything organized in one place. With an intuitive interface and smart reminders, you\'ll never forget who owes you or who you owe.',
      ru: 'Money Control - это простое, но мощное приложение, разработанное для отслеживания личных долгов. Независимо от того, одолжили ли вы деньги другу или заняли у семьи, Money Control хранит всё организованно в одном месте. С интуитивным интерфейсом и умными напоминаниями вы никогда не забудете, кто вам должен или кому должны вы.',
      uz: 'Money Control - shaxsiy qarzlarni kuzatishga yordam beradigan oddiy, lekin kuchli ilova. Do\'stingizga pul qarz berdingizmi yoki oilangizdan qarz oldingizmi, Money Control hammasini bir joyda tartibli saqlaydi. Intuitiv interfeys va aqlli eslatmalar bilan siz hech qachon kim sizga qarz yoki kimga qarzdorligingizni unutmaysiz.',
    },
    features: {
      en: [
        'Track debts you owe and debts owed to you',
        'Add notes and due dates to each debt',
        'View debt history and statistics',
        'Clean and intuitive user interface',
        'Local data storage for privacy',
        'Multi-language support',
      ],
      ru: [
        'Отслеживание ваших долгов и долгов вам',
        'Добавление заметок и сроков к каждому долгу',
        'Просмотр истории и статистики долгов',
        'Чистый и интуитивный интерфейс',
        'Локальное хранение данных для конфиденциальности',
        'Поддержка нескольких языков',
      ],
      uz: [
        'Qarzlaringiz va sizga bo\'lgan qarzlarni kuzatish',
        'Har bir qarzga eslatma va muddat qo\'shish',
        'Qarz tarixi va statistikasini ko\'rish',
        'Toza va intuitiv foydalanuvchi interfeysi',
        'Maxfiylik uchun mahalliy ma\'lumotlarni saqlash',
        'Ko\'p tilli qo\'llab-quvvatlash',
      ],
    },
    icon: '/apps/moneycontrol-icon.png',
    screenshots: [],
    appStoreUrl: 'https://apps.apple.com/app/money-control',
    category: 'Finance',
    featured: true,
    color: '#10B981',
  },
  {
    id: 'memomind',
    name: 'MemoMind',
    description: {
      en: 'AI-powered voice memo app that transforms your recordings into organized summaries, key points, and action items.',
      ru: 'Голосовые заметки с ИИ, которые превращают ваши записи в организованные резюме, ключевые моменты и задачи.',
      uz: 'Sun\'iy intellekt yordamida ovozli eslatmalaringizni tartibli xulosalar, asosiy fikrlar va vazifalar ro\'yxatiga aylantiradi.',
    },
    longDescription: {
      en: 'MemoMind is an intelligent voice memo app that uses AI to automatically transcribe, summarize, and organize your recordings. Simply record your thoughts, meetings, or ideas, and MemoMind will extract key points, identify action items, and suggest relevant tags. Perfect for professionals, students, and anyone who wants to capture ideas on the go without spending time on manual note-taking.',
      ru: 'MemoMind - это умное приложение для голосовых заметок, использующее ИИ для автоматической транскрипции, резюмирования и организации ваших записей. Просто запишите свои мысли, встречи или идеи, и MemoMind извлечёт ключевые моменты, определит задачи и предложит релевантные теги. Идеально подходит для профессионалов, студентов и всех, кто хочет фиксировать идеи на ходу без ручного ведения заметок.',
      uz: 'MemoMind - bu sun\'iy intellekt yordamida yozuvlaringizni avtomatik transkripsiya qilish, xulosa chiqarish va tartibga solish uchun ishlatadigan aqlli ovozli eslatma ilovasi. Shunchaki fikrlaringizni, uchrashuvlaringizni yoki g\'oyalaringizni yozing, MemoMind asosiy fikrlarni ajratib oladi, vazifalarni aniqlaydi va tegishli teglarni taklif qiladi.',
    },
    features: {
      en: [
        'AI-powered transcription and summarization',
        'Automatic key point extraction',
        'Action item detection',
        'Smart tag suggestions',
        'Import audio files from other apps',
        'Full-text search across all memos',
        'Multiple summary lengths (short, medium, detailed)',
        'Privacy-focused: recordings stored locally',
      ],
      ru: [
        'Транскрипция и резюмирование на основе ИИ',
        'Автоматическое извлечение ключевых моментов',
        'Определение задач и действий',
        'Умные предложения тегов',
        'Импорт аудиофайлов из других приложений',
        'Полнотекстовый поиск по всем заметкам',
        'Различные длины резюме (короткое, среднее, подробное)',
        'Конфиденциальность: записи хранятся локально',
      ],
      uz: [
        'Sun\'iy intellekt yordamida transkripsiya va xulosa',
        'Avtomatik asosiy fikrlarni ajratib olish',
        'Vazifalar va harakatlarni aniqlash',
        'Aqlli teg takliflari',
        'Boshqa ilovalardan audio fayllarni import qilish',
        'Barcha eslatmalar bo\'yicha to\'liq matnli qidiruv',
        'Turli xulosa uzunliklari (qisqa, o\'rtacha, batafsil)',
        'Maxfiylik: yozuvlar mahalliy saqlanadi',
      ],
    },
    icon: '/apps/memomind-icon.png',
    screenshots: [],
    appStoreUrl: 'https://apps.apple.com/app/memomind',
    category: 'Productivity',
    featured: true,
    color: '#6366F1',
  },
];

export function getAppById(id: string): App | undefined {
  return apps.find(app => app.id === id);
}
