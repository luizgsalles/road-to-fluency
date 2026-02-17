// ============================================================================
// Middleware - Route Protection & Authentication
// ============================================================================
// Purpose: Protect routes and handle authentication (with demo mode support)
// Author: @dev (Dex)
// Based on: NextAuth v5 middleware
// ============================================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow demo route without auth
  if (pathname.startsWith('/demo')) {
    return NextResponse.next();
  }

  // Check if user is in demo mode
  const isDemoMode = request.cookies.get('demo-session')?.value === 'true';

  // Protected routes
  const protectedPaths = ['/dashboard', '/exercise', '/profile'];
  const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedRoute) {
    // Allow if in demo mode
    if (isDemoMode) {
      return NextResponse.next();
    }

    // Otherwise check auth
    const session = await auth();
    if (!session?.user) {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
