// ============================================================================
// Root Layout - Next.js 15 App Router
// ============================================================================
// Purpose: Root layout with providers, fonts, and global styles
// Author: @dev (Dex) + @ux-expert (Uma)
// ============================================================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Business English RPG - Level Up Your Professional English',
  description: 'Learn Business English through gamified exercises with AI-powered corrections, spaced repetition, and RPG progression.',
  keywords: ['business english', 'english learning', 'gamification', 'spaced repetition', 'ai corrections'],
  authors: [{ name: 'AIOS Team' }],
  openGraph: {
    title: 'Business English RPG',
    description: 'Level up your professional English skills',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
