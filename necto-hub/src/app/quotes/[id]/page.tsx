import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Download } from 'lucide-react';

async function updateQuoteStatus(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const status = formData.get('status') as any;

  await prisma.hubQuote.update({ where: { id }, data: { status } });
  revalidatePath(`/quotes/${id}`);
}

export default async function QuoteDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const quote = await prisma.hubQuote.findUnique({
    where: { id: params.id },
    include: { project: true, contact: true },
  });

  if (!quote) notFound();

  const items = (quote.items as any[]) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/quotes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Quote for {quote.clientName}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={quote.status} />
            <span className="text-sm text-muted-foreground">Created {formatDate(quote.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quote Items */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Itemized Quote</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-right p-3 font-medium">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: any, i: number) => (
                    <tr key={i} className="border-b">
                      <td className="p-3">{item.feature}</td>
                      <td className="p-3 text-right font-medium">{formatCurrency(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t bg-muted/30">
                    <td className="p-3 font-medium">Subtotal</td>
                    <td className="p-3 text-right font-medium">{formatCurrency(quote.basePrice)}</td>
                  </tr>
                  {quote.rushFeeApplied && (
                    <tr className="border-t">
                      <td className="p-3 text-amber-600">Rush Fee ({quote.rushFeePercent}%)</td>
                      <td className="p-3 text-right text-amber-600">
                        +{formatCurrency(quote.basePrice * ((quote.rushFeePercent || 0) / 100))}
                      </td>
                    </tr>
                  )}
                  {quote.discountPercent && quote.discountPercent > 0 && (
                    <tr className="border-t">
                      <td className="p-3 text-green-600">Discount ({quote.discountPercent}%)</td>
                      <td className="p-3 text-right text-green-600">
                        -{formatCurrency(quote.totalPrice * (quote.discountPercent / (100 - quote.discountPercent)))}
                      </td>
                    </tr>
                  )}
                  <tr className="border-t-2 bg-muted/50">
                    <td className="p-3 font-bold text-base">Total</td>
                    <td className="p-3 text-right font-bold text-base">{formatCurrency(quote.totalPrice)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quote Details Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Client</span>
              <div className="flex items-center gap-2">
                <p className="font-medium">{quote.clientName}</p>
                {quote.contact && <StatusBadge status={quote.contact.type} />}
              </div>
            </div>
            {quote.clientPhone && (
              <div>
                <span className="text-sm text-muted-foreground">Phone</span>
                <p>{quote.clientPhone}</p>
              </div>
            )}
            {quote.project && (
              <div>
                <span className="text-sm text-muted-foreground">Project</span>
                <p>
                  <Link href={`/projects/${quote.project.id}`} className="text-primary hover:underline">
                    {quote.project.name}
                  </Link>
                </p>
              </div>
            )}
            <div>
              <span className="text-sm text-muted-foreground">Valid Until</span>
              <p>{formatDate(quote.validUntil)}</p>
            </div>

            <div className="border-t pt-4">
              <a href={`/api/quotes/${quote.id}/pdf`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full mb-4">
                  <Download className="h-4 w-4 mr-2" /> Download PDF
                </Button>
              </a>
              <form action={updateQuoteStatus} className="space-y-3">
                <input type="hidden" name="id" value={quote.id} />
                <Label className="text-sm">Update Status</Label>
                <Select
                  name="status"
                  defaultValue={quote.status}
                  options={[
                    { value: 'DRAFT', label: 'Draft' },
                    { value: 'SENT', label: 'Sent' },
                    { value: 'ACCEPTED', label: 'Accepted' },
                    { value: 'REJECTED', label: 'Rejected' },
                  ]}
                />
                <Button type="submit" size="sm" className="w-full">Update</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
