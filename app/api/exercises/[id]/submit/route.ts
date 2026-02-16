// ============================================================================
// Submit Exercise API Route - Record User Performance
// ============================================================================
// Purpose: Submit exercise completion, calculate XP, update user progress
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 8 (XP System), Task 9 (SM-2), User Story 4
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users, exercises, userProgress, reviewSchedule } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { calculateXP, calculateSkillXP } from '@/lib/gamification/xp-system';
import { calculateSkillLevels, calculateOverallLevel } from '@/lib/gamification/level-system';
import {
  calculateNextReview,
  accuracyToPerformance,
  initializeReview,
} from '@/lib/learning/sm2-algorithm';
import { nanoid } from 'nanoid';

interface SubmitExerciseRequest {
  accuracy: number; // 0-100
  timeSpentSeconds: number;
  userAnswer: any; // User's answer (structure depends on exercise type)
  correctAnswer: any; // Correct answer
}

/**
 * POST /api/exercises/[id]/submit
 *
 * Body: { accuracy, timeSpentSeconds, userAnswer, correctAnswer }
 *
 * Returns: { xpEarned, levelUp, nextReviewDate, ... }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ============================================================================
    // STEP 1: Authentication
    // ============================================================================

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: exerciseId } = await params;

    // ============================================================================
    // STEP 2: Parse request body
    // ============================================================================

    const body: SubmitExerciseRequest = await request.json();
    const { accuracy, timeSpentSeconds, userAnswer, correctAnswer } = body;

    // Validate input
    if (accuracy < 0 || accuracy > 100) {
      return NextResponse.json(
        { error: 'Invalid accuracy (must be 0-100)' },
        { status: 400 }
      );
    }

    if (timeSpentSeconds < 0) {
      return NextResponse.json(
        { error: 'Invalid time spent' },
        { status: 400 }
      );
    }

    // ============================================================================
    // STEP 3: Fetch user and exercise data
    // ============================================================================

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const [exercise] = await db
      .select()
      .from(exercises)
      .where(eq(exercises.id, exerciseId))
      .limit(1);

    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    // ============================================================================
    // STEP 4: Calculate XP earned
    // ============================================================================

    const xpResult = calculateXP({
      exerciseType: exercise.type as any,
      accuracy,
      timeSpentSeconds,
      averageTimeSeconds: exercise.averageTimeSeconds || undefined,
      streakDays: user.currentStreak,
    });

    const skillXP = calculateSkillXP(exercise.type, xpResult.totalXP);

    // ============================================================================
    // STEP 5: Update user XP and levels
    // ============================================================================

    const newTotalXP = user.totalXP + xpResult.totalXP;
    const newSkillXP = {
      grammar: user.grammarXP + skillXP.grammar,
      vocabulary: user.vocabularyXP + skillXP.vocabulary,
      listening: user.listeningXP + skillXP.listening,
      speaking: user.speakingXP + skillXP.speaking,
      reading: user.readingXP + skillXP.reading,
      writing: user.writingXP + skillXP.writing,
    };

    const newSkillLevels = calculateSkillLevels(newSkillXP);
    const newOverallLevel = calculateOverallLevel(newTotalXP, newSkillLevels);

    const leveledUp = newOverallLevel > user.overallLevel;

    // Update user in database
    await db
      .update(users)
      .set({
        totalXP: newTotalXP,
        overallLevel: newOverallLevel,
        grammarXP: newSkillXP.grammar,
        vocabularyXP: newSkillXP.vocabulary,
        listeningXP: newSkillXP.listening,
        speakingXP: newSkillXP.speaking,
        readingXP: newSkillXP.reading,
        writingXP: newSkillXP.writing,
        grammarLevel: newSkillLevels.grammar,
        vocabularyLevel: newSkillLevels.vocabulary,
        listeningLevel: newSkillLevels.listening,
        speakingLevel: newSkillLevels.speaking,
        readingLevel: newSkillLevels.reading,
        writingLevel: newSkillLevels.writing,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id));

    // ============================================================================
    // STEP 6: Record user progress
    // ============================================================================

    await db.insert(userProgress).values({
      id: nanoid(),
      userId: session.user.id,
      exerciseId,
      accuracy,
      timeSpentSeconds,
      xpEarned: xpResult.totalXP,
      userAnswer,
      correctAnswer,
      completedAt: new Date(),
    });

    // ============================================================================
    // STEP 7: Update review schedule (SM-2)
    // ============================================================================

    const performance = accuracyToPerformance(accuracy);

    // Check if review schedule exists
    const [existingReview] = await db
      .select()
      .from(reviewSchedule)
      .where(
        and(
          eq(reviewSchedule.userId, session.user.id),
          eq(reviewSchedule.exerciseId, exerciseId)
        )
      )
      .limit(1);

    let nextReviewDate: Date;

    if (existingReview) {
      // Update existing review schedule
      const updatedReview = calculateNextReview(
        {
          repetitions: existingReview.repetitions,
          easeFactor: existingReview.easeFactor,
          intervalDays: existingReview.intervalDays,
          nextReviewDate: existingReview.nextReviewDate,
          masteryLevel: existingReview.masteryLevel,
        },
        performance
      );

      await db
        .update(reviewSchedule)
        .set({
          repetitions: updatedReview.repetitions,
          easeFactor: updatedReview.easeFactor,
          intervalDays: updatedReview.intervalDays,
          nextReviewDate: updatedReview.nextReviewDate,
          masteryLevel: updatedReview.masteryLevel,
          lastReviewedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(reviewSchedule.id, existingReview.id));

      nextReviewDate = updatedReview.nextReviewDate;
    } else {
      // Create new review schedule
      const newReview = initializeReview();
      const updatedReview = calculateNextReview(newReview, performance);

      await db.insert(reviewSchedule).values({
        id: nanoid(),
        userId: session.user.id,
        exerciseId,
        repetitions: updatedReview.repetitions,
        easeFactor: updatedReview.easeFactor,
        intervalDays: updatedReview.intervalDays,
        nextReviewDate: updatedReview.nextReviewDate,
        masteryLevel: updatedReview.masteryLevel,
        lastReviewedAt: new Date(),
      });

      nextReviewDate = updatedReview.nextReviewDate;
    }

    // ============================================================================
    // STEP 8: Update exercise statistics
    // ============================================================================

    await db
      .update(exercises)
      .set({
        completionCount: sql`${exercises.completionCount} + 1`,
        averageAccuracy: sql`(${exercises.averageAccuracy} * ${exercises.completionCount} + ${accuracy}) / (${exercises.completionCount} + 1)`,
        averageTimeSeconds: sql`(${exercises.averageTimeSeconds} * ${exercises.completionCount} + ${timeSpentSeconds}) / (${exercises.completionCount} + 1)`,
        updatedAt: new Date(),
      })
      .where(eq(exercises.id, exerciseId));

    // ============================================================================
    // STEP 9: Return response
    // ============================================================================

    return NextResponse.json({
      success: true,
      xpEarned: xpResult.totalXP,
      xpBreakdown: xpResult,
      leveledUp,
      newLevel: newOverallLevel,
      oldLevel: user.overallLevel,
      skillXP,
      nextReviewDate,
      performance,
    });
  } catch (error) {
    console.error('POST /api/exercises/[id]/submit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
