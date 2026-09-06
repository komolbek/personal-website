'use client';

import Link from 'next/link';
import {
  ADDONS,
  PKG,
  PROGRAM_IDS,
  SITE_IDS,
  formatUZS,
  type PkgId,
} from '@/config/calculator';
import { useLocale } from '@/hooks/useLocale';
import type { CalcText } from '@/locales/calc';

// The text version of every price the calculator can quote (REDESIGN.md §7).
// Prices come from src/config/calculator.ts and the wording from
// src/locales/calc — there is no second copy of either.

function Table({ ids, c, caption }: { ids: PkgId[]; c: CalcText; caption: string }) {
  const th =
    'border-b border-line-strong pb-2 text-[12px] font-semibold uppercase tracking-[0.09em] text-ink-faint';
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className={`${th} text-left`}>
              {c.pricing.colPackage}
            </th>
            <th scope="col" className={`${th} text-right`}>
              {c.pricing.colPrice}
            </th>
            <th scope="col" className={`${th} text-right`}>
              {c.pricing.colTerm}
            </th>
          </tr>
        </thead>
        <tbody>
          {ids.map((id) => (
            <tr key={id}>
              <td className="border-b border-line py-3 pr-4">
                <b className="font-semibold text-ink">{c.pkg[id].name}</b>
                <span className="mt-0.5 block text-[14px] text-ink-muted">{c.pkg[id].why}</span>
              </td>
              <td className="num whitespace-nowrap border-b border-line py-3 text-right align-top text-ink">
                {formatUZS(PKG[id].price)}
              </td>
              <td className="num whitespace-nowrap border-b border-line py-3 pl-4 text-right align-top text-ink-muted">
                {c.pkg[id].term}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Includes({ ids, c }: { ids: PkgId[]; c: CalcText }) {
  return (
    <div className="mt-10 grid gap-8">
      {ids.map((id) => (
        <section key={id}>
          <h3 className="mb-1 text-[17px] font-semibold">
            {c.pkg[id].name} — {formatUZS(PKG[id].price)} {c.currency}, {c.pkg[id].term}
          </h3>
          <p className="mb-2 text-ink-muted">{c.pkg[id].why}</p>
          <ul className="grid list-disc gap-1 pl-5 text-[15px] text-ink-muted">
            {c.pkg[id].inc.map((line, i) => (
              <li key={i}>{line.replace(/\*\*/g, '')}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function SupportRow({ name, what, price }: { name: string; what: string; price: string }) {
  return (
    <tr>
      <td className="border-b border-line py-3 pr-4">
        <b className="font-semibold text-ink">{name}</b>
        <span className="mt-0.5 block text-[14px] text-ink-muted">{what}</span>
      </td>
      <td className="num whitespace-nowrap border-b border-line py-3 text-right align-top text-ink">
        {price}
      </td>
    </tr>
  );
}

export function PricingContent() {
  const { t } = useLocale();
  const c = t.calc;
  const per = c.pricing.perMonth;

  return (
    <div className="mx-auto max-w-[820px] px-5 pb-20 pt-10">
      <h1 className="m-0 mb-3 text-[clamp(26px,4vw,36px)] font-semibold leading-[1.15] tracking-[-0.03em]">
        {c.pricing.h1}
      </h1>
      <p className="m-0 mb-2 max-w-[62ch] text-ink-muted">{c.pricing.lead}</p>
      <p className="m-0 mb-10 max-w-[62ch] text-ink-muted">
        {c.pricing.hint}
        <Link href="/" className="border-b border-accent-line text-accent hover:border-accent">
          {c.pricing.hintLink}
        </Link>
        {c.pricing.hintTail}
      </p>

      <h2 className="mb-3 text-[20px] font-semibold">{c.pricing.programsTitle}</h2>
      <p className="mb-4 max-w-[62ch] text-ink-muted">{c.pricing.programsLead}</p>
      <Table ids={PROGRAM_IDS} c={c} caption={c.pricing.captionPrograms} />
      <Includes ids={PROGRAM_IDS} c={c} />

      <h2 className="mb-3 mt-14 text-[20px] font-semibold">{c.pricing.sitesTitle}</h2>
      <Table ids={SITE_IDS} c={c} caption={c.pricing.captionSites} />
      <Includes ids={SITE_IDS} c={c} />

      <h2 className="mb-3 mt-14 text-[20px] font-semibold">{c.pricing.addonsTitle}</h2>
      <p className="mb-4 max-w-[62ch] text-ink-muted">{c.pricing.addonsLead}</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[15px]">
          <tbody>
            {ADDONS.map((a) => (
              <SupportRow
                key={a.id}
                name={c.addons[a.id].n}
                what={c.addons[a.id].s}
                price={formatUZS(a.p)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mb-3 mt-14 text-[20px] font-semibold">{c.pricing.supportTitle}</h2>
      <p className="mb-4 max-w-[62ch] text-ink-muted">{c.pricing.supportLead}</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[15px]">
          <tbody>
            <SupportRow
              name={c.pricing.supportSite}
              what={c.pricing.supportSiteWhat}
              price={`${formatUZS(500_000)} ${per}`}
            />
            <SupportRow
              name={c.pricing.supportBase}
              what={c.pricing.supportBaseWhat}
              price={`${formatUZS(3_000_000)} ${per}`}
            />
            <SupportRow
              name={c.pricing.supportPlus}
              what={c.pricing.supportPlusWhat}
              price={`${formatUZS(5_000_000)} ${per}`}
            />
          </tbody>
        </table>
      </div>

      <h2 className="mb-3 mt-14 text-[20px] font-semibold">{c.pricing.notTitle}</h2>
      <ul className="grid list-disc gap-1.5 pl-5 text-[15px] text-ink-muted">
        {c.pricing.notItems.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>

      <h2 className="mb-3 mt-14 text-[20px] font-semibold">{c.pricing.lessTitle}</h2>
      <p className="max-w-[62ch] text-ink-muted">{c.pricing.lessBody}</p>

      <p className="mt-12">
        <Link
          href="/"
          className="inline-block rounded-[9px] bg-accent px-6 py-3.5 text-[15px] font-semibold text-accent-ink hover:opacity-90"
        >
          {c.pricing.cta}
        </Link>
      </p>
    </div>
  );
}
