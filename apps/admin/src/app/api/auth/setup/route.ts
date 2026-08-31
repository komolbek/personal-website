import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const SETUP_TOKEN_HEADER = 'x-setup-token';

// Bootstrapping the first admin cannot require an admin session, so the
// endpoint is gated on a token that only an operator with access to the
// deployment environment can supply. Leaving ADMIN_SETUP_TOKEN unset — the
// normal state — disables the route entirely.
function setupTokenMatches(request: NextRequest): boolean {
  const expected = process.env.ADMIN_SETUP_TOKEN;
  if (!expected) return false;

  const provided = request.headers.get(SETUP_TOKEN_HEADER);
  if (!provided) return false;

  const expectedBytes = Buffer.from(expected);
  const providedBytes = Buffer.from(provided);
  if (expectedBytes.length !== providedBytes.length) return false;

  return timingSafeEqual(expectedBytes, providedBytes);
}

// Indistinguishable from a route that does not exist, so an unauthenticated
// caller learns neither that setup exists nor whether an admin is present.
function notFound() {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function POST(request: NextRequest) {
  if (!setupTokenMatches(request)) {
    return notFound();
  }

  try {
    const existingAdmin = await prisma.adminUser.findFirst();

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin user already exists' },
        { status: 400 }
      );
    }

    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const admin = await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  if (!setupTokenMatches(request)) {
    return notFound();
  }

  try {
    const existingAdmin = await prisma.adminUser.findFirst();
    return NextResponse.json({ setupRequired: !existingAdmin });
  } catch {
    return NextResponse.json({ setupRequired: true });
  }
}
