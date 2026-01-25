'use client';

import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { Button } from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

// Modern service options
const serviceOptions = {
  en: [
    { value: 'business-automation', label: 'Business Automation' },
    { value: 'crm-system', label: 'CRM System' },
    { value: 'website', label: 'Website Development' },
    { value: 'ecommerce', label: 'E-commerce Solution' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'ai-integration', label: 'AI Integration' },
    { value: 'consulting', label: 'IT Consulting' },
    { value: 'other', label: 'Other' },
  ],
  ru: [
    { value: 'business-automation', label: 'Автоматизация бизнеса' },
    { value: 'crm-system', label: 'CRM система' },
    { value: 'website', label: 'Разработка сайта' },
    { value: 'ecommerce', label: 'E-commerce решение' },
    { value: 'mobile-app', label: 'Мобильное приложение' },
    { value: 'ai-integration', label: 'Интеграция ИИ' },
    { value: 'consulting', label: 'IT консалтинг' },
    { value: 'other', label: 'Другое' },
  ],
  uz: [
    { value: 'business-automation', label: 'Biznes avtomatlashtirish' },
    { value: 'crm-system', label: 'CRM tizimi' },
    { value: 'website', label: 'Veb-sayt yaratish' },
    { value: 'ecommerce', label: 'E-commerce yechimi' },
    { value: 'mobile-app', label: 'Mobil ilova' },
    { value: 'ai-integration', label: "Sun'iy intellekt integratsiyasi" },
    { value: 'consulting', label: 'IT konsalting' },
    { value: 'other', label: 'Boshqa' },
  ],
};

const budgetOptions = {
  en: [
    { value: 'under-5k', label: 'Up to $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: 'over-50k', label: '$50,000+' },
    { value: 'not-sure', label: 'Not sure yet' },
  ],
  ru: [
    { value: 'under-5k', label: 'До $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: 'over-50k', label: '$50,000+' },
    { value: 'not-sure', label: 'Пока не определился' },
  ],
  uz: [
    { value: 'under-5k', label: '$5,000 gacha' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: 'over-50k', label: '$50,000+' },
    { value: 'not-sure', label: 'Hali aniq emas' },
  ],
};

export function ContactForm() {
  const { locale, t } = useLocale();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, service: prev.service === value ? '' : value }));
  };

  const handleBudgetSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, budget: prev.budget === value ? '' : value }));
  };

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
          email: '',
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

  const inputClasses =
    'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all';

  const services = serviceOptions[locale] || serviceOptions.en;
  const budgets = budgetOptions[locale] || budgetOptions.en;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Phone Row */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.contact.form.name} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.contact.form.phone} *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+998 XX XXX XX XX"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Email & Company Row */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.contact.form.email}
            <span className="text-gray-400 ml-1 font-normal">({t.contact.form.companyPlaceholder})</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.contact.form.company}
            <span className="text-gray-400 ml-1 font-normal">({t.contact.form.companyPlaceholder})</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Service Selection - Modern Pills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {t.contact.form.service}
        </label>
        <div className="flex flex-wrap gap-2">
          {services.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleServiceSelect(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                formData.service === option.value
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Selection - Modern Pills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {t.contact.form.budget}
        </label>
        <div className="flex flex-wrap gap-2">
          {budgets.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleBudgetSelect(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                formData.budget === option.value
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.contact.form.message} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder={t.contact.form.messagePlaceholder}
          className={inputClasses}
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl">
          {t.contact.form.success}
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl">
          {t.contact.form.error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status === 'loading'}
        className="w-full"
      >
        {status === 'loading' ? t.contact.form.sending : t.contact.form.submit}
      </Button>
    </form>
  );
}
