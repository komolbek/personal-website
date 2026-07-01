'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  DollarSign,
  Users,
  UserCog,
  Settings,
  X,
  Menu,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '@/components/i18n/I18nProvider';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

const navItems = [
  { href: '/', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { href: '/projects', labelKey: 'nav.projects', icon: FolderKanban },
  { href: '/products', labelKey: 'nav.products', icon: Package },
  { href: '/finances', labelKey: 'nav.finances', icon: DollarSign },
  { href: '/contacts', labelKey: 'nav.contacts', icon: Users },
  { href: '/users', labelKey: 'nav.users', icon: UserCog },
  { href: '/settings', labelKey: 'nav.settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const nav = (
    <nav className="flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-bold">{t('brand.title')}</h1>
          <LanguageSwitcher />
        </div>
        <p className="text-xs text-muted-foreground mt-1">{t('brand.subtitle')}</p>
      </div>

      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive(item.href)
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {t(item.labelKey)}
          </Link>
        ))}
      </div>

      <div className="p-3 border-t">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {t('nav.logout')}
          </button>
        </form>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-background border shadow-sm"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-accent"
        >
          <X className="h-4 w-4" />
        </button>
        {nav}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block lg:w-64 lg:border-r lg:bg-background">
        {nav}
      </aside>
    </>
  );
}
