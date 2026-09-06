// The calculator's structure and prices — REDESIGN.md §3.
//
// Prices live here and nowhere else. /pricing (§7) and the Schema.org Offer
// markup read the same objects, so a price cannot drift between the tool that
// quotes it and the page that lists it.
//
// Everything a visitor READS lives in src/locales/calc/* instead (§6.4), keyed
// by the ids below. This file therefore holds no Russian at all: ids, numbers,
// and the rules that turn answers into a package.
//
// NOT CONFIRMED BY THE OWNER. Every figure below is derived from
// Business/necto_90day_retrospective.md and Business/services_and_prices_ru.md
// (project minimum $3,000, ClimateAsia $8,000, rate 12,500). REDESIGN.md §10
// asks the owner to confirm each one before publication.

export type PkgId = 'task' | 'dept' | 'all' | 'mob' | 'docs' | 'land' | 'corp' | 'shop';

export interface Pkg {
  id: PkgId;
  price: number;
  /** Upper bound in weeks, used to combine terms across several items. */
  weeks: number;
}

export const PKG: Record<PkgId, Pkg> = {
  task: { id: 'task', price: 15_000_000, weeks: 2 },
  dept: { id: 'dept', price: 38_000_000, weeks: 6 },
  all: { id: 'all', price: 90_000_000, weeks: 14 },
  mob: { id: 'mob', price: 75_000_000, weeks: 12 },
  docs: { id: 'docs', price: 25_000_000, weeks: 4 },
  land: { id: 'land', price: 5_000_000, weeks: 1 },
  corp: { id: 'corp', price: 9_000_000, weeks: 2 },
  shop: { id: 'shop', price: 14_000_000, weeks: 3 },
};

/** The order the packages are listed in on /pricing and in the markup. */
export const PROGRAM_IDS: PkgId[] = ['task', 'dept', 'all', 'mob', 'docs'];
export const SITE_IDS: PkgId[] = ['land', 'corp', 'shop'];

/** Which system packages sit either side on the price ladder (§3.7). */
export const LADDER: Partial<Record<PkgId, [PkgId | null, PkgId | null]>> = {
  task: [null, 'dept'],
  dept: ['task', 'all'],
  all: ['dept', null],
};

export type AddonId = 'migr' | '1c' | 'bot' | 'pay' | 'train';

export interface Addon {
  id: AddonId;
  p: number;
}

export const ADDONS: readonly Addon[] = [
  { id: 'migr', p: 4_000_000 },
  { id: '1c', p: 6_000_000 },
  { id: 'bot', p: 4_000_000 },
  { id: 'pay', p: 3_000_000 },
  { id: 'train', p: 1_500_000 },
] as const;

export type SupportId = 'no' | 'base' | 'plus';

export const SUPPORT: readonly { v: SupportId; p: number }[] = [
  { v: 'no', p: 0 },
  { v: 'base', p: 3_000_000 },
  { v: 'plus', p: 5_000_000 },
] as const;

/** What the visitor says is going wrong. The first three are "system" areas. */
export type AreaId = 'zayavki' | 'sklad' | 'raspisanie' | 'vyezd' | 'docs' | 'site';
export type AreaKind = 'sys' | 'mob' | 'docs' | 'site';

export const AREAS: readonly { v: AreaId; k: AreaKind }[] = [
  { v: 'zayavki', k: 'sys' },
  { v: 'sklad', k: 'sys' },
  { v: 'raspisanie', k: 'sys' },
  { v: 'vyezd', k: 'mob' },
  { v: 'docs', k: 'docs' },
  { v: 'site', k: 'site' },
] as const;

/** The three system areas, in the order they are shown. */
export const SYS_AREAS = ['zayavki', 'sklad', 'raspisanie'] as const;
export type SysAreaId = (typeof SYS_AREAS)[number];

export type SizeId = 's' | 'm' | 'l';
export const SIZE_IDS: readonly SizeId[] = ['s', 'm', 'l'] as const;

export type SiteKindId = Extract<PkgId, 'land' | 'corp' | 'shop'>;
export const SITE_KIND_IDS: readonly SiteKindId[] = ['land', 'corp', 'shop'] as const;

export type DataId = 'head' | 'excel' | 'prog';
export const DATA_IDS: readonly DataId[] = ['head', 'excel', 'prog'] as const;

// --- state ------------------------------------------------------------------

export interface CalcState {
  areas: Partial<Record<AreaId, boolean>>;
  size: SizeId | null;
  siteKind: SiteKindId | null;
  data: Partial<Record<DataId, boolean>>;
  addons: Partial<Record<AddonId, boolean>>;
  /** Add-ons switched on by the answer to question 04, so they can be labelled. */
  auto: Partial<Record<AddonId, boolean>>;
  /**
   * Auto-added add-ons the visitor has switched off. §3.4: once removed, the
   * item must not come back for them, however they answer question 04 later.
   */
  dismissed: Partial<Record<AddonId, boolean>>;
  support: SupportId | null;
  /** Set when the visitor steps along the price ladder by hand. */
  sysOverride: Extract<PkgId, 'task' | 'dept' | 'all'> | null;
}

export const EMPTY_STATE: CalcState = {
  areas: {},
  size: null,
  siteKind: null,
  data: {},
  addons: {},
  auto: {},
  dismissed: {},
  support: null,
  sysOverride: null,
};

/** Where a quoted item came from, so the "×" can switch the right answer off. */
export type ItemSource = 'sys' | 'vyezd' | 'docs' | 'site';

export interface Item {
  id: PkgId;
  src: ItemSource;
}

// --- selection logic (§3.3) -------------------------------------------------

