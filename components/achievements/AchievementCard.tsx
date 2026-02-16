// ============================================================================
// Achievement Card Component
// ============================================================================
// Purpose: Display individual achievement with progress
// Author: @dev (Dex) + @ux-expert (Uma)
// Based on: Task 13 (Achievements System)
// ============================================================================

'use client';

interface AchievementCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  isUnlocked: boolean;
  progress: number; // 0-100
  xpReward: number;
  unlockedAt?: Date;
}

export function AchievementCard({
  name,
  description,
  icon,
  tier,
  isUnlocked,
  progress,
  xpReward,
  unlockedAt,
}: AchievementCardProps) {
  const tierColors = {
    bronze: 'from-amber-700 to-amber-900',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-slate-300 to-slate-500',
    diamond: 'from-cyan-400 to-blue-500',
  };

  const tierBorders = {
    bronze: 'border-amber-700',
    silver: 'border-gray-400',
    gold: 'border-yellow-400',
    platinum: 'border-slate-300',
    diamond: 'border-cyan-400',
  };

  return (
    <div
      className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg ${
        isUnlocked ? 'opacity-100' : 'opacity-60'
      }`}
    >
      {/* Tier Gradient Header */}
      <div className={`h-2 bg-gradient-to-r ${tierColors[tier]}`} />

      {/* Content */}
      <div className="p-6">
        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-br ${tierColors[tier]} flex items-center justify-center text-3xl border-4 ${tierBorders[tier]}`}
          >
            {isUnlocked ? icon : '🔒'}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-neutral-900 mb-1">{name}</h3>
            <p className="text-sm text-neutral-600">{description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        {!isUnlocked && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-neutral-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${tierColors[tier]} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-semibold text-amber-600">
            <span>⭐</span>
            <span>{xpReward} XP</span>
          </div>
          {isUnlocked && unlockedAt && (
            <div className="text-xs text-neutral-500">
              Unlocked {formatDate(unlockedAt)}
            </div>
          )}
          {!isUnlocked && (
            <div className="text-xs text-neutral-500 capitalize">{tier}</div>
          )}
        </div>

        {/* Unlock Badge */}
        {isUnlocked && (
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return date.toLocaleDateString();
}
