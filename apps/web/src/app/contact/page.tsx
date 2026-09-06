'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/hooks/useLocale';
import { getAttribution, type Attribution } from '@/lib/attribution';

const TOTAL_STEPS = 3;

const serviceIcons: Record<string, React.ReactNode> = {
  webdev: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  mobiledev: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  crm: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  uiux: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  ai: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  consulting: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

export default function ContactPage() {
  const { locale, t } = useLocale();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [utmData, setUtmData] = useState<Partial<Attribution>>({});

  useEffect(() => {
    setUtmData(getAttribution());
  }, []);

  const [formData, setFormData] = useState({
    service: '',
    name: '',
    phone: '',
    message: '',
  });

  const serviceLabels: Record<string, Record<string, string>> = {
    webdev: { en: 'Web Development', ru: 'Веб-разработка', uz: 'Veb-ishlab chiqish' },
    mobiledev: { en: 'Mobile Development', ru: 'Мобильная разработка', uz: 'Mobil ishlab chiqish' },
    crm: { en: 'CRM / ERP', ru: 'CRM / ERP', uz: 'CRM / ERP' },
    uiux: { en: 'UI/UX Design', ru: 'UI/UX дизайн', uz: 'UI/UX dizayn' },
    ai: { en: 'AI Integration', ru: 'AI интеграция', uz: 'AI integratsiya' },
    consulting: { en: 'IT Consulting', ru: 'IT-консалтинг', uz: 'IT maslahat' },
  };

  const serviceOptions = Object.entries(serviceLabels).map(([value, labels]) => ({
    value,
    label: labels[locale] || labels.en,
    icon: serviceIcons[value],
  }));

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
    let formatted = digits;
    if (digits.length > 2) formatted = digits.slice(0, 2) + ' ' + digits.slice(2);
    if (digits.length > 5) formatted = digits.slice(0, 2) + ' ' + digits.slice(2, 5) + ' ' + digits.slice(5);
    if (digits.length > 7) formatted = digits.slice(0, 2) + ' ' + digits.slice(2, 5) + ' ' + digits.slice(5, 7) + ' ' + digits.slice(7);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return formData.service !== '';
      case 1: return formData.name.trim() !== '' && formData.phone.replace(/\s/g, '').length >= 9;
      case 2: return true; // Message is optional
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: '+998' + formData.phone.replace(/\s/g, ''),
          service: formData.service,
          message: formData.message || serviceLabels[formData.service]?.[locale] || formData.service,
          ...utmData,
        }),
      });

      if (response.ok) {
        // Fire Meta Pixel Lead event (Instagram ad conversion tracking)
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: formData.service || 'general',
          });
        }
        // Fire GA4 conversion event
        if (window.gtag) {
          window.gtag('event', 'generate_lead', {
            event_category: 'contact',
            event_label: formData.service || 'general',
          });
        }

        setStatus('success');
        setDirection(1);
        setStep(TOTAL_STEPS);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canProceed()) {
      e.preventDefault();
      if (step === TOTAL_STEPS - 1) {
        handleSubmit();
      } else {
        goNext();
      }
    }
  };

  // Step titles
  const stepTitles: Record<string, string[]> = {
    en: ['What do you need?', 'How can we reach you?', 'Tell us more'],
    ru: ['Что вам нужно?', 'Как с вами связаться?', 'Расскажите подробнее'],
    uz: ['Sizga nima kerak?', 'Qanday bog\'lanishimiz mumkin?', 'Batafsilroq aytib bering'],
  };

  const stepSubtitles: Record<string, string[]> = {
    en: ['Select the service you\'re interested in', 'We\'ll get back to you within 24 hours', 'Optional — you can skip this step'],
    ru: ['Выберите интересующую вас услугу', 'Мы ответим в течение 24 часов', 'Необязательно — можно пропустить'],
    uz: ['Qiziqtirgan xizmatni tanlang', 'Biz 24 soat ichida javob beramiz', 'Ixtiyoriy — bu qadamni o\'tkazib yuborishingiz mumkin'],
  };

  const titles = stepTitles[locale] || stepTitles.en;
  const subtitles = stepSubtitles[locale] || stepSubtitles.en;

  const skipLabel = locale === 'ru' ? 'Пропустить' : locale === 'uz' ? 'O\'tkazib yuborish' : 'Skip';
  const nextLabel = locale === 'ru' ? 'Далее' : locale === 'uz' ? 'Keyingi' : 'Next';
  const backLabel = locale === 'ru' ? 'Назад' : locale === 'uz' ? 'Orqaga' : 'Back';
  const sendLabel = locale === 'ru' ? 'Отправить' : locale === 'uz' ? 'Yuborish' : 'Send';
  const sendingLabel = locale === 'ru' ? 'Отправка...' : locale === 'uz' ? 'Yuborilmoqda...' : 'Sending...';
  const homeLabel = locale === 'ru' ? 'На главную' : locale === 'uz' ? 'Bosh sahifaga' : 'Back to Home';

  const stepLabels = titles;

  return (
    <div className="min-h-screen flex flex-col" onKeyDown={handleKeyDown} role="form" aria-label={locale === 'ru' ? 'Форма обратной связи' : locale === 'uz' ? 'Aloqa formasi' : 'Contact form'}>
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Screen reader step announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {step < TOTAL_STEPS
          ? `${locale === 'ru' ? 'Шаг' : locale === 'uz' ? 'Qadam' : 'Step'} ${step + 1} ${locale === 'ru' ? 'из' : locale === 'uz' ? '/' : 'of'} ${TOTAL_STEPS}: ${stepLabels[step]}`
          : locale === 'ru' ? 'Форма отправлена' : locale === 'uz' ? 'Forma yuborildi' : 'Form submitted'}
      </div>

      {/* Progress bar */}
      <div className="fixed top-[72px] left-0 right-0 z-40" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={TOTAL_STEPS} aria-label={`${locale === 'ru' ? 'Шаг' : locale === 'uz' ? 'Qadam' : 'Step'} ${step + 1} / ${TOTAL_STEPS}`}>
        <div className="h-1 bg-gray-200/50">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500"
            animate={{ width: `${((step + 1) / (TOTAL_STEPS + 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 pt-10 pb-16 overflow-hidden">
        <div className="w-full max-w-2xl overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 0: Service Selection */}
            {step === 0 && (
              <motion.div
                key="step-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-center"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  {titles[0]}
                </h1>
                <p className="text-gray-500 text-lg mb-10">{subtitles[0]}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
                  {serviceOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          service: prev.service === option.value ? '' : option.value,
                        }));
                      }}
                      className={`group relative p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                        formData.service === option.value
                          ? 'border-indigo-500 bg-indigo-50/80 shadow-lg shadow-indigo-500/15'
                          : 'border-gray-200 bg-white/50 hover:border-indigo-300 hover:bg-white/80'
                      }`}
                    >
                      {/* Check indicator */}
                      {formData.service === option.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center"
                        >
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}

                      <div className={`mb-3 transition-colors ${
                        formData.service === option.value ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-400'
                      }`}>
                        {option.icon}
                      </div>
                      <div className={`text-sm font-semibold transition-colors ${
                        formData.service === option.value ? 'text-indigo-700' : 'text-gray-700'
                      }`}>
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Contact Details */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-center"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  {titles[1]}
                </h1>
                <p className="text-gray-500 text-lg mb-10">{subtitles[1]}</p>

                <div className="max-w-md mx-auto space-y-5">
                  {/* Name */}
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      autoFocus
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/60 text-gray-900 text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      {t.contact.form.phone} *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-5 py-4 rounded-l-2xl border border-r-0 border-gray-200 bg-gray-50 text-gray-600 font-medium">
                        +998
                      </span>
                      <input
                        type="tel"
                        placeholder="90 123 45 67"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="w-full px-5 py-4 rounded-r-2xl border border-gray-200 bg-white/60 text-gray-900 text-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Message */}
            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-center"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  {titles[2]}
                </h1>
                <p className="text-gray-500 text-lg mb-10">{subtitles[2]}</p>

                <div className="max-w-lg mx-auto">
                  <textarea
                    rows={5}
                    placeholder={t.contact.form.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    autoFocus
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/60 text-gray-900 text-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  />

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl flex items-center gap-2 justify-center"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {t.contact.form.error}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === TOTAL_STEPS && (
              <motion.div
                key="step-success"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/25"
                >
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {t.contact.form.success.split('!')[0]}!
                </h1>
                <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                  {t.contact.responseNote}
                </p>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
                  </svg>
                  {homeLabel}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          {step < TOTAL_STEPS && (
            <div className="reveal">
              <div className="flex items-center justify-between mt-10 max-w-2xl mx-auto">
                {/* Back button */}
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center gap-2 px-5 py-3 text-gray-500 hover:text-gray-700 transition-colors font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {backLabel}
                  </button>
                ) : (
                  <div />
                )}

                {/* Next / Submit / Skip */}
                <div className="flex items-center gap-3">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={status === 'loading'}
                      className="px-5 py-3 text-gray-500 hover:text-gray-700 transition-colors font-medium"
                    >
                      {skipLabel}
                    </button>
                  )}

                  {step < TOTAL_STEPS - 1 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!canProceed()}
                      className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-300 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 disabled:shadow-none"
                    >
                      {nextLabel}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={status === 'loading'}
                      className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 disabled:from-indigo-400 disabled:to-pink-400 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {status === 'loading' ? sendingLabel : sendLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step indicators */}
          {step < TOTAL_STEPS && (
            <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label={locale === 'ru' ? 'Шаги формы' : locale === 'uz' ? 'Forma qadamlari' : 'Form steps'}>
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  role="tab"
                  aria-selected={i === step}
                  aria-label={`${locale === 'ru' ? 'Шаг' : locale === 'uz' ? 'Qadam' : 'Step'} ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step
                      ? 'w-8 bg-gradient-to-r from-indigo-500 to-pink-500'
                      : i < step
                        ? 'w-1.5 bg-indigo-400'
                        : 'w-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
