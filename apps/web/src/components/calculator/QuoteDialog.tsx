'use client';

import { useEffect, useRef, useState } from 'react';
import type { CalcText } from '@/locales/calc';

/**
 * One field: a phone number or a Telegram handle (REDESIGN.md §3.8). No email,
 * no company name, and above all no budget — the budget is the number the
 * visitor is looking at.
 */
export function QuoteDialog({
  c,
  open,
  summary,
  onClose,
  onSubmit,
}: {
  c: CalcText;
  open: boolean;
  summary: string;
  onClose: () => void;
  onSubmit: (contact: string) => Promise<boolean>;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      input.current?.focus();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  // Reset only on the way in, so the "sent" state survives until it is closed.
  useEffect(() => {
    if (open) setStatus('idle');
  }, [open]);

  const send = async () => {
    if (contact.trim().length < 5) return;
    setStatus('sending');
    setStatus((await onSubmit(contact.trim())) ? 'sent' : 'error');
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      className="w-[calc(100%-40px)] max-w-[430px] rounded-xl border border-line-strong bg-paper p-[26px] text-ink backdrop:bg-black/45"
    >
      {status === 'sent' ? (
        <>
          <h3 className="m-0 mb-1.5 text-[20px] font-semibold tracking-[-0.02em]">{c.dialog.sentTitle}</h3>
          <p className="m-0 mb-4 text-[15px] text-ink-muted">
            {c.dialog.sentBody}
          </p>
        </>
      ) : (
        <>
          <h3 className="m-0 mb-1.5 text-[20px] font-semibold tracking-[-0.02em]">{c.dialog.title}</h3>
          <p className="m-0 mb-4 text-[15px] text-ink-muted">
{c.dialog.lead}
          </p>
          <pre className="num m-0 mb-4 whitespace-pre-wrap rounded-[9px] border border-line bg-paper-alt p-3 text-[12.5px] text-ink-muted">
            {summary}
          </pre>
          <label htmlFor="quote-contact" className="mb-[5px] block text-[13px] font-semibold text-ink-muted">
            {c.dialog.label}
          </label>
          <input
            id="quote-contact"
            ref={input}
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void send();
              }
            }}
            placeholder={c.dialog.placeholder}
            className="mb-[14px] w-full rounded-[9px] border border-line-strong bg-paper px-3 py-[11px] text-[16px] text-ink"
          />
          {status === 'error' && (
            <p className="m-0 mb-3 text-[14px] text-flag">
{c.dialog.error}
            </p>
          )}
          <button
            type="button"
            onClick={() => void send()}
            disabled={status === 'sending' || contact.trim().length < 5}
            className="block w-full cursor-pointer rounded-[9px] bg-accent px-[18px] py-[13px] text-center text-[15px] font-semibold text-accent-ink hover:opacity-90 disabled:cursor-default disabled:opacity-50"
          >
            {status === 'sending' ? c.dialog.sending : c.dialog.send}
          </button>
        </>
      )}
      <button
        type="button"
        onClick={onClose}
        className="mt-2 block w-full cursor-pointer rounded-[9px] border border-line-strong px-[18px] py-2.5 text-center text-[14px] text-ink-muted hover:text-ink"
      >
        {c.dialog.close}
      </button>
    </dialog>
  );
}
