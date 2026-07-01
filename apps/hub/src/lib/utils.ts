import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (currency === 'UZS') {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(amount) + ' UZS';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: Date | string | null): string {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function daysUntil(date: Date | string | null): number | null {
  if (!date) return null;
  const target = new Date(date);
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // User roles
    ADMIN: 'bg-purple-100 text-purple-700',
    MANAGER: 'bg-blue-100 text-blue-700',
    VIEWER: 'bg-gray-100 text-gray-700',
    // Project statuses
    LEAD: 'bg-gray-100 text-gray-700',
    PROPOSAL: 'bg-blue-100 text-blue-700',
    NEGOTIATING: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-indigo-100 text-indigo-700',
    FROZEN: 'bg-cyan-100 text-cyan-700',
    DELIVERED: 'bg-green-100 text-green-700',
    PAID: 'bg-emerald-100 text-emerald-700',
    LOST: 'bg-red-100 text-red-700',
    // Lead statuses
    NOT_CONTACTED: 'bg-gray-100 text-gray-700',
    CONTACTED: 'bg-blue-100 text-blue-700',
    DEMO_SCHEDULED: 'bg-purple-100 text-purple-700',
    DEMO_DONE: 'bg-violet-100 text-violet-700',
    TRIAL: 'bg-amber-100 text-amber-700',
    SIGNED: 'bg-emerald-100 text-emerald-700',
    // Payment statuses
    ACTIVE: 'bg-green-100 text-green-700',
    OVERDUE: 'bg-red-100 text-red-700',
    CHURNED: 'bg-gray-100 text-gray-700',
    // Product statuses
    PARKED: 'bg-yellow-100 text-yellow-700',
    ARCHIVED: 'bg-gray-100 text-gray-700',
    // Milestone statuses
    PENDING: 'bg-gray-100 text-gray-700',
    INVOICED: 'bg-yellow-100 text-yellow-700',
    // Quote/Contract statuses
    DRAFT: 'bg-gray-100 text-gray-700',
    SENT: 'bg-blue-100 text-blue-700',
    ACCEPTED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}
