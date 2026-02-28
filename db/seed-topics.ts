// ============================================================================
// Seed Script — Grammar Topic Exercises
// ============================================================================
// Run: npm run db:seed-topics
// ============================================================================

// IMPORTANT: Must be the very first executable line before any DB imports
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Only import DB-related modules AFTER env is loaded
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { exercises } from './schema';
import * as schema from './schema';
import { ALL_TOPICS } from '../lib/content/index';
import { sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
  console.error('POSTGRES_URL is not set. Check .env.local');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

const DIFFICULTY_MAP: Record<string, 'easy' | 'medium' | 'hard'> = {
  beginner: 'easy',
  intermediate: 'medium',
  advanced: 'hard',
};

function getSkillType(category: string): string {
  switch (category) {
    case 'Vocabulary': return 'vocabulary';
    default:           return 'grammar';
  }
}

async function seedTopicExercises() {
  console.log('Seeding topic exercises...');

  let inserted = 0;
  let skipped = 0;

  for (const topic of ALL_TOPICS) {
    const difficulty = DIFFICULTY_MAP[topic.level];
    const skillType = getSkillType(topic.category);

    for (const ex of topic.exercises) {
      try {
        // Upsert — insert or skip if already exists (ON CONFLICT DO NOTHING)
        await db
          .insert(exercises)
          .values({
            id: ex.id,
            type: skillType,
            title: `${topic.title} — Exercise`,
            description: ex.question,
            difficulty,
            estimatedTimeSeconds: 45,
            content: {
              topicSlug: topic.slug,
              topicTitle: topic.title,
              exerciseType: ex.type,
              question: ex.question,
              options: ex.options ?? null,
              correctAnswer: ex.correctAnswer,
              explanation: ex.explanation,
              xpBase: ex.xpBase,
            },
            requiredOverallLevel: 1,
            isActive: true,
          })
          .onConflictDoNothing();

        console.log(`  Inserted ${ex.id}`);
        inserted++;
      } catch (err: any) {
        if (err?.code === '23505') {
          console.log(`  Skipping ${ex.id} (duplicate)`);
          skipped++;
        } else {
          console.error(`  Error inserting ${ex.id}:`, err?.message ?? err);
        }
      }
    }
  }

  console.log(`\nDone! Inserted: ${inserted}, Skipped: ${skipped}`);
  await client.end();
  process.exit(0);
}

seedTopicExercises().catch((err) => {
  console.error('Seed failed:', err);
  client.end().then(() => process.exit(1));
});
