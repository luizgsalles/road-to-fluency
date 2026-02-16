// ============================================================================
// Streak Counter - Gamification Element
// ============================================================================
// Purpose: Display current and longest study streaks
// Author: @dev (Dex) + @ux-expert (Uma)
// Based on: Task 12 (Dashboard Stats)
// ============================================================================

'use client';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  todayCompleted?: boolean;
}

export function StreakCounter({
  currentStreak,
  longestStreak,
  todayCompleted = false,
}: StreakCounterProps) {
  const isOnFire = currentStreak >= 7;
  const isNewRecord = currentStreak === longestStreak && currentStreak > 0;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-neutral-700">Study Streak</h3>
        {isOnFire && (
          <span className="text-2xl animate-bounce-subtle" title="On fire! 7+ days">
            🔥
          </span>
        )}
      </div>

      {/* Current Streak */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-amber-500 mb-2">
          {currentStreak}
        </div>
        <div className="text-sm text-neutral-600">
          {currentStreak === 1 ? 'day' : 'days'} in a row
        </div>
        {isNewRecord && (
          <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
            <span>🏆</span>
            <span>New Record!</span>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {todayCompleted ? (
          <div className="flex items-center gap-2 text-success-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-medium">Today completed!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-warning-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium">Don't break the streak!</span>
          </div>
        )}
      </div>

      {/* Longest Streak */}
      <div className="pt-4 border-t border-amber-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600">Longest streak:</span>
          <span className="font-semibold text-neutral-900">
            {longestStreak} {longestStreak === 1 ? 'day' : 'days'}
          </span>
        </div>
      </div>

      {/* Motivational Message */}
      {currentStreak === 0 && (
        <div className="mt-4 text-center text-xs text-neutral-500">
          Complete an exercise today to start your streak!
        </div>
      )}
      {currentStreak >= 1 && currentStreak < 7 && (
        <div className="mt-4 text-center text-xs text-neutral-500">
          {7 - currentStreak} more {7 - currentStreak === 1 ? 'day' : 'days'} to unlock 🔥
        </div>
      )}
      {currentStreak >= 30 && (
        <div className="mt-4 text-center text-xs text-amber-700 font-semibold">
          Legendary dedication! 🌟
        </div>
      )}
    </div>
  );
}

/**
 * Compact Streak Counter (for smaller spaces)
 */
export function StreakCounterCompact({ currentStreak, todayCompleted }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 rounded-lg border border-amber-200">
      <div className="text-3xl">
        {currentStreak >= 7 ? '🔥' : '📅'}
      </div>
      <div>
        <div className="text-2xl font-bold text-amber-600">
          {currentStreak}
        </div>
        <div className="text-xs text-neutral-600">day streak</div>
      </div>
      {todayCompleted && (
        <div className="ml-auto text-success-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
