import { Injectable } from '@nestjs/common';

@Injectable()
export class TranslateService {
  async translate(text: string, from: string, to: string): Promise<string> {
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
}
