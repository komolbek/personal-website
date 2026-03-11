import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { logActivity } from '@/lib/activity';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role === 'VIEWER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { status, slug } = await req.json();
  const id = params.id;

  const lead = await prisma.hubLead.update({
    where: { id },
    data: { status, lastContact: new Date() },
  });

  await logActivity('moved', 'lead', id, lead.name, `Status changed to ${status}`);

  // Auto-create client when signed
  if (status === 'SIGNED') {
    const lead = await prisma.hubLead.findUnique({ where: { id } });
    if (lead) {
      const existingClient = await prisma.hubClient.findUnique({ where: { leadId: id } });
      if (!existingClient) {
        await prisma.hubClient.create({
          data: {
            productId: lead.productId,
            leadId: lead.id,
            name: lead.name,
            contactPerson: lead.contactPerson,
            phone: lead.phone,
          },
        });
      }
    }
  }

  revalidatePath(`/products/${slug}/leads`);
  return NextResponse.json({ success: true });
}
