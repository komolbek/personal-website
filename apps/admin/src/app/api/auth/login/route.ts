import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSession, setSessionCookie } from '@/lib/auth';
import {
  loginRateLimitKeys,
  isRateLimited,
  recordFailure,
  clearFailures,
} from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Keyed on both the caller's address and the account being targeted, so
    // spreading attempts across addresses still throttles per account.
    const rateLimitKeys = loginRateLimitKeys(request, email);
    const { limited, retryAfterSeconds } = isRateLimited(rateLimitKeys);

    if (limited) {
      return NextResponse.json(
        { error: 'Too many login attempts. Try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user) {
      recordFailure(rateLimitKeys);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      recordFailure(rateLimitKeys);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    clearFailures(rateLimitKeys);

    const token = await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    await setSessionCookie(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
