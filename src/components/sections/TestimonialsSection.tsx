'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/hooks/useLocale';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { QuoteIcon } from '@/components/ui/Icons';
import { ReviewForm } from '@/components/forms/ReviewForm';

interface Testimonial {
  quote: { en: string; ru: string; uz: string };
  author: string;
  role: { en: string; ru: string; uz: string };
  company: string;
  avatar?: string;
  rating?: number;
}

// Default testimonials used when the DB has fewer than 3
const defaultTestimonials: Testimonial[] = [
  {
    quote: {
      en: 'Necto built our legal management system from scratch. Our team now saves over 15 hours per week on case management and billing. The ROI was visible within the first month.',
      ru: 'Necto создали нашу систему управления юридической практикой с нуля. Наша команда теперь экономит более 15 часов в неделю на управлении делами и биллинге. Окупаемость была заметна уже в первый месяц.',
      uz: "Necto bizning yuridik boshqaruv tizimimizni noldan yaratdi. Jamoamiz endi ishlarni boshqarish va billingda haftasiga 15 soatdan ko'proq tejaydi.",
    },
    author: 'Aziz Karimov',
    role: { en: 'Managing Partner', ru: 'Управляющий партнёр', uz: 'Boshqaruvchi sherik' },
    company: 'Karimov & Partners',
    rating: 5,
  },
  {
    quote: {
      en: 'The booking platform Necto developed for us completely transformed our appointment workflow. Online bookings increased by 340% in three months, and no-shows dropped significantly.',
      ru: 'Платформа бронирования, которую разработала Necto, полностью преобразила наш процесс записи. Онлайн-бронирования выросли на 340% за три месяца, а количество неявок значительно снизилось.',
      uz: "Necto biz uchun yaratgan bron qilish platformasi yozilish jarayonimizni butunlay o'zgartirdi. Onlayn bronlar 3 oyda 340% ga oshdi.",
    },
    author: 'Nodira Rustamova',
    role: { en: 'Owner', ru: 'Владелец', uz: 'Egasi' },
    company: 'Wellness Center',
    rating: 5,
  },
  {
    quote: {
      en: 'We switched from spreadsheets to TalimX and the difference is night and day. Attendance tracking, payments, scheduling — everything is automated now. Highly recommend for any education center.',
      ru: 'Мы перешли с таблиц на TalimX и разница колоссальная. Посещаемость, платежи, расписание — всё теперь автоматизировано. Очень рекомендую для образовательных центров.',
      uz: "Biz jadvallardan TalimX ga o'tdik va farq juda katta. Davomat, to'lovlar, jadval — hammasi avtomatlashtirilgan.",
    },
    author: 'Bekzod Tursunov',
    role: { en: 'Director', ru: 'Директор', uz: 'Direktor' },
    company: 'EduPro Academy',
    rating: 5,
  },
];

interface TestimonialsSectionProps {
  dbTestimonials?: Testimonial[];
}

export function TestimonialsSection({ dbTestimonials }: TestimonialsSectionProps) {
  const { locale, t } = useLocale();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const reviewButtonLabel = locale === 'ru'
    ? 'Оставить отзыв'
    : locale === 'uz'
      ? 'Fikr qoldirish'
      : 'Leave a Review';

  // Use DB testimonials if available, otherwise use defaults
  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : defaultTestimonials;
  const isFew = testimonials.length <= 2;

  return (
    <section className="py-24 lg:py-32 px-4 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4">
              {t.home.testimonials?.title || 'What Our Clients Say'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t.home.testimonials?.subtitle || 'Real results from real partnerships'}
            </p>
          </div>
        </FadeIn>

        {testimonials.length > 0 && (
          <StaggerContainer className={`grid gap-6 mt-12 ${
            isFew ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'
          }`}>
            {testimonials.map((testimonial, i) => (
              <StaggerItem key={i}>
                <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-gray-200/50 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
                  <QuoteIcon className="w-10 h-10 text-indigo-500/20 mb-6" />

                  {testimonial.rating && (
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <svg
                          key={si}
                          className={`w-4 h-4 ${si < testimonial.rating! ? 'text-amber-400' : 'text-gray-200'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-700 text-base leading-relaxed mb-8 flex-1">
                    &ldquo;{testimonial.quote[locale]}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role[locale]}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Leave a Review button */}
        <FadeIn delay={0.3}>
          <div className="text-center mt-12">
            <button
              onClick={() => setShowReviewForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-indigo-500/30 text-indigo-600 hover:bg-indigo-50 font-medium rounded-full transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {reviewButtonLabel}
            </button>
          </div>
        </FadeIn>

        {/* Review Form Modal */}
        <AnimatePresence>
          {showReviewForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowReviewForm(false);
              }}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

              {/* Modal content */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Close button */}
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h3 className="text-xl font-bold text-gray-900 mb-6">{reviewButtonLabel}</h3>

                <ReviewForm onSuccess={() => {
                  setTimeout(() => setShowReviewForm(false), 3000);
                }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
