'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { FadeIn } from '@/components/ui/AnimatedSection';

const aboutContent = {
  en: {
    title: 'About Necto',
    description: 'Necto Automations is a one-person software studio based in Tashkent, Uzbekistan. I design, build, and ship full-stack products — from legal management systems to education platforms — with a focus on real business problems and clean, modern technology.',
    highlights: [
      { label: 'Full-Stack Development', desc: 'React, Next.js, Node.js, PostgreSQL, React Native' },
      { label: 'Product-Focused', desc: 'Building in-house SaaS products for the Uzbek market' },
      { label: 'End-to-End Delivery', desc: 'From design to deployment, I handle the entire process' },
    ],
  },
  ru: {
    title: 'О Necto',
    description: 'Necto Automations — это студия разработки ПО в Ташкенте. Я проектирую, разрабатываю и запускаю full-stack продукты — от систем управления юридической практикой до образовательных платформ — с фокусом на реальные бизнес-задачи и современные технологии.',
    highlights: [
      { label: 'Full-Stack разработка', desc: 'React, Next.js, Node.js, PostgreSQL, React Native' },
      { label: 'Продуктовый подход', desc: 'Создание SaaS-продуктов для рынка Узбекистана' },
      { label: 'Полный цикл', desc: 'От дизайна до деплоя — весь процесс в одних руках' },
    ],
  },
  uz: {
    title: 'Necto haqida',
    description: "Necto Automations — Toshkentdagi dasturiy ta'minot studiyasi. Men to'liq stack mahsulotlar — yuridik boshqaruv tizimlaridan ta'lim platformalarigacha — loyihalash, ishlab chiqish va ishga tushirish bilan shug'ullanaman.",
    highlights: [
      { label: 'Full-Stack dasturlash', desc: 'React, Next.js, Node.js, PostgreSQL, React Native' },
      { label: 'Mahsulotga yo\'naltirilgan', desc: "O'zbek bozori uchun SaaS mahsulotlar yaratish" },
      { label: "To'liq tsikl", desc: "Dizayndan deployga qadar — butun jarayon" },
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
