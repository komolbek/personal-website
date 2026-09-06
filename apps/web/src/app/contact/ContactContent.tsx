'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { getAttribution, type Attribution } from '@/lib/attribution';
import { siteConfig } from '@/config/site';
import { TelegramIcon, MailIcon, PhoneIcon } from '@/components/ui/Icons';

/**
 * One screen, one column, one required field.
 *
 * What this replaces: a four-step wizard that opened by asking "what do you
 * need?" over six service tiles — Веб-разработка, UI/UX дизайн, AI интеграция,
 * IT-консалтинг — then collected a budget, and never showed a price. It asked
 * the same opening question as the calculator and answered it worse, on the
 * old gradient design, using the vocabulary REDESIGN.md §6.2 bans. It was
 * linked from the footer of every page.
 *
 * Someone who lands here wants to talk to a person, not configure a package.
 * So: contact, optionally a name, optionally what it is about. The price
 * question is handed back to the calculator with a link.
 */
export function ContactContent() {
  const { t } = useLocale();
  const c = t.calc.contact;

  const [contact, setContact] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [invalid, setInvalid] = useState(false);
  const [utm, setUtm] = useState<Partial<Attribution>>({});
  const contactRef = useRef<HTMLInputElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  useEffect(() => setUtm(getAttribution()), []);
  useEffect(() => {
    if (status === 'sent') sentRef.current?.focus();
  }, [status]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.trim().length < 5) {
      setInvalid(true);
      contactRef.current?.focus();
      return;
    }
    setInvalid(false);
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          phone: contact.trim(),
          message: message.trim() || c.h1,
          ...utm,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      window.fbq?.('track', 'Lead', { content_name: 'contact' });
      window.gtag?.('event', 'generate_lead', { event_category: 'contact' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const field =
    'w-full rounded-[9px] border border-line-strong bg-paper px-3 py-[11px] text-[16px] text-ink';
  const label = 'mb-1.5 block text-[14px] font-semibold text-ink';

  if (status === 'sent') {
    return (
      <div className="mx-auto max-w-[640px] px-5 pb-20 pt-10">
        <div
          ref={sentRef}
          tabIndex={-1}
          className="rounded-xl border border-accent-line bg-accent-soft px-6 py-8"
        >
          <h1 className="m-0 mb-2 text-[26px] font-semibold tracking-[-0.02em]">{c.sentTitle}</h1>
          <p className="m-0 text-ink-muted">{c.sentBody}</p>
        </div>
        <DirectChannels heading={c.orWrite} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[640px] px-5 pb-20 pt-10">
      <h1 className="m-0 mb-3 text-[clamp(26px,4vw,36px)] font-semibold leading-[1.15] tracking-[-0.03em]">
        {c.h1}
      </h1>
      <p className="m-0 mb-10 text-ink-muted">
        {c.lead}
        <Link href="/" className="border-b border-accent-line text-accent hover:border-accent">
          {c.leadLink}
        </Link>
        {c.leadTail}
      </p>

      <form onSubmit={submit} noValidate className="grid gap-6">
        <div>
          <label htmlFor="contact-contact" className={label}>
            {c.contactLabel}
          </label>
          <input
            id="contact-contact"
            ref={contactRef}
            type="text"
            inputMode="tel"
            autoComplete="tel"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              if (invalid) setInvalid(false);
            }}
            placeholder="+998 __ ___ __ __  или  @username"
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? 'contact-error' : 'contact-hint'}
            className={field}
          />
          {invalid ? (
            <p id="contact-error" role="alert" className="mt-1.5 text-[14px] text-flag">
              {c.errorContact}
            </p>
          ) : (
            <p id="contact-hint" className="mt-1.5 text-[13px] text-ink-faint">
              {c.contactHint}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-name" className={label}>
            {c.nameLabel}{' '}
            <span className="font-normal text-ink-faint">— {c.nameOptional}</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className={label}>
            {c.messageLabel}{' '}
            <span className="font-normal text-ink-faint">— {c.messageOptional}</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${field} resize-y`}
          />
        </div>

        {status === 'error' && (
          <p role="alert" className="m-0 text-[14px] text-flag">
            {c.errorSend}
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-[9px] bg-accent px-6 py-3.5 text-[15px] font-semibold text-accent-ink hover:opacity-90 disabled:opacity-60"
          >
            {status === 'sending' ? c.sending : c.send}
          </button>
        </div>
      </form>

      <DirectChannels heading={c.orWrite} />
    </div>
  );
}

function DirectChannels({ heading }: { heading: string }) {
  const row = 'flex items-center gap-3 text-[15px] text-ink-muted hover:text-ink';
  return (
    <section className="mt-12 border-t border-line pt-8">
      <h2 className="mb-4 text-[15px] font-semibold text-ink">{heading}</h2>
      <ul className="grid list-none gap-3 p-0">
        <li>
          <a
            className={row}
            href={`https://t.me/${siteConfig.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon className="h-4 w-4 flex-none text-accent" />@{siteConfig.telegram}
          </a>
        </li>
        <li>
          <a className={row} href={`tel:${siteConfig.phone}`}>
            <PhoneIcon className="h-4 w-4 flex-none text-accent" />
            {siteConfig.phone}
          </a>
        </li>
        <li>
          <a className={row} href={`mailto:${siteConfig.email}`}>
            <MailIcon className="h-4 w-4 flex-none text-accent" />
            {siteConfig.email}
          </a>
        </li>
      </ul>
    </section>
  );
}
