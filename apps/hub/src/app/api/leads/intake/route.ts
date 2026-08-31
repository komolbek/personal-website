import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const INTAKE_SECRET_HEADER = 'x-intake-secret';

// Enquiries from necto.uz are not tied to any of the SaaS products, but a lead
// must belong to one and Hub lists leads only underneath a product.
const WEBSITE_PRODUCT_SLUG = 'necto';

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

// HubLead has no columns for email, service, budget or campaign data. The
// queryable copy of all of it stays on the website's ContactSubmission; what
// lands here is what the founder needs to read when working the lead.
function buildNotes(payload: IntakePayload, message: string): string {
  const lines = [message, ''];

  const detail: [string, string | null][] = [
    ['Email', str(payload.email)],
    ['Service', str(payload.service)],
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

    const product = await prisma.hubProduct.findUnique({
      where: { slug: WEBSITE_PRODUCT_SLUG },
      select: { id: true },
    });

    if (!product) {
      console.error(
        `Lead intake failed: no hub product with slug "${WEBSITE_PRODUCT_SLUG}".`
      );
      return NextResponse.json(
        { error: 'Website product missing' },
        { status: 500 }
      );
    }

    const lead = await prisma.hubLead.create({
      data: {
        productId: product.id,
        // The lead is the company where one is named; the person is the contact.
        name: str(payload.company) || name,
        contactPerson: name,
        phone,
        source: 'WEBSITE',
        notes: buildNotes(payload, message),
      },
      select: { id: true },
    });

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Lead intake error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
