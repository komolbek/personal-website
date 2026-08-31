import type { NextRequest } from 'next/server';

// Login throttling. State is per process: a container restart clears it, and
// if a service is ever scaled past one replica each replica counts separately.
// That is a deliberate trade — the alternative is a shared store this project
// does not have — and it still removes unlimited-rate credential guessing.

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const MAX_ENTRIES = 10_000;

interface Bucket {
  failures: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

function sweep(now: number): void {
  const expired: string[] = [];
  buckets.forEach((bucket, key) => {
    if (now - bucket.windowStart >= WINDOW_MS) {
      expired.push(key);
    }
  });
  expired.forEach((key) => buckets.delete(key));
}

// x-forwarded-for is set by the platform proxy but is forgeable if a request
// ever reaches the app directly, so the caller pairs this with an identity key
// the client does not control.
export function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

export function loginRateLimitKeys(request: NextRequest, email: unknown): string[] {
  const keys = [`ip:${clientIp(request)}`];
  if (typeof email === 'string' && email.trim()) {
    keys.push(`email:${email.trim().toLowerCase()}`);
  }
  return keys;
}

export function isRateLimited(keys: string[]): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  let retryAfterSeconds = 0;

  for (const key of keys) {
    const bucket = buckets.get(key);
    if (!bucket) continue;

    if (now - bucket.windowStart >= WINDOW_MS) {
      buckets.delete(key);
      continue;
    }

    if (bucket.failures >= MAX_FAILURES) {
      const remaining = Math.ceil((bucket.windowStart + WINDOW_MS - now) / 1000);
      retryAfterSeconds = Math.max(retryAfterSeconds, remaining);
    }
  }

  return { limited: retryAfterSeconds > 0, retryAfterSeconds };
}

export function recordFailure(keys: string[]): void {
  const now = Date.now();

  if (buckets.size >= MAX_ENTRIES) sweep(now);

  for (const key of keys) {
    const bucket = buckets.get(key);
    if (!bucket || now - bucket.windowStart >= WINDOW_MS) {
      buckets.set(key, { failures: 1, windowStart: now });
    } else {
      bucket.failures += 1;
    }
  }
}

export function clearFailures(keys: string[]): void {
  for (const key of keys) buckets.delete(key);
}
