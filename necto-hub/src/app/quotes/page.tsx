import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default async function QuotesPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const quotes = await prisma.hubQuote.findMany({
    include: { project: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quotes</h1>
          <p className="text-muted-foreground">Generated price quotes for clients</p>
        </div>
        <Link href="/calculator">
          <Button>New Quote</Button>
        </Link>
      </div>

      {quotes.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-12 w-12" />}
          title="No quotes yet"
          description="Use the pricing calculator to generate your first quote."
          action={
            <Link href="/calculator">
              <Button>Open Calculator</Button>
            </Link>
          }
        />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">Client</th>
                  <th className="text-left p-3 font-medium">Project</th>
                  <th className="text-left p-3 font-medium">Total</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Valid Until</th>
                  <th className="text-left p-3 font-medium">Created</th>
                  <th className="p-3 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id} className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">{quote.clientName}</td>
                    <td className="p-3">{quote.project?.name || '—'}</td>
                    <td className="p-3 font-medium">{formatCurrency(quote.totalPrice)}</td>
                    <td className="p-3"><StatusBadge status={quote.status} /></td>
                    <td className="p-3">{formatDate(quote.validUntil)}</td>
                    <td className="p-3">{formatDate(quote.createdAt)}</td>
                    <td className="p-3">
                      <Link href={`/quotes/${quote.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
