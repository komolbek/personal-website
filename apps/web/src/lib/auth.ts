import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

let cachedKey: Uint8Array | null = null;

function getSecretKey(): Uint8Array {
  if (!cachedKey) {
    const value = process.env.ADMIN_SECRET;
    if (!value) {
      throw new Error(
        'Missing required environment variable ADMIN_SECRET. Refusing to run: ' +
          'session tokens cannot be signed or verified without it.'
      );
    }
    cachedKey = new TextEncoder().encode(value);
  }
  return cachedKey;
}

// Fail fast at module load rather than at the first login. Skipped during
// `next build`, which evaluates this module while collecting page data and has
// no access to deployment secrets.
if (process.env.NEXT_PHASE !== 'phase-production-build') {
  getSecretKey();
}

export interface AdminSession {
  id: string;
  email: string;
  name: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: AdminSession): Promise<string> {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey());

  return token;
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}
