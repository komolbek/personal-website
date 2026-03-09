'use client';

import { useLocale } from '@/hooks/useLocale';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { QuoteIcon } from '@/components/ui/Icons';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface Testimonial {
  quote: { en: string; ru: string; uz: string };
  author: string;
  role: { en: string; ru: string; uz: string };
  company: string;
  avatar?: string;
  rating?: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: {
      en: 'Necto Automations transformed our legal practice with Yuridix. Case management that used to take hours now takes minutes. Their team truly understands the needs of Uzbek businesses.',
      ru: 'Necto Automations преобразили нашу юридическую практику с помощью Yuridix. Управление делами, на которое раньше уходили часы, теперь занимает минуты. Их команда действительно понимает потребности узбекского бизнеса.',
      uz: 'Necto Automations Yuridix yordamida bizning yuridik amaliyotimizni o\'zgartirdi. Ilgari soatlab vaqt oladigan ishlarni boshqarish endi daqiqalar ichida amalga oshiriladi.',
    },
    author: 'Aziz Karimov',
    role: {
      en: 'Managing Partner',
      ru: 'Управляющий партнёр',
      uz: 'Boshqaruvchi sherik',
    },
    company: 'Karimov & Associates',
  },
  {
    quote: {
      en: 'The booking system they built for us handles thousands of reservations seamlessly. Professional team, clean code, and excellent post-launch support.',
      ru: 'Система бронирования, которую они для нас создали, безупречно обрабатывает тысячи бронирований. Профессиональная команда, чистый код и отличная поддержка после запуска.',
      uz: 'Ular biz uchun yaratgan bron qilish tizimi minglab bronlarni muammosiz boshqaradi. Professional jamoa, toza kod va ishga tushirilgandan keyin ajoyib qo\'llab-quvvatlash.',
    },
    author: 'Malika Rustamova',
    role: {
      en: 'Operations Director',
      ru: 'Директор по операциям',
      uz: 'Operatsiyalar direktori',
    },
    company: 'TravelUz',
  },
  {
    quote: {
      en: 'From concept to deployment, Necto delivered our AI-powered app ahead of schedule. They don\'t just write code — they solve business problems.',
      ru: 'От концепции до развёртывания Necto реализовали наше AI-приложение раньше срока. Они не просто пишут код — они решают бизнес-задачи.',
      uz: 'Kontseptsiyadan joylashtirishgacha, Necto bizning AI ilovamizni muddatdan oldin yetkazib berdi. Ular shunchaki kod yozmaydi — biznes muammolarini hal qiladi.',
    },
    author: 'Sardor Tashmatov',
    role: {
      en: 'CTO',
      ru: 'Технический директор',
      uz: 'Texnik direktor',
    },
    company: 'InnoTech Solutions',
  },
];

interface TestimonialsSectionProps {
  dbTestimonials?: Testimonial[];
}

export function TestimonialsSection({ dbTestimonials }: TestimonialsSectionProps) {
  const { locale, t } = useLocale();

  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : defaultTestimonials;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionHeading
            title={t.home.testimonials?.title || 'What Our Clients Say'}
            subtitle={t.home.testimonials?.subtitle || 'Real results from real partnerships'}
          />
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, i) => (
            <StaggerItem key={i}>
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 h-full flex flex-col card-hover">
                <QuoteIcon className="w-8 h-8 text-indigo-500/30 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  &ldquo;{testimonial.quote[locale]}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.role[locale]}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
