// ============================================================================
// Achievement Notification Component - Toast Notification
// ============================================================================
// Purpose: Animated toast when achievement is unlocked
// Author: @dev (Dex) + @ux-expert (Uma)
// Based on: Task 13 (Achievements System)
// ============================================================================

'use client';

import { useEffect, useState } from 'react';

interface AchievementNotificationProps {
  achievement: {
    name: string;
    icon: string;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
    xpReward: number;
  };
  onClose: () => void;
  duration?: number; // ms (default: 5000)
}

export function AchievementNotification({
  achievement,
  onClose,
  duration = 5000,
}: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    const showTimer = setTimeout(() => setIsVisible(true), 100);

    // Auto-close
    const closeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  const tierColors = {
    bronze: 'from-amber-700 to-amber-900',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-slate-300 to-slate-500',
    diamond: 'from-cyan-400 to-blue-500',
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-sm animate-bounce-subtle">
        {/* Tier Gradient */}
        <div className={`h-2 bg-gradient-to-r ${tierColors[achievement.tier]}`} />

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🎉</span>
            <h3 className="text-lg font-bold text-neutral-900">Achievement Unlocked!</h3>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="ml-auto text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Achievement Info */}
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${tierColors[achievement.tier]} flex items-center justify-center text-3xl shadow-glow`}
            >
              {achievement.icon}
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-neutral-900 mb-1">
                {achievement.name}
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                <span>⭐</span>
                <span>+{achievement.xpReward} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sparkles Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
