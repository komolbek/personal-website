import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Settings, UserCog } from 'lucide-react';
import { getServerT } from '@/lib/i18n/server';

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect('/login');
  const t = getServerT();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
        <p className="text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

      {/* Current User */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> {t('settings.yourProfile')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <span className="text-muted-foreground">{t('common.name')}</span>
              <p className="font-medium">{session.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">{t('common.email')}</span>
              <p className="font-medium">{session.email}</p>
            </div>
            <div>
              <span className="text-muted-foreground">{t('common.role')}</span>
              <p><StatusBadge status={session.role} /></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User management moved to its own page (Admin only) */}
      {session.role === 'ADMIN' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <UserCog className="h-4 w-4" /> {t('settings.usersAndRoles')}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {t('settings.manageUsersHint')}
            </p>
            <Button asChild size="sm">
              <Link href="/users">{t('settings.manageUsers')}</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
