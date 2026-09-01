import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createHubLeadFromWebsite } from '@/lib/hub-lead';
import { notifyNewEnquiry } from '@/lib/telegram-notify';

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

    await prisma.contactSubmission.create({
      data: {
        name,
        email: email || null,
        phone,
        company: company || null,
        service: service || null,
        budget: budget || null,
        message,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        utmContent: utmContent || null,
        utmTerm: utmTerm || null,
        referrer: referrer || null,
      },
    });

    // The enquiry is already durable at this point. Hub is a separate concern:
    // if it fails, the submission still stands and can be entered by hand, so
    // the failure is logged rather than surfaced to the visitor.
    let hubProjectId: string | null = null;
    try {
      hubProjectId = await createHubLeadFromWebsite({
        name,
        phone,
        message,
        email,
        company,
        service,
        budget,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        referrer,
      });
    } catch (hubError) {
      console.error('Contact submission saved but Hub lead creation failed:', hubError);
    }

    // Notify separately from Hub, and never conditionally on it: an enquiry
    // that failed to reach Hub is the one most likely to be missed, so it is
    // the one most worth a message. Failing to notify does not fail the
    // submission either — the enquiry is already durable.
    try {
      await notifyNewEnquiry({
        name,
        phone,
        message,
        email,
        company,
        service,
        budget,
        utmSource,
        referrer,
        hubProjectId,
      });
    } catch (telegramError) {
      console.error('Contact submission saved but Telegram notification failed:', telegramError);
    }

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
