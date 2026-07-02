import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { QuotePDF } from '@/components/pdf/QuotePDF';
import { getServerT, getLocale } from '@/lib/i18n/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const quote = await prisma.hubQuote.findUnique({
    where: { id: params.id },
    include: { project: true },
  });

  if (!quote) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const items = (quote.items as any[]) || [];
  const locale = getLocale();
  const t = getServerT(locale);

  const buffer = await renderToBuffer(
    <QuotePDF
      t={t}
      locale={locale}
      quote={{
        clientName: quote.clientName,
        clientPhone: quote.clientPhone,
        projectName: quote.project?.name || null,
        items,
        basePrice: quote.basePrice,
        totalPrice: quote.totalPrice,
        currency: quote.currency,
        rushFeeApplied: quote.rushFeeApplied,
        rushFeePercent: quote.rushFeePercent,
        discountPercent: quote.discountPercent,
        validUntil: quote.validUntil,
        createdAt: quote.createdAt,
      }}
    />
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="quote-${quote.clientName.replace(/\s+/g, '-').toLowerCase()}.pdf"`,
    },
  });
}
