// ============================================================================
// Drizzle Configuration
// ============================================================================
// Purpose: Configure Drizzle ORM for Vercel Postgres
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 5 (Database Schema)
// ============================================================================

import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
