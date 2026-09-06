import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'memomind',
    title: {
      en: 'MemoMind — voice notes that write themselves up',
      ru: 'MemoMind — голосовые заметки с расшифровкой',
      uz: 'MemoMind — matnga aylanadigan ovozli eslatmalar',
    },
    category: 'ai',
    description: {
      en: 'A voice notes app: you speak, and the transcript, a short summary and a list of tasks appear on their own. For people who think out loud on the move.',
      ru: 'Приложение для голосовых заметок: наговорили — а расшифровка, краткое содержание и список задач появляются сами. Для тех, кто думает вслух на ходу.',
      uz: "Ovozli eslatmalar uchun ilova: siz gapirasiz, matn, qisqacha mazmun va vazifalar ro'yxati o'zi paydo bo'ladi. Yurib turib ovoz chiqarib o'ylaydiganlar uchun.",
    },
    challenge: {
      en: 'Recording a note is easy; coming back to it is not — to remember what was in it you have to listen to the whole thing again. The job was to pull out what matters without sending the recording anywhere.',
      ru: 'Наговорить заметку легко, а вернуться к ней трудно: чтобы вспомнить, о чём была запись, её нужно переслушать целиком. Нужно было доставать из записи главное, не отправляя её никуда наружу.',
      uz: "Eslatmani aytib qo'yish oson, unga qaytish esa qiyin: nima haqida ekanini eslash uchun butun yozuvni qayta eshitish kerak. Vazifa — yozuvni tashqariga chiqarmasdan, undagi eng muhimini ajratib olish edi.",
    },
    solution: {
      en: 'We built an iPhone app that turns the recording into text, writes a summary of the length you want, pulls out the key points and the tasks, and files each note by topic.',
      ru: 'Сделали приложение для iPhone: оно превращает запись в текст, пишет краткое содержание нужной длины, вытаскивает ключевые мысли и задачи и само раскладывает заметки по темам.',
      uz: "iPhone uchun ilova qildik: u yozuvni matnga aylantiradi, kerakli uzunlikda qisqacha mazmun yozadi, asosiy fikr va vazifalarni ajratadi va eslatmani mavzu bo'yicha joylashtiradi.",
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
      en: '4Event — event equipment rental',
      ru: '4Event — аренда оборудования для мероприятий',
      uz: '4Event — tadbirlar uchun jihozlar ijarasi',
    },
    category: 'ecommerce',
    description: {
      en: 'Event equipment rental in Tashkent — furniture, decor, lighting and sound. The customer picks it on the site and arranges delivery instead of phoning about each item.',
      ru: 'Аренда оборудования для мероприятий в Ташкенте: мебель, декор, свет и звук. Клиент выбирает на сайте и оформляет доставку, не созваниваясь по каждой позиции.',
      uz: "Toshkentda tadbirlar uchun jihozlar ijarasi: mebel, dekor, yorug'lik va ovoz. Mijoz saytda tanlaydi va yetkazib berishni rasmiylashtiradi, har bir buyum uchun qo'ng'iroq qilmaydi.",
    },
    challenge: {
      en: 'Orders came in by phone and messenger: the price and the free dates for each item had to be checked separately, and one order took more than one call.',
      ru: 'Заказ шёл по телефону и в переписке: цену и свободные даты по каждой позиции уточняли отдельно, и на один заказ уходил не один звонок.',
      uz: "Buyurtmalar telefon va yozishmalar orqali kelardi: har bir buyumning narxi va bo'sh sanalari alohida aniqlanardi, bitta buyurtmaga bir nechta qo'ng'iroq ketardi.",
    },
    solution: {
      en: 'We built a catalogue site: what exists, what it costs and whether it is free on your date. The customer builds the order, picks delivery across the city and pays, with the rental terms next to each item.',
      ru: 'Сделали сайт с каталогом: видно, что есть, сколько стоит и свободно ли на вашу дату. Клиент собирает заказ сам, выбирает доставку по городу и оплачивает — условия аренды написаны рядом с каждой позицией.',
      uz: "Katalogli sayt qildik: nima bor, qancha turadi va sizning sanangizda bo'shmi. Mijoz buyurtmani o'zi yig'adi, shahar bo'ylab yetkazib berishni tanlaydi va to'laydi — ijara shartlari har bir buyum yonida yozilgan.",
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
      en: 'StandAI — exhibition stand visuals in minutes',
      ru: 'StandAI — эскизы выставочных стендов за минуты',
      uz: "StandAI — daqiqalarda ko'rgazma stendi ko'rinishlari",
    },
    category: 'ai',
    description: {
      en: 'Exhibition booth design: you answer a few questions and get finished visuals of the stand in minutes.',
      ru: 'Проектирование выставочных стендов: вы отвечаете на несколько вопросов и через несколько минут получаете готовые варианты внешнего вида стенда.',
      uz: "Ko'rgazma stendlarini loyihalash: siz bir nechta savolga javob berasiz va bir necha daqiqada stendning tayyor ko'rinishlarini olasiz.",
    },
    challenge: {
      en: 'To see what a stand would look like, a company went to a design agency and waited weeks, paying separately for every extra option. By the time the pictures arrived there was little time left before the show.',
      ru: 'Чтобы увидеть, как будет выглядеть стенд, компания шла в дизайн-агентство и ждала неделями, а за каждый дополнительный вариант платила отдельно. К моменту, когда картинки были готовы, до выставки оставалось мало времени.',
      uz: "Stend qanday ko'rinishini bilish uchun kompaniya dizayn agentligiga borardi va haftalab kutardi, har bir qo'shimcha variant uchun alohida to'lardi. Rasmlar tayyor bo'lganda ko'rgazmaga oz vaqt qolardi.",
    },
    solution: {
      en: 'We built a three-step service: an assistant asks about the company, the show, the style and the budget; it then shows several versions of the stand; the chosen one comes to us and the company has a quote within a day.',
      ru: 'Сделали сервис из трёх шагов: помощник расспрашивает про компанию, выставку, желаемый стиль и бюджет; затем показывает несколько вариантов стенда; выбранный вариант уходит к нам, и в течение суток компания получает смету.',
      uz: "Uch qadamli xizmat qildik: yordamchi kompaniya, ko'rgazma, uslub va byudjet haqida so'raydi; keyin stendning bir nechta variantini ko'rsatadi; tanlangani bizga keladi va kompaniya bir kun ichida smeta oladi.",
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
      en: 'Glamora — a cosmetics shop for several brands',
      ru: 'Glamora — магазин косметики нескольких брендов',
      uz: "Glamora — bir nechta brend uchun kosmetika do'koni",
    },
    category: 'ecommerce',
    description: {
      en: 'A cosmetics shop where several brands sell in one place. Buying happens in Telegram, and each brand runs its own products and prices.',
      ru: 'Магазин косметики, где в одном месте продаются сразу несколько брендов. Покупки идут через Telegram, а каждый бренд сам ведёт свои товары и цены.',
      uz: "Bir joyda bir nechta brend sotadigan kosmetika do'koni. Xaridlar Telegram orqali ketadi, har bir brend o'z tovarlari va narxlarini o'zi yuritadi.",
    },
    challenge: {
      en: 'Cosmetics were bought through social media messages: you asked the price in one DM and whether it was in stock in another, and had nobody to return it to. Brands ran sales by hand across several accounts.',
      ru: 'Косметику покупали в переписке в соцсетях: цену спрашивали в личных сообщениях, наличие — тоже, а вернуть товар было не к кому. Брендам приходилось вести продажи вручную в нескольких аккаунтах.',
      uz: "Kosmetika ijtimoiy tarmoqlardagi yozishmalar orqali sotib olinardi: narxni shaxsiy xabarda so'rardilar, bor-yo'qligini ham, tovarni qaytarishga esa odam yo'q edi. Brendlar sotuvni bir nechta akkauntda qo'lda olib borardi.",
    },
    solution: {
      en: 'We built a shop where each brand has its own storefront: it adds the products, sets the prices and sees its own orders. The buyer searches a filtered catalogue and orders inside Telegram, without installing anything.',
      ru: 'Сделали магазин, где у каждого бренда своя витрина: он сам добавляет товары, ставит цены и видит свои заказы. Покупатель ищет по каталогу с фильтрами и оформляет заказ прямо в Telegram, ничего не устанавливая.',
      uz: "Har bir brendning o'z vitrinasi bo'lgan do'kon qildik: u tovarlarni o'zi qo'shadi, narx qo'yadi va o'z buyurtmalarini ko'radi. Xaridor filtrli katalogdan qidiradi va hech narsa o'rnatmasdan, to'g'ridan-to'g'ri Telegramda buyurtma beradi.",
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
      en: 'ClimateAsia — a system for a climate equipment business',
      ru: 'ClimateAsia — программа для климатического бизнеса',
      uz: 'ClimateAsia — iqlim jihozlari biznesi uchun dastur',
    },
    category: 'crm',
    description: {
      en: 'A system for a company that sells and installs climate equipment: stock, suppliers, orders, installer visits and after-sales service in one place.',
      ru: 'Программа для компании, которая продаёт и ставит климатическое оборудование: склад, поставщики, заказы, выезды монтажников и обслуживание после установки — в одном месте.',
      uz: "Iqlim jihozlarini sotadigan va o'rnatadigan kompaniya uchun dastur: ombor, yetkazib beruvchilar, buyurtmalar, montajchilar chiqishi va o'rnatishdan keyingi xizmat — bitta joyda.",
    },
    challenge: {
      en: 'The work ran on spreadsheets and paper: stock did not match what was on the shelf, service visits were forgotten, and working out what a particular job had earned was next to impossible.',
      ru: 'Работа велась в таблицах и на бумаге: склад не сходился с тем, что стояло на полке, визиты обслуживания забывались, а посчитать, сколько заработали на конкретном объекте, было почти невозможно.',
      uz: "Ish jadvallar va qog'ozda yuritilardi: ombor javonda turgan narsa bilan to'g'ri kelmasdi, xizmat chiqishlari unutilardi, muayyan obyektdan qancha ishlangani hisoblash esa deyarli imkonsiz edi.",
    },
    solution: {
      en: 'We built one system for the whole cycle: stock in and out, purchasing, a client record with its history, job costing, the installer schedule and warranty dates. The owner sees what is happening on one screen.',
      ru: 'Сделали одну программу на весь цикл: приход и расход по складу, закупки у поставщиков, карточка клиента с историей, расчёт стоимости объекта, график выездов и сроки гарантии. Руководитель видит на одном экране, что происходит сейчас.',
      uz: "Butun tsikl uchun bitta dastur qildik: ombor kirim-chiqimi, yetkazib beruvchilardan xarid, tarixi bilan mijoz kartochkasi, obyekt tannarxi, chiqishlar jadvali va kafolat muddatlari. Rahbar hozir nima bo'layotganini bitta ekranda ko'radi.",
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
      en: 'SportBooking — booking for sports venues',
      ru: 'SportBooking — запись на спортивные площадки',
      uz: 'SportBooking — sport maydonchalariga yozilish',
    },
    category: 'saas',
    description: {
      en: 'Online booking for sports venues — football pitches, tennis courts, pools and gyms. The owner sets prices and hours; the player books and pays in a few taps.',
      ru: 'Онлайн-бронирование спортивных площадок: футбольные поля, теннисные корты, бассейны и залы. Владелец ставит цены и часы, игрок бронирует и платит в несколько нажатий.',
      uz: "Sport maydonchalarini onlayn bron qilish: futbol maydonlari, tennis kortlari, basseynlar va zallar. Egasi narx va soatlarni belgilaydi, o'yinchi bir necha bosishda bron qiladi va to'laydi.",
    },
    challenge: {
      en: 'Venues were booked by phone and messages. The same hour was sometimes sold twice, people simply did not turn up, and a player could not find out what was free this evening without ringing round.',
      ru: 'Площадки бронировали звонками и сообщениями. Одно и то же время случайно продавали дважды, кто-то просто не приходил, а игрок не мог узнать, что свободно сегодня вечером, не обзвонив всех.',
      uz: "Maydonchalar qo'ng'iroq va xabarlar orqali bron qilinardi. Bitta vaqt tasodifan ikki marta sotilardi, ba'zilar umuman kelmasdi, o'yinchi esa hammaga qo'ng'iroq qilmasdan bugun kechqurun nima bo'shligini bila olmasdi.",
    },
    solution: {
      en: 'We built it for both sides: the owner gets a calendar, hourly prices and a view of what is being booked; the player gets city-wide search, free slots visible straight away, and booking and payment on the spot.',
      ru: 'Сделали сервис для обеих сторон: у владельца — календарь, цены по часам и видно, что бронируют; у игрока — поиск по городу, свободное время видно сразу, бронь и оплата на месте.',
      uz: "Ikkala tomon uchun xizmat qildik: egasida — kalendar, soatlik narxlar va nima bron qilinayotgani ko'rinadi; o'yinchida — shahar bo'ylab qidiruv, bo'sh vaqt darhol ko'rinadi, bron va to'lov joyida.",
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
      en: 'GiftSign — gift cards and certificates',
      ru: 'GiftSign — подарочные карты и сертификаты',
      uz: "GiftSign — sovg'a kartalari va sertifikatlar",
    },
    category: 'website',
    description: {
      en: 'An online editor for gift cards and certificates: take a template, change the text and pictures, and get a finished file or a link.',
      ru: 'Онлайн-редактор подарочных карт и сертификатов: берёте шаблон, меняете текст и картинки и получаете готовый файл или ссылку.',
      uz: "Sovg'a kartalari va sertifikatlari uchun onlayn muharrir: shablon olasiz, matn va rasmlarni o'zgartirasiz va tayyor fayl yoki havola olasiz.",
    },
    challenge: {
      en: 'To make a gift certificate with its own logo, a company had to go to a designer and wait for revisions. Foreign editors were complicated and expensive for the local market.',
      ru: 'Чтобы сделать подарочный сертификат со своим логотипом, компании нужно было идти к дизайнеру и ждать правок. Зарубежные редакторы оказывались сложными и дорогими для местного рынка.',
      uz: "O'z logotipi bilan sovg'a sertifikati qilish uchun kompaniya dizaynerga borishi va tuzatishlarni kutishi kerak edi. Xorijiy muharrirlar mahalliy bozor uchun murakkab va qimmat edi.",
    },
    solution: {
      en: 'We built an editor that runs in the browser: ready templates, your own text, logo and photos, a QR code on the card, and export in one click. You can make a single card or a batch for a company.',
      ru: 'Сделали редактор прямо в браузере: готовые шаблоны, свои тексты, логотип и фото, QR-код на карте, выгрузка в один клик. Можно сделать одну карту или сразу партию для компании.',
      uz: "To'g'ridan-to'g'ri brauzerda ishlaydigan muharrir qildik: tayyor shablonlar, o'z matningiz, logotip va rasmlar, kartadagi QR-kod, bir bosishda yuklab olish. Bitta karta yoki kompaniya uchun butun partiya qilsa bo'ladi.",
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
      en: 'WealthWise — tracking personal and business money',
      ru: 'WealthWise — учёт личных и рабочих денег',
      uz: 'WealthWise — shaxsiy va ish pullari hisobi',
    },
    category: 'saas',
    description: {
      en: 'Keeping track of personal and business money: where it went, what came in, what is left until the end of the month. In sum, with savings goals and clear reports.',
      ru: 'Учёт личных и рабочих денег: куда ушло, сколько пришло, сколько осталось до конца месяца. В сумах, с целями по накоплениям и наглядными отчётами.',
      uz: "Shaxsiy va ish pullarini hisobga olish: qayerga ketdi, qancha keldi, oy oxirigacha qancha qoldi. So'mda, jamg'arma maqsadlari va tushunarli hisobotlar bilan.",
    },
    challenge: {
      en: 'There are plenty of money apps, but they count in dollars and euros and do not know local banks. A small business owner ended up keeping everything in a spreadsheet.',
      ru: 'Приложений для учёта денег много, но они считают в долларах и евро и не знают местных банков. Владельцу небольшого дела приходилось вести всё в таблице.',
      uz: "Pul hisobi uchun ilovalar ko'p, lekin ular dollar va yevroda hisoblaydi va mahalliy banklarni bilmaydi. Kichik biznes egasi hammasini jadvalda yuritishga majbur edi.",
    },
    solution: {
      en: 'We built tracking that counts in sum and in several currencies at once: spending sorted into categories, income and balance visible, reminders when the budget is running out, and reports you can export to Excel.',
      ru: 'Сделали учёт, который считает в сумах и в нескольких валютах сразу: расходы раскладываются по статьям, видно доход и остаток, приходят напоминания, когда бюджет подходит к концу, а отчёт можно выгрузить в Excel.',
      uz: "So'mda va bir vaqtning o'zida bir nechta valyutada hisoblaydigan hisob qildik: xarajatlar moddalar bo'yicha taqsimlanadi, daromad va qoldiq ko'rinadi, byudjet tugayotganda eslatma keladi, hisobotni esa Excelga chiqarish mumkin.",
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
      en: 'AvtoBox — buying and selling cars',
      ru: 'AvtoBox — площадка для покупки и продажи машин',
      uz: 'AvtoBox — mashina sotib olish va sotish maydoni',
    },
    category: 'ecommerce',
    description: {
      en: 'A place to buy and sell cars and parts in Uzbekistan: filtered search, dealer pages, inspection reports and side-by-side comparison.',
      ru: 'Площадка для покупки и продажи машин и запчастей в Узбекистане: поиск с фильтрами, страницы автосалонов, отчёты об осмотре и сравнение вариантов.',
      uz: "O'zbekistonda mashina va ehtiyot qismlarni sotib olish va sotish maydoni: filtrli qidiruv, avtosalon sahifalari, ko'rik hisobotlari va variantlarni solishtirish.",
    },
    challenge: {
      en: "Cars were sold in Telegram groups, on classified boards and at the car market. There was nothing to compare two options against, nobody confirmed a car's condition, and you could not tell a dealer from a reseller.",
      ru: 'Машины продавали в Telegram-группах, на досках объявлений и на авторынке. Сравнить два варианта было не с чем, состояние машины никто не подтверждал, а понять, кто перед вами — салон или перекупщик — было нельзя.',
      uz: "Mashinalar Telegram guruhlarida, e'lonlar taxtalarida va avtobozorda sotilardi. Ikki variantni solishtirishga narsa yo'q edi, mashina holatini hech kim tasdiqlamasdi, oldingizda salonmi yoki qayta sotuvchimi — bilib bo'lmasdi.",
    },
    solution: {
      en: 'We built a marketplace with listings you can read: detailed car pages, search across several parameters at once, verified sellers marked as such, options compared side by side, and messaging with the seller on the site.',
      ru: 'Сделали площадку с понятными объявлениями: подробные карточки машин, поиск сразу по нескольким параметрам, проверенные продавцы с отметкой, сравнение вариантов рядом и переписка с продавцом прямо на сайте.',
      uz: "Tushunarli e'lonlarga ega maydon qildik: batafsil mashina kartochkalari, bir vaqtda bir nechta parametr bo'yicha qidiruv, belgilangan tekshirilgan sotuvchilar, variantlarni yonma-yon solishtirish va saytda sotuvchi bilan yozishish.",
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
