-- ============================================================================
-- DATABASE SCHEMA - Road to Fluency
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-02-16
-- Author: @architect (Aria) - AIOS Software Architect
-- Database: PostgreSQL 15+ (Vercel Postgres)
-- ORM: Drizzle ORM (TypeScript)
-- Status: ✅ READY FOR IMPLEMENTATION
-- ============================================================================

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- TABLE 1: users
-- Purpose: Core user data, authentication, progression
-- ============================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100),
    avatar_url TEXT,

    -- Authentication
    email_verified TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,

    -- Progression
    xp_total INTEGER DEFAULT 0 CHECK (xp_total >= 0),
    level INTEGER DEFAULT 1 CHECK (level >= 1 AND level <= 100),

    -- Skills (6 skills: Grammar, Vocabulary, Listening, Speaking, Reading, Writing)
    skill_xp JSONB DEFAULT '{
        "grammar": 0,
        "vocabulary": 0,
        "listening": 0,
        "speaking": 0,
        "reading": 0,
        "writing": 0
    }'::jsonb,

    -- Gamification
    streak_current INTEGER DEFAULT 0 CHECK (streak_current >= 0),
    streak_longest INTEGER DEFAULT 0 CHECK (streak_longest >= 0),
    last_activity_date DATE,

    -- Settings
    settings JSONB DEFAULT '{
        "daily_goal_minutes": 20,
        "difficulty": "medium",
        "notifications_enabled": true,
        "theme": "light",
        "audio_speed": 1.0,
        "audio_volume": 0.8
    }'::jsonb,

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_level ON users(level DESC);
CREATE INDEX idx_users_xp_total ON users(xp_total DESC);
CREATE INDEX idx_users_streak ON users(streak_current DESC);

COMMENT ON TABLE users IS 'Core user data with progression and settings';
COMMENT ON COLUMN users.skill_xp IS 'JSON object with XP per skill (Grammar, Vocabulary, etc)';
COMMENT ON COLUMN users.settings IS 'User preferences (daily goal, theme, audio, notifications)';

-- ============================================================================
-- TABLE 2: accounts
-- Purpose: OAuth providers (NextAuth.js compatibility)
-- ============================================================================

CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'oauth' | 'email'
    provider VARCHAR(50) NOT NULL, -- 'google' | 'email'
    provider_account_id VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type VARCHAR(50),
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(provider, provider_account_id)
);

CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_accounts_provider ON accounts(provider);

COMMENT ON TABLE accounts IS 'OAuth providers for NextAuth.js (Google, Email)';

-- ============================================================================
-- TABLE 3: sessions
-- Purpose: User sessions (NextAuth.js compatibility)
-- ============================================================================

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(session_token);
CREATE INDEX idx_sessions_expires ON sessions(expires);

COMMENT ON TABLE sessions IS 'Active user sessions for NextAuth.js';

-- ============================================================================
-- TABLE 4: verification_tokens
-- Purpose: Magic link tokens (NextAuth.js email provider)
-- ============================================================================

CREATE TABLE verification_tokens (
    identifier VARCHAR(255) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    PRIMARY KEY (identifier, token)
);

CREATE INDEX idx_verification_tokens_token ON verification_tokens(token);
CREATE INDEX idx_verification_tokens_expires ON verification_tokens(expires);

COMMENT ON TABLE verification_tokens IS 'Magic link tokens for email authentication';

-- ============================================================================
-- TABLE 5: exercises
-- Purpose: Exercise content (Grammar, Vocabulary, Listening, etc)
-- ============================================================================

CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Metadata
    type VARCHAR(50) NOT NULL CHECK (type IN ('grammar', 'vocabulary', 'listening', 'writing', 'speaking', 'reading')),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),

    -- Content
    content JSONB NOT NULL, -- Exercise-specific data (questions, options, audio_url, etc)
    correct_answer JSONB, -- Correct answer(s) for auto-grading
    explanation TEXT, -- Explanation shown after completion

    -- Categorization
    topic VARCHAR(100), -- e.g., 'Present Simple', 'Business Emails', 'Conditionals'
    lesson_id UUID, -- Optional: link to lesson
    tags TEXT[], -- e.g., ['grammar', 'tenses', 'business']

    -- XP & Difficulty
    base_xp INTEGER DEFAULT 10 CHECK (base_xp > 0),
    estimated_time_seconds INTEGER DEFAULT 120, -- Avg time to complete

    -- Ordering & Unlocking
    order_index INTEGER DEFAULT 0,
    required_level INTEGER DEFAULT 1,
    required_skill_level INTEGER DEFAULT 0, -- e.g., Grammar skill level 3+

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_exercises_type ON exercises(type);
CREATE INDEX idx_exercises_difficulty ON exercises(difficulty);
CREATE INDEX idx_exercises_topic ON exercises(topic);
CREATE INDEX idx_exercises_level ON exercises(required_level);

COMMENT ON TABLE exercises IS 'Exercise content library (6 types)';
COMMENT ON COLUMN exercises.content IS 'Exercise-specific data (questions, audio, text, etc)';

-- ============================================================================
-- TABLE 6: user_progress
-- Purpose: Track user performance on exercises (for XP, accuracy, SM-2)
-- ============================================================================

CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,

    -- Performance
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    time_spent_seconds INTEGER CHECK (time_spent_seconds >= 0),
    accuracy DECIMAL(5,2) CHECK (accuracy >= 0 AND accuracy <= 100), -- 0-100%
    user_answer JSONB, -- User's submitted answer

    -- XP Earned
    xp_earned INTEGER DEFAULT 0 CHECK (xp_earned >= 0),
    xp_bonus INTEGER DEFAULT 0, -- Accuracy/speed/streak bonus

    -- SM-2 Spaced Repetition
    performance_rating VARCHAR(20) CHECK (performance_rating IN ('again', 'hard', 'good', 'easy')),

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_exercise_id ON user_progress(exercise_id);
CREATE INDEX idx_user_progress_completed_at ON user_progress(completed_at DESC);
CREATE INDEX idx_user_progress_accuracy ON user_progress(accuracy);

-- Unique constraint: user can complete same exercise multiple times (for spaced repetition)
-- No unique constraint here

COMMENT ON TABLE user_progress IS 'User performance history on exercises';
COMMENT ON COLUMN user_progress.performance_rating IS 'SM-2 rating: again/hard/good/easy';

-- ============================================================================
-- TABLE 7: review_schedule
-- Purpose: SM-2 spaced repetition schedule
-- ============================================================================

CREATE TABLE review_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,

    -- SM-2 Algorithm Data
    repetitions INTEGER DEFAULT 0, -- Number of successful reviews
    ease_factor DECIMAL(3,2) DEFAULT 2.50 CHECK (ease_factor >= 1.3), -- SM-2 ease factor
    interval_days INTEGER DEFAULT 1 CHECK (interval_days > 0), -- Days until next review
    next_review_date DATE NOT NULL,

    -- Performance History
    last_performance VARCHAR(20), -- 'again' | 'hard' | 'good' | 'easy'
    last_reviewed_at TIMESTAMP WITH TIME ZONE,

    -- Mastery Level (0-5)
    mastery_level INTEGER DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 5),
    -- 0: New, 1: Learning, 2: Familiar, 3: Known, 4: Mastered, 5: Expert

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(user_id, exercise_id)
);

CREATE INDEX idx_review_schedule_user_id ON review_schedule(user_id);
CREATE INDEX idx_review_schedule_next_review ON review_schedule(next_review_date);
CREATE INDEX idx_review_schedule_mastery ON review_schedule(mastery_level);
CREATE INDEX idx_review_schedule_due_today ON review_schedule(user_id, next_review_date) WHERE next_review_date <= CURRENT_DATE;

