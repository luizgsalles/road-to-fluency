// ============================================================================
// Upcoming Achievements Component
// ============================================================================
// Purpose: Show next achievements close to unlocking
// Author: @dev (Dex) + @ux-expert (Uma)
// Based on: Task 13 (Achievements System)
// ============================================================================

'use client';

interface UpcomingAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  progress: number; // 0-100
  xpReward: number;
  requiredProgress: string; // e.g., "3 more days", "50 more exercises"
}

interface UpcomingAchievementsProps {
  achievements: UpcomingAchievement[];
  maxDisplay?: number;
}

export function UpcomingAchievements({
  achievements,
  maxDisplay = 5,
}: UpcomingAchievementsProps) {
  // Sort by progress (highest first) and take top N
  const topAchievements = [...achievements]
    .sort((a, b) => b.progress - a.progress)
    .slice(0, maxDisplay);

  if (topAchievements.length === 0) {
    return null;
  }

  const tierColors = {
    bronze: 'text-amber-700',
    silver: 'text-gray-500',
    gold: 'text-yellow-500',
    platinum: 'text-slate-400',
    diamond: 'text-cyan-500',
  };

  const tierBgs = {
    bronze: 'bg-amber-100',
    silver: 'bg-gray-100',
    gold: 'bg-yellow-100',
    platinum: 'bg-slate-100',
    diamond: 'bg-cyan-100',
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
        <span>🎯</span>
        <span>Almost There!</span>
      </h3>

      <div className="space-y-4">
        {topAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-start gap-4 p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-full ${tierBgs[achievement.tier]} flex items-center justify-center text-2xl flex-shrink-0`}
            >
              {achievement.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-neutral-900 text-sm">
                  {achievement.name}
                </h4>
                <span className={`text-xs font-semibold ${tierColors[achievement.tier]} capitalize`}>
                  {achievement.tier}
                </span>
              </div>

              <p className="text-xs text-neutral-600 mb-2 line-clamp-2">
                {achievement.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-1">
                <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-500"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>

              {/* Progress Text */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500">{achievement.requiredProgress}</span>
                <span className="font-semibold text-primary-600">
                  {achievement.progress}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {achievements.length > maxDisplay && (
        <div className="mt-4 text-center">
          <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">
            View all achievements →
          </button>
        </div>
      )}
    </div>
  );
}
