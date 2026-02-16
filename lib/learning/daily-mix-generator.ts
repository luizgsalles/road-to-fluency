// ============================================================================
// Daily Mix Generator - Intelligent Exercise Scheduling
// ============================================================================
// Purpose: Generate balanced daily workout with interleaving and spaced repetition
// Author: @dev (Dex) + @tutor (Socrates)
// Based on: Task 16 (Daily Mix Algorithm)
// Research: Interleaving (Rohrer & Taylor, 2007) - 43% better retention
// ============================================================================

import { ReviewData, getOptimalReviewQueue, isReviewDue } from './sm2-algorithm';

export type ExerciseType = 'grammar' | 'vocabulary' | 'listening' | 'writing' | 'speaking' | 'reading';

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTimeSeconds: number;
  review?: ReviewData; // Optional: for spaced repetition exercises
}

export interface DailyMixConfig {
  targetExercises: number; // Goal: 6-10 exercises
  targetTimeMinutes: number; // Goal: 30 minutes
  userAccuracy: number; // Recent avg accuracy (0-100%)
  difficultyPreference: 'easy' | 'medium' | 'hard';
}

export interface DailyMix {
  exercises: Exercise[];
  totalExercises: number;
  estimatedTimeMinutes: number;
  breakdown: Record<ExerciseType, number>; // Count per type
}

/**
 * Generate daily mix of exercises
 *
 * Algorithm:
 * 1. Prioritize spaced repetition (reviews due today)
 * 2. Balance exercise types (interleaving)
 * 3. Adapt difficulty based on user accuracy
 * 4. Target 6-10 exercises, ~30 minutes
 *
 * @param allExercises - Pool of available exercises
 * @param config - User preferences and performance
 * @returns Optimized daily mix
 *
 * @example
 * generateDailyMix(exercises, {
 *   targetExercises: 8,
 *   targetTimeMinutes: 30,
 *   userAccuracy: 75,
 *   difficultyPreference: 'medium'
 * })
 */
export function generateDailyMix(
  allExercises: Exercise[],
  config: DailyMixConfig
): DailyMix {
  const { targetExercises, targetTimeMinutes, userAccuracy, difficultyPreference } = config;

  const selectedExercises: Exercise[] = [];
  let totalTime = 0;

  // ============================================================================
  // STEP 1: Prioritize Spaced Repetition (SM-2 reviews due today)
  // ============================================================================

  const reviewExercises = allExercises.filter(
    (ex) => ex.review && isReviewDue(ex.review.nextReviewDate)
  );

  const prioritizedReviews = getOptimalReviewQueue(
    reviewExercises.map((ex) => ({ exercise: ex, review: ex.review! })),
    Math.ceil(targetExercises * 0.5) // 50% of daily mix = reviews
  ).map((item) => item.exercise);

  selectedExercises.push(...prioritizedReviews);
  totalTime += prioritizedReviews.reduce((sum, ex) => sum + ex.estimatedTimeSeconds, 0);

  // ============================================================================
  // STEP 2: Add New Exercises (fill remaining slots)
  // ============================================================================

  const remainingSlots = targetExercises - selectedExercises.length;
  const remainingTimeSeconds = targetTimeMinutes * 60 - totalTime;

  if (remainingSlots > 0 && remainingTimeSeconds > 0) {
    // Filter new exercises (not already in reviews)
    const selectedIds = new Set(selectedExercises.map((ex) => ex.id));
    const newExercises = allExercises.filter((ex) => !selectedIds.has(ex.id));

    // Adapt difficulty based on user accuracy
    const targetDifficulty = adaptDifficulty(userAccuracy, difficultyPreference);

    // Filter by difficulty
    const filteredExercises = newExercises.filter((ex) => ex.difficulty === targetDifficulty);

    // Balance exercise types (interleaving)
    const balancedExercises = balanceExerciseTypes(
      filteredExercises,
      remainingSlots,
      remainingTimeSeconds
    );

    selectedExercises.push(...balancedExercises);
  }

  // ============================================================================
  // STEP 3: Interleave (shuffle to avoid consecutive same types)
  // ============================================================================

  const interleavedExercises = interleaveExercises(selectedExercises);

  // ============================================================================
  // STEP 4: Calculate breakdown
  // ============================================================================

  const breakdown: Record<ExerciseType, number> = {
    grammar: 0,
    vocabulary: 0,
    listening: 0,
    writing: 0,
    speaking: 0,
    reading: 0,
  };

  interleavedExercises.forEach((ex) => {
    breakdown[ex.type] = (breakdown[ex.type] || 0) + 1;
  });

  const totalEstimatedTime = interleavedExercises.reduce(
    (sum, ex) => sum + ex.estimatedTimeSeconds,
    0
  );

  return {
    exercises: interleavedExercises,
    totalExercises: interleavedExercises.length,
    estimatedTimeMinutes: Math.ceil(totalEstimatedTime / 60),
    breakdown,
  };
}

/**
 * Adapt difficulty based on user accuracy
 *
 * Logic:
 * - <70% accuracy → easier exercises
 * - 70-85% → preferred difficulty
 * - >85% → harder exercises
 */
