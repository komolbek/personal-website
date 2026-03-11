'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/hooks/useLocale';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

interface FAQ {
  question: { en: string; ru: string; uz: string };
  answer: { en: string; ru: string; uz: string };
}

const faqs: FAQ[] = [
  {
    question: {
      en: 'How long does it take to develop a custom system?',
      ru: 'Сколько времени занимает разработка системы?',
      uz: 'Maxsus tizim ishlab chiqish qancha vaqt oladi?',
    },
    answer: {
      en: 'Typical projects take 4-12 weeks depending on complexity. A simple booking platform or landing page can be ready in 4-6 weeks, while a full CRM or management system takes 8-12 weeks. We provide a detailed timeline after the initial consultation.',
      ru: 'Типичные проекты занимают 4-12 недель в зависимости от сложности. Простая платформа бронирования или лендинг может быть готова за 4-6 недель, а полноценная CRM или система управления — за 8-12 недель. Мы предоставляем подробный график после первой консультации.',
      uz: 'Oddiy loyihalar murakkabligiga qarab 4-12 hafta davom etadi. Oddiy bron qilish platformasi 4-6 haftada tayyor bo\'lishi mumkin, to\'liq CRM yoki boshqaruv tizimi esa 8-12 hafta davom etadi.',
    },
  },
  {
    question: {
      en: 'Do you offer ongoing support after launch?',
      ru: 'Вы предоставляете поддержку после запуска?',
      uz: 'Ishga tushirilgandan keyin qo\'llab-quvvatlash bormi?',
    },
    answer: {
      en: 'Yes! All our products include ongoing technical support, regular updates, and bug fixes. We also offer extended maintenance plans for hosting, monitoring, and feature additions as your business grows.',
      ru: 'Да! Все наши продукты включают постоянную техническую поддержку, регулярные обновления и исправления. Мы также предлагаем расширенные планы обслуживания: хостинг, мониторинг и добавление функций по мере роста вашего бизнеса.',
      uz: 'Ha! Barcha mahsulotlarimiz doimiy texnik yordam, muntazam yangilanishlar va tuzatishlarni o\'z ichiga oladi. Shuningdek, biznesingiz o\'sishi bilan kengaytirilgan xizmat ko\'rsatish rejalarini taklif qilamiz.',
    },
  },
  {
    question: {
      en: 'What is the cost of your services?',
      ru: 'Сколько стоят ваши услуги?',
      uz: 'Xizmatlaringiz narxi qancha?',
    },
    answer: {
      en: 'Our SaaS products start from 4,200,000 UZS/month (~$336). Custom development projects are quoted individually based on scope and complexity. We offer a free initial consultation to understand your needs and provide an accurate estimate.',
      ru: 'Наши SaaS-продукты начинаются от 4 200 000 сум/месяц. Стоимость заказной разработки рассчитывается индивидуально в зависимости от объёма и сложности. Мы предлагаем бесплатную первую консультацию для оценки ваших потребностей.',
      uz: 'SaaS mahsulotlarimiz oyiga 4 200 000 so\'mdan boshlanadi. Buyurtma ishlab chiqish loyihalari ko\'lami va murakkabligiga qarab alohida baholanadi. Ehtiyojlaringizni baholash uchun bepul birinchi maslahat taklif qilamiz.',
    },
  },
  {
    question: {
      en: 'Can you integrate AI into my existing system?',
      ru: 'Можете ли вы интегрировать ИИ в мою систему?',
      uz: 'Mavjud tizimimga AI integratsiya qila olasizmi?',
    },
    answer: {
      en: 'Absolutely. We specialize in adding AI capabilities to existing systems — from chatbots and automated document processing to intelligent analytics and recommendation engines. We assess your current tech stack and propose the most effective integration approach.',
      ru: 'Безусловно. Мы специализируемся на добавлении AI-возможностей в существующие системы — от чат-ботов и автоматической обработки документов до интеллектуальной аналитики и рекомендательных систем. Мы оценим ваш текущий стек и предложим оптимальный подход интеграции.',
      uz: 'Albatta. Biz mavjud tizimlarga AI imkoniyatlarini qo\'shishga ixtisoslashganmiz — chatbotlar va avtomatik hujjat ishlashdan tortib intellektual tahlil va tavsiya tizimlarigacha. Joriy texnologik stekinigzni baholaymiz va eng samarali integratsiya yondashuvini taklif qilamiz.',
    },
  },
  {
    question: {
      en: 'Do you work with clients outside Uzbekistan?',
      ru: 'Вы работаете с клиентами за пределами Узбекистана?',
      uz: 'O\'zbekiston tashqarisidagi mijozlar bilan ishlaysizmi?',
    },
    answer: {
      en: 'Yes, we work with clients worldwide. Our team communicates fluently in English, Russian, and Uzbek. We use modern project management tools and conduct regular video calls to ensure smooth collaboration regardless of location.',
      ru: 'Да, мы работаем с клиентами по всему миру. Наша команда свободно общается на английском, русском и узбекском языках. Мы используем современные инструменты управления проектами и проводим регулярные видеозвонки для эффективного сотрудничества.',
      uz: 'Ha, biz butun dunyo bo\'ylab mijozlar bilan ishlaymiz. Jamoamiz ingliz, rus va o\'zbek tillarida erkin muloqot qiladi. Samarali hamkorlik uchun zamonaviy loyiha boshqaruv vositalaridan foydalanamiz.',
    },
  },
];

export function FAQSection() {
  const { locale } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const sectionTitle = locale === 'ru'
    ? 'Часто задаваемые вопросы'
    : locale === 'uz'
      ? 'Ko\'p beriladigan savollar'
      : 'Frequently Asked Questions';

  const sectionSubtitle = locale === 'ru'
    ? 'Ответы на популярные вопросы о наших услугах'
    : locale === 'uz'
      ? 'Xizmatlarimiz haqida ko\'p beriladigan savollarga javoblar'
      : 'Answers to common questions about our services';

  return (
    <section className="py-24 lg:py-32 px-4 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4">
              {sectionTitle}
            </h2>
            <p className="text-gray-600 text-lg">
              {sectionSubtitle}
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="space-y-3">
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
              <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-md">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-button-${i}`}
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question[locale]}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed" lang={locale}>
                        {faq.answer[locale]}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
