// ============================================================================
// Study Heatmap - GitHub-style Activity Calendar
// ============================================================================
// Purpose: Visualize daily study activity over time
// Author: @viz-engineer (Pixel) + @dev (Dex)
// Based on: Task 12 (Dashboard Stats)
// ============================================================================

'use client';

interface DayActivity {
  date: string; // YYYY-MM-DD
  exercisesCompleted: number;
  totalXP: number;
}

interface StudyHeatmapProps {
  data: DayActivity[];
  weeks?: number; // Number of weeks to display (default: 12)
}

export function StudyHeatmap({ data, weeks = 12 }: StudyHeatmapProps) {
  // Generate last N weeks of dates
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - weeks * 7);

  const days: (DayActivity | null)[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const activity = data.find((d) => d.date === dateStr);
    days.push(activity || null);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Get intensity color based on exercises completed
  const getIntensityColor = (exercisesCompleted: number | null): string => {
    if (exercisesCompleted === null || exercisesCompleted === 0) return 'bg-neutral-100';
    if (exercisesCompleted < 3) return 'bg-primary-200';
    if (exercisesCompleted < 6) return 'bg-primary-400';
    if (exercisesCompleted < 10) return 'bg-primary-600';
    return 'bg-primary-800';
  };

  // Group days by week
  const daysByWeek: (DayActivity | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    daysByWeek.push(days.slice(i, i + 7));
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-neutral-700">Study Activity</h3>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-neutral-100 rounded-sm" />
            <div className="w-3 h-3 bg-primary-200 rounded-sm" />
            <div className="w-3 h-3 bg-primary-400 rounded-sm" />
            <div className="w-3 h-3 bg-primary-600 rounded-sm" />
            <div className="w-3 h-3 bg-primary-800 rounded-sm" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="flex gap-1 overflow-x-auto">
        {daysByWeek.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => {
              const dateObj = day ? new Date(day.date) : null;
              const dayName = dateObj ? dateObj.toLocaleDateString('en-US', { weekday: 'short' }) : '';
              const formattedDate = dateObj ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';

              return (
                <div
                  key={dayIndex}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(day?.exercisesCompleted || null)} hover:ring-2 hover:ring-primary-500 hover:ring-offset-1 transition-all cursor-pointer`}
                  title={day ? `${formattedDate}: ${day.exercisesCompleted} exercises, ${day.totalXP} XP` : 'No activity'}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Month Labels */}
      <div className="flex gap-1 mt-2 text-xs text-neutral-500">
        {Array.from({ length: weeks / 4 }).map((_, i) => {
          const monthDate = new Date(startDate);
          monthDate.setMonth(monthDate.getMonth() + i);
          return (
            <span key={i} className="flex-1">
              {monthDate.toLocaleDateString('en-US', { month: 'short' })}
            </span>
          );
        })}
      </div>
    </div>
  );
}
