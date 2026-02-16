// ============================================================================
// NextAuth API Route Handler
// ============================================================================
// Purpose: Handle all NextAuth requests (/api/auth/*)
// Author: @dev (Dex) - AIOS Developer
// Based on: NextAuth v5 documentation
// ============================================================================

import { handlers } from '@/auth';

export const { GET, POST } = handlers;
