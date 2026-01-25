import { Solution } from '@/types';

export const solutions: Solution[] = [
  {
    slug: 'business-automation',
    title: {
      en: 'Business Automation',
      ru: 'Автоматизация бизнеса',
      uz: 'Biznes avtomatlashtirish',
    },
    shortDescription: {
      en: 'Streamline your operations with custom automation solutions that save time and reduce errors.',
      ru: 'Оптимизируйте операции с помощью индивидуальных решений автоматизации, которые экономят время и снижают количество ошибок.',
      uz: 'Vaqtni tejash va xatolarni kamaytirish uchun maxsus avtomatlashtirish yechimlari bilan operatsiyalaringizni optimallashtiring.',
    },
    fullDescription: {
      en: 'Transform your business processes with intelligent automation solutions. We analyze your workflows, identify bottlenecks, and implement custom automation that integrates seamlessly with your existing systems. From document processing to task scheduling, we help you work smarter, not harder.',
      ru: 'Преобразуйте бизнес-процессы с помощью интеллектуальных решений автоматизации. Мы анализируем ваши рабочие процессы, выявляем узкие места и внедряем индивидуальную автоматизацию, которая легко интегрируется с существующими системами.',
      uz: 'Aqlli avtomatlashtirish yechimlari bilan biznes jarayonlaringizni o\'zgartiring. Biz ish jarayonlaringizni tahlil qilamiz, muammolarni aniqlaymiz va mavjud tizimlaringiz bilan muammosiz integratsiya qilinadigan maxsus avtomatlashtirishni joriy qilamiz.',
    },
    icon: 'automation',
    features: {
      en: [
        'Workflow automation and optimization',
        'Document processing and management',
        'Automated task scheduling',
        'Real-time reporting dashboards',
        'Integration with existing tools',
        'Custom notification systems',
      ],
      ru: [
        'Автоматизация и оптимизация рабочих процессов',
        'Обработка и управление документами',
        'Автоматизированное планирование задач',
        'Панели отчётности в реальном времени',
        'Интеграция с существующими инструментами',
        'Индивидуальные системы уведомлений',
      ],
      uz: [
        'Ish jarayonlarini avtomatlashtirish va optimallashtirish',
        'Hujjatlarni qayta ishlash va boshqarish',
        'Avtomatlashtirilgan vazifalarni rejalashtirish',
        'Real vaqtda hisobot panellari',
        'Mavjud vositalar bilan integratsiya',
        'Maxsus xabar berish tizimlari',
      ],
    },
    benefits: {
      en: [
        'Reduce manual work by up to 70%',
        'Minimize human errors',
        'Scale operations effortlessly',
        'Free up team for strategic tasks',
      ],
      ru: [
        'Сокращение ручной работы до 70%',
        'Минимизация человеческих ошибок',
        'Лёгкое масштабирование операций',
        'Освобождение команды для стратегических задач',
      ],
      uz: [
        'Qo\'l mehnatini 70% gacha kamaytiring',
        'Inson xatolarini minimallashtiring',
        'Operatsiyalarni oson masshtablang',
        'Jamoani strategik vazifalar uchun bo\'shating',
      ],
    },
    technologies: ['n8n', 'Zapier', 'Python', 'Node.js', 'Make', 'Power Automate'],
    relatedProjects: [],
    order: 1,
  },
  {
    slug: 'custom-crm',
    title: {
      en: 'Custom CRM Systems',
      ru: 'Индивидуальные CRM системы',
      uz: 'Maxsus CRM tizimlar',
    },
    shortDescription: {
      en: 'Build a CRM tailored to your business processes, not the other way around.',
      ru: 'Создайте CRM, адаптированную под ваши бизнес-процессы, а не наоборот.',
      uz: 'Biznes jarayonlaringizga moslashtirilgan CRM yarating, aksincha emas.',
    },
    fullDescription: {
      en: 'Off-the-shelf CRM solutions often force you to adapt your processes to their limitations. Our custom CRM systems are built around your unique business needs, ensuring seamless adoption and maximum efficiency. Track leads, manage relationships, and close deals faster with a system designed specifically for you.',
      ru: 'Готовые CRM-решения часто заставляют адаптировать процессы под их ограничения. Наши индивидуальные CRM-системы создаются с учётом уникальных потребностей вашего бизнеса, обеспечивая плавное внедрение и максимальную эффективность.',
      uz: 'Tayyor CRM yechimlari ko\'pincha jarayonlaringizni ularning cheklovlariga moslashtirishga majbur qiladi. Bizning maxsus CRM tizimlarimiz sizning noyob biznes ehtiyojlaringiz atrofida qurilgan.',
    },
    icon: 'crm',
    features: {
      en: [
        'Custom lead management pipeline',
        'Contact and company tracking',
        'Deal and opportunity management',
        'Email integration and tracking',
        'Custom reporting and analytics',
        'Mobile-friendly interface',
      ],
      ru: [
        'Индивидуальная воронка управления лидами',
        'Отслеживание контактов и компаний',
        'Управление сделками и возможностями',
        'Интеграция и отслеживание email',
        'Индивидуальная отчётность и аналитика',
        'Мобильный интерфейс',
      ],
      uz: [
        'Maxsus lead boshqaruv quvuri',
        'Kontaktlar va kompaniyalarni kuzatish',
        'Bitimlar va imkoniyatlarni boshqarish',
        'Email integratsiyasi va kuzatuvi',
        'Maxsus hisobot va tahlil',
        'Mobil qulay interfeys',
      ],
    },
    benefits: {
      en: [
        'Perfect fit for your workflow',
        'No per-seat licensing fees',
        'Full data ownership',
        'Unlimited customization',
      ],
      ru: [
        'Идеально подходит под ваш рабочий процесс',
        'Без лицензионных сборов за пользователя',
        'Полное владение данными',
        'Неограниченная кастомизация',
      ],
      uz: [
        'Ish jarayoningiz uchun mukammal mos',
        'Foydalanuvchi uchun litsenziya to\'lovlari yo\'q',
        'To\'liq ma\'lumotlarga egalik',
        'Cheksiz moslashtirish',
      ],
    },
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Next.js', 'Prisma'],
    relatedProjects: [],
    order: 2,
  },
  {
    slug: 'websites',
    title: {
      en: 'Company Websites',
      ru: 'Корпоративные сайты',
      uz: 'Kompaniya veb-saytlari',
    },
    shortDescription: {
      en: 'Modern, fast, and SEO-optimized websites that convert visitors into customers.',
      ru: 'Современные, быстрые и SEO-оптимизированные сайты, которые превращают посетителей в клиентов.',
      uz: 'Tashrif buyuruvchilarni mijozlarga aylantiruvchi zamonaviy, tez va SEO-optimallashtirilgan veb-saytlar.',
    },
    fullDescription: {
      en: 'Your website is often the first impression potential customers have of your business. We create stunning, high-performance websites that not only look great but are optimized for search engines and conversions. From landing pages to full corporate websites, we deliver solutions that drive results.',
      ru: 'Ваш сайт часто является первым впечатлением потенциальных клиентов о вашем бизнесе. Мы создаём впечатляющие высокопроизводительные сайты, которые не только отлично выглядят, но и оптимизированы для поисковых систем и конверсий.',
      uz: 'Veb-saytingiz ko\'pincha potentsial mijozlarning biznesingiz haqidagi birinchi taassurotlari. Biz nafaqat ajoyib ko\'rinadigan, balki qidiruv tizimlari va konversiyalar uchun optimallashtirilgan yuqori samarali veb-saytlar yaratamiz.',
    },
    icon: 'website',
    features: {
      en: [
        'Responsive design for all devices',
        'SEO optimization built-in',
        'Fast loading performance',
        'Content management system',
        'Analytics integration',
        'Contact forms and lead capture',
      ],
      ru: [
        'Адаптивный дизайн для всех устройств',
        'Встроенная SEO-оптимизация',
        'Быстрая загрузка',
        'Система управления контентом',
        'Интеграция аналитики',
        'Формы обратной связи и сбор лидов',
      ],
      uz: [
        'Barcha qurilmalar uchun moslashuvchan dizayn',
        'O\'rnatilgan SEO optimallashtirish',
        'Tez yuklash tezligi',
        'Kontent boshqaruv tizimi',
        'Tahlil integratsiyasi',
        'Aloqa shakllari va lead yig\'ish',
      ],
    },
    benefits: {
      en: [
        'Professional online presence',
        'Higher search rankings',
        'Better user engagement',
        'Increased lead generation',
      ],
      ru: [
        'Профессиональное онлайн-присутствие',
        'Более высокие позиции в поиске',
        'Лучшее вовлечение пользователей',
        'Увеличение генерации лидов',
      ],
      uz: [
        'Professional onlayn mavjudlik',
        'Qidiruvda yuqori o\'rinlar',
        'Yaxshiroq foydalanuvchi jalb qilish',
        'Ko\'proq lead generatsiyasi',
      ],
    },
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'WordPress'],
    relatedProjects: [],
    order: 3,
  },
  {
    slug: 'ecommerce',
    title: {
      en: 'E-commerce Solutions',
      ru: 'Решения для электронной коммерции',
      uz: 'Elektron tijorat yechimlari',
    },
    shortDescription: {
      en: 'Launch your online store with powerful e-commerce platforms built for growth.',
      ru: 'Запустите интернет-магазин с мощными платформами электронной коммерции, созданными для роста.',
      uz: 'O\'sish uchun yaratilgan kuchli elektron tijorat platformalari bilan onlayn do\'koningizni ishga tushiring.',
    },
    fullDescription: {
      en: 'Whether you\'re starting fresh or scaling an existing business, our e-commerce solutions provide everything you need to sell online successfully. From product catalogs to secure payment processing, inventory management to shipping integration, we build online stores that drive sales.',
      ru: 'Независимо от того, начинаете ли вы с нуля или масштабируете существующий бизнес, наши решения для электронной коммерции предоставляют всё необходимое для успешной онлайн-продажи.',
      uz: 'Yangi boshlamoqchimisiz yoki mavjud biznesni kengaytirmoqchimisiz, elektron tijorat yechimlarimiz onlayn muvaffaqiyatli sotish uchun kerak bo\'lgan hamma narsani taqdim etadi.',
    },
    icon: 'ecommerce',
    features: {
      en: [
        'Product catalog management',
        'Secure payment processing',
        'Inventory tracking',
        'Shipping integration',
        'Order management system',
        'Customer accounts and wishlists',
      ],
      ru: [
        'Управление каталогом товаров',
        'Безопасная обработка платежей',
        'Отслеживание запасов',
        'Интеграция доставки',
        'Система управления заказами',
        'Аккаунты клиентов и списки желаний',
      ],
      uz: [
        'Mahsulot katalogini boshqarish',
        'Xavfsiz to\'lovlarni qayta ishlash',
        'Inventarni kuzatish',
        'Yetkazib berish integratsiyasi',
        'Buyurtmalarni boshqarish tizimi',
        'Mijoz akkountlari va istaklar ro\'yxati',
      ],
    },
    benefits: {
      en: [
        'Sell 24/7 without limits',
        'Reach customers globally',
        'Automated operations',
        'Scalable infrastructure',
      ],
      ru: [
        'Продавайте 24/7 без ограничений',
        'Охватывайте клиентов по всему миру',
        'Автоматизированные операции',
        'Масштабируемая инфраструктура',
      ],
      uz: [
        'Cheklovsiz 24/7 soting',
        'Butun dunyo bo\'ylab mijozlarga yeting',
        'Avtomatlashtirilgan operatsiyalar',
        'Masshtablanadigan infratuzilma',
      ],
    },
    technologies: ['Shopify', 'WooCommerce', 'Next.js', 'Stripe', 'PayPal', 'Medusa'],
    relatedProjects: [],
    order: 4,
  },
  {
    slug: 'mobile-apps',
    title: {
      en: 'Mobile Applications',
      ru: 'Мобильные приложения',
      uz: 'Mobil ilovalar',
    },
    shortDescription: {
      en: 'Native and cross-platform mobile apps for iOS and Android that users love.',
      ru: 'Нативные и кроссплатформенные мобильные приложения для iOS и Android, которые нравятся пользователям.',
      uz: 'Foydalanuvchilar yoqtirgan iOS va Android uchun native va krossplatforma mobil ilovalar.',
    },
    fullDescription: {
      en: 'Mobile is where your customers are. We develop high-quality mobile applications that provide seamless user experiences across iOS and Android platforms. Whether you need a customer-facing app, internal business tool, or both, we deliver polished applications that meet your goals.',
      ru: 'Мобильные устройства — это там, где находятся ваши клиенты. Мы разрабатываем высококачественные мобильные приложения, обеспечивающие бесперебойный пользовательский опыт на платформах iOS и Android.',
      uz: 'Mobil — bu sizning mijozlaringiz joylashgan joy. Biz iOS va Android platformalarida uzluksiz foydalanuvchi tajribasini ta\'minlaydigan yuqori sifatli mobil ilovalarni ishlab chiqamiz.',
    },
    icon: 'mobile',
    features: {
      en: [
        'iOS and Android development',
        'Cross-platform solutions',
        'Offline functionality',
        'Push notifications',
        'App Store optimization',
        'Analytics and crash reporting',
      ],
      ru: [
        'Разработка для iOS и Android',
        'Кроссплатформенные решения',
        'Офлайн-функциональность',
        'Push-уведомления',
        'Оптимизация для App Store',
        'Аналитика и отчёты о сбоях',
      ],
      uz: [
        'iOS va Android uchun ishlab chiqish',
        'Krossplatforma yechimlar',
        'Oflayn funksionallik',
        'Push bildirishnomalar',
        'App Store optimallashtirish',
        'Tahlil va nosozlik hisobotlari',
      ],
    },
    benefits: {
      en: [
        'Reach users on any device',
        'Increase customer engagement',
        'Build brand loyalty',
        'New revenue channels',
      ],
      ru: [
        'Охватывайте пользователей на любом устройстве',
        'Увеличивайте вовлечённость клиентов',
        'Укрепляйте лояльность к бренду',
        'Новые каналы дохода',
      ],
      uz: [
        'Foydalanuvchilarga istalgan qurilmada yeting',
        'Mijozlar bilan aloqani oshiring',
        'Brend sadoqatini mustahkamlang',
        'Yangi daromad kanallari',
      ],
    },
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'TypeScript'],
    relatedProjects: ['oqyol', 'money-control', 'memomind'],
    order: 5,
  },
  {
    slug: 'ai-integration',
    title: {
      en: 'AI Integration',
      ru: 'Интеграция ИИ',
      uz: 'Sun\'iy intellekt integratsiyasi',
    },
    shortDescription: {
      en: 'Leverage artificial intelligence to automate tasks and gain competitive advantages.',
      ru: 'Используйте искусственный интеллект для автоматизации задач и получения конкурентных преимуществ.',
      uz: 'Vazifalarni avtomatlashtirish va raqobat ustunliklariga ega bo\'lish uchun sun\'iy intellektdan foydalaning.',
    },
    fullDescription: {
      en: 'Artificial Intelligence is transforming how businesses operate. We help you integrate AI capabilities into your existing systems and workflows, from intelligent chatbots to predictive analytics, document processing to personalized recommendations. Stay ahead of the competition with AI-powered solutions.',
      ru: 'Искусственный интеллект трансформирует работу бизнеса. Мы помогаем интегрировать возможности ИИ в существующие системы и рабочие процессы: от интеллектуальных чат-ботов до предиктивной аналитики.',
      uz: 'Sun\'iy intellekt bizneslar ishlash usulini o\'zgartirmoqda. Biz sizga mavjud tizimlar va ish jarayonlaringizga AI imkoniyatlarini integratsiya qilishda yordam beramiz.',
    },
    icon: 'ai',
    features: {
      en: [
        'AI-powered chatbots',
        'Natural language processing',
        'Document analysis and extraction',
        'Predictive analytics',
        'Image and voice recognition',
        'Custom AI model training',
      ],
      ru: [
        'Чат-боты на базе ИИ',
        'Обработка естественного языка',
        'Анализ и извлечение данных из документов',
        'Предиктивная аналитика',
        'Распознавание изображений и голоса',
        'Обучение кастомных моделей ИИ',
      ],
      uz: [
        'AI-quvvatli chatbotlar',
        'Tabiiy tilni qayta ishlash',
        'Hujjatlarni tahlil qilish va ajratib olish',
        'Bashoratli tahlil',
        'Tasvir va ovozni tanib olish',
        'Maxsus AI modellarini o\'qitish',
      ],
    },
    benefits: {
      en: [
        'Automate complex tasks',
        'Make data-driven decisions',
        'Enhance customer experiences',
        'Reduce operational costs',
      ],
      ru: [
        'Автоматизация сложных задач',
        'Принятие решений на основе данных',
        'Улучшение клиентского опыта',
        'Снижение операционных расходов',
      ],
      uz: [
        'Murakkab vazifalarni avtomatlashtiring',
        'Ma\'lumotlarga asoslangan qarorlar qabul qiling',
        'Mijozlar tajribasini yaxshilang',
        'Operatsion xarajatlarni kamaytiring',
      ],
    },
    technologies: ['OpenAI', 'LangChain', 'Python', 'TensorFlow', 'Hugging Face', 'Groq'],
    relatedProjects: ['memomind'],
    order: 6,
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
