# 🎮 Business English RPG

Gamified Business English learning platform with AI-powered corrections, spaced repetition, and RPG progression.

## 🌟 Features

- **🎮 RPG Gamification** - XP, levels, skills, achievements, daily streaks
- **🤖 AI-Powered Corrections** - Claude API for writing, Whisper API for speaking
- **📊 Spaced Repetition** - SM-2 algorithm (39 years Lindy validated)
- **📈 Progress Tracking** - Dashboard with charts, heatmaps, statistics
- **6️⃣ Exercise Types** - Grammar, vocabulary, listening, writing, speaking, reading
- **🏆 Achievement System** - 19 achievements across 5 categories

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17.0+
- PostgreSQL database (Vercel Postgres recommended)
- API Keys:
  - Anthropic (Claude API)
  - OpenAI (Whisper API)
  - Google OAuth credentials
  - Resend (email provider)

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/business-english-rpg.git
cd business-english-rpg

# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials

# Setup database
npm run db:push

# Seed initial data
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 3.4
- **Database:** PostgreSQL + Drizzle ORM
- **Authentication:** NextAuth.js v5
- **AI Services:** Claude API, Whisper API
- **Deployment:** Vercel

## 📂 Project Structure

```
business-english-rpg/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Main dashboard
├── components/            # React components
│   ├── dashboard/         # Dashboard widgets
│   ├── exercises/         # Exercise components
│   └── achievements/      # Achievement components
├── lib/                   # Core business logic
│   ├── ai/               # AI integrations
│   ├── audio/            # Audio recording
│   ├── gamification/     # XP & level system
│   └── learning/         # SM-2 algorithm
├── db/                    # Database schema & seeds
└── docs/                  # Documentation
```

## 🎯 Learning System

### XP & Levels

- **Base XP:** 10-30 per exercise (type dependent)
- **Accuracy Multiplier:** 0.5x - 2.0x (based on 0-100%)
- **Speed Bonus:** Up to +50% (if faster than average)
- **Streak Bonus:** +10% per day (max +100%)
- **Level Formula:** Exponential progression (100 * level^1.5)

### Spaced Repetition (SM-2)

- **Quality Rating:** Again, Hard, Good, Easy
- **Ease Factor:** 1.3 - 2.5 (adjusts based on performance)
- **Intervals:** 1d → 6d → 15d → 30d → 90d+ (mastery dependent)
- **Mastery Levels:** 0 (new) → 5 (mastered)

### Daily Mix

- 40% due reviews (SM-2 scheduled)
- 30% weak skills (lowest accuracy)
- 30% new material (level-appropriate)

## 🔐 Environment Variables

```bash
# Database (Vercel Postgres)
POSTGRES_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgresql://...?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://..."

# Authentication
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Email Provider
RESEND_API_KEY="..."

# AI Services
ANTHROPIC_API_KEY="..."
OPENAI_API_KEY="..."
```

## 📜 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Run migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed initial data

npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 🎓 Learning Algorithms

### SM-2 Spaced Repetition (1987)

Proven algorithm for optimal memory retention through spaced intervals.

**Formula:**
```
I(n) = I(n-1) * EF
EF_new = EF_old + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
```

Where:
- I(n) = interval after n-th repetition
- EF = ease factor (2.5 default)
- q = quality of recall (0-5)

### Interleaving Effect

43% better retention vs blocked practice (Rohrer & Taylor, 2007)

Daily mix algorithm interleaves:
- Different exercise types
- Multiple skill domains
- Review + new material

## 📊 Database Schema

8 tables:
- `users` - User accounts & gamification data
- `accounts` - OAuth provider data
- `sessions` - Active sessions
- `verification_tokens` - Email magic links
- `exercises` - Exercise library (6 types)
- `user_progress` - Completion history
- `review_schedule` - SM-2 review data
- `achievements` - Achievement definitions
- `user_achievements` - Unlocked achievements
- `study_sessions` - Daily activity tracking

See [DATABASE-SCHEMA.sql](docs/DATABASE-SCHEMA.sql) for details.

## 🚀 Deployment (Vercel)

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Import in Vercel:**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Setup Database:**
   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Configure OAuth:**
   - Add Vercel URL to Google OAuth redirect URIs
   - Update `NEXTAUTH_URL` environment variable

## 📝 License

MIT

## 👨‍💻 Author

Built with ❤️ using [AIOS](https://github.com/luizgsalles/aios-core-central) agent system.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
