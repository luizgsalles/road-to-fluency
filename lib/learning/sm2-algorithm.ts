// ============================================================================
// SM-2 Algorithm - Spaced Repetition
// ============================================================================
// Purpose: Implement SuperMemo SM-2 algorithm for optimal review scheduling
// Author: @dev (Dex) + @tutor (Socrates) - AIOS Developer + Learning Coach
// Based on: Task 9 (SM-2 Spaced Repetition)
// Research: SuperMemo SM-2 (1987) - 39 years Lindy validated
// Reference: https://en.wikipedia.org/wiki/SuperMemo#SM-2_algorithm
// ============================================================================

export type PerformanceRating = 'again' | 'hard' | 'good' | 'easy';

export interface ReviewData {
  repetitions: number; // Number of successful reviews
  easeFactor: number; // SM-2 ease factor (1.3 - 2.5+)
  intervalDays: number; // Days until next review
  nextReviewDate: Date; // Calculated next review date
  masteryLevel: number; // 0-5 (0: New, 1: Learning, 2: Familiar, 3: Known, 4: Mastered, 5: Expert)
}

/**
 * Calculate next review based on SM-2 algorithm
 *
 * Performance Mapping:
 * - Again (0-50%): Reset to 1 day, decrease ease factor
 * - Hard (51-70%): Multiply interval by 1.2, slightly decrease ease factor
 * - Good (71-85%): Multiply interval by ease factor (default 2.5)
 * - Easy (86-100%): Multiply interval by 3.25, increase ease factor
 *
 * @param currentReview - Current review data
 * @param performance - User performance rating
 * @returns Updated review data with next review date
 *
 * @example
 * calculateNextReview(
 *   { repetitions: 2, easeFactor: 2.5, intervalDays: 3, ... },
 *   'good'
 * )
 * // Returns: { repetitions: 3, easeFactor: 2.5, intervalDays: 7, nextReviewDate: ... }
 */
export function calculateNextReview(
  currentReview: ReviewData,
  performance: PerformanceRating
): ReviewData {
  let { repetitions, easeFactor, intervalDays, masteryLevel } = currentReview;

  // Performance-based adjustments
  switch (performance) {
    case 'again':
      // Failed review: Reset interval to 1 day
      repetitions = 0;
      intervalDays = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2); // Decrease ease factor (min 1.3)
      masteryLevel = Math.max(0, masteryLevel - 1); // Decrease mastery
      break;

    case 'hard':
      // Difficult: Small interval increase
      repetitions += 1;
      intervalDays = Math.ceil(intervalDays * 1.2);
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      // Mastery stays same
      break;

    case 'good':
      // Normal: Standard SM-2 progression
      repetitions += 1;
      if (repetitions === 1) {
        intervalDays = 1;
      } else if (repetitions === 2) {
        intervalDays = 6;
      } else {
        intervalDays = Math.ceil(intervalDays * easeFactor);
      }
      // Mastery increases slowly
      if (repetitions % 3 === 0) {
        masteryLevel = Math.min(5, masteryLevel + 1);
      }
      break;

    case 'easy':
      // Easy: Large interval increase
      repetitions += 1;
      intervalDays = Math.ceil(intervalDays * 3.25);
      easeFactor = Math.min(3.0, easeFactor + 0.15); // Increase ease factor (max 3.0)
      // Mastery increases faster
      masteryLevel = Math.min(5, masteryLevel + 1);
      break;
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);

  return {
    repetitions,
    easeFactor,
    intervalDays,
    nextReviewDate,
    masteryLevel,
  };
}

/**
 * Map accuracy percentage to performance rating
 *
 * @param accuracy - User accuracy (0-100%)
 * @returns Performance rating
 */
export function accuracyToPerformance(accuracy: number): PerformanceRating {
  if (accuracy < 50) return 'again';
  if (accuracy < 70) return 'hard';
  if (accuracy < 86) return 'good';
  return 'easy';
}

/**
 * Initialize review data for a new exercise
 */
export function initializeReview(): ReviewData {
  return {
    repetitions: 0,
    easeFactor: 2.5, // Default SM-2 ease factor
    intervalDays: 1, // First review in 1 day
    nextReviewDate: getNextReviewDate(1),
    masteryLevel: 0, // New
  };
}

/**
 * Helper: Calculate next review date from interval
 */
function getNextReviewDate(intervalDays: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + intervalDays);
  date.setHours(0, 0, 0, 0); // Reset to start of day
  return date;
}

/**
 * Check if review is due today
 */
export function isReviewDue(nextReviewDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return nextReviewDate <= today;
}

/**
 * Get mastery level label
 */
export function getMasteryLabel(masteryLevel: number): string {
  const labels = ['New', 'Learning', 'Familiar', 'Known', 'Mastered', 'Expert'];
  return labels[masteryLevel] || 'Unknown';
}

/**
 * Calculate optimal review distribution (for daily mix)
 *
 * Prioritizes reviews in this order:
 * 1. Overdue reviews (past next_review_date)
 * 2. Due today
 * 3. Low mastery level (struggling items)
 *
 * @param reviews - Array of review data with exercise info
 * @param maxReviews - Maximum reviews to return
 * @returns Sorted array of reviews to do today
 */
export function getOptimalReviewQueue<T extends { review: ReviewData }>(
  reviews: T[],
  maxReviews: number = 10
): T[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter due reviews
  const dueReviews = reviews.filter((item) => {
    return item.review.nextReviewDate <= today;
  });

  // Sort by priority:
  // 1. Overdue (oldest first)
  // 2. Low mastery (struggling items first)
  const sortedReviews = dueReviews.sort((a, b) => {
    // Check if overdue
    const aOverdue = a.review.nextReviewDate < today;
    const bOverdue = b.review.nextReviewDate < today;

    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;

    // Both overdue or both due today: sort by mastery (lowest first)
    if (a.review.masteryLevel !== b.review.masteryLevel) {
      return a.review.masteryLevel - b.review.masteryLevel;
    }

    // Same mastery: sort by date (oldest first)
    return a.review.nextReviewDate.getTime() - b.review.nextReviewDate.getTime();
  });

  // Return top N reviews
  return sortedReviews.slice(0, maxReviews);
}

/**
 * Calculate average mastery level
 */
export function getAverageMastery(reviews: ReviewData[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.masteryLevel, 0);
  return sum / reviews.length;
}

/**
 * Get review statistics
 */
export function getReviewStats(reviews: ReviewData[]): {
  total: number;
  dueToday: number;
  overdue: number;
  avgMastery: number;
  masteryDistribution: Record<number, number>;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueToday = reviews.filter((r) => {
    const reviewDate = new Date(r.nextReviewDate);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate.getTime() === today.getTime();
  }).length;

  const overdue = reviews.filter((r) => r.nextReviewDate < today).length;

  const avgMastery = getAverageMastery(reviews);

  const masteryDistribution: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach((r) => {
    masteryDistribution[r.masteryLevel] = (masteryDistribution[r.masteryLevel] || 0) + 1;
  });

  return {
    total: reviews.length,
    dueToday,
    overdue,
    avgMastery: Math.round(avgMastery * 10) / 10,
    masteryDistribution,
  };
}
