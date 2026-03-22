import { NextRequest, NextResponse } from 'next/server';
import { ensureBotInitialized } from '@/lib/telegram-bot';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const bot = await ensureBotInitialized();
    await bot.handleUpdate(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ ok: false, error: String(error) });
  }
}

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const webhookUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!token || !webhookUrl) {
    return NextResponse.json(
      { error: 'Missing TELEGRAM_BOT_TOKEN or NEXT_PUBLIC_SITE_URL' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/setWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: `${webhookUrl}/api/telegram/webhook`,
        }),
      }
    );

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Webhook setup error:', error);
    return NextResponse.json(
      { error: 'Failed to set webhook' },
      { status: 500 }
    );
  }
}
