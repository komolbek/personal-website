'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { Solution } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircleIcon, ArrowRightIcon, ExternalLinkIcon } from '@/components/ui/Icons';

const bookingSteps = [
  {
    number: 1,
    title: { en: 'Select Service', ru: 'Выберите услугу', uz: 'Xizmatni tanlang' },
    description: {
      en: 'Browse available services and choose the one that fits your needs.',
      ru: 'Просмотрите доступные услуги и выберите подходящую.',
      uz: 'Mavjud xizmatlarni ko\'rib chiqing va o\'zingizga mosini tanlang.',
    },
  },
  {
    number: 2,
    title: { en: 'Choose Provider', ru: 'Выберите специалиста', uz: 'Mutaxassisni tanlang' },
    description: {
      en: 'Pick your preferred service provider based on ratings and availability.',
      ru: 'Выберите предпочитаемого специалиста по рейтингу и доступности.',
      uz: 'Reyting va mavjudlik asosida mutaxassisni tanlang.',
    },
  },
  {
    number: 3,
    title: { en: 'Pick Date & Time', ru: 'Выберите дату и время', uz: 'Sana va vaqtni tanlang' },
    description: {
      en: 'Select a convenient date and time slot from the provider\'s calendar.',
      ru: 'Выберите удобную дату и время из календаря специалиста.',
      uz: 'Mutaxassis kalendaridan qulay sana va vaqtni tanlang.',
    },
  },
  {
    number: 4,
    title: { en: 'Enter Details', ru: 'Введите данные', uz: 'Ma\'lumotlarni kiriting' },
    description: {
      en: 'Fill in your contact information and any special requirements.',
      ru: 'Укажите контактные данные и особые пожелания.',
      uz: 'Aloqa ma\'lumotlaringiz va maxsus talablarni kiriting.',
    },
  },
  {
    number: 5,
    title: { en: 'Confirm Booking', ru: 'Подтвердите бронь', uz: 'Bronni tasdiqlang' },
    description: {
      en: 'Review your booking summary and confirm to receive instant confirmation.',
      ru: 'Проверьте детали бронирования и подтвердите для мгновенного уведомления.',
      uz: 'Bron tafsilotlarini tekshiring va tasdiqlang.',
    },
  },
];

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function CoinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CrosshairIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function SmartphoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const benefitIcons = [RocketIcon, CoinIcon, ChartIcon, LockIcon, BoltIcon, CrosshairIcon, SmartphoneIcon, HandshakeIcon];

const screenshotPaths = [
  '/products/ordo/screenshot-1.png',
  '/products/ordo/screenshot-2.png',
  '/products/ordo/screenshot-3.png',
  '/products/ordo/screenshot-4.png',
  '/products/ordo/screenshot-5.png',
  '/products/ordo/screenshot-6.png',
];