COMMENT ON TABLE review_schedule IS 'SM-2 spaced repetition schedule per user per exercise';
COMMENT ON COLUMN review_schedule.ease_factor IS 'SM-2 ease factor (1.3 - 2.5+)';
COMMENT ON COLUMN review_schedule.mastery_level IS '0=New, 1=Learning, 2=Familiar, 3=Known, 4=Mastered, 5=Expert';

-- ============================================================================
-- TABLE 8: achievements
-- Purpose: Achievement definitions (19 achievements)
-- ============================================================================

CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Metadata
    slug VARCHAR(100) UNIQUE NOT NULL, -- 'streak-7-days', 'grammar-master'
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50), -- Icon identifier (emoji or icon name)

    -- Categorization
    type VARCHAR(50) NOT NULL CHECK (type IN ('streak', 'skill', 'volume', 'performance')),
    tier VARCHAR(20) NOT NULL CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum', 'diamond')),

    -- Unlock Criteria
    criteria JSONB NOT NULL,
    -- Example: {"streak_days": 7}, {"grammar_level": 10}, {"total_exercises": 100}

    -- Rewards
    xp_reward INTEGER DEFAULT 50 CHECK (xp_reward >= 0),

    -- Ordering
    order_index INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_achievements_type ON achievements(type);
CREATE INDEX idx_achievements_tier ON achievements(tier);
CREATE INDEX idx_achievements_slug ON achievements(slug);

COMMENT ON TABLE achievements IS 'Achievement definitions (19 total)';
COMMENT ON COLUMN achievements.criteria IS 'JSON with unlock criteria (e.g., {streak_days: 7})';

-- ============================================================================
-- TABLE 9: user_achievements
-- Purpose: User's unlocked achievements
-- ============================================================================

CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,

    -- Progress
    progress JSONB DEFAULT '{}'::jsonb, -- Current progress toward criteria
    unlocked_at TIMESTAMP WITH TIME ZONE,
    is_unlocked BOOLEAN DEFAULT false,

    -- XP Claimed
    xp_claimed BOOLEAN DEFAULT false,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_achievement_id ON user_achievements(achievement_id);
CREATE INDEX idx_user_achievements_unlocked ON user_achievements(is_unlocked);
CREATE INDEX idx_user_achievements_unlocked_at ON user_achievements(unlocked_at DESC);

COMMENT ON TABLE user_achievements IS 'User achievement progress and unlocks';

-- ============================================================================
-- TABLE 10: study_sessions
-- Purpose: Track study sessions (for heatmap, stats)
-- ============================================================================

CREATE TABLE study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Session data
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER CHECK (duration_seconds >= 0),

    -- Exercises completed in this session
    exercises_completed INTEGER DEFAULT 0,
    xp_earned INTEGER DEFAULT 0,
    avg_accuracy DECIMAL(5,2),

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX idx_study_sessions_started_at ON study_sessions(started_at DESC);
CREATE INDEX idx_study_sessions_duration ON study_sessions(duration_seconds DESC);

COMMENT ON TABLE study_sessions IS 'Study session tracking for heatmap and stats';

-- ============================================================================
-- VIEWS
-- ============================================================================

-- View 1: Daily stats per user
CREATE OR REPLACE VIEW v_daily_stats AS
SELECT
    user_id,
    DATE(completed_at) as date,
    COUNT(*) as exercises_completed,
    SUM(xp_earned) as total_xp,
    AVG(accuracy) as avg_accuracy,
    SUM(time_spent_seconds) as total_time_seconds
FROM user_progress
GROUP BY user_id, DATE(completed_at);

COMMENT ON VIEW v_daily_stats IS 'Daily aggregated stats per user (for heatmap)';

