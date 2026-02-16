// ============================================================================
// NextAuth v5 Setup with Drizzle Adapter
// ============================================================================
// Purpose: Initialize NextAuth with Drizzle adapter for Vercel Postgres
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 3 (Authentication Setup)
// ============================================================================

import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { authConfig } from './auth.config';
import { db } from '@/lib/db';
import { users, accounts, sessions, verificationTokens } from '@/db/schema';

/**
 * NextAuth instance with Drizzle adapter
 *
 * Automatically syncs auth data with Vercel Postgres
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
});
