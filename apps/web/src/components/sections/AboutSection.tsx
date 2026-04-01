'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { FadeIn } from '@/components/ui/AnimatedSection';

const aboutContent = {
  en: {
    title: 'About Necto',
    description: 'Necto Automations is a software development studio in Tashkent with 15+ shipped products across legal tech, education, e-commerce, fintech, and logistics. We handle the full cycle — from architecture and design to deployment and ongoing support.',
    highlights: [
      { label: 'Full-Stack Expertise', desc: 'React, Next.js, NestJS, PostgreSQL, React Native, AI/ML integrations' },
      { label: '15+ Products Delivered', desc: 'CRM/ERP systems, marketplaces, SaaS platforms, and mobile apps' },
      { label: 'End-to-End Delivery', desc: 'Architecture, design, development, deployment, and long-term support' },
    ],
  },
  ru: {
    title: 'О Necto',
    description: 'Necto Automations — студия разработки ПО в Ташкенте с 15+ реализованными продуктами в сферах юриспруденции, образования, e-commerce, финтеха и логистики. Мы закрываем полный цикл — от архитектуры и дизайна до запуска и постоянной поддержки.',
    highlights: [
      { label: 'Full-Stack экспертиза', desc: 'React, Next.js, NestJS, PostgreSQL, React Native, AI/ML интеграции' },
      { label: '15+ продуктов', desc: 'CRM/ERP системы, маркетплейсы, SaaS-платформы и мобильные приложения' },
      { label: 'Полный цикл', desc: 'Архитектура, дизайн, разработка, деплой и долгосрочная поддержка' },
    ],
  },
  uz: {
    title: 'Necto haqida',
    description: "Necto Automations — Toshkentdagi dasturiy ta'minot studiyasi. Yuridik texnologiyalar, ta'lim, e-tijorat, fintech va logistika sohalarida 15+ mahsulot ishlab chiqilgan. Arxitektura va dizayndan tortib ishga tushirish va doimiy qo'llab-quvvatlashgacha to'liq tsiklni yopamiz.",
    highlights: [
      { label: 'Full-Stack tajriba', desc: 'React, Next.js, NestJS, PostgreSQL, React Native, AI/ML integratsiyalari' },
      { label: '15+ mahsulot', desc: "CRM/ERP tizimlar, marketplace'lar, SaaS platformalar va mobil ilovalar" },
      { label: "To'liq tsikl", desc: "Arxitektura, dizayn, ishlab chiqish, deploy va uzoq muddatli qo'llab-quvvatlash" },
    ],
  },
};

export function AboutSection() {
  const { locale } = useLocale();
  const content = aboutContent[locale as keyof typeof aboutContent] || aboutContent.en;

  return (
    <section id="about" className="py-24 lg:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6">
                {content.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {content.description}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25"
              >
                {locale === 'ru' ? 'Обсудить проект' : locale === 'uz' ? 'Loyihani muhokama qilish' : "Let's Work Together"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Right side - Highlights */}
            <div className="space-y-4">
              {content.highlights.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 flex items-center justify-center">
                      <span className="text-lg font-bold gradient-text">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