function adaptDifficulty(
  userAccuracy: number,
  preferredDifficulty: 'easy' | 'medium' | 'hard'
): 'easy' | 'medium' | 'hard' {
  if (userAccuracy < 70) {
    // Struggling → easier
    return preferredDifficulty === 'hard' ? 'medium' : 'easy';
  } else if (userAccuracy > 85) {
    // Excelling → harder
    return preferredDifficulty === 'easy' ? 'medium' : 'hard';
  } else {
    // Just right → keep preference
    return preferredDifficulty;
  }
}

/**
 * Balance exercise types to avoid monotony
 *
 * Target distribution:
 * - Grammar: 25%
 * - Vocabulary: 25%
 * - Listening: 15%
 * - Writing: 15%
 * - Speaking: 10%
 * - Reading: 10%
 */
function balanceExerciseTypes(
  exercises: Exercise[],
  targetCount: number,
  remainingTimeSeconds: number
): Exercise[] {
  const target: Record<ExerciseType, number> = {
    grammar: Math.ceil(targetCount * 0.25),
    vocabulary: Math.ceil(targetCount * 0.25),
    listening: Math.ceil(targetCount * 0.15),
    writing: Math.ceil(targetCount * 0.15),
    speaking: Math.ceil(targetCount * 0.10),
    reading: Math.ceil(targetCount * 0.10),
  };

  const selected: Exercise[] = [];
  const typeCount: Record<ExerciseType, number> = {
    grammar: 0,
    vocabulary: 0,
    listening: 0,
    writing: 0,
    speaking: 0,
    reading: 0,
  };

  // Group exercises by type
  const byType: Record<ExerciseType, Exercise[]> = {
    grammar: [],
    vocabulary: [],
    listening: [],
    writing: [],
    speaking: [],
    reading: [],
  };

  exercises.forEach((ex) => {
    byType[ex.type].push(ex);
  });

  // Pick exercises round-robin to maintain balance
  const types: ExerciseType[] = ['grammar', 'vocabulary', 'listening', 'writing', 'speaking', 'reading'];
  let totalTime = 0;

  while (selected.length < targetCount && totalTime < remainingTimeSeconds) {
    let added = false;

    for (const type of types) {
      // Check if we need more of this type
      if (typeCount[type] < target[type] && byType[type].length > 0) {
        const exercise = byType[type].shift()!;

        // Check if adding this exercise would exceed time limit
        if (totalTime + exercise.estimatedTimeSeconds <= remainingTimeSeconds + 60) {
          // +60s buffer
          selected.push(exercise);
          typeCount[type]++;
          totalTime += exercise.estimatedTimeSeconds;
          added = true;
        }
      }

      if (selected.length >= targetCount) break;
    }

    // Break if no exercises added in a full round
    if (!added) break;
  }

  return selected;
}

/**
 * Interleave exercises (avoid consecutive same types)
 *
 * Research: Rohrer & Taylor (2007) - Interleaving improves retention by 43%
 *
 * Algorithm:
 * 1. Group by type
 * 2. Distribute round-robin
 * 3. Add randomness to avoid predictability
 */
function interleaveExercises(exercises: Exercise[]): Exercise[] {
  // Group by type
  const byType: Record<ExerciseType, Exercise[]> = {
    grammar: [],
    vocabulary: [],
    listening: [],
    writing: [],
    speaking: [],
    reading: [],
  };

  exercises.forEach((ex) => {
    byType[ex.type].push(ex);
  });

  // Interleave round-robin
  const interleaved: Exercise[] = [];
  const types: ExerciseType[] = Object.keys(byType).filter(
    (type) => byType[type as ExerciseType].length > 0
  ) as ExerciseType[];

  while (interleaved.length < exercises.length) {
    for (const type of types) {
      if (byType[type].length > 0) {
        interleaved.push(byType[type].shift()!);
      }
    }
  }

  return interleaved;
}

/**
 * Validate daily mix (quality check)
 */
export function validateDailyMix(mix: DailyMix): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check exercise count
  if (mix.totalExercises < 6) {
    issues.push('Too few exercises (min 6)');
  }
  if (mix.totalExercises > 10) {
    issues.push('Too many exercises (max 10)');
  }

  // Check time estimate
  if (mix.estimatedTimeMinutes < 20) {
    issues.push('Too short (target 30 min)');
  }
  if (mix.estimatedTimeMinutes > 45) {
    issues.push('Too long (max 45 min)');
  }

  // Check balance (no type should dominate >50%)
  const maxPerType = Math.ceil(mix.totalExercises * 0.5);
  Object.entries(mix.breakdown).forEach(([type, count]) => {
    if (count > maxPerType) {
      issues.push(`Too many ${type} exercises (max 50%)`);
    }
  });

  // Check diversity (at least 3 different types)
  const typesUsed = Object.values(mix.breakdown).filter((count) => count > 0).length;
  if (typesUsed < 3) {
    issues.push('Not enough variety (min 3 types)');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
