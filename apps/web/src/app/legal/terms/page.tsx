'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { siteConfig } from '@/config/site';

const content = {
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: January 2025',
    sections: [
      {
        heading: 'Agreement to Terms',
        body: `By accessing or using the services provided by ${siteConfig.name}, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.`,
      },
      {
        heading: 'Services',
        body: `${siteConfig.name} provides software development services including but not limited to: business automation, custom CRM development, website development, e-commerce solutions, mobile application development, and AI integration services.`,
      },
      {
        heading: 'Intellectual Property',
        body: `All content, features, and functionality on our website are owned by ${siteConfig.name} and are protected by international copyright, trademark, and other intellectual property laws. Upon full payment, clients receive ownership of custom-developed solutions as specified in individual project agreements.`,
      },
      {
        heading: 'Project Agreements',
        body: 'Individual projects are governed by separate project agreements that specify:',
        list: [
          'Scope of work and deliverables',
          'Timeline and milestones',
          'Payment terms and conditions',
          'Intellectual property rights',
          'Confidentiality requirements',
        ],
      },
      {
        heading: 'Limitation of Liability',
        body: `${siteConfig.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid for the specific services in question.`,
      },
      {
        heading: 'Confidentiality',
        body: 'We treat all client information and project details as confidential. We will not disclose any confidential information to third parties without your explicit consent, except as required by law.',
      },
      {
        heading: 'Modifications',
        body: 'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any modifications indicates your acceptance of the updated terms.',
      },
      {
        heading: 'Governing Law',
        body: 'These Terms of Service shall be governed by and construed in accordance with the laws of Uzbekistan, without regard to its conflict of law provisions.',
      },
      {
        heading: 'Contact Us',
        body: 'If you have any questions about these Terms of Service, please contact us.',
        isContact: true,
      },
    ],
  },
  ru: {
    title: 'Условия использования',
    lastUpdated: 'Последнее обновление: январь 2025',
    sections: [
      {
        heading: 'Согласие с условиями',
        body: `Получая доступ к услугам ${siteConfig.name} или используя их, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с этими условиями, пожалуйста, не пользуйтесь нашими услугами.`,
      },
      {
        heading: 'Услуги',
        body: `${siteConfig.name} предоставляет услуги разработки программного обеспечения, включая, но не ограничиваясь: автоматизацию бизнеса, разработку CRM-систем, создание сайтов, решения для электронной коммерции, разработку мобильных приложений и интеграцию искусственного интеллекта.`,
      },
      {
        heading: 'Интеллектуальная собственность',
        body: `Весь контент, функции и функциональность нашего сайта принадлежат ${siteConfig.name} и защищены международным авторским правом. После полной оплаты клиенты получают права собственности на разработанные решения в соответствии с индивидуальными договорами.`,
      },
      {
        heading: 'Проектные соглашения',
        body: 'Отдельные проекты регулируются проектными соглашениями, в которых указаны:',
        list: [
          'Объём работ и результаты',
          'Сроки и этапы',
          'Условия оплаты',
          'Права интеллектуальной собственности',
          'Требования конфиденциальности',
        ],
      },
      {
        heading: 'Ограничение ответственности',
        body: `${siteConfig.name} не несёт ответственности за любые косвенные, случайные, специальные или штрафные убытки, возникшие в результате использования наших услуг. Наша общая ответственность не превышает сумму, уплаченную за конкретные услуги.`,
      },
      {
        heading: 'Конфиденциальность',
        body: 'Мы относимся к информации клиентов и деталям проектов как к конфиденциальным. Мы не раскрываем конфиденциальную информацию третьим лицам без вашего явного согласия, за исключением случаев, предусмотренных законом.',
      },
      {
        heading: 'Изменения',
        body: 'Мы оставляем за собой право изменять настоящие Условия в любое время. Изменения вступают в силу сразу после публикации на нашем сайте. Продолжение использования наших услуг после внесения изменений означает ваше согласие с обновлёнными условиями.',
      },
      {
        heading: 'Применимое право',
        body: 'Настоящие Условия использования регулируются и толкуются в соответствии с законодательством Республики Узбекистан.',
      },
      {
        heading: 'Связаться с нами',
        body: 'Если у вас есть вопросы по данным Условиям использования, свяжитесь с нами.',
        isContact: true,
      },
    ],
  },
  uz: {
    title: 'Foydalanish shartlari',
    lastUpdated: 'Oxirgi yangilanish: 2025-yil yanvar',
    sections: [
      {
        heading: 'Shartlarga rozilik',
        body: `${siteConfig.name} tomonidan taqdim etilgan xizmatlarga kirish yoki ulardan foydalanish orqali siz ushbu Foydalanish shartlariga rozilik bildirasiz. Agar siz ushbu shartlarga rozi bo'lmasangiz, iltimos, xizmatlarimizdan foydalanmang.`,
      },
      {
        heading: 'Xizmatlar',
        body: `${siteConfig.name} dasturiy ta'minot ishlab chiqish xizmatlarini taqdim etadi, jumladan: biznes avtomatlashtirish, CRM tizimlarini ishlab chiqish, veb-saytlar yaratish, elektron tijorat yechimlari, mobil ilovalar ishlab chiqish va sun'iy intellekt integratsiyasi.`,
      },
      {
        heading: 'Intellektual mulk',
        body: `Veb-saytimizdagi barcha kontent, funksiyalar va imkoniyatlar ${siteConfig.name} ga tegishli va xalqaro mualliflik huquqi qonunlari bilan himoyalangan. To'liq to'lovdan so'ng mijozlar individual loyiha shartnomalari bo'yicha ishlab chiqilgan yechimlar ustidan mulk huquqini oladi.`,
      },
      {
        heading: 'Loyiha shartnomalar',
        body: 'Alohida loyihalar quyidagilarni belgilaydigan loyiha shartnomalar bilan tartibga solinadi:',
        list: [
          'Ish hajmi va natijalari',
          'Muddatlar va bosqichlar',
          'To\'lov shartlari',
          'Intellektual mulk huquqlari',
          'Maxfiylik talablari',
        ],
      },
      {
        heading: 'Javobgarlikni cheklash',
        body: `${siteConfig.name} xizmatlarimizdan foydalanish natijasida yuzaga kelgan har qanday bilvosita, tasodifiy, maxsus yoki jazo xususiyatidagi zararlar uchun javobgar emas. Bizning umumiy javobgarligimiz tegishli xizmatlar uchun to'langan summadan oshmaydi.`,
      },
      {
        heading: 'Maxfiylik',
        body: 'Biz mijozlarning barcha ma\'lumotlari va loyiha tafsilotlarini maxfiy deb hisoblaymiz. Sizning aniq roziligingizsiz maxfiy ma\'lumotlarni uchinchi tomonlarga oshkor qilmaymiz, qonun talab qilgan holatlar bundan mustasno.',
      },
      {
        heading: 'O\'zgartirishlar',
        body: 'Biz ushbu Foydalanish shartlarini istalgan vaqtda o\'zgartirish huquqini saqlab qolamiz. O\'zgartirishlar veb-saytimizda e\'lon qilinishi bilan kuchga kiradi.',
      },
      {
        heading: 'Qo\'llaniladigan qonun',
        body: 'Ushbu Foydalanish shartlari O\'zbekiston Respublikasi qonunchiligiga muvofiq tartibga solinadi va talqin qilinadi.',
      },
      {
        heading: 'Biz bilan bog\'lanish',
        body: 'Agar ushbu Foydalanish shartlari bo\'yicha savollaringiz bo\'lsa, biz bilan bog\'laning.',
        isContact: true,
      },
    ],
  },
};

export default function TermsPage() {
  const { locale, t } = useLocale();
  const c = content[locale] || content.en;

  return (
    <div className="min-h-screen pt-10 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-ink-muted hover:text-indigo-600 mb-8 transition-colors"
        >
          &larr; {t.common.backToHome}
        </Link>

        <h1 className="text-4xl font-bold text-ink mb-4">
          <span className="text-ink">{c.title}</span>
        </h1>

        <p className="text-ink-faint mb-8">{c.lastUpdated}</p>

        <div className="prose prose-gray max-w-none">
          {c.sections.map((section, i) => (
            <section key={i} className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-4">
                {section.heading}
              </h2>
              <p className="text-ink-muted leading-relaxed mb-4">
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
                <ul className="list-disc pl-6 text-ink-muted space-y-2">
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
