// ============================================================================
// Grammar Topics — Metadata & Types
// ============================================================================

export type Category = 'Verb Tenses' | 'Modals' | 'Conditionals' | 'Structure' | 'Vocabulary';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type ExerciseType = 'multiple-choice' | 'fill-in-blank';

export interface Example {
  en: string;
  pt: string;
}

export interface TopicExercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  xpBase: number; // full XP (learn mode gets 50%)
}

export interface TopicTheory {
  formation: string;
  usage: string[];
  examples: Example[];
  commonMistakes: string[];
  tips: string;
}

export interface TopicContent {
  slug: string;
  title: string;
  category: Category;
  color: string;
  level: Level;
  theory: TopicTheory;
  exercises: TopicExercise[];
}

export interface TopicMeta {
  slug: string;
  title: string;
  category: Category;
  color: string;
  level: Level;
}

// ============================================================================
// 25 Topic Definitions (metadata only — content in topics/*.ts)
// ============================================================================

export const GRAMMAR_TOPICS: TopicMeta[] = [
  // Verb Tenses (8)
  { slug: 'present-simple',              title: 'Present Simple',               category: 'Verb Tenses',  color: '#3B82F6', level: 'beginner'     },
  { slug: 'present-continuous',          title: 'Present Continuous',           category: 'Verb Tenses',  color: '#3B82F6', level: 'beginner'     },
  { slug: 'present-perfect',             title: 'Present Perfect',              category: 'Verb Tenses',  color: '#3B82F6', level: 'intermediate' },
  { slug: 'present-perfect-continuous',  title: 'Present Perfect Continuous',   category: 'Verb Tenses',  color: '#3B82F6', level: 'intermediate' },
  { slug: 'past-simple',                 title: 'Past Simple',                  category: 'Verb Tenses',  color: '#3B82F6', level: 'beginner'     },
  { slug: 'past-perfect',                title: 'Past Perfect',                 category: 'Verb Tenses',  color: '#3B82F6', level: 'intermediate' },
  { slug: 'future-will',                 title: 'Future (will)',                category: 'Verb Tenses',  color: '#3B82F6', level: 'beginner'     },
  { slug: 'future-going-to',             title: 'Future (going to)',            category: 'Verb Tenses',  color: '#3B82F6', level: 'beginner'     },

  // Modals (3)
  { slug: 'modals-ability',              title: 'Ability & Possibility',        category: 'Modals',       color: '#8B5CF6', level: 'beginner'     },
  { slug: 'modals-obligation',           title: 'Obligation & Advice',          category: 'Modals',       color: '#8B5CF6', level: 'intermediate' },
  { slug: 'modals-hypothetical',         title: 'Hypothetical & Polite',        category: 'Modals',       color: '#8B5CF6', level: 'intermediate' },

  // Conditionals (5)
  { slug: 'conditionals-zero',           title: 'Zero Conditional',             category: 'Conditionals', color: '#EC4899', level: 'beginner'     },
  { slug: 'conditionals-first',          title: 'First Conditional',            category: 'Conditionals', color: '#EC4899', level: 'beginner'     },
  { slug: 'conditionals-second',         title: 'Second Conditional',           category: 'Conditionals', color: '#EC4899', level: 'intermediate' },
  { slug: 'conditionals-third',          title: 'Third Conditional',            category: 'Conditionals', color: '#EC4899', level: 'advanced'     },
  { slug: 'conditionals-mixed',          title: 'Mixed Conditionals',           category: 'Conditionals', color: '#EC4899', level: 'advanced'     },

  // Structure (5)
  { slug: 'passive-voice',               title: 'Passive Voice',                category: 'Structure',    color: '#F59E0B', level: 'intermediate' },
  { slug: 'reported-speech',             title: 'Reported Speech',              category: 'Structure',    color: '#F59E0B', level: 'intermediate' },
  { slug: 'questions',                   title: 'Questions (Direct & Indirect)',category: 'Structure',    color: '#F59E0B', level: 'beginner'     },
  { slug: 'articles',                    title: 'Articles (a / an / the)',      category: 'Structure',    color: '#F59E0B', level: 'beginner'     },
  { slug: 'prepositions',                title: 'Prepositions of Time & Place', category: 'Structure',    color: '#F59E0B', level: 'beginner'     },

  // Vocabulary (4)
  { slug: 'business-emails',             title: 'Business Emails',              category: 'Vocabulary',   color: '#10B981', level: 'intermediate' },
  { slug: 'presentations',               title: 'Presentations',                category: 'Vocabulary',   color: '#10B981', level: 'intermediate' },
  { slug: 'meetings',                    title: 'Meetings & Discussions',       category: 'Vocabulary',   color: '#10B981', level: 'intermediate' },
  { slug: 'formal-informal',             title: 'Formal vs Informal',           category: 'Vocabulary',   color: '#10B981', level: 'beginner'     },
];

export const CATEGORIES: Category[] = [
  'Verb Tenses',
  'Modals',
  'Conditionals',
  'Structure',
  'Vocabulary',
];

export function getTopicBySlug(slug: string): TopicMeta | undefined {
  return GRAMMAR_TOPICS.find((t) => t.slug === slug);
}

export function getTopicsByCategory(category: Category): TopicMeta[] {
  return GRAMMAR_TOPICS.filter((t) => t.category === category);
}
