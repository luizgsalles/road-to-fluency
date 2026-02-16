// ============================================================================
// Achievements API Route
// ============================================================================
// Purpose: Get user achievements and progress
// Author: @dev (Dex)
// Based on: Task 13 (Achievement System)
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { achievements, userAchievements, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * GET /api/achievements
 *
 * Returns: All achievements with user progress
 */
export async function GET(request: NextRequest) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all achievements
    const allAchievements = await db.select().from(achievements);

    // Get user's unlocked achievements
    const unlocked = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, session.user.id));

    const unlockedIds = new Set(unlocked.map((ua) => ua.achievementId));

    // Get user stats for progress calculation
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate progress for each achievement
    const achievementsWithProgress = allAchievements.map((achievement) => {
      const isUnlocked = unlockedIds.has(achievement.id);
      const unlockedData = unlocked.find((ua) => ua.achievementId === achievement.id);

      // Calculate progress based on criteria
      let progress = 0;
      if (!isUnlocked) {
        switch (achievement.criteriaType) {
          case 'current_streak':
            progress = Math.min(100, (user.currentStreak / achievement.criteriaValue) * 100);
            break;
          case 'total_xp':
            progress = Math.min(100, (user.totalXP / achievement.criteriaValue) * 100);
            break;
          case 'overall_level':
            progress = Math.min(100, (user.overallLevel / achievement.criteriaValue) * 100);
            break;
          case 'skill_level_grammar':
            progress = Math.min(100, (user.grammarLevel / achievement.criteriaValue) * 100);
            break;
          // Add more criteria types as needed
          default:
            progress = 0;
        }
      } else {
        progress = 100;
      }

      return {
        ...achievement,
        isUnlocked,
        progress: Math.round(progress),
        unlockedAt: unlockedData?.unlockedAt,
      };
    });

    return NextResponse.json({
      achievements: achievementsWithProgress,
      total: allAchievements.length,
      unlocked: unlocked.length,
      percentage: Math.round((unlocked.length / allAchievements.length) * 100),
    });
  } catch (error) {
    console.error('GET /api/achievements error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
