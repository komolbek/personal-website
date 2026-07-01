import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, createSession, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { token, name, password } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Invalid invitation' }, { status: 400 });
    }
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const invitation = await prisma.hubInvitation.findUnique({ where: { token } });

    if (!invitation || invitation.acceptedAt) {
      return NextResponse.json({ error: 'This invitation is invalid or already used' }, { status: 400 });
    }

    if (invitation.expiresAt < new Date()) {
      return NextResponse.json({ error: 'This invitation has expired' }, { status: 400 });
    }

    const existingUser = await prisma.hubUser.findUnique({ where: { email: invitation.email } });
    if (existingUser) {
      return NextResponse.json({ error: 'An account for this email already exists' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.$transaction(async (tx) => {
      const created = await tx.hubUser.create({
        data: {
          email: invitation.email,
          name: name.trim(),
          passwordHash,
          role: invitation.role,
        },
      });
      await tx.hubInvitation.update({
        where: { id: invitation.id },
        data: { acceptedAt: new Date() },
      });
      return created;
    });

    const sessionToken = await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    await setSessionCookie(sessionToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
