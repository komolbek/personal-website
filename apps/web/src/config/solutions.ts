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
      en: 'A system for law firms: cases, clients, invoices and documents in one place instead of folders and email threads.',
      ru: 'Программа для юристов: дела, клиенты, счета и документы в одном месте, а не в папках и переписке.',
      uz: 'Yuristlar uchun dastur: ishlar, mijozlar, hisoblar va hujjatlar papkalar va yozishmalarda emas, bitta joyda.',
    },
    fullDescription: {
      en: 'Yuridix is built for law firms in Uzbekistan. Every case is visible on one screen: who is running it, what is urgent this week, where the documents are. Hours are logged as the work happens and the invoice builds itself from them, so nobody has to reconstruct the month afterwards. If a new client conflicts with someone the firm already represents, it warns you before anything is signed.',
      ru: 'Yuridix — программа для юридических фирм в Узбекистане. Все дела видно на одном экране: кто ведёт, что горит на этой неделе, где лежат документы. Часы записываются по ходу работы, и счёт собирается из них сам — не нужно в конце месяца вспоминать, сколько времени ушло на клиента. Если новый клиент конфликтует с тем, кого фирма уже представляет, программа предупредит об этом до подписания.',
      uz: "Yuridix — O'zbekistondagi yuridik firmalar uchun dastur. Barcha ishlar bitta ekranda ko'rinadi: kim olib boryapti, shu haftada nima shoshilinch, hujjatlar qayerda. Soatlar ish davomida yoziladi va hisob ulardan o'zi yig'iladi — oy oxirida mijozga qancha vaqt ketganini eslash shart emas. Agar yangi mijoz firma allaqachon himoya qilayotgan odam bilan ziddiyatda bo'lsa, dastur shartnomadan oldin ogohlantiradi.",
    },
    icon: 'crm',
    features: {
      en: [
        'Dashboard analytics with real-time statistics',
        'Client management with tags and fast search',
        'Log an hour to a case in one tap',
        'Invoices built from those hours, ready to send',
        'Unified calendar with automated reminders',
        'Conflict warning before you take a client on',
        'Every document on the case, findable',
        'Who sees what, set per role',
      ],
      ru: [
        'Один экран для руководителя: что в работе и что горит',
        'Любой клиент находится по имени за секунду',
        'Час работы записывается на дело в одно нажатие',
        'Счёт собирается из этих часов и готов к отправке',
        'Общий календарь фирмы с напоминаниями',
        'Предупреждение о конфликте до того, как взяли клиента',
        'Все документы по делу, и они находятся',
        'Кто что видит и может менять',
      ],
      uz: [
        'Rahbar uchun bitta ekran: nima ishda va nima shoshilinch',
        'Har qanday mijoz ismi bo\'yicha bir soniyada topiladi',
        'Ish soati bitta bosishda ishga yoziladi',
        'Hisob shu soatlardan yig\'iladi va yuborishga tayyor',
        'Firmaning umumiy kalendari va eslatmalar',
        'Mijozni olishdan oldin ziddiyat haqida ogohlantirish',
        "Ish bo'yicha barcha hujjatlar, va ular topiladi",
        "Kim nimani ko'radi va o'zgartira oladi",
      ],
    },
    benefits: {
      en: [
        'Everything about a case in one place',
        'Invoices build themselves from logged hours',
        'Conflict warnings before anything is signed',
        'Multi-language support: Russian, Uzbek, English',
      ],
      ru: [
        'Всё по делу в одном месте',
        'Счёт собирается из записанных часов сам',
        'Предупреждение о конфликте до подписания',
        'Многоязычная поддержка: русский, узбекский, английский',
      ],
      uz: [
        'Ish bo\'yicha hamma narsa bitta joyda',
        'Hisob yozilgan soatlardan o\'zi yig\'iladi',
        'Shartnomadan oldin ziddiyat haqida ogohlantirish',
        'Ko\'p tilli qo\'llab-quvvatlash: ruscha, o\'zbekcha, inglizcha',
      ],
    },
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
    relatedProjects: [],
    order: 1,
    images: [
      '/products/yuridix/screenshot-1.png',
      '/products/yuridix/screenshot-2.png',
      '/products/yuridix/screenshot-3.png',
      '/products/yuridix/screenshot-4.png',
      '/products/yuridix/screenshot-5.png',
      '/products/yuridix/screenshot-6.png',
      '/products/yuridix/screenshot-7.png',
      '/products/yuridix/screenshot-8.png',
      '/products/yuridix/screenshot-9.png',
    ],
    links: {
      website: 'https://yuridix.uz',
      admin: 'https://admin.yuridix.uz/login',
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
      en: 'Online booking for businesses that run on appointments — salons, clinics, workshops.',
      ru: 'Онлайн-запись для бизнеса, который работает по записи: салоны, клиники, мастерские.',
      uz: 'Yozuv asosida ishlaydigan biznes uchun onlayn yozilish: sartaroshxonalar, klinikalar, ustaxonalar.',
    },
    fullDescription: {
      en: 'Ordo is booking software for salons, clinics, workshops and anyone who works by appointment. Each business gets its own booking page with its services, prices and look. The customer picks a service, a provider, a date and a time, and is confirmed straight away without a phone call. The owner sees who is booked and when, and the empty slots fill themselves.',
      ru: 'Ordo — программа онлайн-записи для салонов, клиник, мастерских и всех, кто работает по записи. У каждой компании своя страница записи с её услугами, ценами и оформлением. Клиент выбирает услугу, мастера, дату и время и получает подтверждение сразу, без звонка. Владелец видит, кто и на когда записан, а свободные окна заполняются сами.',
      uz: "Ordo — sartaroshxonalar, klinikalar, ustaxonalar va yozuv asosida ishlaydigan hamma uchun onlayn yozilish dasturi. Har bir kompaniyaning o'z xizmatlari, narxlari va ko'rinishi bilan alohida yozilish sahifasi bo'ladi. Mijoz xizmatni, ustani, sana va vaqtni tanlaydi va qo'ng'iroqsiz darhol tasdiq oladi. Egasi kim qachonga yozilganini ko'radi, bo'sh vaqtlar esa o'zi to'ladi.",
    },
    icon: 'automation',
    features: {
      en: [
        'Five-step guided booking flow',
        'Single services and packages',
        'The client picks the specialist',
        'Flexible date and time scheduling',
        'One service serving several businesses at once',
        'Custom branding for each business',
        'A management page: you change services and prices yourself',
        'Set up so Google finds your booking page',
      ],
      ru: [
        'Запись в пять простых шагов',
        'Отдельные услуги и пакеты',
        'Клиент сам выбирает мастера',
        'Гибкое расписание по датам и времени',
        'Один сервис на несколько компаний сразу',
        'Индивидуальный брендинг для каждого бизнеса',
        'Страница управления: услуги и цены меняете сами',
        'Настройки, чтобы страницу записи находил Google',
      ],
      uz: [
        'Yozilish besh oddiy qadamda',
        'Alohida xizmatlar va paketlar',
        "Mijoz ustani o'zi tanlaydi",
        'Istalgan sana va vaqtni tanlash',
        'Bir nechta kompaniyaga bitta xizmat',
        'Har bir biznes uchun individual brendlash',
        'Boshqaruv sahifasi: xizmat va narxlarni o\'zingiz o\'zgartirasiz',
        'Google yozilish sahifangizni topishi uchun sozlamalar',
      ],
    },
    benefits: {
      en: [
        'Digitize appointment scheduling instantly',
        'Reduce no-shows with confirmations',
        'Several businesses, one place to manage them',
        'Mobile-friendly for customers on the go',
      ],
      ru: [
        'Мгновенная цифровизация записей на приём',
        'Снижение неявок с помощью подтверждений',
        'Несколько компаний — одно место управления',
        'Удобно для клиентов на мобильных устройствах',
      ],
      uz: [
        'Yozuvlarni bir zumda raqamlashtiring',
        'Tasdiqlash bilan kelmagan holatlarni kamaytiring',
        'Bir nechta kompaniya — bitta boshqaruv joyi',
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
      en: 'A system for education centres: students, timetable and money in one place.',
      ru: 'Программа для учебных центров: ученики, расписание и деньги в одном месте.',
      uz: "O'quv markazlari uchun dastur: o'quvchilar, jadval va pul bitta joyda.",
    },
    fullDescription: {
      en: 'TalimX is built for education centres in Uzbekistan. Attendance is marked in one tap, payments and arrears are visible per student, and reminders reach parents on their own. The timetable will not let you put two teachers in one room, or a group into a slot that is taken. It works in a browser and on a phone, so a teacher marks the group from their phone during the lesson.',
      ru: 'TalimX — программа для учебных центров Узбекистана. Посещаемость отмечается в один клик, оплаты и долги видно по каждому ученику, а напоминания родителям уходят сами. Расписание не даст поставить двух преподавателей в один кабинет или группу на занятое время. Работает и в браузере, и в телефоне — преподаватель отмечает группу с телефона прямо на занятии.',
      uz: "TalimX — O'zbekistondagi o'quv markazlari uchun dastur. Davomat bir bosishda belgilanadi, har bir o'quvchi bo'yicha to'lovlar va qarzlar ko'rinadi, ota-onalarga eslatmalar o'zi ketadi. Jadval bitta xonaga ikkita o'qituvchini yoki band vaqtga guruhni qo'yishga yo'l qo'ymaydi. Brauzerda ham, telefonda ham ishlaydi — o'qituvchi guruhni dars paytida telefondan belgilaydi.",
    },
    icon: 'website',
    features: {
      en: [
        'Every student, their group and their history',
        'Groups and courses, with room left in each',
        'Financial control with automatic payment tracking',
        'Visual scheduling with conflict detection',
        'Attendance marked in one tap',
        'One screen for the director: groups, money, attendance',
        'A phone app, so a teacher marks the group in the room',
        'Debt management with late payment reminders',
      ],
      ru: [
        'Каждый ученик, его группа и его история',
        'Группы и курсы, и сколько мест осталось',
        'Оплаты записываются по мере поступления',
        'Расписание, которое не даст поставить двоих на одно время',
        'Посещаемость отмечается в одно нажатие',
        'Один экран для руководителя: группы, деньги, посещаемость',
        'Приложение на телефон — преподаватель отмечает группу прямо на занятии',
        'Кто сколько должен, напоминания уходят сами',
      ],
      uz: [
        "Har bir o'quvchi, uning guruhi va tarixi",
        'Guruh va kurslar, va nechta joy qolgani',
        "To'lovlar kelgan sari yoziladi",
        "Bir vaqtga ikkitasini qo'yishga yo'l qo'ymaydigan jadval",
        'Davomat bitta bosishda belgilanadi',
        'Rahbar uchun bitta ekran: guruhlar, pul, davomat',
        "Telefondagi ilova — o'qituvchi guruhni dars paytida belgilaydi",
        "Kim qancha qarzdor, eslatmalar o'zi ketadi",
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
        'Вся работа центра в одном месте',
        'Деньги и напоминания считаются сами',
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
