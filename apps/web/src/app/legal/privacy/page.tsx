'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { siteConfig } from '@/config/site';

const content = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: January 2025',
    sections: [
      {
        heading: 'Introduction',
        body: `${siteConfig.name} ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.`,
      },
      {
        heading: 'Information We Collect',
        body: 'We may collect information about you in various ways:',
        list: [
          'Personal data you voluntarily provide through our contact forms',
          'Usage data collected automatically when you visit our website',
          'Technical information such as browser type and IP address',
        ],
      },
      {
        heading: 'How We Use Your Information',
        body: 'We use the information we collect to:',
        list: [
          'Respond to your inquiries and provide customer support',
          'Improve our website and services',
          'Send you relevant communications about our services',
          'Analyze usage patterns to enhance user experience',
        ],
      },
      {
        heading: 'Data Security',
        body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
      },
      {
        heading: 'Third-Party Services',
        body: 'We may use third-party services such as analytics providers that collect, monitor, and analyze website traffic. These services have their own privacy policies addressing how they use such information.',
      },
      {
        heading: 'Your Rights',
        body: 'You have the right to:',
        list: [
          'Access the personal information we hold about you',
          'Request correction of inaccurate information',
          'Request deletion of your personal information',
          'Opt out of marketing communications',
        ],
      },
      {
        heading: 'Contact Us',
        body: 'If you have any questions about this Privacy Policy, please contact us.',
        isContact: true,
      },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности',
    lastUpdated: 'Последнее обновление: январь 2025',
    sections: [
      {
        heading: 'Введение',
        body: `${siteConfig.name} («мы», «наш» или «нас») обязуется защищать вашу конфиденциальность. Настоящая Политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию при посещении нашего сайта или использовании наших услуг.`,
      },
      {
        heading: 'Какую информацию мы собираем',
        body: 'Мы можем собирать информацию о вас различными способами:',
        list: [
          'Персональные данные, которые вы добровольно предоставляете через контактные формы',
          'Данные об использовании, собираемые автоматически при посещении нашего сайта',
          'Техническая информация, такая как тип браузера и IP-адрес',
        ],
      },
      {
        heading: 'Как мы используем вашу информацию',
        body: 'Мы используем собранную информацию для:',
        list: [
          'Ответа на ваши запросы и предоставления поддержки',
          'Улучшения нашего сайта и услуг',
          'Отправки актуальных сообщений о наших услугах',
          'Анализа моделей использования для улучшения пользовательского опыта',
        ],
      },
      {
        heading: 'Безопасность данных',
        body: 'Мы применяем соответствующие технические и организационные меры для защиты вашей персональной информации от несанкционированного доступа, изменения, раскрытия или уничтожения.',
      },
      {
        heading: 'Сторонние сервисы',
        body: 'Мы можем использовать сторонние сервисы, такие как аналитические провайдеры, которые собирают, отслеживают и анализируют трафик сайта. У этих сервисов есть собственные политики конфиденциальности.',
      },
      {
        heading: 'Ваши права',
        body: 'Вы имеете право:',
        list: [
          'Получить доступ к хранящейся у нас персональной информации',
          'Запросить исправление неточной информации',
          'Запросить удаление вашей персональной информации',
          'Отказаться от маркетинговых рассылок',
        ],
      },
      {
        heading: 'Связаться с нами',
        body: 'Если у вас есть вопросы по данной Политике конфиденциальности, свяжитесь с нами.',
        isContact: true,
      },
    ],
  },
  uz: {
    title: 'Maxfiylik siyosati',
    lastUpdated: 'Oxirgi yangilanish: 2025-yil yanvar',
    sections: [
      {
        heading: 'Kirish',
        body: `${siteConfig.name} ("biz") sizning maxfiyligingizni himoya qilishga sodiqmiz. Ushbu Maxfiylik siyosati veb-saytimizga tashrif buyurganingizda yoki xizmatlarimizdan foydalanganingizda ma'lumotlaringizni qanday yig'ishimiz, ishlatishimiz va himoya qilishimizni tushuntiradi.`,
      },
      {
        heading: 'Qanday ma\'lumot yig\'amiz',
        body: 'Biz siz haqingizda turli yo\'llar bilan ma\'lumot yig\'ishimiz mumkin:',
        list: [
          'Aloqa formlari orqali ixtiyoriy ravishda taqdim etgan shaxsiy ma\'lumotlar',
          'Veb-saytimizga tashrif buyurganingizda avtomatik ravishda yig\'ilgan foydalanish ma\'lumotlari',
          'Brauzer turi va IP-manzil kabi texnik ma\'lumotlar',
        ],
      },
      {
        heading: 'Ma\'lumotlaringizni qanday ishlatamiz',
        body: 'Yig\'ilgan ma\'lumotlarni quyidagi maqsadlarda ishlatamiz:',
        list: [
          'So\'rovlaringizga javob berish va mijozlarni qo\'llab-quvvatlash',
          'Veb-sayt va xizmatlarimizni yaxshilash',
          'Xizmatlarimiz haqida tegishli xabarlar yuborish',
          'Foydalanuvchi tajribasini yaxshilash uchun foydalanish modellarini tahlil qilish',
        ],
      },
      {
        heading: 'Ma\'lumotlar xavfsizligi',
        body: 'Biz shaxsiy ma\'lumotlaringizni ruxsatsiz kirish, o\'zgartirish, oshkor qilish yoki yo\'q qilishdan himoya qilish uchun tegishli texnik va tashkiliy choralarni qo\'llaymiz.',
      },
      {
        heading: 'Uchinchi tomon xizmatlari',
        body: 'Biz veb-sayt trafigini yig\'adigan, kuzatadigan va tahlil qiladigan analitika provayderlari kabi uchinchi tomon xizmatlaridan foydalanishimiz mumkin. Ushbu xizmatlarning o\'z maxfiylik siyosatlari mavjud.',
      },
      {
        heading: 'Sizning huquqlaringiz',
        body: 'Sizda quyidagi huquqlar mavjud:',
        list: [
          'Biz saqlayotgan shaxsiy ma\'lumotlaringizga kirish',
          'Noto\'g\'ri ma\'lumotlarni tuzatishni so\'rash',
          'Shaxsiy ma\'lumotlaringizni o\'chirishni so\'rash',
          'Marketing xabarlaridan voz kechish',
        ],
      },
      {
        heading: 'Biz bilan bog\'lanish',
        body: 'Agar ushbu Maxfiylik siyosati bo\'yicha savollaringiz bo\'lsa, biz bilan bog\'laning.',
        isContact: true,
      },
    ],
  },
};

export default function PrivacyPage() {
  const { locale, t } = useLocale();
  const c = content[locale] || content.en;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
        >
          &larr; {t.common.backToHome}
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="gradient-text">{c.title}</span>
        </h1>

        <p className="text-gray-500 mb-8">{c.lastUpdated}</p>

        <div className="prose prose-gray max-w-none">
          {c.sections.map((section, i) => (
            <section key={i} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.heading}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {section.body}
                {section.isContact && (
                  <>
                    {' '}
                    <a href="/contact" className="text-indigo-600 hover:underline">
                      {t.common.contactUs}
                    </a>.
                  </>
                )}
              </p>
              {section.list && (
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  {section.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