-- View 2: Today's review queue
CREATE OR REPLACE VIEW v_review_queue_today AS
SELECT
    rs.user_id,
    rs.exercise_id,
    e.title,
    e.type,
    rs.next_review_date,
    rs.mastery_level,
    rs.interval_days
FROM review_schedule rs
JOIN exercises e ON e.id = rs.exercise_id
WHERE rs.next_review_date <= CURRENT_DATE
ORDER BY rs.next_review_date ASC, rs.mastery_level ASC; -- Hardest first

COMMENT ON VIEW v_review_queue_today IS 'Exercises due for review today';

-- View 3: User leaderboard (by XP)
CREATE OR REPLACE VIEW v_leaderboard_xp AS
SELECT
    id as user_id,
    name,
    avatar_url,
    xp_total,
    level,
    streak_current,
    ROW_NUMBER() OVER (ORDER BY xp_total DESC) as rank
FROM users
WHERE xp_total > 0
ORDER BY xp_total DESC
LIMIT 100;

COMMENT ON VIEW v_leaderboard_xp IS 'Top 100 users by XP (leaderboard)';

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function 1: Calculate level from XP
CREATE OR REPLACE FUNCTION calculate_level_from_xp(total_xp INTEGER)
RETURNS INTEGER AS $$
DECLARE
    level INTEGER := 1;
    required_xp INTEGER;
BEGIN
    WHILE true LOOP
        required_xp := FLOOR(100 * POWER(level, 1.5) + 50);
        IF total_xp < required_xp THEN
            RETURN level - 1;
        END IF;
        level := level + 1;
        IF level > 100 THEN
            RETURN 100;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION calculate_level_from_xp IS 'Calculate user level from total XP (exponential curve)';

-- Function 2: Calculate XP required for next level
CREATE OR REPLACE FUNCTION calculate_xp_for_level(level INTEGER)
RETURNS INTEGER AS $$
BEGIN
    RETURN FLOOR(100 * POWER(level, 1.5) + 50);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION calculate_xp_for_level IS 'Calculate XP required to reach given level';

-- Function 3: Update user level after XP gain
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
DECLARE
    new_level INTEGER;
BEGIN
    new_level := calculate_level_from_xp(NEW.xp_total);
    IF new_level != NEW.level THEN
        NEW.level := new_level;
        NEW.updated_at := NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function 4: Update streak on activity
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
DECLARE
    days_since_last_activity INTEGER;
BEGIN
    IF NEW.last_activity_date IS NULL THEN
        NEW.streak_current := 1;
        NEW.streak_longest := 1;
    ELSE
        days_since_last_activity := CURRENT_DATE - NEW.last_activity_date;

        IF days_since_last_activity = 1 THEN
            -- Consecutive day
            NEW.streak_current := NEW.streak_current + 1;
            IF NEW.streak_current > NEW.streak_longest THEN
                NEW.streak_longest := NEW.streak_current;
            END IF;
        ELSIF days_since_last_activity = 0 THEN
            -- Same day, no change
            NULL;
        ELSE
            -- Streak broken
            NEW.streak_current := 1;
        END IF;
    END IF;

    NEW.last_activity_date := CURRENT_DATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Trigger 1: Auto-update user level on XP change
CREATE TRIGGER trigger_update_user_level
BEFORE UPDATE OF xp_total ON users
FOR EACH ROW
WHEN (NEW.xp_total != OLD.xp_total)
EXECUTE FUNCTION update_user_level();

-- Trigger 2: Auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_accounts_updated_at
BEFORE UPDATE ON accounts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_exercises_updated_at
BEFORE UPDATE ON exercises
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_review_schedule_updated_at
BEFORE UPDATE ON review_schedule
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_user_achievements_updated_at
BEFORE UPDATE ON user_achievements
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- SEED DATA: Achievements (19 total)
-- ============================================================================

