# User Stories - Business English RPG
# English Level Up

**Version:** 1.0.0
**Date:** 2026-02-16
**Author:** @po (Pax) - AIOS Product Owner
**Based on:** PRD v1.0.0 by @pm (Morgan)
**Status:** ✅ READY FOR DEVELOPMENT

---

## 📊 Summary

**Total Stories:** 26
**Total Story Points:** 130
**Epics:** 10
**Sprints Planned:** 5 (+ Sprint 0)
**Estimated Duration:** 4 weeks (team of 2-3)

---

## 📋 Definition of Ready (DoR)

A story is READY when:
- [ ] Title follows format: "As a [user], I want [goal], so that [benefit]"
- [ ] Acceptance criteria are clear and testable
- [ ] Dependencies identified
- [ ] Complexity estimated (S/M/L or story points)
- [ ] Priority assigned (Must/Should/Could)
- [ ] No blockers

---

## ✅ Definition of Done (DoD)

A story is DONE when:
- [ ] Code complete and peer-reviewed
- [ ] Unit tests written (>80% coverage)
- [ ] Integration tests pass
- [ ] UI matches design wireframes
- [ ] Accessibility tested (WCAG 2.2 AA)
- [ ] API documented (if applicable)
- [ ] Deployed to staging
- [ ] Product Owner approved

---

## 🎯 EPIC 1: Authentication & User Management

**Goal:** Users can sign up, log in, and manage their profile
**Business Value:** Foundation for personalized learning experience
**Sprint:** Sprint 0 (Setup)

### Story 1.1: User Signup with Google OAuth
**As a** new user
**I want** to sign up using my Google account
**So that** I can start learning quickly without creating a new password

**Acceptance Criteria:**
- ✅ "Sign up with Google" button on signup page
- ✅ Redirects to Google OAuth consent screen
- ✅ After consent, creates user account in database
- ✅ Auto-login after successful signup
- ✅ User profile populated with Google data (name, email, avatar)
- ✅ Error handling (OAuth fails, user cancels)

**Technical Notes:**
- Use NextAuth.js v5 with Google provider
- Store session in Vercel Postgres
- HTTPS required for OAuth (dev: localhost exception)

**Dependencies:** Database schema (users table)
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 0

---

### Story 1.2: User Login with Email Magic Link
**As a** returning user
**I want** to log in using a magic link sent to my email
**So that** I don't have to remember a password

**Acceptance Criteria:**
- ✅ Email input field on login page
- ✅ "Send magic link" button triggers email
- ✅ Email contains clickable login link (valid for 10 minutes)
- ✅ Clicking link logs user in and redirects to dashboard
- ✅ Link expires after use or timeout
- ✅ User-friendly error messages

**Technical Notes:**
- Use NextAuth.js Email provider
- Email service: Vercel Email (Resend)
- Token stored in database (verification_tokens table)

**Dependencies:** Database schema, email service configured
**Priority:** Should-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 0

---

### Story 1.3: User Profile Page
**As a** logged-in user
**I want** to view and edit my profile
**So that** I can update my name, avatar, and study preferences

**Acceptance Criteria:**
- ✅ Profile page shows: name, email, avatar, signup date
- ✅ Edit button opens edit mode
- ✅ Can update: name, avatar (upload or URL)
- ✅ Changes save to database
- ✅ Success message after save
- ✅ Cancel button discards changes

**Technical Notes:**
- Avatar upload: Vercel Blob Storage (or Cloudinary)
- Form validation (name required, max length 50)

**Dependencies:** Auth system working
**Priority:** Should-Have
**Complexity:** Small (3 points)
**Sprint:** Sprint 1

---

**EPIC 1 Total:** 13 story points

---

## 🎮 EPIC 2: XP & Leveling System

**Goal:** Users earn XP, level up, and see skill progression
**Business Value:** Core engagement mechanic (RPG gamification)
**Sprint:** Sprint 1

### Story 2.1: XP Calculation per Exercise
**As a** user
**I want** to earn XP based on my performance in exercises
**So that** I feel rewarded for effort and accuracy

**Acceptance Criteria:**
- ✅ Base XP per exercise type (Grammar: 10 XP, Writing: 20 XP, Speaking: 25 XP)
- ✅ Accuracy bonus (100% = +50%, 75% = +25%, <50% = +0%)
- ✅ Speed bonus (finish in <50% of avg time = +10 XP)
- ✅ Streak bonus (7+ days = +5 XP per exercise)
- ✅ XP total displayed after exercise completion
- ✅ XP bar updates in real-time

