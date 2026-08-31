import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

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

// /api/leads/intake carries its own shared-secret check and is called by the
// public site, which has no Hub session; without this the middleware would
// redirect it to /login and no lead would ever be created.
const publicPaths = ['/login', '/api/auth/login', '/api/leads/intake'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow static files and Next.js internals
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('hub_session')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await jwtVerify(token, getSecret());
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
