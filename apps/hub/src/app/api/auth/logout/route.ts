import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  await clearSessionCookie();
  // Redirect relative to the current request origin so it works on any host
  // (localhost, Railway, custom domain) instead of a hardcoded URL.
  return NextResponse.redirect(new URL('/login', request.url));
}