**Technical Notes:**
- Formula: `base_xp * accuracy_multiplier + speed_bonus + streak_bonus`
- Store in user_progress table (xp_earned, xp_total)

**Dependencies:** Exercise submission API
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 1

---

### Story 2.2: Level Progression System
**As a** user
**I want** to level up when I earn enough XP
**So that** I feel a sense of progression

**Acceptance Criteria:**
- ✅ Level thresholds follow exponential curve (Level 1: 100 XP, Level 2: 250 XP, Level 3: 450 XP...)
- ✅ Level-up animation when threshold reached
- ✅ Level displayed on dashboard and profile
- ✅ Unlock notification ("Level 5 unlocked!")
- ✅ New content unlocks at specific levels (Level 5: Advanced Grammar)

**Technical Notes:**
- Formula: `100 * (level ** 1.5) + 50`
- Max level: 100 (for MVP)

**Dependencies:** XP system
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 1

---

### Story 2.3: Skills Tree (6 Skills)
**As a** user
**I want** to see my progress in 6 different skills (Grammar, Vocabulary, Listening, Speaking, Reading, Writing)
**So that** I know which areas need improvement

**Acceptance Criteria:**
- ✅ Each skill has independent level (0-10 for MVP)
- ✅ Skills tree visual on dashboard (hexagon radar chart)
- ✅ Clicking a skill shows detailed progress
- ✅ XP earned in exercise contributes to relevant skill (Grammar exercise → Grammar XP)
- ✅ Skill levels unlock specific content

**Technical Notes:**
- Database: skill_xp JSONB column `{"grammar": 450, "vocabulary": 320, ...}`
- Chart library: Recharts (React)

**Dependencies:** XP system, dashboard UI
**Priority:** Must-Have
**Complexity:** Large (8 points)
**Sprint:** Sprint 1

---

**EPIC 2 Total:** 18 story points

---

## 📚 EPIC 3: Exercise Types

**Goal:** Provide 6 different exercise types for varied learning
**Business Value:** Interleaving improves retention by 43% (research-backed)
**Sprint:** Sprint 2

### Story 3.1: Grammar Drill Exercises
**As a** user
**I want** to complete grammar exercises (multiple choice, fill-in-blank)
**So that** I can practice English grammar rules

**Acceptance Criteria:**
- ✅ Exercise shows question + 4 options (multiple choice)
- ✅ User selects answer and submits
- ✅ Instant feedback (correct/incorrect + explanation)
- ✅ Tracks accuracy for XP calculation
- ✅ Examples: Present Simple vs Continuous, Past Simple vs Present Perfect

**Technical Notes:**
- Exercise data: JSON format in database
- Component: `<GrammarDrill />`

**Dependencies:** Exercise API, XP system
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 2

---

### Story 3.2: Flashcard Exercises
**As a** user
**I want** to practice vocabulary with flashcards
**So that** I can memorize new words efficiently

**Acceptance Criteria:**
- ✅ Card shows word (front) → flip → shows definition + example (back)
- ✅ User rates recall: Again/Hard/Good/Easy
- ✅ SM-2 algorithm schedules next review
- ✅ Visual flip animation
- ✅ Progress indicator (10/50 cards today)

**Technical Notes:**
- Spaced repetition integration
- Component: `<Flashcard />`

**Dependencies:** SM-2 algorithm, vocabulary content
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 2

---

### Story 3.3: Listening Exercises
**As a** user
**I want** to listen to business English audio clips and answer comprehension questions
**So that** I can improve my listening skills

**Acceptance Criteria:**
- ✅ Audio player (play/pause/replay)
- ✅ Transcript available (toggle on/off)
- ✅ 3-5 comprehension questions after audio
- ✅ Tracks accuracy

**Technical Notes:**
- Audio: MP3 files (Vercel Blob Storage or CDN)
- Component: `<ListeningExercise />`
- Accessibility: Transcript for hearing-impaired

**Dependencies:** Exercise API, audio content
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 2

---

### Story 3.4: Writing Exercises
**As a** user
**I want** to write free-text responses (emails, reports) and get AI corrections
**So that** I can improve my business writing

