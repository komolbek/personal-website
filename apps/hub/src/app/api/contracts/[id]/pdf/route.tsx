import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { ContractPDF } from '@/components/pdf/ContractPDF';
import { getServerT, getLocale } from '@/lib/i18n/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const contract = await prisma.hubContract.findUnique({
    where: { id: params.id },
    include: { project: true },
  });

  if (!contract) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const locale = getLocale();
  const t = getServerT(locale);

  const buffer = await renderToBuffer(
    <ContractPDF
      t={t}
      locale={locale}
      contract={{
        clientName: contract.clientName,
        clientContact: contract.clientContact,
        projectName: contract.project.name,
        scopeDescription: contract.scopeDescription,
        totalPrice: contract.totalPrice,
        currency: contract.currency,
        paymentTerms: contract.paymentTerms,
        startDate: contract.startDate,
        deadline: contract.deadline,
        signedDate: contract.signedDate,
        createdAt: contract.createdAt,
      }}
    />
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="contract-${contract.clientName.replace(/\s+/g, '-').toLowerCase()}.pdf"`,
    },
  });
}
