// ============================================================================
// Middleware - Route Protection & Authentication
// ============================================================================
// Purpose: Protect routes and handle authentication
// Author: @dev (Dex)
// Based on: NextAuth v5 middleware
// ============================================================================

export { auth as middleware } from '@/auth';

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