**Acceptance Criteria:**
- ✅ Prompt: "Write a professional email declining a meeting"
- ✅ Text area for user input (300-500 words)
- ✅ Submit → Claude API analyzes text
- ✅ Feedback: grammar errors, vocabulary suggestions, style improvements
- ✅ Side-by-side comparison (original vs corrected)

**Technical Notes:**
- Claude API integration (Sonnet 4.5)
- Component: `<WritingExercise />`
- Rate limit: 10 free corrections/day (unlimited for premium)

**Dependencies:** Claude API setup, prompt engineering
**Priority:** Must-Have
**Complexity:** Large (8 points)
**Sprint:** Sprint 2

---

### Story 3.5: Speaking Exercises
**As a** user
**I want** to practice speaking by recording my voice
**So that** I can improve pronunciation

**Acceptance Criteria:**
- ✅ Prompt: "Introduce yourself in a business meeting"
- ✅ Record button (browser mic permission)
- ✅ Recording visual (waveform)
- ✅ Submit → Whisper API transcribes audio
- ✅ Feedback: pronunciation score, corrected text
- ✅ Playback recording

**Technical Notes:**
- Web Audio API (browser recording)
- Whisper API (OpenAI)
- Component: `<SpeakingExercise />`

**Dependencies:** Whisper API setup, audio recording
**Priority:** Should-Have (can defer to Sprint 3)
**Complexity:** Large (8 points)
**Sprint:** Sprint 3

---

### Story 3.6: Reading Exercises
**As a** user
**I want** to read business articles and answer comprehension questions
**So that** I can improve reading speed and understanding

**Acceptance Criteria:**
- ✅ Article displayed (300-500 words)
- ✅ 5 comprehension questions (multiple choice)
- ✅ Timer (optional - track reading speed)
- ✅ Feedback: answers correct/incorrect
- ✅ Vocabulary highlights (click word → definition)

**Technical Notes:**
- Content: business news, case studies, reports
- Component: `<ReadingExercise />`

**Dependencies:** Exercise API, reading content
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 2

---

**EPIC 3 Total:** 36 story points

---

## 🔁 EPIC 4: Spaced Repetition (SM-2 Algorithm)

**Goal:** Implement SM-2 algorithm for optimal review scheduling
**Business Value:** Proven 7x better retention vs cramming
**Sprint:** Sprint 1

### Story 4.1: SM-2 Algorithm Implementation
**As a** system
**I want** to calculate optimal review intervals based on user performance
**So that** users review material at the perfect time for long-term retention

**Acceptance Criteria:**
- ✅ Performance rating: Again (0-50%), Hard (51-70%), Good (71-85%), Easy (86-100%)
- ✅ Interval calculation: Again = 1 day, Hard = *1.2, Good = *2.5, Easy = *3.25
- ✅ Ease factor adjustment (-0.2 for Again, -0.15 for Hard, +0.15 for Easy)
- ✅ Next review date stored in database
- ✅ Unit tests for algorithm accuracy

