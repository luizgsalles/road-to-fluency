// ============================================================================
// Database Connection - Drizzle ORM Client
// ============================================================================
// Purpose: Initialize Drizzle ORM client for Vercel Postgres
// Author: @dev (Dex) + @data-engineer (Dara)
// Based on: Task 5 (Database Schema)
// ============================================================================

import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from '@/db/schema';

/**
 * Drizzle ORM client
 *
 * Use this client for all database operations
 *
 * @example
 * import { db } from '@/lib/db'
 * import { users } from '@/db/schema'
 *
 * const allUsers = await db.select().from(users)
 */
export const db = drizzle(sql, { schema });

/**
 * Check database connection
 *
 * @returns true if connected, false otherwise
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

/**
 * Get database health status
 *
 * @returns Database health metrics
 */
export async function getDatabaseHealth(): Promise<{
  connected: boolean;
  latencyMs: number;
  error?: string;
}> {
  const startTime = Date.now();

  try {
    await sql`SELECT 1`;
    const latencyMs = Date.now() - startTime;

    return {
      connected: true,
      latencyMs,
    };
  } catch (error) {
    const latencyMs = Date.now() - startTime;

    return {
      connected: false,
      latencyMs,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
