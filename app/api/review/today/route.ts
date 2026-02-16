// ============================================================================
// Review Queue API Route - Get Today's Reviews
// ============================================================================
// Purpose: Get exercises due for review today (SM-2)
// Author: @dev (Dex)
// Based on: Task 9 (SM-2 Spaced Repetition)
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { reviewSchedule, exercises, users } from '@/db/schema';
import { eq, and, lte } from 'drizzle-orm';
import { getOptimalReviewQueue } from '@/lib/learning/sm2-algorithm';

/**
 * GET /api/review/today
 *
 * Query params:
 * - limit: Max reviews to return (default: 10)
 *
 * Returns: Exercises due for review today, sorted by priority
 */
export async function GET(request: NextRequest) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse query params
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Get today's date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all reviews due today or overdue
    const dueReviews = await db
      .select({
        review: reviewSchedule,
        exercise: exercises,
      })
      .from(reviewSchedule)
      .innerJoin(exercises, eq(reviewSchedule.exerciseId, exercises.id))
      .where(
        and(
          eq(reviewSchedule.userId, session.user.id),
          lte(reviewSchedule.nextReviewDate, today)
        )
      );

    // Use SM-2 optimal queue algorithm to prioritize
    const prioritizedReviews = getOptimalReviewQueue(
      dueReviews.map((r) => ({
        exercise: r.exercise,
        review: {
          repetitions: r.review.repetitions,
          easeFactor: r.review.easeFactor,
          intervalDays: r.review.intervalDays,
          nextReviewDate: r.review.nextReviewDate,
          masteryLevel: r.review.masteryLevel,
        },
      })),
      Math.min(limit, 50) // Cap at 50
    );

    // Count total reviews
    const totalDue = dueReviews.length;
    const overdue = dueReviews.filter((r) => r.review.nextReviewDate < today).length;

    return NextResponse.json({
      reviews: prioritizedReviews.map((r) => r.exercise),
      total: totalDue,
      overdue,
      returned: prioritizedReviews.length,
    });
  } catch (error) {
    console.error('GET /api/review/today error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
