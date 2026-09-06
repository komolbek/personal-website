'use client';

/**
 * The two answer controls. Both are plain <button aria-pressed>, so the whole
 * calculator is reachable with Tab and Space alone (REDESIGN.md §9, stage 5).
 */

interface Option<T extends string> {
  v: T;
  t: string;
}

const base =
  'inline-flex items-center gap-2 rounded-[9px] border px-[15px] py-[9px] text-[15px] leading-[1.35] ' +
  'transition-colors cursor-pointer';
const off = 'border-line-strong bg-paper text-ink hover:border-accent hover:bg-accent-soft';
const on = 'border-accent bg-accent text-accent-ink font-medium';

function Tick({ pressed, round }: { pressed: boolean; round?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        'grid h-[15px] w-[15px] flex-none place-items-center border-[1.5px] text-[10px]',
        round ? 'rounded-full' : 'rounded',
        pressed ? 'border-accent-ink bg-accent-ink text-accent' : 'border-line-strong text-transparent',
      ].join(' ')}
    >
      ✓
    </span>
  );
}

export function MultiChips<T extends string>({
  options,
  selected,
  onToggle,
  label,
}: {
  options: readonly Option<T>[];
  selected: Partial<Record<T, boolean>>;
  onToggle: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const pressed = !!selected[o.v];
        return (
          <button
            key={o.v}
            type="button"
            aria-pressed={pressed}
            onClick={() => onToggle(o.v)}
            className={`${base} ${pressed ? on : off}`}
          >
            <Tick pressed={pressed} />
            <span>{o.t}</span>
          </button>
        );
      })}
    </div>
  );
}

export function SingleChips<T extends string>({
  options,
  value,
  onPick,
  label,
}: {
  options: readonly Option<T>[];
  value: T | null;
  onPick: (v: T | null) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const pressed = value === o.v;
        return (
          <button
            key={o.v}
            type="button"
            aria-pressed={pressed}
            onClick={() => onPick(pressed ? null : o.v)}
            className={`${base} ${pressed ? on : off}`}
          >
            <Tick pressed={pressed} round />
            <span>{o.t}</span>
          </button>
        );
      })}
    </div>
  );
}
