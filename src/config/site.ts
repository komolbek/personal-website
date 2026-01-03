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
  // Add more apps as you publish them
];

export function getAppById(id: string): App | undefined {
  return apps.find(app => app.id === id);
}
