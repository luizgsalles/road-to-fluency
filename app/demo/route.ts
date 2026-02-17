// ============================================================================
// Demo Mode Route - Bypass Authentication for Testing
// ============================================================================
// Purpose: Create a demo user session without authentication
// Author: @dev (Dex) - AIOS Developer
// Usage: Visit /demo to start testing with a demo account
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function GET(request: NextRequest) {
  try {
    // Check if demo user already exists
    let demoUser = await db.query.users.findFirst({
      where: eq(users.email, 'demo@business-english-rpg.com'),
    });

    // Create demo user if doesn't exist
    if (!demoUser) {
      const userId = nanoid();
      await db.insert(users).values({
        id: userId,
        email: 'demo@business-english-rpg.com',
        name: 'Demo User',
        emailVerified: new Date(),
        nativeLanguage: 'pt-BR',
        targetLanguage: 'en',
        difficultyPreference: 'medium',
        totalXP: 1500,
        overallLevel: 3,
        currentStreak: 5,
        longestStreak: 10,
        lastActiveDate: new Date(),
        grammarXP: 300,
        vocabularyXP: 250,
        listeningXP: 200,
        speakingXP: 350,
        readingXP: 200,
        writingXP: 200,
        grammarLevel: 2,
        vocabularyLevel: 2,
        listeningLevel: 2,
        speakingLevel: 3,
        readingLevel: 2,
        writingLevel: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Fetch the created user
      demoUser = await db.query.users.findFirst({
        where: eq(users.email, 'demo@business-english-rpg.com'),
      });
    }

    // Create response with demo cookie
    const response = NextResponse.redirect(new URL('/dashboard', request.url));

    // Set a simple demo session cookie (not secure, only for testing)
    response.cookies.set('demo-session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    response.cookies.set('demo-user-id', demoUser?.id || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Demo mode error:', error);
    return NextResponse.json(
      { error: 'Failed to create demo session' },
      { status: 500 }
    );
  }
}
