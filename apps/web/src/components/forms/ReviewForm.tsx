'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/hooks/useLocale';

interface ReviewFormProps {
  onSuccess?: () => void;
}

export function ReviewForm({ onSuccess }: ReviewFormProps) {
  const { locale } = useLocale();
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    position: '',
    quote: '',
    rating: 0,
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const labels = {
    en: {
      name: 'Your Name',
      email: 'Email (optional)',
      position: 'Company / Position (optional)',
      review: 'Your Review',
      reviewPlaceholder: 'Share your experience working with us...',
      rating: 'Rating',
      ratingRequired: 'Please select a rating',
      submit: 'Submit Review',
      sending: 'Submitting...',
      success: 'Thank you! Your review will appear after moderation.',
      error: 'Something went wrong. Please try again.',
    },
    ru: {
      name: 'Ваше имя',
      email: 'Email (необязательно)',
      position: 'Компания / Должность (необязательно)',
      review: 'Ваш отзыв',
      reviewPlaceholder: 'Поделитесь опытом работы с нами...',
      rating: 'Оценка',
      ratingRequired: 'Пожалуйста, поставьте оценку',
      submit: 'Отправить отзыв',
      sending: 'Отправка...',
      success: 'Спасибо! Ваш отзыв появится после модерации.',
      error: 'Что-то пошло не так. Попробуйте ещё раз.',
    },
    uz: {
      name: 'Ismingiz',
      email: 'Email (ixtiyoriy)',
      position: 'Kompaniya / Lavozim (ixtiyoriy)',
      review: 'Fikringiz',
      reviewPlaceholder: 'Biz bilan ishlash tajribangizni baham ko\'ring...',
      rating: 'Baho',
      ratingRequired: 'Iltimos, baho qo\'ying',
      submit: 'Fikr yuborish',
      sending: 'Yuborilmoqda...',
      success: 'Rahmat! Fikringiz moderatsiyadan keyin ko\'rinadi.',
      error: 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.',
    },
  };

  const l = labels[locale as keyof typeof labels] || labels.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: formData.authorName,
          authorEmail: formData.authorEmail || undefined,
          position: formData.position || undefined,
          quote: formData.quote,
          rating: formData.rating,
        }),
      });

      if (response.ok) {
        setStatus('success');
        onSuccess?.();
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <p className="text-gray-700 font-medium">{l.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {l.rating} *
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="p-0.5 transition-transform hover:scale-110"
            >
              <svg
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredStar || formData.rating)
                    ? 'text-amber-400'
                    : 'text-gray-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        {formData.rating === 0 && status === 'idle' && (
          <p className="text-xs text-gray-400 mt-1">{l.ratingRequired}</p>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {l.name} *
        </label>
        <input
          type="text"
          required
          value={formData.authorName}
          onChange={(e) => setFormData((prev) => ({ ...prev, authorName: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {l.position}
        </label>
        <input
          type="text"
          value={formData.position}
          onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {l.email}
        </label>
        <input
          type="email"
          value={formData.authorEmail}
          onChange={(e) => setFormData((prev) => ({ ...prev, authorEmail: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Review text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {l.review} *
        </label>
        <textarea
          required
          rows={4}
          placeholder={l.reviewPlaceholder}
          value={formData.quote}
          onChange={(e) => setFormData((prev) => ({ ...prev, quote: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <p className="text-sm text-red-600">{l.error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || formData.rating === 0}
        className="w-full px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-300 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 disabled:shadow-none"
      >
        {status === 'loading' ? l.sending : l.submit}
      </button>
    </form>
  );
}
