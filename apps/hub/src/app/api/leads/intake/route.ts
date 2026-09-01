import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const INTAKE_SECRET_HEADER = 'x-intake-secret';

interface IntakePayload {
  name?: unknown;
  phone?: unknown;
  message?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  budget?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
  utmTerm?: unknown;
  referrer?: unknown;
}

// The public site and Hub no longer share a database, so this is the boundary
// between them. It authenticates with a shared secret rather than a session:
// the caller is a server, not a person. Unset secret disables the route.
function secretMatches(request: NextRequest): boolean {
  const expected = process.env.HUB_INTAKE_SECRET;
  if (!expected) return false;

  const provided = request.headers.get(INTAKE_SECRET_HEADER);
  if (!provided) return false;

  const expectedBytes = Buffer.from(expected);
  const providedBytes = Buffer.from(provided);
  if (expectedBytes.length !== providedBytes.length) return false;

  return timingSafeEqual(expectedBytes, providedBytes);
}

function str(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

// HubProject has no columns for email, budget or campaign data, so the detail
// that does not map to a column is written where the founder reads it when
// working the enquiry. The queryable copy stays on ContactSubmission.
function buildNotes(payload: IntakePayload, message: string): string {
  const lines = [message, ''];

  const detail: [string, string | null][] = [
    ['Email', str(payload.email)],
    ['Budget', str(payload.budget)],
    ['Campaign source', str(payload.utmSource)],
    ['Campaign medium', str(payload.utmMedium)],
    ['Campaign name', str(payload.utmCampaign)],
    ['Campaign content', str(payload.utmContent)],
    ['Campaign term', str(payload.utmTerm)],
    ['Referrer', str(payload.referrer)],
  ];

  for (const [label, value] of detail) {
    if (value) lines.push(`${label}: ${value}`);
  }

  return lines.join('\n').trim();
}

export async function POST(request: NextRequest) {
  if (!secretMatches(request)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const payload = (await request.json()) as IntakePayload;

    const name = str(payload.name);
    const phone = str(payload.phone);
    const message = str(payload.message);

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'name, phone and message are required' },
        { status: 400 }
      );
    }

    // An enquiry from the website is bespoke work, not a prospect for one of
    // the SaaS products: HubLead belongs to a product and becomes a subscriber
    // with a plan and a monthly fee, which is not what these are. HubProject
    // already models this — it starts at LEAD and carries the enquiry through
    // proposal, quotes and delivery.
    const project = await prisma.hubProject.create({
      data: {
        // The company when the enquiry names one; the person otherwise.
        name: str(payload.company) || name,
        status: 'LEAD',
        type: str(payload.service),
        clientContact: name,
        clientPhone: phone,
        referralSource: str(payload.utmSource) || str(payload.referrer) || 'necto.uz',
        notes: buildNotes(payload, message),
      },
      select: { id: true },
    });

    return NextResponse.json({ id: project.id }, { status: 201 });
  } catch (error) {
    console.error('Lead intake error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
