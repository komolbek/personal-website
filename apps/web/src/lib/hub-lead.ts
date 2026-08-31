import { prisma } from './prisma';

// Website enquiries are not about any of the SaaS products in Hub, but
// HubLead.productId is required and Hub lists leads only underneath a product.
// This product exists to hold them; it is seeded by migration.
const WEBSITE_PRODUCT_SLUG = 'necto';

export interface WebsiteLeadInput {
  name: string;
  phone: string;
  message: string;
  email?: string | null;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  referrer?: string | null;
}

// HubLead has no columns for email, service, budget or campaign data, so the
// detail that does not map to a column is written into notes where the founder
// reads it. The queryable copy lives on ContactSubmission.
function buildNotes(input: WebsiteLeadInput): string {
  const lines = [input.message.trim(), ''];

  const detail: [string, string | null | undefined][] = [
    ['Email', input.email],
    ['Service', input.service],
    ['Budget', input.budget],
    ['Campaign source', input.utmSource],
    ['Campaign medium', input.utmMedium],
    ['Campaign name', input.utmCampaign],
    ['Campaign content', input.utmContent],
    ['Campaign term', input.utmTerm],
    ['Referrer', input.referrer],
  ];

  for (const [label, value] of detail) {
    if (value) lines.push(`${label}: ${value}`);
  }

  return lines.join('\n').trim();
}

// Returns the created lead id, or null when no lead could be created. Callers
// must not fail the contact submission on null: a lost Hub lead is recoverable
// from ContactSubmission, a lost enquiry is not.
export async function createHubLeadFromWebsite(
  input: WebsiteLeadInput
): Promise<string | null> {
  const product = await prisma.hubProduct.findUnique({
    where: { slug: WEBSITE_PRODUCT_SLUG },
    select: { id: true },
  });

  if (!product) {
    console.error(
      `Hub lead not created: no hub product with slug "${WEBSITE_PRODUCT_SLUG}".`
    );
    return null;
  }

  const lead = await prisma.hubLead.create({
    data: {
      productId: product.id,
      // HubLead.name identifies the lead itself, which is the company when the
      // enquiry names one; the person goes in contactPerson.
      name: input.company?.trim() || input.name,
      contactPerson: input.name,
      phone: input.phone,
      source: 'WEBSITE',
      notes: buildNotes(input),
    },
    select: { id: true },
  });

  return lead.id;
}
