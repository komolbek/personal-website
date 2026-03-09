'use client';

import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { siteConfig } from '@/config/site';
import {
  PhoneIcon,
  MapPinIcon,
  MailIcon,
  TelegramIcon,
} from '@/components/ui/Icons';
import { FadeIn, SlideInLeft, SlideInRight } from '@/components/ui/AnimatedSection';

export default function ContactPage() {
  const { locale, t } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          company: '',
          phone: '',
          service: '',
          budget: '',
          message: '',
        });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChipSelect = (field: 'service' | 'budget', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] === value ? '' : value,
    }));
  };

  const serviceLabels: Record<string, Record<string, string>> = {
    webdev: { en: 'Web Development', ru: 'Веб-разработка', uz: 'Veb-ishlab chiqish' },
    mobiledev: { en: 'Mobile Development', ru: 'Мобильная разработка', uz: 'Mobil ishlab chiqish' },
    crm: { en: 'CRM / ERP Systems', ru: 'CRM / ERP системы', uz: 'CRM / ERP tizimlar' },
    uiux: { en: 'UI/UX Design', ru: 'UI/UX дизайн', uz: 'UI/UX dizayn' },
    consulting: { en: 'IT Consulting', ru: 'IT-консалтинг', uz: 'IT maslahat' },
    other: { en: 'Other', ru: 'Другое', uz: 'Boshqa' },
  };

  const serviceOptions = Object.entries(serviceLabels).map(([value, labels]) => ({
    value,
    label: labels[locale] || labels.en,
  }));

  const budgetRanges = [
    { value: 'small', label: t.contact.form.budgetRanges.small },
    { value: 'medium', label: t.contact.form.budgetRanges.medium },
    { value: 'large', label: t.contact.form.budgetRanges.large },
    { value: 'enterprise', label: t.contact.form.budgetRanges.enterprise },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              {t.contact.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <SlideInLeft className="lg:col-span-2 space-y-6">
            {/* Contact Information Card */}
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4">{t.contact.info.title}</h3>
              <div className="space-y-4">
                {/* Phone */}
                {siteConfig.phone && (
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">{t.contact.info.phone}</div>
                      <span>{siteConfig.phone}</span>
                    </div>
                  </a>
                )}

                {/* Email */}
                {siteConfig.email && (
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <MailIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">{t.contact.info.email}</div>
                      <span>{siteConfig.email}</span>
                    </div>
                  </a>
                )}

                {/* Telegram */}
                {siteConfig.telegram && (
                  <a
                    href={`https://t.me/${siteConfig.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <TelegramIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">{t.contact.info.telegram}</div>
                      <span>{t.contact.info.telegramCta}</span>
                    </div>
                  </a>
                )}

                {/* Address */}
                {siteConfig.address && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">{t.contact.info.address}</div>
                      <span>{siteConfig.address[locale]}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick note */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 border border-indigo-500/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.contact.responseNote}
              </p>
            </div>
          </SlideInLeft>

          {/* Contact Form */}
          <SlideInRight className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="space-y-6">
                {/* Name & Phone Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t.contact.form.phone} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder={t.contact.form.phonePlaceholder}
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t.contact.form.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder={t.contact.form.companyPlaceholder}
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t.contact.form.service}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleChipSelect('service', option.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                          formData.service === option.value
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white border-transparent shadow-md shadow-indigo-500/25'
                            : 'bg-white/50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t.contact.form.budget}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((range) => (
                      <button
                        key={range.value}
                        type="button"
                        onClick={() => handleChipSelect('budget', range.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                          formData.budget === range.value
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white border-transparent shadow-md shadow-indigo-500/25'
                            : 'bg-white/50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t.contact.form.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t.contact.form.messagePlaceholder}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-xl flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t.contact.form.success}
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {t.contact.form.error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 disabled:from-indigo-400 disabled:to-pink-400 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30"
                >
                  <PhoneIcon className="w-5 h-5" />
                  {status === 'loading' ? t.contact.form.sending : t.contact.form.submit}
                </button>
              </div>
            </form>
          </SlideInRight>
        </div>
      </div>
    </div>
  );
}
