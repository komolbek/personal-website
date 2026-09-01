// Website enquiries are pushed to Telegram so a new one is seen without
// anyone opening Hub. Waiting to notice a lead in the Hub UI means noticing
// it late, and a late reply to an enquiry is usually a lost one.
//
// This is a notification only — one outbound call to the Bot API. The
// conversational inquiry bot that used to live here was removed in September
// 2026 and is not coming back; nothing here receives messages, so there is no
// webhook and no public bot surface to maintain.
//
// Deliberately sent from the website rather than from Hub's intake endpoint.
// Hub being unreachable is exactly when the enquiry is most likely to be
// missed, so the notification must not depend on Hub having accepted it.

export interface EnquiryNotification {
  name: string;
  phone: string;
  message: string;
  email?: string | null;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  utmSource?: string | null;
  referrer?: string | null;
  // Set when Hub accepted the handover, so the message can link straight to
  // the project. Null when Hub was unreachable — the notification still goes
  // out, just without the link.
  hubProjectId?: string | null;
}

// A visitor must never wait on Telegram. The enquiry is already saved by the
// time this runs, so a slow send is abandoned rather than held open.
const REQUEST_TIMEOUT_MS = 5000;

// Hub's domain is fixed (hub.necto.uz), but keep it overridable so a local or
// staging site does not link into production.
const HUB_URL = process.env.HUB_PUBLIC_URL || 'https://hub.necto.uz';

// Telegram parses the message as HTML, so anything a visitor typed has to be
// escaped or a stray "<" silently fails the whole send.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildMessage(input: EnquiryNotification): string {
  const lines: string[] = ['<b>New website enquiry</b>', ''];

  lines.push(`<b>Name:</b> ${escapeHtml(input.name)}`);
  lines.push(`<b>Phone:</b> ${escapeHtml(input.phone)}`);
  if (input.email) lines.push(`<b>Email:</b> ${escapeHtml(input.email)}`);
  if (input.company) lines.push(`<b>Company:</b> ${escapeHtml(input.company)}`);
  if (input.service) lines.push(`<b>Service:</b> ${escapeHtml(input.service)}`);
  if (input.budget) lines.push(`<b>Budget:</b> ${escapeHtml(input.budget)}`);

  lines.push('', escapeHtml(input.message));

  // Where the enquiry came from, when the form captured it.
  const source = input.utmSource || input.referrer;
  if (source) lines.push('', `<b>Source:</b> ${escapeHtml(source)}`);

  if (input.hubProjectId) {
    lines.push('', `${HUB_URL}/projects/${encodeURIComponent(input.hubProjectId)}`);
  } else {
    // Worth saying out loud: this enquiry is not in Hub, so it needs entering
    // by hand. It is only in ContactSubmission.
    lines.push('', '<i>Not recorded in Hub — enter it manually.</i>');
  }

  return lines.join('\n');
}

// Returns whether the notification was delivered. Callers must not fail the
// contact submission on false: a missed notification is an inconvenience, a
// lost enquiry is not.
export async function notifyNewEnquiry(input: EnquiryNotification): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!token || !chatId) {
    console.error(
      'Telegram notification not sent: TELEGRAM_BOT_TOKEN or TELEGRAM_ADMIN_CHAT_ID is not set.'
    );
    return false;
  }

  // The token is part of the URL, so nothing here may log the URL itself.
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildMessage(input),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error(
      `Telegram notification not sent: API responded ${response.status} ${response.statusText}.`
    );
    return false;
  }

  return true;
}
