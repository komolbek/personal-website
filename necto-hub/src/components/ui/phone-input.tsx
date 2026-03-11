'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
  name: string;
  defaultValue?: string;
  className?: string;
  id?: string;
}

function formatPhoneDigits(digits: string): string {
  // Format as ## ### ## ##
  let result = '';
  for (let i = 0; i < digits.length && i < 9; i++) {
    if (i === 2 || i === 5 || i === 7) result += ' ';
    result += digits[i];
  }
  return result;
}

function extractDigits(value: string): string {
  // Remove +998 prefix if present, then keep only digits
  const cleaned = value.replace(/^\+?998/, '').replace(/\D/g, '');
  return cleaned.slice(0, 9);
}

export function PhoneInput({ name, defaultValue, className, id }: PhoneInputProps) {
  const initialDigits = defaultValue ? extractDigits(defaultValue) : '';
  const [digits, setDigits] = React.useState(initialDigits);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 9);
    setDigits(raw);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace to work naturally with formatted value
    if (e.key === 'Backspace' && digits.length > 0) {
      e.preventDefault();
      setDigits(digits.slice(0, -1));
    }
  };

  return (
    <div className={cn('flex', className)}>
      <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
        +998
      </span>
      <input
        type="text"
        id={id}
        value={formatPhoneDigits(digits)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="## ### ## ##"
        className="flex h-10 w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <input type="hidden" name={name} value={digits ? `+998${digits}` : ''} />
    </div>
  );
}
