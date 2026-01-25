'use client';

import { useLocale } from '@/hooks/useLocale';
import { partners, getPartnersWithTestimonials } from '@/config/partners';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PartnerLogo } from '@/components/cards/PartnerLogo';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { Button } from '@/components/ui/Button';

export default function PartnersPage() {
  const { locale, t } = useLocale();
  const partnersWithTestimonials = getPartnersWithTestimonials();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={t.partners.title}
          subtitle={t.partners.subtitle}
        />

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
          {partners.map((partner) => (
            <PartnerLogo key={partner.id} partner={partner} size="lg" />
          ))}
        </div>

        {/* Testimonials Section */}
        {partnersWithTestimonials.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              <span className="gradient-text">{t.partners.testimonials}</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {partnersWithTestimonials.map((partner) => (
                <TestimonialCard
                  key={partner.id}
                  partner={partner}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        )}

        {/* Become a Partner CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t.partners.becomePartner}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {t.partners.becomePartnerDesc}
          </p>
          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100"
          >
            {t.partners.contactUs}
          </Button>
        </div>
      </div>
    </div>
  );
}
