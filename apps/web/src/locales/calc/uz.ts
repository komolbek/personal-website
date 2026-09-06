import type { CalcText } from './types';

// O'zbekcha. Latin script, as everything else on the site uses.
//
// NEEDS A NATIVE REVIEW BEFORE PUBLICATION. This is a careful translation of
// the Russian, but the Russian was written to sound like a Tashkent business
// owner talking, and that register is exactly what a translation loses first.
// The package names in particular carry the whole §6.1 naming rule — every
// line starts with the same word and only the scope changes
// (bitta vazifa → bitta bo'lim → butun kompaniya) — so if a reviewer changes
// them, that pattern has to survive.

export const calcUz: CalcText = {
  eyebrow: 'Biznes uchun dasturlar, saytlar va ilovalar · Toshkent',
  h1: 'Bir daqiqada narxni biling',
  intro:
    "Nima yaxshi ketmayotganini belgilang — paket, narx va muddatni ko'rsatamiz. Telefon raqami kerak emas.",
  currency: "so'm",
  andWord: 'va',

  header: {
    wedge: 'Narxlar saytda. Aniq, «dan» emas',
    telegram: 'Telegramga yozish',
  },

  footer: {
    works: 'Bizning ishlarimiz',
    pricing: 'Narxlar',
    blog: 'Blog',
    about: 'Studiya haqida',
    contact: 'Aloqa',
    privacy: 'Maxfiylik siyosati',
    terms: 'Foydalanish shartlari',
    city: 'Toshkent',
    phoneLabel: 'Telefon',
  },

  q: {
    area: { t: 'Ishingizda nima eng yomon ketyapti?', hint: 'mos keladiganlarning barchasini belgilang' },
    size: { t: 'Dasturda necha kishi ishlaydi?' },
    kind: { t: 'Saytdan nima kerak?' },
    data: { t: "Ma'lumotlaringiz hozir qayerda?", hint: 'bir nechtasini tanlash mumkin' },
    addon: { t: "Nima qo'shamiz?", hint: 'bir nechtasini tanlash mumkin' },
    support: { t: 'Ishga tushgandan keyin xizmat kerakmi?', hint: 'birinchi oy allaqachon kiritilgan' },
  },

  areas: {
    zayavki: "Buyurtma va mijozlarni yo'qotyapmiz",
    sklad: "Ombor hisobi to'g'ri kelmayapti",
    raspisanie: 'Jadvalda chalkashlik',
    vyezd: "Tashqarida nima qilinayotganini ko'rmayapman",
    docs: "Hujjatlarni qo'lda kiritishga yarim kun",
    site: 'Bizni internetdan topisholmaydi',
  },
  areaShort: { zayavki: 'buyurtmalar', sklad: 'ombor', raspisanie: 'jadval' },

  sizes: {
    s: '5 kishigacha',
    m: "5–15, butun bo'lim",
    l: "15 dan ko'p, turli bo'limlar",
  },
  siteKinds: {
    land: 'Bitta sahifa',
    corp: 'Bir nechta sahifa',
    shop: "To'lovli do'kon",
  },
  dataLocations: {
    head: 'Daftarda yoki Telegramda',
    excel: 'Excelda',
    prog: 'Boshqa dasturda',
  },

  addons: {
    migr: { n: "Ma'lumotlarni ko'chirish", s: 'Exceldan yoki eski dasturdan' },
    '1c': { n: '1C bilan bog‘lash', s: "ma'lumotlar buxgalteriyaga o'zi boradi" },
    bot: { n: 'Telegramdagi bot', s: "buyurtma va holatlar to'g'ridan-to'g'ri messenjerda" },
    pay: { n: 'Karta bilan to‘lov qabul qilish', s: 'Payme, Click, Uzum' },
    train: { n: "Jamoani o'qitish", s: '2 soatlik mashg‘ulot' },
  },

  support: {
    no: "Hozircha kerak emas",
    base: 'Asosiy — {price}/oy',
    plus: "Qo'shimcha ishlar bilan — {price}/oy",
  },

  pkg: {
    task: {
      name: 'Bitta vazifa uchun dastur',
      term: '2 hafta',
      why: "Bitta ish to'liq — masalan, faqat mijozlarni yozib olish. Ikki haftadan keyin siz unda ishlab turasiz.",
      inc: [
        '**Bitta vazifa**, bitta ekran, 5 kishigacha',
        'Telefonda ham, kompyuterda ham ishlaydi',
        "Jamoani o'qitamiz, bir oy savollarga javob beramiz",
        "**Narxdan chegiramiz**, agar 3 oy ichida kattaroq paketni olsangiz",
      ],
    },
    dept: {
      name: "Bitta bo'lim uchun dastur",
      term: '4–6 hafta',
      why: "Barcha buyurtmalar bitta joyda ko'rinadi: kim qo'ng'iroq qildi, kimga qayta qo'ng'iroq qilinmadi, nima shoshilinch.",
      inc: [
        "**Buyurtma yo'qolmaydi** — har birida holat va mas'ul bor",
        "**Menejer o'zinikini, direktor hammasini ko'radi.** Ishdan ketishdan oldin bazani yuklab olisholmaydi",
        'Istalgan hisobot bitta tugma bilan Excelga chiqadi',
        "10 kishigacha, o'qitish, bir oylik xizmat",
      ],
    },
    all: {
      name: 'Butun kompaniya uchun dastur',
      term: '10–14 hafta',
      why: "Bo'limlar bir-biriga jadval yuborishni va qaysi versiya to'g'ri deb bahslashishni bas qiladi.",
      inc: [
        "**3–5 bo'lim**, hammada bir xil raqamlar",
        "**Direktor uchun bitta ekran** — hozir nima bo'layotgani",
        "Lavozimga qarab huquqlar: kim nimani ko'radi va o'zgartiradi",
        'Uch oylik xizmat kiritilgan',
      ],
    },
    mob: {
      name: 'Mobil ilova',
      term: '8–12 hafta',
      why: "Usta tashqarida ishni telefondan belgilaydi — ofisda bu o'sha daqiqada ko'rinadi.",
      inc: [
        'iPhone va Android',
        'App Store va Google Play’ga kompaniyangiz nomidan joylashtiramiz',
        "Boshqaruv sahifasi — mazmunni o'zingiz o'zgartirasiz",
        'Ikki oylik xizmat',
      ],
    },
    docs: {
      name: 'Hujjatlarni avtomatik qayta ishlash',
      term: '2–4 hafta',
      why: "Yuk xatlari va hisob-fakturalar o'zi kiritiladi. Xodim tekshiradi, terib o'tirmaydi.",
      inc: [
        "Hujjatlarni o'qiydi va ma'lumotlarni kiritadi",
        'Mijozlarning odatiy savollariga javob beradi',
        "Buyurtmalarni mavzu va mas'ullar bo'yicha saralaydi",
        'Allaqachon ishlab turgan dasturga qo‘shiladi',
      ],
    },
    land: {
      name: 'Bir sahifali sayt',
      term: '5 ish kuni',
      why: "Siz kimligingizni tushuntiradigan va buyurtmani to'g'ridan-to'g'ri Telegramga olib keladigan bitta sahifa.",
      inc: [
        'Tayyor shablon emas, siz uchun dizayn',
        "Uch til: o'zbek, rus, ingliz",
        'Buyurtma Telegramga keladi',
        'Domen va hosting bir yilga kiritilgan',
      ],
    },
    corp: {
      name: 'Kompaniya sayti',
      term: '10 ish kuni',
      why: "Xizmatlar, yangiliklar, kompaniya haqida — matnlarni bizni chaqirmasdan o'zingiz o'zgartirasiz.",
      inc: [
        '10 sahifagacha',
        "Boshqaruv sahifasi: matn va rasmlarni o'zingiz o'zgartirasiz",
        'Uch til',
        'Google sizni topishi uchun sozlamalar',
      ],
    },
    shop: {
      name: "Internet-do'kon",
      term: '15 ish kuni',
      why: "Katalog, savat va hisobdagi pul — «qanday to'lasa bo'ladi» degan qo'ng'iroqlarsiz.",
      inc: [
        'Qidiruv va filtrlar bilan katalog',
        "To'lov: Payme, Click, Uzum",
        'Buyurtmalar hisobi',
        'Tovar va narxlarni boshqarish',
      ],
    },
  },

  card: {
    emptyTitle: 'Sizning raqamingiz shu yerda paydo bo‘ladi',
    emptyHint: "Savollarga javob bering — summa shu yerda paydo bo'ladi.",
    emptyHintStarted: "Yana bitta javob — va bu yerda summa paydo bo'ladi.",
    ranges: { programs: 'Dasturlar', sites: 'Saytlar', term: 'Muddat' },
    rangeValues: {
      programs: "15–90 mln so'm",
      sites: "5–14 mln so'm",
      term: '2 haftadan',
    },
    fits: 'Sizga mos keladi',
    set: {
      '2': 'Sizga ikkita yechim mos keladi',
      '3': 'Sizga uchta yechim mos keladi',
      '4': "Sizga to'rtta yechim mos keladi",
    },
    whyTitle: 'Nega shunday',
    total: 'Jami',
    term: 'Muddat',
    termMulti: '{weeks} haftagacha',
    upfront: "Oldindan to'lov 50%",
    monthly: 'Xizmat',
    perMonth: '/oy',
    remove: '«{name}»ni olib tashlash',
    removeTitle: 'Olib tashlash',
    stageNoteBold: "Hammasi birdan bo'lishi shart emas.",
    stageNoteRest:
      "Bitta qismdan boshlab, uni ishga tushirib, qolganini keyin qo'shsa bo'ladi — har birining narxi qayd etilgan va oshmaydi.",
    ladderNote: 'yondosh variantlar',
    ladderTo: '{name} — {price}',
    cta: 'Smetani olish',
    guarantees: [
      'Bu summa shartnomaga kiradi',
      "Boshida 50%, 100% emas",
      'Kod va kirish huquqlari sizniki bo‘lib qoladi',
    ],
    autoLabel: 'javobingizga ko‘ra',
  },

  reasons: {
    threeAreas: "Uchta yo'nalish belgilandi — **{areas}**. Bu endi bitta bo'lim emas.",
    twoAll:
      "Ikkita yo'nalish — **{areas}** — va 5 kishidan ko'p. Bitta bo'lim dasturi bilan yopib bo'lmaydi.",
    twoDept:
      "Ikkita yo'nalish, lekin jamoa 5 kishigacha — **bitta dasturga sig'diramiz**.",
    oneTask: "Bitta yo'nalish (**{areas}**) va 5 kishigacha — eng kichigi yetadi.",
    oneDept: "Bitta yo'nalish (**{areas}**) butun bo'lim uchun — aynan shu paket.",
    big: "Turli bo'limlarda 15 dan ortiq kishi — **umumiy dastur kerak**.",
    mob: "Tashqaridagi ish ofisdan ko'rinmaydi — shuning uchun **alohida ilova**.",
    docs:
      "Hujjatlarni qo'lda kiritish **alohida qism** bilan olib tashlanadi, u istalgan dasturga qo'shiladi.",
    site: "Saytni **buyurtmalar pochtaga emas, darhol dasturga tushishi** uchun qo'shdik.",
    excel: "Ma'lumotlar Excelda — qo'lda kiritmaslik uchun **ko'chirishni** qo'shdik.",
    prog: "Boshqa dastur bor — **ko'chirish va 1C bilan bog'lanishni** qo'shdik.",
    head: "Ko'chiradigan narsa yo'q — **toza varaqdan boshlaymiz**, shunda bir hafta tezroq.",
  },

  dialog: {
    title: 'Smetani olish',
    lead: "Bitta aloqa qoldiring — smetani yuboramiz va uchrashuv uchun vaqt taklif qilamiz. Javob 24 soat ichida.",
    label: 'Telefon yoki Telegram',
    placeholder: '+998 __ ___ __ __  yoki  @username',
    send: 'Yuborish',
    sending: 'Yuborilmoqda…',
    sentTitle: 'Yuborildi',
    sentBody: 'Smeta bizda. 24 soat ichida javob beramiz.',
    close: 'Yopish',
    error: "Yuborilmadi. Bizga Telegramga yozing — smeta allaqachon hisoblangan.",
    tooShort: 'Javob bera olishimiz uchun telefon yoki Telegram nikini kiriting.',
  },

  mobile: {
    parts: { '2': 'Ikkita yechim', '3': 'Uchta yechim', '4': "To'rtta yechim" },
    show: "Ko'rish",
  },

  tabsHeading: "Odatda nima so'rashadi",
  tabs: {
    how: 'Qanday ishlaymiz',
    price: "To'liq narxlar",
    not: 'Nima kirmaydi',
    why: 'Nega 3 kunda emas',
  },

  panels: {
    how: {
      title: "Besh qadam — va siz doim nima bo'layotganini ko'rib turasiz",
      items: [
        "**Uchrashuv, bir soat.** Bepul. Ba'zan unda biz «bu sizga kerak emas» deymiz.",
        "**2 kunda smeta va shartnoma.** Narx va muddat qayd etiladi. Hajm o'zgarmasa — narx o'zgarmaydi.",
        "**Har hafta ko'rsatamiz.** Jarayon haqidagi hisobot emas, brauzerdagi dasturning o'zi.",
        "**Ishga tushirish va o'qitish.** Ma'lumotlarni ko'chiramiz, jamoani o'qitamiz, ikki hafta yoningizda bo'lamiz.",
        '**Topshirish.** Dastlabki kod va barcha kirish huquqlari — sizniki. Istalgan paytda ketsangiz bo‘ladi.',
      ],
    },
    price: {
      programs: 'Dasturlar',
      sites: 'Saytlar',
      addons: "Qo'shimchalar",
      support: 'Xizmat, oyiga',
      base: 'Asosiy',
      plus: "Qo'shimcha ishlar bilan",
    },
    not: {
      title: "Nima alohida to'lanadi",
      items: [
        "**Server va sayt manzili** — yiliga 500 000 so'mdan, provayderga to'g'ridan-to'g'ri to'laysiz.",
        "**Uchinchi tomon xizmatlari** — SMS-tarqatma, to'lov qabul qilish va ularning komissiyalari.",
        '**Shartnomadan keyingi yangi istaklar** — alohida va yozma ravishda hisoblaymiz.',
      ],
      budget:
        "**Agar byudjet kamroq bo'lsa** — to'g'ridan-to'g'ri ayting, bu xafa qiladigan gap emas. Ko'pincha vazifani 15 000 000 so'mlik bitta vazifa uchun dasturgacha toraytirsa bo'ladi.",
    },
    why: {
      q: "Nega sizda 6 hafta, anavi yerda esa saytni 3 kunda qilishadi-ku?",
      p1: "3 kunda tayyor sayt shablonini o'rnatishadi — biz ham shunday qilamiz, 5 kunda va 5 000 000 so'mga.",
      p2: "Bo'lim uchun dastur sizda ish aslida qanday tashkil etilganini tushunishdan boshlanadi. Bu qismni tezlashtirib bo'lmaydi — faqat o'tkazib yuborsa bo'ladi, va shunda hech kim ishlamaydigan chiroyli dastur chiqadi. Yana bir gap: Toshkentdagi «12 millionlik CRM»ning yarmi — bu birovning tayyor dasturini sozlash, uning uchun siz har oy litsenziya to'laysiz. Biz sizniki bo'lgan dasturni yozamiz, va u sizniki bo'lib qoladi.",
    },
  },

  summary: {
    heading: 'Saytdan hisob-kitob',
    total: "Jami: {sum} so'm",
    term: 'Muddat: {term}',
    monthly: 'Xizmat: {sum}/oy',
    answers: 'Javoblar:',
    areas: 'Nima eng yomon ketyapti: {v}',
    size: 'Necha kishi: {v}',
    kind: 'Saytdan nima kerak: {v}',
    data: "Ma'lumotlar hozir qayerda: {v}",
    support: 'Xizmat: {v}',
  },

  pricing: {
    h1: 'Narxlar',
    lead: "Barcha narxlar so'mda va qayd etilgan. Narx ish boshlanishidan oldin shartnomaga yoziladi: hajm o'zgarmasa — narx o'zgarmaydi. Boshida 50%, topshirishda 50%.",
    hint: 'Sizga bulardan qaysi biri mos kelishini bilmayapsizmi? ',
    hintLink: 'Bir nechta savolga javob bering',
    hintTail: ' — bir daqiqada o‘z paketingizni, summangizni va muddatingizni olasiz.',
    programsTitle: 'Kompaniya ishi uchun dasturlar',
    programsLead:
      "Ish Excel, WhatsApp va daftarda yashaganda — biz uni hamma narsa ko'rinadigan va hech narsa yo'qolmaydigan bitta dasturga ko'chiramiz.",
    sitesTitle: 'Saytlar',
    addonsTitle: "Nima qo'shish mumkin",
    addonsLead: 'Istalgan paketga yoki alohida.',
    supportTitle: 'Ishga tushgandan keyingi xizmat',
    supportLead:
      "Hammasi ishlab turishi uchun: serverni kuzatamiz, ma'lumotlardan nusxa olamiz va biror narsa buzilsa tuzatamiz. Birinchi oy (yoki paketga qarab ikki-uch oy) ishlab chiqish narxiga kiritilgan.",
    supportSite: 'Sayt uchun',
    supportSiteWhat: 'Server, kunlik nusxalar, yangilanishlar, mayda tuzatishlar',
    supportBase: 'Dastur uchun, asosiy',
    supportBaseWhat:
      'Server, kunlik nusxalar, ish kuzatuvi, xatolarni tuzatish, 1 ish kuni ichida javob',
    supportPlus: 'Dastur uchun, kengaytirilgan',
    supportPlusWhat: "Asosiydagi hammasi va oyiga 10 soat qo'shimcha ishlar",
    perMonth: '/ oy',
    notTitle: 'Narxga nima kirmaydi',
    notItems: [
      "Dasturlar uchun server va sayt manzili — yiliga 500 000 so'mdan, provayderga to'g'ridan-to'g'ri to'laysiz.",
      "Pullik uchinchi tomon xizmatlari: SMS-tarqatma, to'lov qabul qilish va ularning komissiyalari, AI’ga kirish.",
      'Shartnoma imzolangandan keyingi yangi istaklar — alohida va yozma ravishda hisoblaymiz.',
    ],
    lessTitle: "Agar byudjet kamroq bo'lsa",
    lessBody:
      "To'g'ridan-to'g'ri ayting. Ko'pincha vazifani 15 000 000 so'mlik bitta vazifa uchun dasturgacha toraytirib, keyin ko'proq sarflashdan oldin bu qanday ishlashini ko'rsa bo'ladi. Biz yaxshi qila olmaydigan loyihani olgandan ko'ra «bu bizga emas» deganimiz yaxshi.",
    cta: "O'z narxingizni hisoblang",
    colPackage: 'Paket',
    colPrice: 'Narx',
    colTerm: 'Muddat',
    captionPrograms: 'Biznes uchun dasturlar narxi',
    captionSites: 'Saytlar narxi',
  },

  works: {
    lead: "Biz rivojlantirayotgan o'z mahsulotlarimiz va mijozlar uchun qilingan dasturlar, saytlar va ilovalar.",
    productsLead: "Biz ularni o'ylab topdik, yozdik va o'zimiz yuritamiz — ular har kuni ishlab turadi.",
    projectsLead: 'Muayyan kompaniyaning vazifasi uchun qilingan.',
    open: "Ko'rish",
    stripLabel: 'Bizning mahsulotlar',
    overview: 'Mahsulot haqida',
    screenshots: "Qanday ko'rinadi",
    howItWorks: 'Qanday ishlaydi',
    categories: {
      mobile: 'Mobil ilova',
      website: 'Sayt',
      crm: 'CRM',
      ai: 'AI',
      ecommerce: "Internet-do'kon",
      event: 'Tadbirlar',
      saas: 'SaaS',
    },
  },

  contact: {
    h1: 'Bizga yozing',
    lead: "24 soat ichida javob beramiz. Narx kerak bo'lsa — ",
    leadLink: "uni bir daqiqada o'zingiz hisoblang",
    leadTail: ', bu tezroq.',
    contactLabel: 'Telefon yoki Telegram',
    contactHint: "Javob bera olishimiz uchun shuning o'zi yetarli.",
    nameLabel: 'Ismingiz',
    nameOptional: 'ixtiyoriy',
    messageLabel: 'Vazifangiz nima',
    messageOptional: 'ixtiyoriy',
    send: 'Yuborish',
    sending: 'Yuborilmoqda…',
    sentTitle: 'Yuborildi',
    sentBody: 'Xabaringizni oldik va 24 soat ichida javob beramiz.',
    errorContact: 'Javob bera olishimiz uchun telefon yoki Telegram nikini kiriting.',
    errorSend: 'Yuborilmadi. Bizga Telegramga yozing — u albatta yetib boradi.',
    orWrite: "Yoki to'g'ridan-to'g'ri:",
  },

  about: {
    h1: 'Studiya haqida',
    p1: "Necto Automations — Toshkentdagi dasturlar ishlab chiqish studiyasi. Biz kompaniya ishlaydigan dasturlarni yaratamiz: buyurtmalar, ombor, jadval, ish buyurtmalari. Shuningdek saytlar va mobil ilovalar.",
    p2: "Rus, o'zbek va ingliz tillarida ishlaymiz.",
    productsTitle: "Ishlab turgan uchta o'z mahsulotimiz",
    products: {
      yuridix: 'yuristlar uchun ishlar, mijozlar va hisoblarni yuritish',
      ordo: 'yozuv asosida ishlaydigan biznes uchun onlayn yozilish',
      talimx: "o'quv markazlari: o'quvchilar, jadval, pul",
    },
    howTitle: 'Qanday ishlaymiz',
    how: [
      'Narx va muddat ish boshlanishidan oldin shartnomada qayd etiladi.',
      "Boshida 50%, topshirishda 50% — 100% oldindan emas.",
      "Har hafta ishlar qanday ketayotgani haqidagi hisobotni emas, ishlab turgan dasturni ko'rsatamiz.",
      "Dastlabki kod va barcha kirish huquqlari sizniki bo'lib qoladi. Bizdan istalgan paytda ketsangiz bo'ladi.",
    ],
  },
};
