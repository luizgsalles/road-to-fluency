// ============================================================================
// Shared TypeScript Types
// ============================================================================
// Purpose: Centralize shared types across the application
// Author: @dev (Dex)
// ============================================================================

// Re-export database types
export type {
  User,
  NewUser,
  Exercise,
  NewExercise,
  UserProgress,
  NewUserProgress,
  ReviewSchedule,
  NewReviewSchedule,
  Achievement,
  NewAchievement,
  UserAchievement,
  NewUserAchievement,
  StudySession,
  NewStudySession,
} from '@/db/schema';

// Exercise types
export type ExerciseType = 'grammar' | 'vocabulary' | 'listening' | 'writing' | 'speaking' | 'reading';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type PerformanceRating = 'again' | 'hard' | 'good' | 'easy';

// Skill types
export type Skill = 'grammar' | 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing';

export interface SkillLevels {
  grammar: number;
  vocabulary: number;
  listening: number;
  speaking: number;
  reading: number;
  writing: number;
}

// Achievement types
export type AchievementCategory = 'streak' | 'level' | 'exercises' | 'mastery' | 'social';
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

// API Response types
export interface APIResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// User session type (extends NextAuth session)
export interface UserSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}

// Stats types
export interface DailyStats {
  date: string;
  exercisesCompleted: number;
  totalXP: number;
  avgAccuracy: number;
  studyTimeSeconds: number;
}

export interface WeeklyStats {
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

export interface UserStats {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  level: {
    overall: number;
    progress: {
      currentXP: number;
      requiredXP: number;
      percentage: number;
    };
  };
  xp: {
    total: number;
    currentLevelXP: number;
    requiredForNextLevel: number;
  };
  skills: {
    levels: SkillLevels;
    progress: Record<Skill, {
      level: number;
      currentXP: number;
      requiredXP: number;
      percentage: number;
    }>;
  };
  streaks: {
    current: number;
    longest: number;
  };
  totals: {
    exercisesCompleted: number;
    totalTimeSeconds: number;
    averageAccuracy: number;
  };
  reviews: {
    total: number;
    dueToday: number;
    overdue: number;
    avgMastery: number;
  };
  recentActivity: DailyStats[];
  achievements: {
    unlocked: number;
    total: number;
  };
}

// Exercise content types (flexible per exercise type)
export type ExerciseContent =
  | GrammarContent
  | VocabularyContent
  | ListeningContent
  | WritingContent
  | SpeakingContent
  | ReadingContent;

export interface GrammarContent {
  questions: Array<{
    id: string;
    sentence: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }>;
}

export interface VocabularyContent {
  cards: Array<{
    id: string;
    word: string;
    definition: string;
    example: string;
    businessContext: string;
  }>;
}

export interface ListeningContent {
  audioUrl: string;
  transcript: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}

export interface WritingContent {
  prompt: {
    title: string;
    scenario: string;
    context: 'email' | 'presentation' | 'report' | 'meeting';
    targetAudience: 'colleague' | 'manager' | 'client' | 'team';
    desiredTone: 'professional' | 'casual' | 'formal';
    wordCountMin: number;
    wordCountMax: number;
  };
}

export interface SpeakingContent {
  prompt: {
    question: string;
    sampleAnswer: string;
    tips: string[];
    maxDurationSeconds: number;
  };
}

export interface ReadingContent {
  passage: {
    title: string;
    type: 'email' | 'article' | 'report' | 'memo';
    content: string;
    wordCount: number;
  };
  questions: Array<{
    id: string;
    question: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    options?: string[];
    correctAnswer: string;
    explanation: string;
  }>;
}
