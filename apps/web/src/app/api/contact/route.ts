import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface ContactFormData {
  name: string;
  email?: string;
  message: string;
  company?: string;
  phone: string;
  service?: string;
  budget?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message, company, phone, service, budget, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, referrer } = body;

    // Validate required fields (phone is now required, email is optional)
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation (only if provided)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }
    }

    // Build UTM metadata string for storage
    const utmParts = [
      utmSource && `source=${utmSource}`,
      utmMedium && `medium=${utmMedium}`,
      utmCampaign && `campaign=${utmCampaign}`,
      utmContent && `content=${utmContent}`,
      utmTerm && `term=${utmTerm}`,
      referrer && `referrer=${referrer}`,
    ].filter(Boolean).join('|');

    // Save to database — UTM data appended to message for now (no schema migration needed)
    const messageWithUtm = utmParts
      ? `${message}\n\n---\nLead source: ${utmParts}`
      : message;

    await prisma.contactSubmission.create({
      data: {
        name,
        email: email || null,
        phone,
        company: company || null,
        service: service || null,
        budget: budget || null,
        message: messageWithUtm,
      },
    });

    // Log for development
    console.log('Contact form submission saved:', {
      name,
      phone,
      ...(email && { email }),
      ...(company && { company }),
      ...(service && { service }),
      ...(budget && { budget }),
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to send message', detail: process.env.NODE_ENV !== 'production' ? message : undefined },
      { status: 500 }
    );
  }
}
