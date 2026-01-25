'use client';

import Image from 'next/image';
import { Partner, Locale } from '@/types';
import { QuoteIcon } from '@/components/ui/Icons';

interface TestimonialCardProps {
  partner: Partner;
  locale: Locale;
}

export function TestimonialCard({ partner, locale }: TestimonialCardProps) {
  if (!partner.testimonial) return null;

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8">
      <QuoteIcon className="w-10 h-10 text-indigo-500/30 mb-4" />

      <blockquote className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
        &ldquo;{partner.testimonial.quote[locale]}&rdquo;
      </blockquote>

      <div className="flex items-center gap-4">
        {partner.testimonial.avatar ? (
          <Image
            src={partner.testimonial.avatar}
            alt={partner.testimonial.author}
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
            {partner.testimonial.author.charAt(0)}
          </div>
        )}

        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {partner.testimonial.author}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {partner.testimonial.position[locale]}
          </div>
        </div>
      </div>
    </div>
  );
}
