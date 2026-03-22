import { NextRequest, NextResponse } from 'next/server';

async function translateText(text: string, from: string, to: string): Promise<string> {
  if (!text.trim()) return '';

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();

    // Google returns [[["translated","original",...],...],...] format
    if (Array.isArray(data) && Array.isArray(data[0])) {
      return data[0]
        .filter((item: unknown) => Array.isArray(item) && item[0])
        .map((item: string[]) => item[0])
        .join('');
    }

    return text;
  } catch {
    return text;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { texts, from = 'ru' } = await req.json();

    if (!Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ error: 'texts array required' }, { status: 400 });
    }

    const enTranslations = await Promise.all(
      texts.map((t: string) => translateText(t, from, 'en'))
    );
    const uzTranslations = await Promise.all(
      texts.map((t: string) => translateText(t, from, 'uz'))
    );

    return NextResponse.json({ en: enTranslations, uz: uzTranslations });
  } catch {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
