// ============================================================================
// Achievement List Component - Grid of All Achievements
// ============================================================================
// Purpose: Display all achievements with filters
// Author: @dev (Dex) + @ux-expert (Uma)
// Based on: Task 13 (Achievements System)
// ============================================================================

'use client';

import { useState } from 'react';
import { AchievementCard } from './AchievementCard';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'level' | 'exercises' | 'mastery' | 'social';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  criteriaType: string;
  criteriaValue: number;
  xpReward: number;
  isUnlocked: boolean;
  progress: number;
  unlockedAt?: Date;
}

interface AchievementListProps {
  achievements: Achievement[];
}

export function AchievementList({ achievements }: AchievementListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);

  // Filter achievements
  const filteredAchievements = achievements.filter((achievement) => {
    if (showOnlyUnlocked && !achievement.isUnlocked) return false;
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory) return false;
    return true;
  });

  // Calculate stats
  const totalAchievements = achievements.length;
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const unlockedPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  // Group by category
  const categories: Array<{ value: string; label: string; icon: string }> = [
    { value: 'all', label: 'All', icon: '🏆' },
    { value: 'streak', label: 'Streaks', icon: '🔥' },
    { value: 'level', label: 'Levels', icon: '⬆️' },
    { value: 'exercises', label: 'Exercises', icon: '📚' },
    { value: 'mastery', label: 'Mastery', icon: '🎯' },
    { value: 'social', label: 'Social', icon: '👥' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Achievements</h2>
        <div className="flex items-center gap-4">
          <div>
            <div className="text-4xl font-bold">{unlockedCount}</div>
            <div className="text-sm opacity-90">Unlocked</div>
          </div>
          <div className="flex-1">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${unlockedPercentage}%` }}
              />
            </div>
            <div className="text-sm opacity-90 mt-1">
              {unlockedPercentage}% complete ({unlockedCount}/{totalAchievements})
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Show Only Unlocked Toggle */}
        <label className="flex items-center gap-2 ml-auto cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyUnlocked}
            onChange={(e) => setShowOnlyUnlocked(e.target.checked)}
            className="w-4 h-4 accent-primary-500"
          />
          <span className="text-sm text-neutral-700">Show only unlocked</span>
        </label>
      </div>

      {/* Achievement Grid */}
      {filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} {...achievement} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-neutral-700 mb-2">
            No achievements found
          </h3>
          <p className="text-neutral-500">
            Try adjusting your filters or start unlocking achievements!
          </p>
        </div>
      )}
    </div>
  );
}
