'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ADDONS,
  AREAS,
  DATA_IDS,
  EMPTY_STATE,
  PKG,
  SITE_KIND_IDS,
  SIZE_IDS,
  SUPPORT,
  anyArea,
  anyData,
  autoAddons,
  buildReasons,
  computeTotals,
  formatUZS,
  sysCount,
  sysPkg,
  type AddonId,
  type AreaId,
  type CalcState,
  type DataId,
  type ItemSource,
  type PkgId,
  type SiteKindId,
  type SizeId,
  type SupportId,
} from '@/config/calculator';
import { useLocale } from '@/hooks/useLocale';
import { fmt } from '@/locales/calc';
import { getAttribution } from '@/lib/attribution';
import { scrollBehavior } from '@/lib/motion';
import { trackCalc } from '@/lib/calc-analytics';
import { MobileBar } from './MobileBar';
import { MultiChips, SingleChips } from './Chips';
import { QuoteDialog } from './QuoteDialog';
import { ResultCard, summarise } from './ResultCard';

function Question({
  num,
  title,
  hint,
  done,
  children,
}: {
  num: number;
  title: string;
  hint?: string;
  done: boolean;
  children: React.ReactNode;
}) {
  // The first question is where the page wants you to start, so it carries more
  // weight than the ones that appear as you go. Nothing else on the screen
  // competes for that job now that the header link is quiet.
  const first = num === 1;

  return (
    <div className="border-t border-line py-[18px] first:border-t-line-strong">
      {/* Wraps rather than squeezing the title into a column at 320px. */}
      {/* div, not p: a heading inside a paragraph is invalid and the browser
          would close the paragraph early, breaking this row. */}
      <div className="mb-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span
          className={`num flex-none text-[12px] ${
            done ? 'text-ok' : first ? 'text-accent' : 'text-ink-faint'
          }`}
        >
          {String(num).padStart(2, '0')}
        </span>
        {/* A heading, not bold text: these are the page's main interaction and
            were missing from the outline entirely, so screen-reader users had
            no way to move between them. */}
        <h2
          className={`m-0 ${first ? 'text-[19px] font-semibold tracking-[-0.02em]' : 'text-[16px] font-semibold'}`}
        >
          {title}
        </h2>
        {hint && <em className="ml-auto not-italic text-[13px] text-ink-faint">{hint}</em>}
      </div>
      {children}
    </div>
  );
}

