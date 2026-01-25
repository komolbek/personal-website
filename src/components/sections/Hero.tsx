'use client';

import { useLocale } from '@/hooks/useLocale';
import { Button } from '@/components/ui/Button';

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
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {t.home.hero.badge}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text leading-tight">
          {t.home.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          {t.home.hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/solutions" size="lg">
            <span className="flex items-center gap-2">
              {t.home.hero.cta}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            {t.home.hero.contact}
          </Button>
        </div>
      </div>
    </section>
  );
}
