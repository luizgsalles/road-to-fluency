// ============================================================================
// Dashboard Page - Main User Dashboard
// ============================================================================
// Purpose: Dashboard with XP, skills, streaks, achievements, and daily mix
// Author: @dev (Dex) + @ux-expert (Uma)
// Based on: Task 12 (Dashboard Stats)
// ============================================================================

import { redirect } from 'next/navigation';
import { XPBar } from '@/components/dashboard/XPBar';
import { SkillsRadarWithLabels } from '@/components/dashboard/SkillsRadar';
import { StreakCounter } from '@/components/dashboard/StreakCounter';
import { StudyHeatmap } from '@/components/dashboard/StudyHeatmap';
import { XPGrowthChart } from '@/components/dashboard/XPGrowthChart';
import { WeeklyStats } from '@/components/dashboard/WeeklyStats';
import { AccuracyTrend } from '@/components/dashboard/AccuracyTrend';
import { UpcomingAchievements } from '@/components/achievements/UpcomingAchievements';
import Link from 'next/link';
import { getCurrentUser, isDemoMode } from '@/lib/demo';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const isDemo = await isDemoMode();

  if (!user) {
    redirect('/auth/signin');
  }

  // TODO: Fetch user stats from API
  // const stats = await fetch(`/api/user/stats`).then(res => res.json());

  // Mock data for development (use real user data in demo mode)
  const mockStats = {
    user: {
      name: user.name || 'Demo User',
      email: user.email,
      image: user.image
    },
    level: { overall: 12, progress: { currentXP: 350, requiredXP: 500, percentage: 70 } },
    xp: { total: 3250, currentLevelXP: 350, requiredForNextLevel: 500 },
    skills: {
      levels: { grammar: 3, vocabulary: 4, listening: 2, speaking: 3, reading: 3, writing: 2 },
    },
    streaks: { current: 5, longest: 14 },
    totals: { exercisesCompleted: 47, totalTimeSeconds: 8400, averageAccuracy: 78 },
    recentActivity: [
      { date: '2026-02-10', exercisesCompleted: 3, totalXP: 75, avgAccuracy: 82 },
      { date: '2026-02-11', exercisesCompleted: 5, totalXP: 120, avgAccuracy: 75 },
      { date: '2026-02-12', exercisesCompleted: 4, totalXP: 95, avgAccuracy: 80 },
      { date: '2026-02-13', exercisesCompleted: 6, totalXP: 140, avgAccuracy: 77 },
      { date: '2026-02-14', exercisesCompleted: 8, totalXP: 180, avgAccuracy: 85 },
      { date: '2026-02-15', exercisesCompleted: 7, totalXP: 160, avgAccuracy: 79 },
      { date: '2026-02-16', exercisesCompleted: 4, totalXP: 95, avgAccuracy: 76 },
    ],
    upcomingAchievements: [
      {
        id: '1',
        name: '7-Day Streak',
        description: 'Study for 7 consecutive days',
        icon: '🔥',
        tier: 'bronze' as const,
        progress: 71,
        xpReward: 100,
        requiredProgress: '2 more days',
      },
      {
        id: '2',
        name: 'Grammar Master',
        description: 'Reach level 5 in Grammar',
        icon: '📚',
        tier: 'silver' as const,
        progress: 60,
        xpReward: 200,
        requiredProgress: '2 more levels',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Demo Mode Banner */}
      {isDemo && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 text-center font-semibold">
          🎮 DEMO MODE - You&apos;re testing with a demo account
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Link
                href="/exercises"
                className="px-4 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
              >
                Start Learning
              </Link>
              <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden">
                {mockStats.user.image ? (
                  <img src={mockStats.user.image} alt={mockStats.user.name || ''} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600">
                    {mockStats.user.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* XP Progress */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <XPBar
                currentXP={mockStats.level.progress.currentXP}
                requiredXP={mockStats.level.progress.requiredXP}
                level={mockStats.level.overall}
                percentage={mockStats.level.progress.percentage}
              />
            </div>

            {/* Weekly Stats */}
            <WeeklyStats
              exercisesCompleted={mockStats.totals.exercisesCompleted}
              totalXP={mockStats.xp.total}
              averageAccuracy={mockStats.totals.averageAccuracy}
              studyTimeMinutes={Math.round(mockStats.totals.totalTimeSeconds / 60)}
            />

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* XP Growth */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">XP Growth</h3>
                <div className="h-64">
                  <XPGrowthChart
                    data={mockStats.recentActivity.map((a) => ({ date: a.date, xp: a.totalXP }))}
                    period="7d"
                  />
                </div>
              </div>

              {/* Accuracy Trend */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="h-64">
                  <AccuracyTrend
                    data={mockStats.recentActivity.map((a) => ({
                      date: a.date,
                      accuracy: a.avgAccuracy,
                    }))}
                    targetAccuracy={75}
                  />
                </div>
              </div>
            </div>

            {/* Study Heatmap */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <StudyHeatmap
                data={mockStats.recentActivity.map((a) => ({
                  date: a.date,
                  exercisesCompleted: a.exercisesCompleted,
                  totalXP: a.totalXP,
                }))}
                weeks={12}
              />
            </div>
          </div>

          {/* Right Column - Skills & Achievements */}
          <div className="space-y-6">
            {/* Streak Counter */}
            <StreakCounter
              currentStreak={mockStats.streaks.current}
              longestStreak={mockStats.streaks.longest}
              todayCompleted={true}
            />

            {/* Skills Radar */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Skills Overview</h3>
              <SkillsRadarWithLabels skills={mockStats.skills.levels} maxLevel={10} />
            </div>

            {/* Upcoming Achievements */}
            <UpcomingAchievements achievements={mockStats.upcomingAchievements} maxDisplay={3} />

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/daily-mix"
                  className="block px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium"
                >
                  📅 Today&apos;s Mix
                </Link>
                <Link
                  href="/achievements"
                  className="block px-4 py-3 bg-neutral-50 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors font-medium"
                >
                  🏆 All Achievements
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-3 bg-neutral-50 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors font-medium"
                >
                  ⚙️ Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
