'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { FadeIn } from '@/components/ui/AnimatedSection';

interface CTASectionProps {
  overrides?: { title?: string; subtitle?: string };
}

export function CTASection({ overrides }: CTASectionProps) {
  const { t } = useLocale();

  return (
    <section className="py-32 lg:py-40 px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animated-gradient" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {overrides?.title || t.home.cta.title}
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {overrides?.subtitle || t.home.cta.subtitle}
          </p>
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-indigo-600 font-semibold rounded-full transition-all duration-300 shadow-2xl shadow-black/20 hover:-translate-y-1 text-lg"
            >
              {t.home.cta.button}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </MagneticButton>
        </FadeIn>
      </div>
    </section>
  );
}
