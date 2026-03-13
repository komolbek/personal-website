import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Resolve or create contact
    let contactId = data.contactId || null;
    if (!contactId && data.clientName?.trim()) {
      // Auto-create a contact for new clients
      const contact = await prisma.hubContact.create({
        data: {
          name: data.clientName.trim(),
          phone: data.clientPhone || null,
          type: 'POTENTIAL',
        },
      });
      contactId = contact.id;
    }

    const quote = await prisma.hubQuote.create({
      data: {
        clientName: data.clientName,
        clientPhone: data.clientPhone || null,
        contactId,
        items: data.items,
        basePrice: data.basePrice,
        totalPrice: data.totalPrice,
        rushFeeApplied: data.rushFeeApplied || false,
        rushFeePercent: data.rushFeePercent || null,
        discountPercent: data.discountPercent || null,
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
        projectId: data.projectId || null,
      },
    });

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Quote creation error:', error);
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
}
