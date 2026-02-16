// ============================================================================
// User Stats API Route - Get User Progress & Statistics
// ============================================================================
// Purpose: Fetch comprehensive user statistics for dashboard
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 12 (Dashboard Stats), User Story 7
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users, userProgress, reviewSchedule, userAchievements } from '@/db/schema';
import { eq, and, gte, sql } from 'drizzle-orm';
import { getReviewStats } from '@/lib/learning/sm2-algorithm';
import { getXPProgress, getXPRequiredForLevel } from '@/lib/gamification/xp-system';
import { getSkillProgress } from '@/lib/gamification/level-system';

/**
 * GET /api/user/stats
 *
 * Returns: Comprehensive user statistics for dashboard
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
    // STEP 2: Get user data
    // ============================================================================

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // ============================================================================
    // STEP 3: Calculate level progress
    // ============================================================================

    const levelProgress = getXPProgress(user.totalXP);
    const nextLevelXP = getXPRequiredForLevel(user.overallLevel + 1);

    // ============================================================================
    // STEP 4: Calculate skill progress
    // ============================================================================

    const skillsProgress = {
      grammar: getSkillProgress('grammar', user.grammarXP),
      vocabulary: getSkillProgress('vocabulary', user.vocabularyXP),
      listening: getSkillProgress('listening', user.listeningXP),
      speaking: getSkillProgress('speaking', user.speakingXP),
      reading: getSkillProgress('reading', user.readingXP),
      writing: getSkillProgress('writing', user.writingXP),
    };

    // ============================================================================
    // STEP 5: Get review statistics
    // ============================================================================

    const allReviews = await db
      .select()
      .from(reviewSchedule)
      .where(eq(reviewSchedule.userId, session.user.id));

    const reviewStats = getReviewStats(allReviews);

    // ============================================================================
    // STEP 6: Get recent activity (last 7 days)
    // ============================================================================

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = await db
      .select({
        date: sql<string>`DATE(${userProgress.completedAt})`,
        exercisesCompleted: sql<number>`COUNT(*)`,
        totalXP: sql<number>`SUM(${userProgress.xpEarned})`,
        avgAccuracy: sql<number>`AVG(${userProgress.accuracy})`,
      })
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, session.user.id),
          gte(userProgress.completedAt, sevenDaysAgo)
        )
      )
      .groupBy(sql`DATE(${userProgress.completedAt})`)
      .orderBy(sql`DATE(${userProgress.completedAt}) ASC`);

    // ============================================================================
    // STEP 7: Get total exercises completed
    // ============================================================================

    const [totals] = await db
      .select({
        totalExercises: sql<number>`COUNT(*)`,
        totalTimeSeconds: sql<number>`SUM(${userProgress.timeSpentSeconds})`,
        avgAccuracy: sql<number>`AVG(${userProgress.accuracy})`,
      })
      .from(userProgress)
      .where(eq(userProgress.userId, session.user.id));

    // ============================================================================
    // STEP 8: Get achievements count
    // ============================================================================

    const [achievementsData] = await db
      .select({
        unlockedCount: sql<number>`COUNT(*)`,
      })
      .from(userAchievements)
      .where(eq(userAchievements.userId, session.user.id));

    // ============================================================================
    // STEP 9: Return comprehensive stats
    // ============================================================================

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      level: {
        overall: user.overallLevel,
        progress: levelProgress,
        nextLevelXP,
      },
      xp: {
        total: user.totalXP,
        currentLevelXP: levelProgress.currentXP,
        requiredForNextLevel: levelProgress.requiredXP,
        percentage: levelProgress.percentage,
      },
      skills: {
        levels: {
          grammar: user.grammarLevel,
          vocabulary: user.vocabularyLevel,
          listening: user.listeningLevel,
          speaking: user.speakingLevel,
          reading: user.readingLevel,
          writing: user.writingLevel,
        },
        progress: skillsProgress,
      },
      streaks: {
        current: user.currentStreak,
        longest: user.longestStreak,
      },
      totals: {
        exercisesCompleted: totals?.totalExercises || 0,
        totalTimeSeconds: totals?.totalTimeSeconds || 0,
        averageAccuracy: Math.round(totals?.avgAccuracy || 0),
      },
      reviews: reviewStats,
      recentActivity,
      achievements: {
        unlocked: achievementsData?.unlockedCount || 0,
        total: 19, // TODO: Get from achievements table count
      },
    });
  } catch (error) {
    console.error('GET /api/user/stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
