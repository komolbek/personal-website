'use client';

/**
 * The sticky sum on narrow screens (REDESIGN.md §3.7). Without it the result
 * card sits below the fold and every tap looks like nothing happened — the
 * worst bug in the first version of the prototype.
 *
 * Rendered only under the 1024px breakpoint, where the card stops being sticky
 * beside the questions and moves underneath them.
 */
export function MobileBar({
  visible,
  name,
  sum,
  label,
  onShow,
}: {
  visible: boolean;
  name: string;
  sum: string;
  label: string;
  onShow: () => void;
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-strong bg-paper px-5 py-2.5 shadow-[0_-2px_14px_rgba(0,0,0,0.07)] lg:hidden">
      <div className="mx-auto flex max-w-[1060px] items-center gap-3.5">
        <span className="min-w-0 flex-1">
          <b className="block truncate text-[13px] font-normal text-ink-muted">{name}</b>
          <span className="num text-[16px] text-ink">{sum}</span>
        </span>
        <button
          type="button"
          onClick={onShow}
          className="flex-none cursor-pointer rounded-[9px] bg-accent px-[17px] py-[11px] text-[14px] font-semibold text-accent-ink"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
