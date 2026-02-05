'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { Solution } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircleIcon, ArrowRightIcon, ExternalLinkIcon } from '@/components/ui/Icons';

export function YuridixDetail({ solution }: { solution: Solution }) {
  const { locale, t } = useLocale();

  const backText =
    (t.solutions as Record<string, unknown>).backToProducts as string | undefined ??
    t.solutions.backToSolutions;

  const howItWorksSteps: Record<string, { title: string; description: string }[]> = {
    en: [
      { title: 'Create Case', description: 'Open a new case file with all client details and documents' },
      { title: 'Track Time', description: 'Log billable hours with one-click time tracking' },
      { title: 'Generate Invoice', description: 'Automatically create professional invoices from tracked time' },
      { title: 'Receive Payment', description: 'Manage payments and keep financial records organized' },
    ],
    ru: [
      { title: 'Создать дело', description: 'Откройте новое дело с данными клиента и документами' },
      { title: 'Учёт времени', description: 'Фиксируйте оплачиваемые часы одним нажатием' },
      { title: 'Генерация счёта', description: 'Автоматически создавайте профессиональные счета' },
      { title: 'Получить оплату', description: 'Управляйте платежами и финансовой отчётностью' },
    ],
    uz: [
      { title: 'Ish yaratish', description: 'Mijoz ma\'lumotlari va hujjatlar bilan yangi ish oching' },
      { title: 'Vaqtni kuzatish', description: 'Bir bosish bilan haq to\'lanadigan soatlarni yozing' },
      { title: 'Hisob-faktura', description: 'Kuzatilgan vaqtdan avtomatik hisob-faktura yarating' },
      { title: 'To\'lov olish', description: 'To\'lovlarni boshqaring va moliyaviy yozuvlarni tartibda saqlang' },
    ],
  };

  const steps = howItWorksSteps[locale] || howItWorksSteps.en;

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <Link
          href="/solutions"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowRightIcon className="w-4 h-4 mr-1.5 rotate-180" />
          {backText}
        </Link>
      </div>

      {/* Hero: Full-width gradient banner */}
      <section className="relative overflow-hidden mb-20">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-indigo-200 font-medium">Legal Practice Management</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              {solution.title[locale]}
            </h1>
            <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto leading-relaxed mb-10">
              {solution.shortDescription[locale]}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://yuridix.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-indigo-900 font-semibold rounded-full px-8 py-4 text-lg hover:bg-indigo-50 transition-colors shadow-lg shadow-black/20"
              >
                <ExternalLinkIcon className="w-5 h-5" />
                {locale === 'ru' ? 'Посетить сайт' : locale === 'uz' ? 'Saytga o\'tish' : 'Visit Website'}
              </a>
              <a
                href="https://admin.yuridix.uz/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 font-semibold rounded-full px-8 py-4 text-lg hover:bg-white/20 transition-colors"
              >
                <ArrowRightIcon className="w-5 h-5" />
                {locale === 'ru' ? 'Админ-панель' : locale === 'uz' ? 'Admin panel' : 'Admin Panel'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">

        {/* Full Description */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
              {solution.fullDescription[locale]}
            </p>
          </div>
        </section>

        {/* How It Works: 4-step horizontal timeline */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {locale === 'ru' ? 'Как это работает' : locale === 'uz' ? 'Qanday ishlaydi' : 'How It Works'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-xl mx-auto">
            {locale === 'ru'
              ? 'Четыре простых шага для управления вашей юридической практикой'
              : locale === 'uz'
                ? 'Yuridik amaliyotingizni boshqarish uchun to\'rt oddiy qadam'
                : 'Four simple steps to manage your legal practice'}
          </p>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                  {/* Numbered circle */}
                  <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/30">
                    <span className="text-3xl font-bold text-white">{index + 1}</span>
                  </div>
                  {/* Arrow between steps on mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden my-2">
                      <ArrowRightIcon className="w-5 h-5 text-indigo-400 rotate-90" />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[200px]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features: 2-column grid of cards */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            {t.solutions.features}
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {solution.features[locale].map((feature, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 p-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/60 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                  <CheckCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed pt-2">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits: Large numbered cards in 2x2 grid */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            {t.solutions.benefits}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {solution.benefits[locale].map((benefit, index) => {
              const gradients = [
                'from-indigo-600/90 to-indigo-800/90',
                'from-purple-600/90 to-purple-800/90',
                'from-indigo-700/90 to-purple-700/90',
                'from-purple-700/90 to-indigo-700/90',
              ];
              return (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} p-8 shadow-lg`}
                >
                  {/* Large background number */}
                  <span className="absolute -top-4 -right-2 text-[120px] font-black text-white/10 leading-none select-none pointer-events-none">
                    {index + 1}
                  </span>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-white">{index + 1}</span>
                    </div>
                    <p className="text-lg font-semibold text-white leading-relaxed">{benefit}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tech Stack: Horizontal badge strip */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {t.solutions.technologies}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {solution.technologies.map((tech) => (
              <Badge key={tech} variant="primary" size="md">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        {solution.pricing?.[locale] && (
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">
              {locale === 'ru' ? 'Стоимость' : locale === 'uz' ? 'Narxlar' : 'Pricing'}
            </h2>
            <div className="max-w-lg mx-auto">
              <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 shadow-xl p-8 text-center">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>

                <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {solution.pricing[locale]}
                </p>

                <a
                  href="https://yuridix.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  {locale === 'ru' ? 'Начать бесплатный период' : locale === 'uz' ? 'Bepul sinov boshlash' : 'Start free trial'}
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.solutions.cta}
            </h2>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
              {locale === 'ru'
                ? 'Свяжитесь с нами для бесплатной консультации'
                : locale === 'uz'
                  ? 'Bepul maslahat uchun biz bilan bog\'laning'
                  : 'Get in touch for a free consultation'}
            </p>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="bg-white text-indigo-700 hover:bg-gray-100 shadow-lg shadow-black/20"
            >
              {t.solutions.ctaButton}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
