import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession, generateInviteToken } from '@/lib/auth';
import { logActivity } from '@/lib/activity';
import type { HubUserRole } from '@necto/db';

const VALID_ROLES: HubUserRole[] = ['ADMIN', 'MANAGER', 'VIEWER'];
const INVITE_TTL_DAYS = 7;

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { email, role } = await request.json();
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!normalizedEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    const inviteRole: HubUserRole = VALID_ROLES.includes(role) ? role : 'VIEWER';

    const existingUser = await prisma.hubUser.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) {
      return NextResponse.json({ error: 'A user with that email already exists' }, { status: 409 });
    }

    // Replace any earlier pending invite for the same email so only one link is live.
    await prisma.hubInvitation.deleteMany({
      where: { email: normalizedEmail, acceptedAt: null },
    });

    const token = generateInviteToken();
    const expiresAt = new Date(Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000);

    const invitation = await prisma.hubInvitation.create({
      data: {
        email: normalizedEmail,
        role: inviteRole,
        token,
        invitedById: session.id,
        invitedByName: session.name,
        expiresAt,
      },
    });

    await logActivity('invited', 'user', invitation.id, normalizedEmail, `Role: ${inviteRole}`);

    const link = `${request.nextUrl.origin}/signup?token=${token}`;

    return NextResponse.json({
      success: true,
      link,
      invitation: {
        id: invitation.id,
        email: invitation.email,
        role: invitation.role,
        expiresAt: invitation.expiresAt,
      },
    });
  } catch (error) {
    console.error('Create invitation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
