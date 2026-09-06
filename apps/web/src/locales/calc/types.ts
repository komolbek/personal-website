// Every string the redesigned pages show — REDESIGN.md §6.4.
//
// src/config/calculator.ts keeps the structure (ids, prices, weeks, the rules
// that pick a package). Everything a visitor reads lives here, in all three
// languages, so nothing is hardcoded in a component.
//
// Placeholders are written as {name} and filled by fmt() in ./index.

import type {
  AddonId,
  AreaId,
  DataId,
  PkgId,
  SiteKindId,
  SizeId,
  SupportId,
} from '@/config/calculator';

export interface PkgText {
  name: string;
  /** Shown as written when a single item is quoted, e.g. «4–6 недель». */
  term: string;
  why: string;
  inc: [string, string, string, string];
}

export interface CalcText {
  /**
   * What this company makes, stated before anything else. Without it the H1
   * promises a price for something the visitor cannot name — Krug's first
   * home-page question, "what is this?", went unanswered.
   */
  eyebrow: string;
  h1: string;
  intro: string;
  /** «сум» — the currency word shown beside a figure. */
  currency: string;
  /** The conjunction used when two areas are named in a reason line. */
  andWord: string;

  header: {
    wedge: string;
    telegram: string;
  };

  footer: {
    works: string;
    pricing: string;
    blog: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    city: string;
    phoneLabel: string;
  };

  q: {
    area: { t: string; hint: string };
    size: { t: string };
    kind: { t: string };
    data: { t: string; hint: string };
    addon: { t: string; hint: string };
    support: { t: string; hint: string };
  };

  areas: Record<AreaId, string>;
  /** Short forms used inside the «Почему так» lines. */
  areaShort: Record<'zayavki' | 'sklad' | 'raspisanie', string>;
  sizes: Record<SizeId, string>;
  siteKinds: Record<SiteKindId, string>;
  dataLocations: Record<DataId, string>;
  addons: Record<AddonId, { n: string; s: string }>;
  /** {price} is the monthly figure, already formatted. */
  support: Record<SupportId, string>;
  pkg: Record<PkgId, PkgText>;

  card: {
    emptyTitle: string;
    emptyHint: string;
    ranges: { programs: string; sites: string; term: string };
    rangeValues: { programs: string; sites: string; term: string };
    fits: string;
    /**
     * Keyed by how many items are quoted. A whole sentence per count rather
     * than "{n} parts": these are separate things a client can buy one at a
     * time, not components of one system, and the old wording implied the
     * opposite. Only 2–4 can occur (one system package plus at most a mobile
     * app, document processing and a website).
     */
    set: Record<'2' | '3' | '4', string>;
    whyTitle: string;
    total: string;
    term: string;
    /** Several parts run in parallel, so the term is the longest. Takes {weeks}. */
    termMulti: string;
    upfront: string;
    monthly: string;
    /** Suffix on the monthly figure, e.g. «/мес». */
    perMonth: string;
    /** {name} of the item being removed. */
    remove: string;
    removeTitle: string;
    stageNoteBold: string;
    stageNoteRest: string;
    ladderNote: string;
    cta: string;
    guarantees: [string, string, string];
    autoLabel: string;
  };

  /** Each takes {areas} where the answered directions are named. */
  reasons: {
    threeAreas: string;
    twoAll: string;
    twoDept: string;
    oneTask: string;
    oneDept: string;
    big: string;
    mob: string;
    docs: string;
    site: string;
    excel: string;
    prog: string;
    head: string;
  };

  dialog: {
    title: string;
    lead: string;
    label: string;
    placeholder: string;
    send: string;
    sending: string;
    sentTitle: string;
    sentBody: string;
    close: string;
    error: string;
  };

  mobile: {
    /** Same counts as card.set, shortened for the sticky bar. */
    parts: Record<'2' | '3' | '4', string>;
    show: string;
  };

  tabs: { how: string; price: string; not: string; why: string };

  panels: {
    how: { title: string; items: [string, string, string, string, string] };
    price: {
      programs: string;
      sites: string;
      addons: string;
      support: string;
      base: string;
      plus: string;
    };
    not: { title: string; items: [string, string, string]; budget: string };
    why: { q: string; p1: string; p2: string };
  };

  /** The quote text that travels with the enquiry. */
  summary: {
    heading: string;
    total: string;
    term: string;
    monthly: string;
    answers: string;
    areas: string;
    size: string;
    kind: string;
    data: string;
    support: string;
  };

  pricing: {
    h1: string;
    lead: string;
    hint: string;
    hintLink: string;
    hintTail: string;
    programsTitle: string;
    programsLead: string;
    sitesTitle: string;
    addonsTitle: string;
    addonsLead: string;
    supportTitle: string;
    supportLead: string;
    supportSite: string;
    supportSiteWhat: string;
    supportBase: string;
    supportBaseWhat: string;
    supportPlus: string;
    supportPlusWhat: string;
    perMonth: string;
    notTitle: string;
    notItems: [string, string, string];
    lessTitle: string;
    lessBody: string;
    cta: string;
    colPackage: string;
    colPrice: string;
    colTerm: string;
    captionPrograms: string;
    captionSites: string;
  };

  works: {
    lead: string;
    productsLead: string;
    projectsLead: string;
    /** Link text on a card. */
    open: string;
    /** Section headings on a detail page. */
    overview: string;
    screenshots: string;
    howItWorks: string;
    /** No live link and no confirmed metrics yet — see REDESIGN.md §2.2. */
    categories: Record<string, string>;
  };

  about: {
    h1: string;
    p1: string;
    p2: string;
    productsTitle: string;
    products: { yuridix: string; ordo: string; talimx: string };
    howTitle: string;
    how: [string, string, string, string];
  };
}
