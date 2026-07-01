'use client';

import { cn, getStatusColor } from '@/lib/utils';
import { useI18n } from '@/components/i18n/I18nProvider';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useI18n();
  // enum.* keys map raw enum values to localized labels; fall back to a
  // readable form if a value isn't in the dictionary.
  const key = `enum.${status}`;
  const translated = t(key);
  const label = translated === key ? status.replace(/_/g, ' ') : translated;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        getStatusColor(status),
        className
      )}
    >
      {label}
    </span>
  );
}
