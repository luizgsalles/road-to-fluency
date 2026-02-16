// ============================================================================
// XP System - Business English RPG
// ============================================================================
// Purpose: Calculate XP earned from exercises based on performance
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 8 (XP & Level System)
// ============================================================================

export interface ExercisePerformance {
  exerciseType: 'grammar' | 'vocabulary' | 'listening' | 'writing' | 'speaking' | 'reading';
  accuracy: number; // 0-100%
  timeSpentSeconds: number;
  averageTimeSeconds?: number; // For speed bonus calculation
  streakDays: number;
}

export interface XPResult {
  baseXP: number;
  accuracyBonus: number;
  speedBonus: number;
  streakBonus: number;
  totalXP: number;
}

// Base XP per exercise type
const BASE_XP: Record<string, number> = {
  grammar: 10,
  vocabulary: 5,
  listening: 15,
  writing: 20,
  speaking: 25,
  reading: 15,
};

/**
 * Calculate XP earned from an exercise
 *
 * Formula: base_xp * accuracy_multiplier + speed_bonus + streak_bonus
 *
 * @example
 * calculateXP({
 *   exerciseType: 'grammar',
 *   accuracy: 85,
 *   timeSpentSeconds: 60,
 *   averageTimeSeconds: 120,
 *   streakDays: 7
 * })
 * // Returns: { baseXP: 10, accuracyBonus: 2, speedBonus: 10, streakBonus: 5, totalXP: 27 }
 */
export function calculateXP(performance: ExercisePerformance): XPResult {
  const { exerciseType, accuracy, timeSpentSeconds, averageTimeSeconds, streakDays } = performance;

  // 1. Base XP (depends on exercise type)
  const baseXP = BASE_XP[exerciseType] || 10;

  // 2. Accuracy Bonus (0% to +50% of base XP)
  let accuracyMultiplier = 0;
  if (accuracy >= 100) {
    accuracyMultiplier = 0.50; // +50% for perfect score
  } else if (accuracy >= 90) {
    accuracyMultiplier = 0.40; // +40%
  } else if (accuracy >= 75) {
    accuracyMultiplier = 0.25; // +25%
  } else if (accuracy >= 50) {
    accuracyMultiplier = 0.10; // +10%
  }
  // Below 50% = no bonus

  const accuracyBonus = Math.floor(baseXP * accuracyMultiplier);

  // 3. Speed Bonus (finish in <50% of average time = +10 XP)
  let speedBonus = 0;
  if (averageTimeSeconds && timeSpentSeconds < averageTimeSeconds * 0.5) {
    speedBonus = 10;
  }

  // 4. Streak Bonus (7+ days = +5 XP per exercise)
  let streakBonus = 0;
  if (streakDays >= 7) {
    streakBonus = 5;
  }

  // Total XP
  const totalXP = baseXP + accuracyBonus + speedBonus + streakBonus;

  return {
    baseXP,
    accuracyBonus,
    speedBonus,
    streakBonus,
    totalXP,
  };
}

/**
 * Calculate skill-specific XP (for skills tree)
 *
 * Each exercise type contributes to one or more skills:
 * - Grammar → Grammar skill
 * - Vocabulary → Vocabulary skill
 * - Listening → Listening skill
 * - Speaking → Speaking skill
 * - Reading → Reading skill
 * - Writing → Writing skill
 */
export function calculateSkillXP(
  exerciseType: string,
  totalXP: number
): Record<string, number> {
  const skillXP: Record<string, number> = {
    grammar: 0,
    vocabulary: 0,
    listening: 0,
    speaking: 0,
    reading: 0,
    writing: 0,
  };

  // Map exercise type to skill
  const skillMap: Record<string, string[]> = {
    grammar: ['grammar'],
    vocabulary: ['vocabulary'],
    listening: ['listening'],
    writing: ['writing', 'grammar'], // Writing also improves grammar
    speaking: ['speaking', 'vocabulary'], // Speaking also improves vocabulary
    reading: ['reading', 'vocabulary'], // Reading also improves vocabulary
  };

  const skills = skillMap[exerciseType] || [exerciseType];

  // Distribute XP among relevant skills
  const xpPerSkill = totalXP / skills.length;

  skills.forEach((skill) => {
    if (skillXP.hasOwnProperty(skill)) {
      skillXP[skill] = Math.floor(xpPerSkill);
    }
  });

  return skillXP;
}

/**
 * Calculate total XP required to reach a specific level
 *
 * Formula: 100 * (level ^ 1.5) + 50
 *
 * Examples:
 * - Level 1: 150 XP
 * - Level 2: 332 XP
 * - Level 5: 1,168 XP
 * - Level 10: 3,212 XP
 */
export function getXPRequiredForLevel(level: number): number {
  if (level <= 0) return 0;
  if (level === 1) return 0; // Level 1 requires 0 XP (starting level)

  return Math.floor(100 * Math.pow(level, 1.5) + 50);
}

/**
 * Calculate cumulative XP required to reach a level
 * (sum of all previous levels)
 */
export function getCumulativeXPForLevel(level: number): number {
  let totalXP = 0;
  for (let i = 2; i <= level; i++) {
    totalXP += getXPRequiredForLevel(i);
  }
  return totalXP;
}

/**
 * Calculate current level from total XP
 */
export function getLevelFromXP(totalXP: number): number {
  let level = 1;
  let cumulativeXP = 0;

  while (level <= 100) {
    const xpForNextLevel = getXPRequiredForLevel(level + 1);
    if (cumulativeXP + xpForNextLevel > totalXP) {
      break;
    }
    cumulativeXP += xpForNextLevel;
    level++;
  }

  return level;
}

/**
 * Calculate XP progress toward next level
 *
 * @returns { currentXP, requiredXP, percentage }
 */
export function getXPProgress(totalXP: number): {
  level: number;
  currentXP: number;
  requiredXP: number;
  percentage: number;
} {
  const level = getLevelFromXP(totalXP);
  const cumulativeXPForCurrentLevel = getCumulativeXPForLevel(level);
  const currentXP = totalXP - cumulativeXPForCurrentLevel;
  const requiredXP = getXPRequiredForLevel(level + 1);
  const percentage = Math.min(100, (currentXP / requiredXP) * 100);

  return {
    level,
    currentXP,
    requiredXP,
    percentage: Math.floor(percentage),
  };
}
