'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Greeting badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {t.hero.greeting}
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
          {t.hero.name}
        </h1>

        {/* Role */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-8">
          {t.hero.role}
        </h2>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/apps"
            className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              {t.hero.cta}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border-2 border-indigo-500/30 hover:border-indigo-500 text-gray-700 dark:text-gray-300 font-medium rounded-full transition-all duration-300 hover:bg-indigo-500/5"
          >
            {t.hero.contact}
          </Link>
        </div>

        {/* Stats or quick info */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">3+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Years</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">5+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Apps</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">10K+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Downloads</div>
          </div>
        </div>
      </div>
    </section>
  );
}
