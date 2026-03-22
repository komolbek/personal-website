'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface AmountInputProps {
  name: string;
  defaultValue?: number | string | null;
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

function formatWithThousands(value: string): string {
  if (!value) return '';
  const parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function stripFormatting(value: string): string {
  return value.replace(/,/g, '');
}

export function AmountInput({ name, defaultValue, placeholder = '0', required, className, id }: AmountInputProps) {
  const initial = defaultValue != null && defaultValue !== '' ? String(defaultValue) : '';
  const [rawValue, setRawValue] = React.useState(initial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stripped = stripFormatting(e.target.value);
    // Allow digits, one decimal point, and up to 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(stripped) || stripped === '') {
      setRawValue(stripped);
    }
  };

  return (
    <div>
      <input
        type="text"
        id={id}
        value={formatWithThousands(rawValue)}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      />
      <input type="hidden" name={name} value={rawValue} />
    </div>
  );
}