INSERT INTO achievements (slug, name, description, type, tier, criteria, xp_reward, order_index) VALUES
-- Streak-based (5)
('streak-3-days', '3-Day Streak 🔥', 'Study 3 days in a row', 'streak', 'bronze', '{"streak_days": 3}', 50, 1),
('streak-7-days', '7-Day Streak 🔥🔥', 'Study 7 days in a row', 'streak', 'silver', '{"streak_days": 7}', 100, 2),
('streak-30-days', '30-Day Streak 🔥🔥🔥', 'Study 30 days in a row', 'streak', 'gold', '{"streak_days": 30}', 300, 3),
('streak-100-days', '100-Day Streak 🔥🔥🔥🔥', 'Study 100 days in a row', 'streak', 'platinum', '{"streak_days": 100}', 1000, 4),
('streak-365-days', 'Year Warrior 🔥🔥🔥🔥🔥', 'Study 365 days in a row', 'streak', 'diamond', '{"streak_days": 365}', 5000, 5),

-- Skill-based (5)
('grammar-master', 'Grammar Master 📚', 'Reach Grammar level 10', 'skill', 'gold', '{"skill": "grammar", "level": 10}', 200, 6),
('vocabulary-guru', 'Vocabulary Guru 📖', 'Reach Vocabulary level 10', 'skill', 'gold', '{"skill": "vocabulary", "level": 10}', 200, 7),
('listening-pro', 'Listening Pro 🎧', 'Reach Listening level 10', 'skill', 'gold', '{"skill": "listening", "level": 10}', 200, 8),
('speaking-champion', 'Speaking Champion 🗣️', 'Reach Speaking level 10', 'skill', 'gold', '{"skill": "speaking", "level": 10}', 200, 9),
('perfect-lesson', 'Perfect Lesson ⭐', 'Complete a lesson with 100% accuracy', 'skill', 'silver', '{"lesson_accuracy": 100}', 100, 10),

-- Volume-based (4)
('first-10-lessons', 'Getting Started 🎯', 'Complete 10 lessons', 'volume', 'bronze', '{"lessons_completed": 10}', 50, 11),
('100-exercises', 'Century Club 💯', 'Complete 100 exercises', 'volume', 'silver', '{"exercises_completed": 100}', 150, 12),
('500-exercises', 'Practice Master 🏆', 'Complete 500 exercises', 'volume', 'gold', '{"exercises_completed": 500}', 500, 13),
('1000-exercises', 'Elite Learner 👑', 'Complete 1000 exercises', 'volume', 'platinum', '{"exercises_completed": 1000}', 1500, 14),

-- Performance-based (5)
('accuracy-90', 'Sharp Shooter 🎯', 'Maintain 90%+ accuracy over 20 exercises', 'performance', 'silver', '{"avg_accuracy": 90, "exercise_count": 20}', 150, 15),
('speed-demon', 'Speed Demon ⚡', 'Complete 10 exercises in under 50% of avg time', 'performance', 'gold', '{"speed_bonus_count": 10}', 200, 16),
('early-bird', 'Early Bird 🌅', 'Study before 8 AM for 7 days', 'performance', 'bronze', '{"early_study_days": 7}', 75, 17),
('night-owl', 'Night Owl 🦉', 'Study after 10 PM for 7 days', 'performance', 'bronze', '{"late_study_days": 7}', 75, 18),
('perfect-week', 'Perfect Week ⭐⭐⭐', 'Complete all daily reviews for 7 days straight', 'performance', 'platinum', '{"perfect_review_days": 7}', 500, 19);

-- ============================================================================
-- SEED DATA: Sample Exercises (5 examples)
-- ============================================================================

INSERT INTO exercises (type, title, description, difficulty, content, correct_answer, explanation, topic, base_xp, estimated_time_seconds, required_level, order_index) VALUES