export function sysCount(s: CalcState): number {
  return AREAS.filter((a) => a.k === 'sys' && s.areas[a.v]).length;
}

/** The ids of the chosen system areas, so the caller can name them in its language. */
export function sysAreaIds(s: CalcState): SysAreaId[] {
  return SYS_AREAS.filter((v) => s.areas[v]);
}

export function hasKind(s: CalcState, k: AreaKind): boolean {
  return AREAS.some((a) => a.k === k && s.areas[a.v]);
}

export function anyArea(s: CalcState): boolean {
  return AREAS.some((a) => s.areas[a.v]);
}

export function anyData(s: CalcState): boolean {
  return DATA_IDS.some((d) => s.data[d]);
}

/**
 * The system package the answers imply, or null when it cannot be decided yet.
 * Returning null before question 02 is answered is deliberate: a result shown
 * on one answer would be a guess presented as a price.
 */
export function sysPkg(s: CalcState): PkgId | null {
  const n = sysCount(s);
  if (!n) return null;
  if (s.sysOverride) return s.sysOverride;
  if (!s.size) return null;
  if (n >= 3) return 'all';
  if (n === 2) return s.size === 's' ? 'dept' : 'all';
  return s.size === 's' ? 'task' : s.size === 'm' ? 'dept' : 'all';
}

export function buildItems(s: CalcState): Item[] {
  const out: Item[] = [];
  const p = sysPkg(s);
  if (p) out.push({ id: p, src: 'sys' });
  if (hasKind(s, 'mob')) out.push({ id: 'mob', src: 'vyezd' });
  if (hasKind(s, 'docs')) out.push({ id: 'docs', src: 'docs' });
  if (hasKind(s, 'site') && s.siteKind) out.push({ id: s.siteKind, src: 'site' });
  return out;
}

/**
 * Add-ons implied by where the data lives now (§3.4). Returns the ids to switch
 * on; the caller keeps anything the visitor chose by hand, and never re-adds
 * one they have removed.
 */
export function autoAddons(s: CalcState): AddonId[] {
  const out: AddonId[] = [];
  if (s.data.excel || s.data.prog) out.push('migr');
  if (s.data.prog) out.push('1c');
  return out;
}

/** Which «Почему так» line applies. The wording lives in src/locales/calc. */
export type ReasonKey =
  | 'threeAreas'
  | 'twoAll'
  | 'twoDept'
  | 'oneTask'
  | 'oneDept'
  | 'big'
  | 'mob'
  | 'docs'
  | 'site'
  | 'excel'
  | 'prog'
  | 'head';

export interface Reason {
  key: ReasonKey;
  /** The system areas to name inside the line, when it takes {areas}. */
  areas?: SysAreaId[];
  /** How to join them: a comma list, or "and". */
  join?: 'comma' | 'and';
}

/**
 * The "Почему так" block (§3.5) — at most four lines, each one pointing at a
 * specific answer. One of them has to make the quote cheaper or shorter, or the
 * block reads as a machine that only adds.
 */
export function buildReasons(s: CalcState): Reason[] {
  const r: Reason[] = [];
  const n = sysCount(s);
  const sp = sysPkg(s);
  const areas = sysAreaIds(s);

  if (sp) {
    if (n >= 3) r.push({ key: 'threeAreas', areas, join: 'comma' });
    else if (n === 2 && sp === 'all') r.push({ key: 'twoAll', areas, join: 'and' });
    else if (n === 2) r.push({ key: 'twoDept' });
    else if (sp === 'task') r.push({ key: 'oneTask', areas, join: 'comma' });
    else if (sp === 'dept') r.push({ key: 'oneDept', areas, join: 'comma' });
    else r.push({ key: 'big' });
  }
  if (hasKind(s, 'mob')) r.push({ key: 'mob' });
  if (hasKind(s, 'docs')) r.push({ key: 'docs' });
  if (hasKind(s, 'site') && s.siteKind) r.push({ key: 'site' });
  if (s.data.excel && !s.data.prog) r.push({ key: 'excel' });
  if (s.data.prog) r.push({ key: 'prog' });
  if (s.data.head && !s.data.excel && !s.data.prog) r.push({ key: 'head' });

  return r.slice(0, 4);
}

// --- totals -----------------------------------------------------------------

export interface Totals {
  items: Item[];
  extras: Addon[];
  /** One-off sum: packages plus add-ons. */
  sum: number;
  /** Monthly support, 0 when not wanted. */
  monthly: number;
  /** Longest package in weeks — the parts run in parallel. */
  weeks: number;
  upfront: number;
}

export function computeTotals(s: CalcState): Totals {
  const items = buildItems(s);
  let sum = 0;
  let weeks = 0;
  for (const i of items) {
    sum += PKG[i.id].price;
    weeks = Math.max(weeks, PKG[i.id].weeks);
  }
  const extras = ADDONS.filter((a) => s.addons[a.id]);
  for (const a of extras) sum += a.p;

  const monthly = SUPPORT.find((x) => x.v === s.support)?.p ?? 0;

  return { items, extras, sum, monthly, weeks, upfront: Math.round(sum / 2) };
}

// --- formatting -------------------------------------------------------------

const NBSP = ' ';

/**
 * Grouped by thousands with non-breaking spaces. Written by hand rather than
 * via toLocaleString so the server and the browser always produce the same
 * string — a locale difference between them is a hydration mismatch.
 */
export function formatUZS(n: number): string {
  const digits = String(Math.round(Math.abs(n)));
  let out = '';
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && (digits.length - i) % 3 === 0) out += NBSP;
    out += digits[i];
  }
  return n < 0 ? '−' + out : out;
}
