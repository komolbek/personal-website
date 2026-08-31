import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import type { HubUserRole } from '@necto/db';

let secretKey: Uint8Array | null = null;

function getSecret(): Uint8Array {
  if (!secretKey) {
    const value = process.env.HUB_ADMIN_SECRET;
    if (!value) {
      throw new Error(
        'Missing required environment variable HUB_ADMIN_SECRET. Refusing to run: ' +
          'session tokens cannot be signed or verified without it.'
      );
    }
    secretKey = new TextEncoder().encode(value);
  }
  return secretKey;
}

// Fail fast at module load rather than at the first login. Skipped during
// `next build`, which evaluates this module while collecting page data and has
// no access to deployment secrets.
if (process.env.NEXT_PHASE !== 'phase-production-build') {
  getSecret();
}

const COOKIE_NAME = 'hub_session';

export interface HubSession {
  id: string;
  email: string;
  name: string;
  role: HubUserRole;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: HubSession): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function getSession(): Promise<HubSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as HubSession;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function requireRole(session: HubSession | null, roles: HubUserRole[]): HubSession {
  if (!session) throw new Error('Unauthorized');
  if (!roles.includes(session.role)) throw new Error('Forbidden');
  return session;
}
