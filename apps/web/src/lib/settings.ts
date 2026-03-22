import { prisma } from '@/lib/prisma';

export async function getSetting(key: string): Promise<string | null> {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key } });
    return setting?.value ?? null;
  } catch {
    return null;
  }
}

export async function getSettings(keys: string[]): Promise<Record<string, string>> {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: keys } },
    });
    const result: Record<string, string> = {};
    for (const s of settings) {
      result[s.key] = s.value;
    }
    return result;
  } catch {
    return {};
  }
}

export async function getLocalizedSetting(
  baseKey: string,
  locale: string
): Promise<string | null> {
  return getSetting(`${baseKey}_${locale}`);
}

export async function getLocalizedSettings(
  baseKeys: string[],
  locale: string
): Promise<Record<string, string>> {
  const keys = baseKeys.map((k) => `${k}_${locale}`);
  const settings = await getSettings(keys);
  // Return with base keys (strip locale suffix)
  const result: Record<string, string> = {};
  for (const baseKey of baseKeys) {
    const val = settings[`${baseKey}_${locale}`];
    if (val) result[baseKey] = val;
  }
  return result;
}
