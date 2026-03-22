'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';

const content = {
  en: {
    title: '404',
    heading: 'Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    home: 'Go to Homepage',
    contact: 'Contact Us',
    portfolio: 'View Portfolio',
  },
  ru: {
    title: '404',
    heading: 'Страница не найдена',
    description: 'Запрашиваемая страница не существует или была перемещена.',
    home: 'На главную',
    contact: 'Связаться',
    portfolio: 'Портфолио',
  },
  uz: {
    title: '404',
    heading: 'Sahifa topilmadi',
    description: 'Siz qidirayotgan sahifa mavjud emas yoki ko\'chirilgan.',
    home: 'Bosh sahifa',
    contact: 'Bog\'lanish',
    portfolio: 'Portfolio',
  },
};

export default function NotFound() {
  const { locale } = useLocale();
  const t = content[locale] || content.en;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="text-center max-w-lg">
        <h1 className="text-[120px] sm:text-[160px] font-bold gradient-text leading-none mb-4">
          {t.title}
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          {t.heading}
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 shadow-md shadow-indigo-500/25 hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t.home}
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 font-medium rounded-full transition-all duration-300"
          >
            {t.portfolio}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 font-medium rounded-full transition-all duration-300"
          >
            {t.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}
