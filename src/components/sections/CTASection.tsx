'use client';

import { useLocale } from '@/hooks/useLocale';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  const { t } = useLocale();

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-indigo-600 to-pink-600 rounded-3xl p-12 md:p-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.home.cta.title}
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {t.home.cta.subtitle}
            </p>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100"
            >
              {t.home.cta.button}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