export function OrdoDetail({ solution }: { solution: Solution }) {
  const { locale, t } = useLocale();
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const screenshots = solution.images && solution.images.length > 0
    ? solution.images
    : screenshotPaths;

  const heroImage = solution.images?.[0] || '/products/ordo/screenshot-1.png';

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations - green/indigo theme for Ordo */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-sm text-gray-600 hover:text-emerald-600 mb-8 transition-colors group"
        >
          <span className="mr-2 transition-transform group-hover:-translate-x-1">&larr;</span>
          {t.solutions.backToSolutions}
        </Link>

        {/* ============================================ */}
        {/* HERO: Split Layout - Text Left, Screenshot Right */}
        {/* ============================================ */}
        <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
          {/* Left: Title + Description */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-emerald-700">
                Online Booking Platform
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-indigo-600 bg-clip-text text-transparent">
                {solution.title[locale]}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              {solution.fullDescription[locale]}
            </p>

            {/* Quick CTA buttons in hero */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://ordo.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/25"
              >
                ordo.uz
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
              <a
                href="https://booking.ordo.uz/hijomauzb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-all duration-300"
              >
                Booking Demo
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
              <a
                href="https://admin.ordo.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-all duration-300"
              >
                Admin Panel
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Hero Screenshot */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20 border border-gray-200/50">
              <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-gray-500 bg-gray-200 rounded px-3 py-0.5">
                    booking.ordo.uz
                  </span>
                </div>
              </div>
              <Image
                src={heroImage}
                alt={solution.title[locale]}
                width={800}
                height={500}
                quality={95}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            {/* Decorative floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-indigo-500/15 rounded-full blur-xl" />
          </div>
        </section>

        {/* ============================================ */}
        {/* SCREENSHOT GALLERY: Horizontal Scrollable Row */}
        {/* ============================================ */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {locale === 'en' ? 'Platform Screenshots' : locale === 'ru' ? 'Скриншоты платформы' : 'Platforma skrinshoti'}
            </h2>
            <p className="text-gray-600">
              {locale === 'en' ? 'Explore the interface and user experience' : locale === 'ru' ? 'Ознакомьтесь с интерфейсом и пользовательским опытом' : 'Interfeys va foydalanuvchi tajribasini ko\'ring'}
            </p>
          </div>

          {/* Active screenshot preview */}
          <div className="mb-6 rounded-2xl overflow-hidden shadow-xl border border-gray-200/50 max-w-4xl mx-auto">
            <Image
              src={screenshots[activeScreenshot] || screenshots[0]}
              alt={`${solution.title[locale]} screenshot ${activeScreenshot + 1}`}
              width={1200}
              height={700}
              quality={90}
              sizes="(max-width: 1024px) 100vw, 896px"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Scrollable thumbnail row */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300">
            {screenshots.map((src, index) => (
              <button
                key={index}
                onClick={() => setActiveScreenshot(index)}
                className={`flex-shrink-0 rounded-xl overflow-hidden shadow-md border-2 transition-all duration-300 hover:scale-105 ${
                  activeScreenshot === index
                    ? 'border-emerald-500 shadow-emerald-500/25 ring-2 ring-emerald-500/30'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <Image
                  src={src}
                  alt={`Screenshot ${index + 1}`}
                  width={300}
                  height={180}
                  quality={80}
                  className="w-48 h-28 object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* BOOKING FLOW: Vertical Timeline Steps */}
        {/* ============================================ */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {locale === 'en' ? 'Booking Flow' : locale === 'ru' ? 'Процесс бронирования' : 'Bron qilish jarayoni'}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {locale === 'en'
                ? 'A seamless 5-step process from service selection to confirmed booking'
                : locale === 'ru'
                  ? 'Простой 5-шаговый процесс от выбора услуги до подтверждения брони'
                  : 'Xizmat tanlashdan bron tasdiqlashgacha 5 bosqichli jarayon'}
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative">
            {/* Vertical connecting line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-400 to-indigo-500" />

            <div className="space-y-2">
              {bookingSteps.map((step, index) => (
                <div key={step.number} className="relative flex items-start gap-6 group">
                  {/* Step number circle */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">{step.number}</span>
                  </div>

                  {/* Step content */}
                  <div className="flex-1 pb-8 pt-2">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-emerald-300">
                      <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                        {step.title[locale]}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description[locale]}
                      </p>
                    </div>

                    {/* Arrow connector between steps */}
                    {index < bookingSteps.length - 1 && (
                      <div className="flex justify-center mt-2">
                        <ArrowRightIcon className="w-5 h-5 text-emerald-400 rotate-90" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* FEATURES: Alternating Zigzag Layout */}
        {/* ============================================ */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t.solutions.features}
            </h2>
          </div>

          <div className="space-y-6">
            {solution.features[locale].map((feature, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-6 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Icon side */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 flex items-center justify-center border border-emerald-200/50">
                    <CheckCircleIcon className="w-7 h-7 text-emerald-600" />
                  </div>

                  {/* Text side */}
                  <div
                    className={`flex-1 p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                      isEven ? 'text-left' : 'text-right'
                    }`}
                  >
                    <span className="text-gray-800 font-medium">
                      {feature}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================ */}
        {/* BENEFITS: Horizontal Scrolling Cards */}
        {/* ============================================ */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t.solutions.benefits}
            </h2>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 -mx-4 px-4">
            {solution.benefits[locale].map((benefit, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {(() => { const BenefitIcon = benefitIcons[index % benefitIcons.length]; return <BenefitIcon className="w-8 h-8 text-emerald-600" />; })()}
                </div>
                <p className="text-gray-800 font-medium leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* TECH STACK: Badges */}
        {/* ============================================ */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {t.solutions.technologies}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {solution.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="success"
                size="md"
                className="px-4 py-2 text-sm"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* CTA BUTTONS: Try Demo + Admin Panel */}
        {/* ============================================ */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-emerald-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-emerald-200/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {locale === 'en' ? 'Experience Ordo Today' : locale === 'ru' ? 'Попробуйте Ordo сегодня' : 'Ordo\'ni bugun sinab ko\'ring'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {locale === 'en'
                    ? 'See the booking platform in action with our live demo, or explore the admin panel to manage services and appointments.'
                    : locale === 'ru'
                      ? 'Посмотрите платформу бронирования в действии или изучите админ-панель для управления услугами и записями.'
                      : 'Jonli demo orqali bron platformasini ko\'ring yoki xizmatlar va uchrashuvlarni boshqarish uchun admin panelni o\'rganing.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                <a
                  href="https://booking.ordo.uz/hijomauzb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
                >
                  Try Booking Demo
                  <ExternalLinkIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://admin.ordo.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-indigo-500 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Admin Panel
                  <ExternalLinkIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* BOTTOM CTA: Contact Section */}
        {/* ============================================ */}
        <section>
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-indigo-600 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 w-32 h-32 border-2 border-white rounded-full" />
              <div className="absolute bottom-4 right-12 w-24 h-24 border-2 border-white rounded-full" />
              <div className="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-white rounded-full" />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t.solutions.cta}
              </h2>
              <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
                {locale === 'en'
                  ? 'Let us help you set up your own online booking system tailored to your business needs.'
                  : locale === 'ru'
                    ? 'Позвольте нам помочь вам настроить онлайн-систему бронирования для вашего бизнеса.'
                    : 'Biznesingiz uchun onlayn bron tizimini sozlashda yordam beramiz.'}
              </p>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-100 shadow-xl"
              >
                {t.solutions.ctaButton}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
