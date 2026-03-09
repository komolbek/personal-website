'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import {
  WebsiteIcon,
  MobileIcon,
  CRMIcon,
  TargetIcon,
  AIIcon,
  ShieldIcon,
  ArrowRightIcon,
} from '@/components/ui/Icons';

const serviceIcons = [WebsiteIcon, MobileIcon, CRMIcon, TargetIcon, AIIcon, ShieldIcon];
const serviceKeys = ['webDev', 'mobileDev', 'crmErp', 'uiux', 'ai', 'consulting'] as const;

const processSteps = ['discovery', 'design', 'development', 'launch'] as const;

export function ServicesSection() {
  const { t } = useLocale();
  const services = t.servicesPage;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <FadeIn className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            {services.title}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {services.subtitle}
          </p>
        </FadeIn>

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[i];
            const service = services.items[key];
            return (
              <StaggerItem key={key}>
                <div className="group p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 card-hover h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 flex items-center justify-center mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:gap-2 transition-all"
                  >
                    {t.common.getStarted}
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Process Section */}
        <FadeIn className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            {t.solutions.process.title}
          </h2>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-500/30 via-pink-500/30 to-amber-500/30" />

            {processSteps.map((step, i) => (
              <FadeIn key={step} delay={i * 0.15} className="text-center relative">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500/20 to-pink-500/20 flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold gradient-text">{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t.solutions.process[step]}
                </h3>
                <p className="text-sm text-gray-600">
                  {t.solutions.process[`${step}Desc` as keyof typeof t.solutions.process]}
                </p>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="bg-gradient-to-br from-indigo-600 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t.home.cta.title}
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                {t.home.cta.subtitle}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {t.home.cta.button}
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
