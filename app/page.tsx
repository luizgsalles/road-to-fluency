// ============================================================================
// Home Page - Landing/Redirect
// ============================================================================
// Purpose: Landing page or redirect to dashboard if authenticated
// Author: @dev (Dex)
// ============================================================================

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import Link from 'next/link';

export default async function HomePage() {
  const session = await auth();

  // If logged in, redirect to dashboard
  if (session?.user) {
    redirect('/dashboard');
  }

  // Landing page for non-authenticated users
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Hero Section */}
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
          Level Up Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
            Business English
          </span>
        </h1>

        <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
          Master professional English through gamified exercises, AI-powered corrections, and spaced repetition.
          Track your progress, unlock achievements, and become fluent in business communication.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon="🎮"
            title="RPG Progression"
            description="Earn XP, level up 6 skills, unlock achievements"
          />
          <FeatureCard
            icon="🤖"
            title="AI Corrections"
            description="Get instant feedback powered by Claude AI"
          />
          <FeatureCard
            icon="📊"
            title="Smart Learning"
            description="Spaced repetition algorithm optimizes retention"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/signin"
            className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Learning Free
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 bg-white text-primary-500 font-semibold rounded-lg hover:bg-neutral-50 transition-colors border-2 border-primary-500"
          >
            Learn More
          </Link>
        </div>

        {/* Social Proof */}
        <p className="mt-12 text-sm text-neutral-500">
          Join thousands of professionals improving their Business English
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
  );
}