export function Calculator() {
  const { t } = useLocale();
  const c = t.calc;
  const [state, setState] = useState<CalcState>(EMPTY_STATE);
  const [dialog, setDialog] = useState(false);
  const started = useRef(false);
  // So focus can go back where it came from when the dialog closes.
  const quoteTrigger = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const totals = useMemo(() => computeTotals(state), [state]);
  const hasResult = totals.items.length > 0;
  const sysPackage = sysPkg(state);

  // Options carry ids only; the labels come from the dictionary, so switching
  // language re-labels every chip without touching the answers.
  const areaOpts = useMemo(() => AREAS.map((a) => ({ v: a.v, t: c.areas[a.v] })), [c]);
  const sizeOpts = useMemo(() => SIZE_IDS.map((v) => ({ v, t: c.sizes[v] })), [c]);
  const kindOpts = useMemo(() => SITE_KIND_IDS.map((v) => ({ v, t: c.siteKinds[v] })), [c]);
  const dataOpts = useMemo(() => DATA_IDS.map((v) => ({ v, t: c.dataLocations[v] })), [c]);
  const supportOpts = useMemo(
    () => SUPPORT.map((s) => ({ v: s.v, t: fmt(c.support[s.v], { price: formatUZS(s.p) }) })),
    [c]
  );

  // One item keeps its own wording; several run in parallel, so the term is the
  // longest of them.
  const term = !hasResult
    ? ''
    : totals.items.length > 1
      ? fmt(c.card.termMulti, { weeks: totals.weeks })
      : c.pkg[totals.items[0].id].term;

  const reasons = useMemo(
    () =>
      buildReasons(state).map((r) => {
        const names = (r.areas ?? []).map((a) => c.areaShort[a]);
        const joined = r.join === 'and' ? names.join(` ${c.andWord} `) : names.join(', ');
        return fmt(c.reasons[r.key], { areas: joined });
      }),
    [state, c]
  );

  // calc_result — fired when the quoted set or the total actually changes,
  // not on every keystroke of state.
  const resultKey = hasResult ? `${totals.items.map((i) => i.id).join('+')}|${totals.sum}` : '';
  useEffect(() => {
    if (!resultKey) return;
    const [packages, total] = resultKey.split('|');
    trackCalc('calc_result', { packages, total: Number(total) });
  }, [resultKey]);

  /**
   * Re-applies the add-ons implied by question 04. Anything the visitor ticked
   * by hand is left alone, and anything they removed stays removed (§3.4).
   */
  const withAuto = useCallback((next: CalcState): CalcState => {
    const wanted = new Set(autoAddons(next).filter((id) => !next.dismissed[id]));
    const addons = { ...next.addons };
    const auto: Partial<Record<AddonId, boolean>> = {};

    for (const id of ['migr', '1c'] as const) {
      if (wanted.has(id)) {
        if (!addons[id] || next.auto[id]) auto[id] = true;
        addons[id] = true;
      } else if (next.auto[id]) {
        delete addons[id];
      }
    }
    return { ...next, addons, auto };
  }, []);

  const toggleArea = (v: AreaId) => {
    if (!started.current) {
      started.current = true;
      trackCalc('calc_start');
    }
    setState((s) => {
      const areas = { ...s.areas, [v]: !s.areas[v] };
      const next: CalcState = { ...s, areas, sysOverride: null };
      if (!AREAS.some((a) => a.k === 'sys' && areas[a.v])) next.size = null;
      if (!areas.site) next.siteKind = null;
      trackCalc('calc_area', {
        areas: AREAS.filter((a) => areas[a.v]).map((a) => a.v).join(',') || '(none)',
      });
      return withAuto(next);
    });
  };

  const toggleData = (v: DataId) =>
    setState((s) => withAuto({ ...s, data: { ...s.data, [v]: !s.data[v] } }));

  const toggleAddon = (id: AddonId) =>
    setState((s) => {
      const on = !s.addons[id];
      const auto = { ...s.auto };
      delete auto[id];
      return {
        ...s,
        addons: { ...s.addons, [id]: on },
        auto,
        // Switching an auto-added item off must be final for this visit.
        dismissed: on ? s.dismissed : { ...s.dismissed, [id]: true },
      };
    });

  const drop = (src: ItemSource) => {
    trackCalc('calc_drop', { item: src });
    setState((s) => {
      const areas = { ...s.areas };
      const next: CalcState = { ...s, areas, sysOverride: null };
      if (src === 'sys') {
        for (const a of AREAS) if (a.k === 'sys') areas[a.v] = false;
        next.size = null;
      } else {
        areas[src] = false;
        if (src === 'site') next.siteKind = null;
      }
      return withAuto(next);
    });
  };

  const ladder = (to: Extract<PkgId, 'task' | 'dept' | 'all'>) => {
    trackCalc('calc_ladder', { to, price: PKG[to].price });
    setState((s) => ({ ...s, sysOverride: to }));
  };

  const submit = async (contact: string): Promise<boolean> => {
    const answers = [
      fmt(c.summary.areas, {
        v: AREAS.filter((a) => state.areas[a.v]).map((a) => c.areas[a.v]).join('; ') || '—',
      }),
      state.size ? fmt(c.summary.size, { v: c.sizes[state.size] }) : null,
      state.siteKind ? fmt(c.summary.kind, { v: c.siteKinds[state.siteKind] }) : null,
      anyData(state)
        ? fmt(c.summary.data, {
            v: DATA_IDS.filter((d) => state.data[d]).map((d) => c.dataLocations[d]).join('; '),
          })
        : null,
      state.support
        ? fmt(c.summary.support, {
            v: fmt(c.support[state.support], {
              price: formatUZS(SUPPORT.find((x) => x.v === state.support)?.p ?? 0),
            }),
          })
        : null,
    ].filter(Boolean);

    const message = [
      c.summary.heading,
      '',
      summarise(c, state, totals, term),
      '',
      c.summary.answers,
      ...answers,
    ].join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: contact,
          message,
          service: totals.items.map((i) => i.id).join('+'),
          budget: `${formatUZS(totals.sum)} ${c.currency}`,
          ...getAttribution(),
        }),
      });
      if (!res.ok) return false;
      const packages = totals.items.map((i) => i.id).join('+');
      trackCalc('calc_submit', { total: totals.sum, packages });
      window.fbq?.('track', 'Lead', { content_name: packages });
      window.gtag?.('event', 'generate_lead', { event_category: 'calculator' });
      return true;
    } catch {
      return false;
    }
  };

  // Question numbers count only the visible questions — no gaps (§3.2).
  let n = 0;
  const showSize = sysCount(state) > 0;
  const showKind = !!state.areas.site;

  return (
    <>
      <div // pb clears the result card before the panels' rule. pb-2 put the rule
        // directly under the card's bottom edge, so it read as running through it.
        className="grid items-start gap-0 pb-10 pt-6 lg:grid-cols-[1fr_384px] lg:gap-[38px]">
        <form onSubmit={(e) => e.preventDefault()}>
          <Question num={++n} title={c.q.area.t} hint={c.q.area.hint} done={anyArea(state)}>
            <MultiChips
              options={areaOpts}
              selected={state.areas}
              onToggle={toggleArea}
              label={c.q.area.t}
            />
          </Question>

          {showSize && (
            <Question num={++n} title={c.q.size.t} done={!!state.size}>
              <SingleChips
                options={sizeOpts}
                value={state.size}
                onPick={(v: SizeId | null) => setState((s) => ({ ...s, size: v, sysOverride: null }))}
                label={c.q.size.t}
              />
            </Question>
          )}

          {showKind && (
            <Question num={++n} title={c.q.kind.t} done={!!state.siteKind}>
              <SingleChips
                options={kindOpts}
                value={state.siteKind}
                onPick={(v: SiteKindId | null) => setState((s) => ({ ...s, siteKind: v }))}
                label={c.q.kind.t}
              />
            </Question>
          )}

          {hasResult && (
            <>
              <Question num={++n} title={c.q.data.t} hint={c.q.data.hint} done={anyData(state)}>
                <MultiChips
                  options={dataOpts}
                  selected={state.data}
                  onToggle={toggleData}
                  label={c.q.data.t}
                />
              </Question>

              <Question
                num={++n}
                title={c.q.addon.t}
                hint={c.q.addon.hint}
                done={ADDONS.some((a) => state.addons[a.id])}
              >
                <div className="border-t border-line">
                  {ADDONS.map((x) => {
                    const on = !!state.addons[x.id];
                    return (
                      <label
                        key={x.id}
                        className="grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-line px-1 py-[11px] hover:bg-paper-alt"
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggleAddon(x.id)}
                          className="m-0 h-4 w-4 accent-[var(--accent)]"
                        />
                        <span className={`text-[15px] ${on ? 'font-semibold' : ''}`}>
                          {c.addons[x.id].n}
                          {state.auto[x.id] && (
                            <span className="ml-[7px] text-[12px] font-semibold text-ok">
                              {c.card.autoLabel}
                            </span>
                          )}
                          <small className="block text-[13px] font-normal text-ink-faint">
                            {c.addons[x.id].s}
                          </small>
                        </span>
                        <span
                          className={`num whitespace-nowrap text-[14px] ${on ? 'text-ink' : 'text-ink-muted'}`}
                        >
                          +{formatUZS(x.p)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </Question>

              <Question num={++n} title={c.q.support.t} hint={c.q.support.hint} done={!!state.support}>
                <SingleChips
                  options={supportOpts}
                  value={state.support}
                  onPick={(v: SupportId | null) => setState((s) => ({ ...s, support: v }))}
                  label={c.q.support.t}
                />
              </Question>
            </>
          )}
        </form>

        <div ref={cardRef} className="mt-6 lg:mt-0">
          <ResultCard
            c={c}
            started={anyArea(state)}
            totals={totals}
            reasons={reasons}
            term={term}
            sysPackage={sysPackage}
            onDrop={drop}
            onLadder={ladder}
            onSend={(el) => {
              quoteTrigger.current = el;
              setDialog(true);
            }}
          />
        </div>
      </div>

      <MobileBar
        visible={hasResult}
        name={
          totals.items.length === 1
            ? c.pkg[totals.items[0].id].name
            : c.mobile.parts[String(totals.items.length) as '2' | '3' | '4']
        }
        sum={`${formatUZS(totals.sum)} ${c.currency}`}
        label={c.mobile.show}
        onShow={() => cardRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })}
      />

      <QuoteDialog
        c={c}
        open={dialog}
        summary={summarise(c, state, totals, term)}
        restoreFocusTo={quoteTrigger}
        onClose={() => setDialog(false)}
        onSubmit={submit}
      />
    </>
  );
}
