'use client';

import { useState } from 'react';
import { ADDONS, PKG, PROGRAM_IDS, SITE_IDS, SUPPORT, formatUZS, type PkgId } from '@/config/calculator';
import { useLocale } from '@/hooks/useLocale';
import type { CalcText } from '@/locales/calc';
import { trackCalc } from '@/lib/calc-analytics';
import { RichText } from './RichText';

/**
 * The objections, answered. Every panel's text is rendered into the markup on
 * the server and only toggled with the `hidden` attribute — never mounted on
 * click (REDESIGN.md §7). The homepage is now an interface rather than a page
 * of prose, so this is most of the crawlable text left on it.
 */

type TabId = 'how' | 'price' | 'not' | 'why';
const TAB_IDS: TabId[] = ['how', 'price', 'not', 'why'];

function PriceRows({ ids, c }: { ids: PkgId[]; c: CalcText }) {
  return (
    <>
      {ids.map((id) => (
        <tr key={id}>
          <td className="border-b border-line py-2">
            {c.pkg[id].name}
            <span className="block text-[13px] text-ink-faint">{c.pkg[id].term}</span>
          </td>
          <td className="num whitespace-nowrap border-b border-line py-2 text-right text-ink">
            {formatUZS(PKG[id].price)}
          </td>
        </tr>
      ))}
    </>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return (
    <tr>
      <td
        colSpan={2}
        className="border-b border-line-strong pb-2 pt-4 text-[12px] font-semibold uppercase tracking-[0.09em] text-ink-faint"
      >
        {children}
      </td>
    </tr>
  );
}

export function ExplainPanels() {
  const { t } = useLocale();
  const c = t.calc;
  const [open, setOpen] = useState<TabId | null>(null);

  const toggle = (id: TabId) => {
    setOpen((cur) => {
      if (cur === id) return null;
      trackCalc('tab_open', { tab: id });
      return id;
    });
  };

  const panelClass = 'mt-4 max-w-[78ch] text-[15px] text-ink-muted';

  return (
    <section className="border-t border-line-strong pt-[18px]">
      <div className="flex flex-wrap gap-2">
        {TAB_IDS.map((id) => {
          const isOpen = open === id;
          return (
            <button
              key={id}
              type="button"
              aria-expanded={isOpen}
              aria-controls={`panel-${id}`}
              onClick={() => toggle(id)}
              className={[
                'cursor-pointer rounded-lg border px-3.5 py-2 text-[14px] transition-colors',
                isOpen
                  ? 'border-ink bg-ink font-semibold text-paper'
                  : 'border-line text-ink-muted hover:border-line-strong hover:text-ink',
              ].join(' ')}
            >
              {c.tabs[id]}
            </button>
          );
        })}
      </div>

      <div id="panel-how" hidden={open !== 'how'} className={panelClass}>
        <h3 className="mb-2 text-[16px] font-semibold text-ink">{c.panels.how.title}</h3>
        <ul className="grid list-disc gap-1.5 pl-[19px]">
          {c.panels.how.items.map((line, i) => (
            <li key={i}>
              <RichText text={line} />
            </li>
          ))}
        </ul>
      </div>

      <div id="panel-price" hidden={open !== 'price'} className={panelClass}>
        <table className="w-full border-collapse">
          <tbody>
            <Group>{c.panels.price.programs}</Group>
            <PriceRows ids={PROGRAM_IDS} c={c} />
            <Group>{c.panels.price.sites}</Group>
            <PriceRows ids={SITE_IDS} c={c} />
            <Group>{c.panels.price.addons}</Group>
            {ADDONS.map((a) => (
              <tr key={a.id}>
                <td className="border-b border-line py-2">
                  {c.addons[a.id].n}
                  <span className="block text-[13px] text-ink-faint">{c.addons[a.id].s}</span>
                </td>
                <td className="num whitespace-nowrap border-b border-line py-2 text-right text-ink">
                  {formatUZS(a.p)}
                </td>
              </tr>
            ))}
            <Group>{c.panels.price.support}</Group>
            {(['base', 'plus'] as const).map((v) => (
              <tr key={v}>
                <td className="border-b border-line py-2">{c.panels.price[v]}</td>
                <td className="num border-b border-line py-2 text-right text-ink">
                  {formatUZS(SUPPORT.find((s) => s.v === v)?.p ?? 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="panel-not" hidden={open !== 'not'} className={panelClass}>
        <h3 className="mb-2 text-[16px] font-semibold text-ink">{c.panels.not.title}</h3>
        <ul className="grid list-disc gap-1.5 pl-[19px]">
          {c.panels.not.items.map((line, i) => (
            <li key={i}>
              <RichText text={line} />
            </li>
          ))}
        </ul>
        <p className="mt-3">
          <RichText text={c.panels.not.budget} />
        </p>
      </div>

      <div id="panel-why" hidden={open !== 'why'} className={panelClass}>
        <q className="mb-2 block text-[16px] italic text-ink">{c.panels.why.q}</q>
        <p className="mb-2">{c.panels.why.p1}</p>
        <p className="m-0">{c.panels.why.p2}</p>
      </div>
    </section>
  );
}
