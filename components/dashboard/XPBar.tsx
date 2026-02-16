// ============================================================================
// XP Bar Component - Progress Visualization
// ============================================================================
// Purpose: Animated XP progress bar with level indicator
// Author: @dev (Dex) + @ux-expert (Uma)
// Based on: Task 12 (Dashboard Stats)
// ============================================================================

'use client';

import { useEffect, useState } from 'react';

interface XPBarProps {
  currentXP: number;
  requiredXP: number;
  level: number;
  percentage: number;
  animated?: boolean;
}

export function XPBar({
  currentXP,
  requiredXP,
  level,
  percentage,
  animated = true,
}: XPBarProps) {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  // Animate progress bar on mount
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayPercentage(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayPercentage(percentage);
    }
  }, [percentage, animated]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-neutral-900">Level {level}</span>
          <span className="text-sm text-neutral-500">
            {currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP
          </span>
        </div>
        <span className="text-sm font-semibold text-primary-500">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-8 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
        {/* Filled Progress */}
        <div
          className="absolute inset-y-0 left-0 xp-bar-gradient rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${displayPercentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-neutral-700 mix-blend-difference">
            {currentXP.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* Next Level Info */}
      <div className="mt-1 text-xs text-neutral-500 text-right">
        {requiredXP - currentXP > 0 ? (
          <span>{(requiredXP - currentXP).toLocaleString()} XP to Level {level + 1}</span>
        ) : (
          <span className="text-success-500 font-semibold">Level up available!</span>
        )}
      </div>
    </div>
  );
}

/**
 * Compact XP Bar (for smaller spaces)
 */
export function XPBarCompact({
  currentXP,
  requiredXP,
  level,
  percentage,
}: XPBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-semibold text-neutral-700">Lvl {level}</span>
        <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-neutral-500">{percentage}%</span>
      </div>
    </div>
  );
}
