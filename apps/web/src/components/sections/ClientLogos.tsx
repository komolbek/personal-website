'use client';

import { useLocale } from '@/hooks/useLocale';
import { FadeIn } from '@/components/ui/AnimatedSection';

interface ClientLogosProps {
  partnerNames?: string[];
}

export function ClientLogos({ partnerNames }: ClientLogosProps) {
  const { t } = useLocale();

  if (!partnerNames || partnerNames.length === 0) return null;

  const names = partnerNames;
  const clients = [...names, ...names];

  return (
    <section className="py-12 overflow-hidden">
      <FadeIn className="text-center mb-8">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {t.home.partners.title}
        </p>
      </FadeIn>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

        <div className="overflow-hidden">
          <div className="marquee-track">
            {clients.map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <div className="px-6 py-3 rounded-xl bg-white/50 border border-gray-200/30">
                  <span className="text-lg font-semibold text-gray-400 whitespace-nowrap">
                    {client}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
