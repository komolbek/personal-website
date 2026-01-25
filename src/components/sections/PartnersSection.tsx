'use client';

import { useLocale } from '@/hooks/useLocale';
import { getFeaturedPartners, getPartnersWithTestimonials } from '@/config/partners';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PartnerLogo } from '@/components/cards/PartnerLogo';
import { TestimonialCard } from '@/components/cards/TestimonialCard';

interface PartnersSectionProps {
  showTestimonials?: boolean;
}

export function PartnersSection({ showTestimonials = false }: PartnersSectionProps) {
  const { locale, t } = useLocale();
  const partners = getFeaturedPartners();
  const partnersWithTestimonials = getPartnersWithTestimonials();

  return (
    <section className="py-20 px-4 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={t.home.partners.title}
          subtitle={t.home.partners.subtitle}
        />

        {/* Partner Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12">
          {partners.map((partner) => (
            <PartnerLogo key={partner.id} partner={partner} size="md" />
          ))}
        </div>

        {/* Testimonials */}
        {showTestimonials && partnersWithTestimonials.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {t.partners.testimonials}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {partnersWithTestimonials.slice(0, 4).map((partner) => (
                <TestimonialCard
                  key={partner.id}
                  partner={partner}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
