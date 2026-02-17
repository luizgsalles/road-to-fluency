// ============================================================================
// Weekly Stats - Summary Card
// ============================================================================
// Purpose: Display weekly study statistics summary
// Author: @dev (Dex) + @ux-expert (Uma)
// Based on: Task 12 (Dashboard Stats)
// ============================================================================

'use client';

interface WeeklyStatsProps {
  exercisesCompleted: number;
  totalXP: number;
  averageAccuracy: number;
  studyTimeMinutes: number;
  comparisonToLastWeek?: {
    exercises: number; // percentage change
    xp: number;
    accuracy: number;
    time: number;
  };
}

export function WeeklyStats({
  exercisesCompleted,
  totalXP,
  averageAccuracy,
  studyTimeMinutes,
  comparisonToLastWeek,
}: WeeklyStatsProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">This Week</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Exercises */}
        <StatItem
          label="Exercises"
          value={exercisesCompleted.toString()}
          icon="✓"
          change={comparisonToLastWeek?.exercises}
        />

        {/* XP Earned */}
        <StatItem
          label="XP Earned"
          value={formatNumber(totalXP)}
          icon="⭐"
          change={comparisonToLastWeek?.xp}
        />

        {/* Accuracy */}
        <StatItem
          label="Accuracy"
          value={`${averageAccuracy}%`}
          icon="🎯"
          change={comparisonToLastWeek?.accuracy}
        />

        {/* Study Time */}
        <StatItem
          label="Study Time"
          value={formatStudyTime(studyTimeMinutes)}
          icon="⏱️"
          change={comparisonToLastWeek?.time}
        />
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  icon,
  change,
}: {
  label: string;
  value: string;
  icon: string;
  change?: number;
}) {
  const hasChange = change !== undefined;
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="flex items-start gap-3">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <div className="text-2xl font-bold text-neutral-900">{value}</div>
        <div className="text-sm text-neutral-600">{label}</div>
        {hasChange && (
          <div
            className={`text-xs font-medium mt-1 ${
              isPositive ? 'text-success-600' : isNegative ? 'text-error-600' : 'text-neutral-500'
            }`}
          >
            {isPositive && '+'}
            {change}% vs last week
          </div>
        )}
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  // Format with dots as thousand separator (consistent across server/client)
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatStudyTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
