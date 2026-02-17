// ============================================================================
// Exercises Page - Browse All Exercises
// ============================================================================
// Purpose: Browse and filter all available exercises
// Author: @dev (Dex) + @ux-expert (Uma)
// ============================================================================

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/demo';

export default async function ExercisesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  // TODO: Fetch exercises from API with filters
  // const exercises = await fetch(`/api/exercises`).then(res => res.json());

  // Mock exercises for development
  const exercises = [
    {
      id: '1',
      type: 'grammar',
      title: 'Present Perfect Tense',
      description: 'Practice using present perfect in business context',
      difficulty: 'medium',
      estimatedTime: 3,
      xpReward: 25,
      completionCount: 47,
      averageAccuracy: 78,
      requiredLevel: 1,
      icon: '📖',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: '2',
      type: 'vocabulary',
      title: 'Business Email Vocabulary',
      description: 'Essential vocabulary for professional emails',
      difficulty: 'easy',
      estimatedTime: 5,
      xpReward: 20,
      completionCount: 124,
      averageAccuracy: 85,
      requiredLevel: 1,
      icon: '📚',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: '3',
      type: 'listening',
      title: 'Business Meeting Conversation',
      description: 'Listen and comprehend a business meeting',
      difficulty: 'hard',
      estimatedTime: 4,
      xpReward: 30,
      completionCount: 23,
      averageAccuracy: 65,
      requiredLevel: 3,
      icon: '👂',
      color: 'from-pink-500 to-pink-600',
    },
    {
      id: '4',
      type: 'speaking',
      title: 'Pronunciation Practice',
      description: 'Common pronunciation mistakes and corrections',
      difficulty: 'medium',
      estimatedTime: 3,
      xpReward: 25,
      completionCount: 56,
      averageAccuracy: 72,
      requiredLevel: 2,
      icon: '🎤',
      color: 'from-amber-500 to-amber-600',
    },
    {
      id: '5',
      type: 'reading',
      title: 'Business Article Comprehension',
      description: 'Read and understand a business article',
      difficulty: 'medium',
      estimatedTime: 6,
      xpReward: 28,
      completionCount: 34,
      averageAccuracy: 80,
      requiredLevel: 2,
      icon: '📄',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      id: '6',
      type: 'writing',
      title: 'Email Writing - Requests',
      description: 'Write professional request emails',
      difficulty: 'hard',
      estimatedTime: 8,
      xpReward: 35,
      completionCount: 18,
      averageAccuracy: 68,
      requiredLevel: 3,
      icon: '✍️',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      id: '7',
      type: 'grammar',
      title: 'Conditional Sentences',
      description: 'Master first and second conditionals',
      difficulty: 'hard',
      estimatedTime: 4,
      xpReward: 30,
      completionCount: 29,
      averageAccuracy: 64,
      requiredLevel: 5,
      icon: '📖',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: '8',
      type: 'vocabulary',
      title: 'Meeting Vocabulary',
      description: 'Essential phrases for business meetings',
      difficulty: 'medium',
      estimatedTime: 4,
      xpReward: 22,
      completionCount: 67,
      averageAccuracy: 76,
      requiredLevel: 2,
      icon: '📚',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  // Filter by type
  const exercisesByType = {
    grammar: exercises.filter((e) => e.type === 'grammar'),
    vocabulary: exercises.filter((e) => e.type === 'vocabulary'),
    listening: exercises.filter((e) => e.type === 'listening'),
    speaking: exercises.filter((e) => e.type === 'speaking'),
    reading: exercises.filter((e) => e.type === 'reading'),
    writing: exercises.filter((e) => e.type === 'writing'),
  };

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Dashboard</span>
              </Link>
              <h1 className="text-3xl font-bold mt-2">
                <span className="text-gradient">All Exercises</span> 📚
              </h1>
              <p className="text-muted-foreground mt-1">
                Browse and practice all available exercises
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/daily-mix" className="btn-accent">
                <span>🎯</span>
                <span>Daily Mix</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container-custom py-12">
        {/* Stats Banner */}
        <div className="card-glass mb-8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">
                {exercises.length} Exercícios Disponíveis
              </h3>
              <p className="text-sm text-muted-foreground">
                Seu nível atual: <span className="font-semibold text-gradient">Level {user.overallLevel}</span>
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">{exercisesByType.grammar.length}</div>
                <div className="text-xs text-muted-foreground">Grammar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">{exercisesByType.vocabulary.length}</div>
                <div className="text-xs text-muted-foreground">Vocabulary</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">{exercisesByType.listening.length}</div>
                <div className="text-xs text-muted-foreground">Listening</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">{exercisesByType.speaking.length}</div>
                <div className="text-xs text-muted-foreground">Speaking</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">{exercisesByType.reading.length}</div>
                <div className="text-xs text-muted-foreground">Reading</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">{exercisesByType.writing.length}</div>
                <div className="text-xs text-muted-foreground">Writing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} userLevel={user.overallLevel} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExerciseCard({
  exercise,
  userLevel,
}: {
  exercise: {
    id: string;
    type: string;
    title: string;
    description: string;
    difficulty: string;
    estimatedTime: number;
    xpReward: number;
    completionCount: number;
    averageAccuracy: number;
    requiredLevel: number;
    icon: string;
    color: string;
  };
  userLevel: number;
}) {
  const isLocked = userLevel < exercise.requiredLevel;

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    hard: 'bg-red-100 text-red-700 border-red-200',
  };

  const difficultyLabels = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
  };

  return (
    <div className={`card group ${isLocked ? 'opacity-60' : ''}`}>
      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${exercise.color} text-white text-3xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
        {exercise.icon}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {exercise.type}
          </span>
          <span className={`badge ${difficultyColors[exercise.difficulty as keyof typeof difficultyColors]}`}>
            {difficultyLabels[exercise.difficulty as keyof typeof difficultyLabels]}
          </span>
        </div>
        {isLocked && (
          <span className="text-xl">🔒</span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-2 group-hover:text-gradient transition-colors">
        {exercise.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4">
        {exercise.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {exercise.estimatedTime}min
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-gradient">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          +{exercise.xpReward} XP
        </span>
        <span className="inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {exercise.completionCount}
        </span>
      </div>

      {/* Accuracy Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground">Avg. Accuracy</span>
          <span className="font-semibold">{exercise.averageAccuracy}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${exercise.averageAccuracy}%` }} />
        </div>
      </div>

      {/* Action */}
      {isLocked ? (
        <div className="text-center py-2 text-sm text-muted-foreground">
          Requires Level {exercise.requiredLevel}
        </div>
      ) : (
        <Link href={`/exercise/${exercise.id}`} className="btn-primary w-full">
          Start Exercise
        </Link>
      )}
    </div>
  );
}
