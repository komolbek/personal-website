'use client';

// Error boundary for every page under app/.
//
// It exists mainly for requireRole(): the server actions in src/lib/*-actions.ts
// throw when the caller lacks the role, and without a boundary that surfaces as
// Next's bare error screen with no indication of what happened. The UI hides
// those controls from users who would trip it, so this should stay dormant —
// but it is reachable from a page left open across a role change.
//
// It does NOT say "forbidden" specifically, and cannot: in production Next
// replaces server error messages with a generic string and gives only a digest,
// so 'Forbidden' never reaches the browser. The digest is shown instead, which
// is what ties a report back to the server log. The real message is rendered in
// development only, where Next passes it through.

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/components/i18n/I18nProvider';

export default function HubError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    // Server errors arrive here already logged on the server; this covers the
    // client-side ones, which otherwise leave no trace.
    console.error('Hub error boundary:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-lg w-full">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <h1 className="text-xl font-semibold">{t('error.title')}</h1>
          </div>

          <p className="text-sm text-muted-foreground">{t('error.body')}</p>

          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono">
              {t('error.reference', { digest: error.digest })}
              <span className="block font-sans mt-1">{t('error.referenceHint')}</span>
            </p>
          )}

          {process.env.NODE_ENV !== 'production' && error.message && (
            <pre className="text-xs bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap">
              {error.message}
            </pre>
          )}

          <div className="flex items-center gap-2 pt-2">
            <Button onClick={reset}>{t('error.retry')}</Button>
            <Link href="/">
              <Button variant="outline">{t('error.home')}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
