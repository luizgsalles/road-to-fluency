// ============================================================================
// Exercises API Route - Get Available Exercises
// ============================================================================
// Purpose: Fetch exercises for user based on level/difficulty
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 6 (Exercise System), User Story 3
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { exercises, users } from '@/db/schema';
import { eq, and, lte, or, isNull } from 'drizzle-orm';

/**
 * GET /api/exercises
 *
 * Query params:
 * - type: Exercise type (grammar, vocabulary, etc.)
 * - difficulty: easy, medium, hard
 * - limit: Number of exercises to return (default: 10)
 *
 * Returns: Array of exercises matching criteria
 */
export async function GET(request: NextRequest) {
  try {
    // ============================================================================
    // STEP 1: Authentication
    // ============================================================================

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ============================================================================
    // STEP 2: Parse query parameters
    // ============================================================================

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // optional
    const difficulty = searchParams.get('difficulty'); // optional
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // ============================================================================
    // STEP 3: Get user level (for content unlocking)
    // ============================================================================

    const [user] = await db
      .select({
        overallLevel: users.overallLevel,
        grammarLevel: users.grammarLevel,
        vocabularyLevel: users.vocabularyLevel,
        listeningLevel: users.listeningLevel,
        speakingLevel: users.speakingLevel,
        readingLevel: users.readingLevel,
        writingLevel: users.writingLevel,
      })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // ============================================================================
    // STEP 4: Build query filters
    // ============================================================================

    const filters: any[] = [
      eq(exercises.isActive, true), // Only active exercises
      lte(exercises.requiredOverallLevel, user.overallLevel), // User level check
    ];

    // Filter by type (if specified)
    if (type) {
      filters.push(eq(exercises.type, type));
    }

    // Filter by difficulty (if specified)
    if (difficulty) {
      filters.push(eq(exercises.difficulty, difficulty));
    }

    // Check skill level requirements
    // If exercise requires specific skill level, check user has it
    filters.push(
      or(
        isNull(exercises.requiredSkill), // No skill requirement
        and(
          eq(exercises.requiredSkill, 'grammar'),
          lte(exercises.requiredSkillLevel, user.grammarLevel)
        ),
        and(
          eq(exercises.requiredSkill, 'vocabulary'),
          lte(exercises.requiredSkillLevel, user.vocabularyLevel)
        ),
        and(
          eq(exercises.requiredSkill, 'listening'),
          lte(exercises.requiredSkillLevel, user.listeningLevel)
        ),
        and(
          eq(exercises.requiredSkill, 'speaking'),
          lte(exercises.requiredSkillLevel, user.speakingLevel)
        ),
        and(
          eq(exercises.requiredSkill, 'reading'),
          lte(exercises.requiredSkillLevel, user.readingLevel)
        ),
        and(
          eq(exercises.requiredSkill, 'writing'),
          lte(exercises.requiredSkillLevel, user.writingLevel)
        )
      )!
    );

    // ============================================================================
    // STEP 5: Fetch exercises
    // ============================================================================

    const availableExercises = await db
      .select()
      .from(exercises)
      .where(and(...filters))
      .limit(Math.min(limit, 50)); // Cap at 50 exercises

    // ============================================================================
    // STEP 6: Return response
    // ============================================================================

    return NextResponse.json({
      exercises: availableExercises,
      total: availableExercises.length,
      userLevel: user.overallLevel,
    });
  } catch (error) {
    console.error('GET /api/exercises error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
