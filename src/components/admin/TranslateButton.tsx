'use client';

import { useState } from 'react';

interface FieldGroup {
  ruId: string;
  enId: string;
  uzId: string;
}

interface TranslateButtonProps {
  fields: FieldGroup[];
  className?: string;
}

export function TranslateButton({ fields, className }: TranslateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleTranslate = async () => {
    setLoading(true);
    setStatus('idle');

    try {
      const texts: string[] = [];
      for (const field of fields) {
        const el = document.getElementById(field.ruId) as HTMLInputElement | HTMLTextAreaElement;
        texts.push(el?.value || '');
      }

      if (texts.every((t) => !t.trim())) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts, from: 'ru' }),
      });

      if (!response.ok) throw new Error('Translation failed');

      const data = await response.json();

      fields.forEach((field, i) => {
        if (data.en[i]) {
          const enEl = document.getElementById(field.enId) as HTMLInputElement | HTMLTextAreaElement;
          if (enEl) enEl.value = data.en[i];
        }
        if (data.uz[i]) {
          const uzEl = document.getElementById(field.uzId) as HTMLInputElement | HTMLTextAreaElement;
          if (uzEl) uzEl.value = data.uz[i];
        }
      });

      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleTranslate}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
        status === 'success'
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
          : status === 'error'
          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50'
      } disabled:opacity-50 ${className || ''}`}
    >
      {loading ? (
        <>
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Translating...
        </>
      ) : status === 'success' ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Translated!
        </>
      ) : status === 'error' ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Failed
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 8l6 6" />
            <path d="M4 14l6-6 2-3" />
            <path d="M2 5h12" />
            <path d="M7 2h1" />
            <path d="M22 22l-5-10-5 10" />
            <path d="M14 18h6" />
          </svg>
          Auto-translate to EN & UZ
        </>
      )}
    </button>
  );
}
