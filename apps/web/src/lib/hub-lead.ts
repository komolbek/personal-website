// Necto Hub runs against its own database, which this app has no access to by
// design: the public site must not hold write credentials to the internal
// business records. Leads are handed over across an authenticated HTTP
// boundary instead. On Railway the call stays on the private network.

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

// A visitor should never wait on Hub. If it is slow the enquiry is already
// saved, so the request is abandoned rather than held open.
const REQUEST_TIMEOUT_MS = 5000;

// Returns the id of the record Hub created, or null when it could not be
// created. Callers must not fail the contact submission on null: a lost Hub
// record is recoverable from ContactSubmission, a lost enquiry is not.
// Hub records these as projects in LEAD status — bespoke work, not a prospect
// for one of the SaaS products.
export async function createHubLeadFromWebsite(
  input: WebsiteLeadInput
): Promise<string | null> {
  const url = process.env.HUB_INTAKE_URL;
  const secret = process.env.HUB_INTAKE_SECRET;

  if (!url || !secret) {
    console.error(
      'Hub lead not created: HUB_INTAKE_URL or HUB_INTAKE_SECRET is not set.'
    );
    return null;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-intake-secret': secret,
    },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: 'no-store',
  });

  if (!response.ok) {
    // 404 here means the secret was rejected, not that the route is absent.
    console.error(
      `Hub lead not created: intake responded ${response.status} ${response.statusText}.`
    );
    return null;
  }

  const body = (await response.json()) as { id?: unknown };
  return typeof body.id === 'string' ? body.id : null;
}
