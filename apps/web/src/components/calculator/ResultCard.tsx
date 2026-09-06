'use client';

import {
  ADDONS,
  LADDER,
  PKG,
  formatUZS,
  type Addon,
  type CalcState,
  type Item,
  type ItemSource,
  type PkgId,
  type Totals,
} from '@/config/calculator';
import { fmt, type CalcText } from '@/locales/calc';
import { RichText } from './RichText';

interface Props {
  c: CalcText;
  /** Something is ticked but the result is still withheld. */
  started: boolean;
  totals: Totals;
  /** Already localised and interpolated by the caller. */
  reasons: string[];
  term: string;
  sysPackage: PkgId | null;
  onDrop: (src: ItemSource) => void;
  onLadder: (to: Extract<PkgId, 'task' | 'dept' | 'all'>) => void;
  onSend: (trigger: HTMLElement) => void;
}

/** Shown before anything is ticked — the visitor still leaves knowing the range. */
function Empty({ c, started }: { c: CalcText; started: boolean }) {
  const rows = [
    { label: c.card.ranges.programs, value: c.card.rangeValues.programs },
    { label: c.card.ranges.sites, value: c.card.rangeValues.sites },
    { label: c.card.ranges.term, value: c.card.rangeValues.term },
  ];
  return (
    <div className="px-[22px] py-6">
      <b className="mb-2 block text-[18px] font-semibold tracking-[-0.02em]">{c.card.emptyTitle}</b>
      <p className="mb-[14px] text-[15px] text-ink-muted">
        {started ? c.card.emptyHintStarted : c.card.emptyHint}
      </p>
      <div className="grid gap-1.5 border-t border-accent-line pt-[13px] text-[14px]">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-3 text-ink-muted">
            <span>{r.label}</span>
            <b className="num font-normal text-ink">{r.value}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({
  c,
  item,
  onDrop,
}: {
  c: CalcText;
  item: Item;
  onDrop: (src: ItemSource) => void;
}) {
  const text = c.pkg[item.id];
  return (
    <div className="border-b border-accent-line py-[11px] last:border-b-0">
      <div className="flex items-baseline gap-2.5">
        <h3 className="m-0 flex-1 text-[16px] font-semibold tracking-[-0.01em]">{text.name}</h3>
        <span className="num whitespace-nowrap text-[15px]">{formatUZS(PKG[item.id].price)}</span>
        <button
          type="button"
          onClick={() => onDrop(item.src)}
          aria-label={fmt(c.card.remove, { name: text.name })}
          title={c.card.removeTitle}
          // 44px hit area (WCAG 2.5.5) without a 44px-looking button: the glyph
          // stays small, the target does not. -mr keeps the layout unchanged.
          className="-my-3 -mr-2 flex h-11 w-11 flex-none items-center justify-center text-[17px] leading-none text-ink-faint hover:text-flag"
        >
          ×
        </button>
      </div>
      <p className="mt-1 text-[14px] leading-[1.45] text-ink-muted">{text.why}</p>
    </div>
  );
}

function Sums({
  c,
  extras,
  totals,
  term,
}: {
  c: CalcText;
  extras: Addon[];
  totals: Totals;
  term: string;
}) {
  return (
    <dl className="mt-[14px] grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-1.5 border-t border-accent-line pt-[13px] text-[15px]">
      {extras.map((x) => (
        <div key={x.id} className="contents">
          <dt className="m-0 text-ink-muted">{c.addons[x.id].n}</dt>
          <dd className="num m-0 text-right">{formatUZS(x.p)}</dd>
        </div>
      ))}
      <div className="contents">
        <dt className="m-0 font-semibold text-ink">{c.card.total}</dt>
        <dd className="num m-0 text-right text-[22px] tracking-[-0.04em] text-ink">
          {formatUZS(totals.sum)}
        </dd>
      </div>
      <div className="contents">
        <dt className="m-0 text-ink-muted">{c.card.term}</dt>
        <dd className="num m-0 text-right">{term}</dd>
      </div>
      <div className="contents">
        <dt className="m-0 text-ink-muted">{c.card.upfront}</dt>
        <dd className="num m-0 text-right">{formatUZS(totals.upfront)}</dd>
      </div>
      {totals.monthly > 0 && (
        <div className="contents">
          <dt className="m-0 text-ink-muted">{c.card.monthly}</dt>
          <dd className="num m-0 text-right">
            {formatUZS(totals.monthly)}
            {c.card.perMonth}
          </dd>
        </div>
      )}
    </dl>
  );
}

export function ResultCard({ c, started, totals, reasons, term, sysPackage, onDrop, onLadder, onSend }: Props) {
  const { items, extras } = totals;

  // A soft, warm-tinted shadow lifts the card off the cream paper. Colour
  // matched to the paper rather than neutral black, or it greys the warmth out.
  const shell =
    'overflow-hidden rounded-xl border border-accent-line bg-accent-soft shadow-[0_1px_2px_rgba(60,45,20,0.05),0_12px_32px_-16px_rgba(60,45,20,0.28)] lg:sticky lg:top-[72px]';

  if (!items.length) {
    return (
      <aside aria-live="polite" className={shell}>
        <Empty c={c} started={started} />
      </aside>
    );
  }

  const ladder = items.length === 1 && sysPackage ? LADDER[sysPackage] : undefined;
  const single = items.length === 1 ? c.pkg[items[0].id] : null;

  return (
    <aside aria-live="polite" className={shell}>
      <div className="border-b border-accent-line px-[22px] pb-[14px] pt-[18px]">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          {items.length === 1
            ? c.card.fits
            : c.card.set[String(items.length) as '2' | '3' | '4']}
        </p>
        {items.map((i) => (
          <Row key={i.src} c={c} item={i} onDrop={onDrop} />
        ))}
      </div>

      <div className="px-[22px] py-[14px]">
        {single && (
          <ul className="m-0 grid list-none gap-1.5 p-0">
            {single.inc.map((line, i) => (
              <li key={i} className="relative pl-4 text-[14.5px] text-ink-muted">
                <span aria-hidden="true" className="absolute left-0 text-accent-line">
                  –
                </span>
                <RichText text={line} />
              </li>
            ))}
          </ul>
        )}

        <Sums c={c} extras={extras} totals={totals} term={term} />

        {/* The block that separates this from a plain calculator (§3.5). */}
        {reasons.length > 0 && (
          <div className="mt-[14px] border-t border-accent-line pt-[13px]">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
              {c.card.whyTitle}
            </p>
            <ul className="m-0 grid list-none gap-1.5 p-0">
              {reasons.map((line, i) => (
                <li key={i} className="relative pl-4 text-[14px] leading-[1.45] text-ink-muted">
                  <span aria-hidden="true" className="absolute left-0 text-accent-line">
                    →
                  </span>
                  <RichText text={line} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {items.length > 1 && (
          <p className="mt-3 rounded-lg bg-flag-soft px-[13px] py-2.5 text-[13.5px] leading-[1.45] text-ink">
            <b className="font-semibold text-flag">{c.card.stageNoteBold}</b> {c.card.stageNoteRest}
          </p>
        )}

        {ladder && (ladder[0] || ladder[1]) && (
          <div className="mt-[13px] flex flex-wrap gap-2">
            {(['0', '1'] as const).map((side) => {
              const id = ladder[Number(side)];
              if (!id) return null;
              const name = c.pkg[id].name;
              const price = formatUZS(PKG[id].price);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onLadder(id as 'task' | 'dept' | 'all')}
                  // A bare number said nothing about what it buys, and a screen
                  // reader announced only "15 000 000, button".
                  aria-label={fmt(c.card.ladderTo, { name, price })}
                  className="flex min-h-11 flex-col items-start rounded-lg border border-accent-line bg-paper px-3 py-1.5 text-left hover:border-accent"
                >
                  <span className="text-[12px] leading-tight text-ink-muted">{name}</span>
                  <span className="num text-[13px] text-ink">
                    {side === '0' ? '← ' : ''}
                    {price}
                    {side === '1' ? ' →' : ''}
                  </span>
                </button>
              );
            })}
            <span className="self-center text-[13px] text-ink-faint">{c.card.ladderNote}</span>
          </div>
        )}
      </div>

      <div className="px-[22px] pb-4">
        <button
          type="button"
          onClick={(e) => onSend(e.currentTarget)}
          className="block w-full cursor-pointer rounded-[9px] bg-accent px-[18px] py-[13px] text-center text-[15px] font-semibold text-accent-ink hover:opacity-90"
        >
          {c.card.cta}
        </button>
      </div>

      <div className="grid gap-1.5 border-t border-accent-line px-[22px] pb-4 pt-[13px]">
        {c.card.guarantees.map((g) => (
          <div key={g} className="relative pl-[19px] text-[13.5px] text-ink-muted">
            <span aria-hidden="true" className="absolute left-0 font-semibold text-ok">
              ✓
            </span>
            {g}
          </div>
        ))}
      </div>
    </aside>
  );
}

/** The quote text that travels with the enquiry, in the visitor's language. */
export function summarise(c: CalcText, state: CalcState, totals: Totals, term: string): string {
  const lines = totals.items.map((i) => c.pkg[i.id].name);
  for (const x of ADDONS.filter((a) => state.addons[a.id])) lines.push(`+ ${c.addons[x.id].n}`);
  lines.push(fmt(c.summary.total, { sum: formatUZS(totals.sum) }));
  if (term) lines.push(fmt(c.summary.term, { term }));
  if (totals.monthly) lines.push(fmt(c.summary.monthly, { sum: formatUZS(totals.monthly) }));
  return lines.join('\n');
}