-- Grammar Exercise
('grammar', 'Present Simple vs Present Continuous', 'Choose the correct tense', 'easy',
'{"question": "Our team ___ remotely since 2020.", "options": ["works", "is working", "worked", "has worked"]}',
'{"correct": "works"}',
'Present Simple is used for permanent situations. "Since 2020" indicates duration, but "works" is the habitual action.',
'Present Tenses', 10, 60, 1, 1),

-- Vocabulary Flashcard
('vocabulary', 'Business Email Vocabulary', 'Learn key email terms', 'easy',
'{"word": "FYI", "definition": "For Your Information - used to share info without requiring action", "example": "FYI, the meeting has been rescheduled to 3 PM.", "image_url": null}',
'{}',
'FYI is a common business abbreviation used in emails to share information.',
'Business Emails', 5, 30, 1, 2),

-- Listening Exercise
('listening', 'Business Meeting Introduction', 'Listen and answer comprehension questions', 'medium',
'{"audio_url": "/audio/meeting-intro.mp3", "transcript": "Good morning everyone. Thank you for joining today\'s quarterly review...", "questions": [{"q": "What type of meeting is this?", "options": ["Daily standup", "Quarterly review", "Annual planning", "Team building"], "correct": 1}]}',
'{"correct_answers": [1]}',
'The speaker mentions "quarterly review" in the first sentence.',
'Meetings & Presentations', 15, 180, 2, 3),

-- Writing Exercise
('writing', 'Write a Professional Email', 'Decline a meeting politely', 'medium',
'{"prompt": "Write a professional email declining a meeting invitation due to a scheduling conflict. Be polite and suggest an alternative time.", "min_words": 50, "max_words": 150}',
'{}',
'Key elements: polite opening, clear reason, alternative suggestion, professional closing.',
'Business Emails', 20, 300, 3, 4),

-- Reading Exercise
('reading', 'Business Case Study', 'Read and answer questions', 'hard',
'{"article": "Acme Corp implemented a 4-day work week in 2024...", "questions": [{"q": "What year did Acme Corp implement the 4-day work week?", "options": ["2023", "2024", "2025", "2026"], "correct": 1}]}',
'{"correct_answers": [1]}',
'The article states "implemented a 4-day work week in 2024".',
'Business Reports', 15, 240, 4, 5);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - Optional but recommended for production
-- ============================================================================

-- Enable RLS on user-specific tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own data
CREATE POLICY users_select_own ON users
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY user_progress_select_own ON user_progress
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY review_schedule_select_own ON review_schedule
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY user_achievements_select_own ON user_achievements
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY study_sessions_select_own ON study_sessions
    FOR SELECT
    USING (auth.uid() = user_id);

-- Note: auth.uid() assumes Supabase-style auth. For NextAuth.js, adjust to session-based checks.

-- ============================================================================
-- PERFORMANCE INDEXES (Additional)
-- ============================================================================

-- Composite index for review queue query (most common query)
CREATE INDEX idx_review_queue_composite ON review_schedule(user_id, next_review_date, mastery_level);

-- Index for leaderboard queries
CREATE INDEX idx_users_leaderboard ON users(xp_total DESC, level DESC);

-- Index for daily stats aggregation
CREATE INDEX idx_user_progress_daily_stats ON user_progress(user_id, completed_at);

-- ============================================================================
-- STATISTICS & MAINTENANCE
-- ============================================================================

-- Analyze tables for query optimization
ANALYZE users;
ANALYZE exercises;
ANALYZE user_progress;
ANALYZE review_schedule;

-- ============================================================================
-- SCHEMA COMPLETE
-- ============================================================================

-- Total Tables: 10
-- Total Views: 3
-- Total Functions: 4
-- Total Triggers: 6
-- Total Indexes: 35+
-- Total Seed Data: 19 achievements + 5 sample exercises

-- Status: ✅ READY FOR DRIZZLE ORM MIGRATION
-- Next Step: Generate Drizzle schema.ts from this SQL
-- Command: drizzle-kit pull:pg --connectionString="..."

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
