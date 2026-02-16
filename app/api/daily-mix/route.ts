// ============================================================================
// Daily Mix API Route - Get Today's Exercises
// ============================================================================
// Purpose: Generate optimized daily mix using SM-2 + interleaving
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 16 (Daily Mix Algorithm), User Story 5
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users, exercises, reviewSchedule } from '@/db/schema';
import { eq, and, lte } from 'drizzle-orm';
import { generateDailyMix, validateDailyMix } from '@/lib/learning/daily-mix-generator';
import type { Exercise } from '@/lib/learning/daily-mix-generator';

/**
 * GET /api/daily-mix
 *
 * Query params:
 * - targetExercises: Number of exercises (default: 8)
 * - targetTimeMinutes: Target duration (default: 30)
 *
 * Returns: Optimized daily mix (SM-2 reviews + new exercises)
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
    const targetExercises = parseInt(searchParams.get('targetExercises') || '8', 10);
    const targetTimeMinutes = parseInt(searchParams.get('targetTimeMinutes') || '30', 10);

    // ============================================================================
    // STEP 3: Get user data
    // ============================================================================

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate recent accuracy (simplified - would use actual stats in production)
    const userAccuracy = 75; // TODO: Calculate from recent userProgress records

    // ============================================================================
    // STEP 4: Get all available exercises
    // ============================================================================

    const availableExercises = await db
      .select()
      .from(exercises)
      .where(
        and(
          eq(exercises.isActive, true),
          lte(exercises.requiredOverallLevel, user.overallLevel)
        )
      );

    // ============================================================================
    // STEP 5: Get review schedules for exercises
    // ============================================================================

    const reviews = await db
      .select()
      .from(reviewSchedule)
      .where(eq(reviewSchedule.userId, session.user.id));

    // Map review data to exercises
    const reviewMap = new Map(reviews.map((r) => [r.exerciseId, r]));

    // ============================================================================
    // STEP 6: Transform exercises to include review data
    // ============================================================================

    const exercisesWithReviews: Exercise[] = availableExercises.map((ex) => {
      const review = reviewMap.get(ex.id);

      return {
        id: ex.id,
        type: ex.type as any,
        title: ex.title,
        difficulty: ex.difficulty as any,
        estimatedTimeSeconds: ex.estimatedTimeSeconds,
        review: review
          ? {
              repetitions: review.repetitions,
              easeFactor: review.easeFactor,
              intervalDays: review.intervalDays,
              nextReviewDate: review.nextReviewDate,
              masteryLevel: review.masteryLevel,
            }
          : undefined,
      };
    });

    // ============================================================================
    // STEP 7: Generate daily mix
    // ============================================================================

    const dailyMix = generateDailyMix(exercisesWithReviews, {
      targetExercises,
      targetTimeMinutes,
      userAccuracy,
      difficultyPreference: user.difficultyPreference as any,
    });

    // ============================================================================
    // STEP 8: Validate daily mix
    // ============================================================================

    const validation = validateDailyMix(dailyMix);

    // ============================================================================
    // STEP 9: Fetch full exercise data for selected exercises
    // ============================================================================

    const selectedIds = dailyMix.exercises.map((ex) => ex.id);
    const fullExercises = availableExercises.filter((ex) =>
      selectedIds.includes(ex.id)
    );

    // Sort to match daily mix order
    const sortedExercises = selectedIds
      .map((id) => fullExercises.find((ex) => ex.id === id))
      .filter((ex) => ex !== undefined);

    // ============================================================================
    // STEP 10: Return response
    // ============================================================================

    return NextResponse.json({
      exercises: sortedExercises,
      totalExercises: dailyMix.totalExercises,
      estimatedTimeMinutes: dailyMix.estimatedTimeMinutes,
      breakdown: dailyMix.breakdown,
      validation,
      meta: {
        reviewsIncluded: dailyMix.exercises.filter((ex) => ex.review).length,
        newExercises: dailyMix.exercises.filter((ex) => !ex.review).length,
        userLevel: user.overallLevel,
      },
    });
  } catch (error) {
    console.error('GET /api/daily-mix error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