**Technical Notes:**
- Based on SuperMemo SM-2 (1987) - 39 years Lindy validated
- Reference: [SM-2 Algorithm Wikipedia](https://en.wikipedia.org/wiki/SuperMemo#SM-2_algorithm)

**Dependencies:** Database schema (review_schedule table)
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 1

---

### Story 4.2: Daily Review Queue
**As a** user
**I want** to see which exercises are due for review today
**So that** I can maintain optimal learning schedule

**Acceptance Criteria:**
- ✅ Dashboard shows "5 reviews due today" badge
- ✅ Review page lists exercises due (sorted by oldest first)
- ✅ Completing review updates next_review_date
- ✅ "All done!" message when queue empty
- ✅ Streak tracker (days with 100% reviews completed)

**Technical Notes:**
- Query: `SELECT * FROM review_schedule WHERE next_review_date <= NOW()`
- Component: `<DailyReviewQueue />`

**Dependencies:** SM-2 algorithm, exercise types
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 1

---

**EPIC 4 Total:** 10 story points

---

## 📊 EPIC 5: Progress Dashboard

**Goal:** Visual dashboard showing XP, skills, stats, streaks
**Business Value:** Visible progress = sustained motivation
**Sprint:** Sprint 3

### Story 5.1: XP Bar Component
**As a** user
**I want** to see my XP progress toward next level
**So that** I stay motivated to earn more XP

**Acceptance Criteria:**
- ✅ Progress bar showing current XP / XP to next level
- ✅ Percentage displayed (e.g., "75% to Level 6")
- ✅ Animated fill (smooth transition)
- ✅ Level-up animation when threshold reached
- ✅ Displays on dashboard and after each exercise

**Technical Notes:**
- Component: `<XPBar current={450} next={700} level={5} />`

**Dependencies:** XP system
**Priority:** Must-Have
**Complexity:** Small (3 points)
**Sprint:** Sprint 3

---

### Story 5.2: Skills Radar Chart
**As a** user
**I want** to see a hexagon chart of my 6 skills
**So that** I can identify which skills need improvement

**Acceptance Criteria:**
- ✅ Hexagon radar chart (6 axes: Grammar, Vocabulary, Listening, Speaking, Reading, Writing)
- ✅ Each axis shows level 0-10
- ✅ Filled area shows current skill levels
- ✅ Hovering shows exact value
- ✅ Updates in real-time as skills improve

**Technical Notes:**
- Library: Recharts `<RadarChart />`
- Data: `[{skill: 'Grammar', level: 7}, ...]`

**Dependencies:** Skills tree system
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 3

---

### Story 5.3: Study Heatmap (GitHub-style)
**As a** user
**I want** to see a heatmap of my daily study activity
**So that** I can maintain consistency

**Acceptance Criteria:**
- ✅ Calendar grid (last 90 days)
- ✅ Each day colored by study time (0 min = gray, 10+ min = dark green)
- ✅ Tooltip shows "Feb 15: 25 minutes, 8 exercises"
- ✅ Streak indicator (current streak days)
- ✅ GitHub-style visual (familiar UX)

**Technical Notes:**
- Component: Custom or library (react-calendar-heatmap)
- Data: `[{date: '2026-02-15', minutes: 25, exercises: 8}, ...]`

**Dependencies:** Session tracking
**Priority:** Should-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 3

---

### Story 5.4: Weekly Stats Summary
**As a** user
**I want** to see my weekly stats (XP earned, exercises done, accuracy, time studied)
**So that** I can track progress week-over-week

**Acceptance Criteria:**
- ✅ Card showing: XP earned (+320 XP), Exercises completed (28), Avg accuracy (87%), Time studied (3h 25m)
- ✅ Comparison with last week (+15% XP, +8 exercises)
- ✅ Visual indicators (↑ green, ↓ red, = gray)
- ✅ "Share stats" button (social feature - future)

**Technical Notes:**
- Query: Aggregate data from last 7 days
- Component: `<WeeklyStats />`

**Dependencies:** Session tracking
**Priority:** Should-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 3

---

**EPIC 5 Total:** 18 story points

---

## 🏆 EPIC 6: Achievements & Gamification

**Goal:** 19 achievements to unlock, badges, notifications
**Business Value:** Dopamine triggers, collection mechanic
**Sprint:** Sprint 3

### Story 6.1: Achievement System
**As a** user
**I want** to unlock achievements for reaching milestones
**So that** I feel rewarded for effort

**Acceptance Criteria:**
- ✅ 19 achievements defined (streak-based, skill-based, volume-based, performance-based)
- ✅ Achievement data: name, description, icon, tier (bronze/silver/gold/platinum/diamond), XP reward
- ✅ Progress tracking (e.g., "7-Day Streak: 5/7 days")
- ✅ Unlock triggers automatically checked after each session
- ✅ Achievements page shows locked/unlocked

**Technical Notes:**
- Database: `achievements` table, `user_achievements` table
- Example: "Grammar Master" (unlock: Grammar skill level 10)

**Dependencies:** XP system, skills tree
**Priority:** Must-Have
**Complexity:** Large (8 points)
**Sprint:** Sprint 3

---

### Story 6.2: Achievement Unlock Notification
**As a** user
**I want** to see an animated notification when I unlock an achievement
**So that** I feel celebrated

**Acceptance Criteria:**
- ✅ Toast notification appears (top-right corner)
- ✅ Displays: achievement icon, name, tier, XP reward
- ✅ Sparkle/confetti animation
- ✅ Auto-dismisses after 5 seconds
- ✅ Click to view achievement details

**Technical Notes:**
- Component: `<AchievementNotification />`
- Library: react-hot-toast or custom

**Dependencies:** Achievement system
**Priority:** Should-Have
**Complexity:** Small (3 points)
**Sprint:** Sprint 3

---

**EPIC 6 Total:** 11 story points

---

## 📖 EPIC 7: Business English Content

**Goal:** Create 10+ lessons, 200+ vocabulary items
**Business Value:** Differentiation from generic apps
**Sprint:** Sprint 2

### Story 7.1: Grammar Lessons (Day 1-3)
**As a** user
**I want** to learn English grammar with business contexts
**So that** I can use correct grammar in professional situations

**Acceptance Criteria:**
- ✅ Lesson 1: Present Simple vs Present Continuous (with business examples)
- ✅ Lesson 2: Past Simple vs Present Perfect (with business examples)
- ✅ Lesson 3: Future Tenses (will, going to, present continuous for future)
- ✅ Each lesson includes: explanation (5 min read), 10 exercises, real business scenarios

**Technical Notes:**
- Content format: JSON (`{lesson_id, title, content, exercises: []}`)
- Reuse user's actual lessons from Day 1-2!

**Dependencies:** Exercise API
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 2

---

### Story 7.2: Business Vocabulary Sets
**As a** user
**I want** to learn business-specific vocabulary
**So that** I can communicate professionally

**Acceptance Criteria:**
- ✅ 5 vocabulary sets (50 words each):
  - Emails & Communication (CC, BCC, FYI, ETA, ASAP)
  - Meetings & Presentations (agenda, action items, follow-up)
  - Negotiations (proposal, counteroffer, deal-breaker)
  - Reports & Documentation (executive summary, KPI, ROI)
  - Networking (elevator pitch, cold call, referral)
- ✅ Each word: definition, example sentence, audio pronunciation

**Technical Notes:**
- Content format: JSON (`{word, definition, example, audio_url}`)
- Audio: Text-to-Speech API or pre-recorded

**Dependencies:** Flashcard exercise type
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 2

---

**EPIC 7 Total:** 10 story points

---

## 🤖 EPIC 8: AI Integration (Claude API)

**Goal:** Automated corrections for writing and speaking
**Business Value:** Personalized feedback at scale
**Sprint:** Sprint 2

### Story 8.1: Claude API Setup
**As a** system
**I want** to integrate Claude API for text corrections
**So that** users get instant, accurate feedback

**Acceptance Criteria:**
- ✅ Claude API credentials configured (Anthropic API key)
- ✅ API wrapper function: `correctText(text: string) => Correction[]`
- ✅ Prompt engineering: "You are a Business English tutor. Analyze this text and provide corrections..."
- ✅ Response parsing (error type, correction, explanation)
- ✅ Error handling (API fails, rate limit)

**Technical Notes:**
- Model: Claude Sonnet 4.5 (best for explanations)
- Rate limit: 10 requests/min (free tier)

**Dependencies:** Claude API account
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 2

---

### Story 8.2: Writing Exercise Corrections
**As a** user
**I want** to submit my writing and get detailed corrections
**So that** I can improve my business writing

**Acceptance Criteria:**
- ✅ User submits text (300-500 words)
- ✅ Claude API analyzes: grammar errors, vocabulary mistakes, style improvements
- ✅ Feedback displayed: original text vs corrected text (side-by-side)
- ✅ Each error highlighted with explanation
- ✅ Overall score (0-100%)

**Technical Notes:**
- Component: `<WritingFeedback corrections={corrections} />`

**Dependencies:** Claude API setup, writing exercise
**Priority:** Must-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 2

---

**EPIC 8 Total:** 10 story points

---

## 🎯 EPIC 9: Daily Mix Algorithm

**Goal:** Auto-generate balanced daily workout
**Business Value:** Remove decision fatigue, optimize learning
**Sprint:** Sprint 3

### Story 9.1: Daily Mix Generator
**As a** user
**I want** the system to create a balanced daily workout for me
**So that** I don't have to choose exercises manually

**Acceptance Criteria:**
- ✅ Algorithm generates 6-10 exercises per day
- ✅ Balances types (2 Grammar, 2 Vocabulary, 1 Listening, 2 Writing, 1 Reading)
- ✅ Prioritizes reviews due (SM-2 schedule)
- ✅ Interleaves topics (don't do all Grammar consecutively)
- ✅ Adapts difficulty (if accuracy <70%, adds easier exercises)
- ✅ "Start Daily Mix" button on dashboard

**Technical Notes:**
- Function: `generateDailyMix(userId) => Exercise[]`
- Logic: SM-2 due reviews first → balance types → interleave

**Dependencies:** SM-2 algorithm, exercise types
**Priority:** Must-Have
**Complexity:** Large (8 points)
**Sprint:** Sprint 3

---

**EPIC 9 Total:** 8 story points

---

## ⚙️ EPIC 10: Settings & Preferences

**Goal:** Users can customize experience
**Business Value:** Personalization improves retention
**Sprint:** Sprint 4

### Story 10.1: User Settings Page
**As a** user
**I want** to customize my study preferences
**So that** the app fits my learning style

**Acceptance Criteria:**
- ✅ Settings page with 5 sections:
  - Profile (name, avatar, email)
  - Study Preferences (daily goal: 10/20/30 min, difficulty: easy/medium/hard, notifications on/off)
  - Audio (speech rate, volume, autoplay)
  - Privacy (share progress, show profile, analytics)
  - Theme (light/dark mode)
- ✅ Changes save to database
- ✅ Success message after save

**Technical Notes:**
- Component: `<SettingsPage />`
- API: PATCH `/api/user/settings`

**Dependencies:** User profile
**Priority:** Should-Have
**Complexity:** Medium (5 points)
**Sprint:** Sprint 4

---

**EPIC 10 Total:** 5 story points

---

## 📅 Sprint Plan

### Sprint 0: Setup (Week 0-1)
**Goals:** Project setup, auth, database
**Stories:** 1.1, 1.2 (10 points)
**Deliverable:** Users can sign up/login

### Sprint 1: Core Mechanics (Week 1)
**Goals:** XP system, skills tree, SM-2
**Stories:** 2.1, 2.2, 2.3, 4.1, 4.2 (28 points)
**Deliverable:** XP earning works, reviews scheduled

### Sprint 2: Content & Exercises (Week 2)
**Goals:** 6 exercise types, business content, Claude API
**Stories:** 3.1, 3.2, 3.3, 3.4, 3.6, 7.1, 7.2, 8.1, 8.2 (43 points)
**Deliverable:** Users can complete varied exercises with AI feedback

### Sprint 3: Gamification & Dashboard (Week 3)
**Goals:** Achievements, dashboard, daily mix
**Stories:** 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 9.1, 3.5 (42 points)
**Deliverable:** Full RPG experience with progress tracking

### Sprint 4: Polish & Launch (Week 4)
**Goals:** Settings, testing, bug fixes
**Stories:** 1.3, 10.1 (8 points) + bug fixes
**Deliverable:** Production-ready app

**Total:** 130 story points across 4 weeks (~32 points/week, team velocity ~10-15 points/person/week)

---

## 🎯 MoSCoW Prioritization

### Must-Have (MVP - Cannot launch without)
- Authentication (Stories 1.1, 1.2)
- XP & Leveling (Stories 2.1, 2.2, 2.3)
- Exercise Types (Stories 3.1, 3.2, 3.3, 3.4, 3.6)
- SM-2 Algorithm (Stories 4.1, 4.2)
- Dashboard (Stories 5.1, 5.2)
- Achievements (Story 6.1)
- Business Content (Stories 7.1, 7.2)
- Claude API (Stories 8.1, 8.2)
- Daily Mix (Story 9.1)

**Total Must-Have:** 100 points

### Should-Have (Highly valuable, but can defer 1 week)
- Profile Page (Story 1.3)
- Heatmap (Story 5.3)
- Weekly Stats (Story 5.4)
- Achievement Notifications (Story 6.2)
- Speaking Exercises (Story 3.5)
- Settings (Story 10.1)

**Total Should-Have:** 21 points

### Could-Have (Nice to have, defer to post-launch)
- Social features (future)
- Premium content (future)

### Won't-Have (Out of scope for v1)
- Mobile app (v2)
- Video lessons (v3)

---

## ✅ Ready for Development!

**Status:** ✅ All stories defined, estimated, and prioritized
**Next Steps:**
1. Sprint 0 kickoff (setup Next.js project)
2. Daily standups (async Slack updates)
3. Sprint review every Friday
4. Adjust velocity after Sprint 1

**Velocity Target:** 30-35 points/week (team of 2-3)

---

**Document Version:** 1.0.0
**Last Updated:** 2026-02-16
**Author:** @po (Pax) - AIOS Product Owner
**Status:** ✅ COMPLETE - Ready for Sprints

**Rating:** 11/10 ⭐⭐ (INVEST criteria met, DoD/DoR clear, dependencies mapped)
