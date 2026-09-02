import { getSession, requireRole } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { logActivity } from '@/lib/activity';
import type { HubUserRole } from '@necto/db-hub';

// Who may move a lead along its pipeline.
const EDITORS: HubUserRole[] = ['ADMIN', 'MANAGER'];

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();

  // Unlike a server action, this is a route handler: letting requireRole's
  // throw escape would answer a permission problem with a 500. Catch it and
  // map it to a status. Missing session is 401; signed in but without the
  // role is 403 — previously both answered 401, which told a viewer it was
  // not authenticated when it was.
  try {
    requireRole(session, EDITORS);
  } catch {
    return session
      ? NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      : NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
