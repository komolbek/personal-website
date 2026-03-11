'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, title, children, className }: DialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          'relative z-50 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg border bg-background p-6 shadow-lg animate-in fade-in-0 zoom-in-95',
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

interface DialogTriggerButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm';
}

export function DialogTriggerButton({ children, onClick, className, variant = 'default', size = 'sm' }: DialogTriggerButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  const variantClasses = variant === 'outline'
    ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
    : 'bg-primary text-primary-foreground hover:bg-primary/90';
  const sizeClasses = size === 'sm' ? 'h-9 px-3' : 'h-10 px-4 py-2';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseClasses, variantClasses, sizeClasses, className)}
    >
      {children}
    </button>
  );
}
