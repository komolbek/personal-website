import { Partner } from '@/types';

export const partners: Partner[] = [
  {
    id: 'techcorp',
    name: 'TechCorp Solutions',
    logo: '/partners/techcorp.svg',
    website: 'https://example.com/techcorp',
    description: {
      en: 'Leading technology solutions provider in Central Asia',
      ru: 'Ведущий поставщик технологических решений в Центральной Азии',
      uz: 'Markaziy Osiyodagi yetakchi texnologik yechimlar yetkazib beruvchi',
    },
    testimonial: {
      quote: {
        en: 'Necto Automations transformed our business operations with their custom CRM solution. The team was professional, responsive, and delivered exactly what we needed. Our sales team productivity increased by 40% within the first quarter.',
        ru: 'Necto Automations преобразовала наши бизнес-операции с помощью индивидуального CRM-решения. Команда была профессиональной, отзывчивой и предоставила именно то, что нам было нужно. Продуктивность нашего отдела продаж выросла на 40% в первом квартале.',
        uz: "Necto Automations maxsus CRM yechimi bilan biznes operatsiyalarimizni o'zgartirdi. Jamoa professional, tezkor va aynan bizga kerak bo'lgan narsani yetkazib berdi. Savdo jamoamiz samaradorligi birinchi chorakda 40% ga oshdi.",
      },
      author: 'Alexander Petrov',
      position: {
        en: 'CEO, TechCorp Solutions',
        ru: 'Генеральный директор, TechCorp Solutions',
        uz: 'Bosh direktor, TechCorp Solutions',
      },
      avatar: '/partners/avatars/alexander.jpg',
    },
    featured: true,
  },
  {
    id: 'greenlogistics',
    name: 'Green Logistics',
    logo: '/partners/greenlogistics.svg',
    website: 'https://example.com/greenlogistics',
    description: {
      en: 'Sustainable logistics and transportation company',
      ru: 'Компания устойчивой логистики и транспортировки',
      uz: 'Barqaror logistika va transport kompaniyasi',
    },
    testimonial: {
      quote: {
        en: 'The mobile app Necto built for our drivers and customers has revolutionized how we handle deliveries. Real-time tracking and automated notifications have significantly reduced customer complaints and improved our delivery efficiency.',
        ru: 'Мобильное приложение, которое Necto создала для наших водителей и клиентов, революционизировало нашу работу с доставками. Отслеживание в реальном времени и автоматические уведомления значительно сократили жалобы клиентов.',
        uz: "Necto bizning haydovchilar va mijozlar uchun yaratgan mobil ilova yetkazib berishimizni inqilob qildi. Real vaqtda kuzatish va avtomatik bildirishnomalar mijozlar shikoyatlarini sezilarli darajada kamaytirdi.",
      },
      author: 'Maria Ivanova',
      position: {
        en: 'Operations Director, Green Logistics',
        ru: 'Операционный директор, Green Logistics',
        uz: 'Operatsiyalar direktori, Green Logistics',
      },
      avatar: '/partners/avatars/maria.jpg',
    },
    featured: true,
  },
  {
    id: 'edutech',
    name: 'EduTech Academy',
    logo: '/partners/edutech.svg',
    website: 'https://example.com/edutech',
    description: {
      en: 'Online education platform for professional development',
      ru: 'Онлайн-платформа для профессионального образования',
      uz: 'Professional rivojlanish uchun onlayn ta\'lim platformasi',
    },
    testimonial: {
      quote: {
        en: 'Working with Necto on our e-learning platform was a fantastic experience. They understood our vision and built a scalable solution that handles thousands of concurrent users seamlessly. The AI-powered features they integrated have set us apart from competitors.',
        ru: 'Работа с Necto над нашей платформой электронного обучения была отличным опытом. Они поняли наше видение и создали масштабируемое решение, которое легко обрабатывает тысячи пользователей одновременно.',
        uz: "Necto bilan e-ta'lim platformamiz ustida ishlash ajoyib tajriba bo'ldi. Ular bizning ko'rinishimizni tushundilar va minglab foydalanuvchilarni bir vaqtda muammosiz boshqaradigan masshtablanadigan yechim yaratdilar.",
      },
      author: 'Dmitry Smirnov',
      position: {
        en: 'Founder, EduTech Academy',
        ru: 'Основатель, EduTech Academy',
        uz: 'Asoschisi, EduTech Academy',
      },
      avatar: '/partners/avatars/dmitry.jpg',
    },
    featured: true,
  },
  {
    id: 'retailplus',
    name: 'RetailPlus',
    logo: '/partners/retailplus.svg',
    website: 'https://example.com/retailplus',
    description: {
      en: 'Modern retail chain with focus on customer experience',
      ru: 'Современная розничная сеть с фокусом на клиентский опыт',
      uz: 'Mijozlar tajribasiga e\'tibor qaratgan zamonaviy chakana savdo tarmog\'i',
    },
    testimonial: {
      quote: {
        en: 'The e-commerce platform Necto developed for us handles our entire online operations flawlessly. From inventory management to payment processing, everything works perfectly. Our online sales have tripled since launch.',
        ru: 'Платформа электронной коммерции, которую Necto разработала для нас, безупречно управляет всеми нашими онлайн-операциями. От управления запасами до обработки платежей — всё работает идеально.',
        uz: "Necto biz uchun ishlab chiqqan elektron tijorat platformasi barcha onlayn operatsiyalarimizni mukammal boshqaradi. Inventar boshqaruvidan to'lovlarni qayta ishlashgacha — hammasi mukammal ishlaydi.",
      },
      author: 'Elena Kuznetsova',
      position: {
        en: 'Digital Director, RetailPlus',
        ru: 'Директор по цифровизации, RetailPlus',
        uz: 'Raqamli direktor, RetailPlus',
      },
      avatar: '/partners/avatars/elena.jpg',
    },
    featured: true,
  },
  {
    id: 'financegroup',
    name: 'Finance Group',
    logo: '/partners/financegroup.svg',
    website: 'https://example.com/financegroup',
    description: {
      en: 'Financial services and consulting firm',
      ru: 'Финансовые услуги и консалтинговая фирма',
      uz: 'Moliyaviy xizmatlar va konsalting firmasi',
    },
    featured: false,
  },
  {
    id: 'healthtech',
    name: 'HealthTech Solutions',
    logo: '/partners/healthtech.svg',
    website: 'https://example.com/healthtech',
    description: {
      en: 'Healthcare technology and digital health solutions',
      ru: 'Технологии здравоохранения и цифровые решения для здоровья',
      uz: 'Sog\'liqni saqlash texnologiyalari va raqamli sog\'liq yechimlari',
    },
    featured: false,
  },
];

export function getPartnerById(id: string): Partner | undefined {
  return partners.find((p) => p.id === id);
}

export function getFeaturedPartners(): Partner[] {
  return partners.filter((p) => p.featured);
}

export function getPartnersWithTestimonials(): Partner[] {
  return partners.filter((p) => p.testimonial);
}
