'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/hooks/useLocale';
import { Solution } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircleIcon, ArrowRightIcon, ExternalLinkIcon } from '@/components/ui/Icons';

export function GenericProductDetail({ solution }: { solution: Solution }) {
  const { locale, t } = useLocale();

  const backText =
    (t.solutions as Record<string, unknown>).backToProducts as string | undefined ??
    t.solutions.backToSolutions;

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
          href="/portfolio"
          className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors"
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
            {/* Icon */}
            {solution.icon && (
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6">
                <span className="text-4xl">{solution.icon}</span>
              </div>
            )}

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              {solution.title[locale]}
            </h1>
            <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto leading-relaxed mb-10">
              {solution.shortDescription[locale]}
            </p>

            {/* Links */}
            {solution.links && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {solution.links.website && (
                  <a
                    href={solution.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-indigo-900 font-semibold rounded-full px-8 py-4 text-lg hover:bg-indigo-50 transition-colors shadow-lg shadow-black/20"
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                    {locale === 'ru' ? 'Посетить сайт' : locale === 'uz' ? 'Saytga o\'tish' : 'Visit Website'}
                  </a>
                )}
                {solution.links.admin && (
                  <a
                    href={solution.links.admin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 font-semibold rounded-full px-8 py-4 text-lg hover:bg-white/20 transition-colors"
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                    {locale === 'ru' ? 'Админ-панель' : locale === 'uz' ? 'Admin panel' : 'Admin Panel'}
                  </a>
                )}
                {solution.links.booking && (
                  <a
                    href={solution.links.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 font-semibold rounded-full px-8 py-4 text-lg hover:bg-white/20 transition-colors"
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                    {locale === 'ru' ? 'Записаться' : locale === 'uz' ? 'Bron qilish' : 'Book Now'}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">

        {/* Full Description */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {solution.fullDescription[locale]}
            </p>
          </div>
        </section>

        {/* Images Gallery */}
        {solution.images && solution.images.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              {locale === 'ru' ? 'Скриншоты' : locale === 'uz' ? 'Skrinshotlar' : 'Screenshots'}
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
              {locale === 'ru'
                ? 'Ознакомьтесь с интерфейсом и возможностями'
                : locale === 'uz'
                  ? 'Interfeys va imkoniyatlar bilan tanishing'
                  : 'Explore the interface and capabilities'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {solution.images.map((src, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-lg border border-gray-200/30 hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={src}
                    alt={`${solution.title[locale]} screenshot ${index + 1}`}
                    width={800}
                    height={500}
                    quality={90}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Features: 2-column grid of cards */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            {t.solutions.features}
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {solution.features[locale].map((feature, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <CheckCircleIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-gray-700 leading-relaxed pt-2">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits: Large numbered cards in 2x2 grid */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
              {locale === 'ru' ? 'Стоимость' : locale === 'uz' ? 'Narxlar' : 'Pricing'}
            </h2>
            <div className="max-w-lg mx-auto">
              <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/60 shadow-xl p-8 text-center">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>

                <p className="text-xl font-semibold text-gray-900 mb-4">
                  {solution.pricing[locale]}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                >
                  {locale === 'ru' ? 'Связаться с нами' : locale === 'uz' ? 'Biz bilan bog\'lanish' : 'Get in touch'}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
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
