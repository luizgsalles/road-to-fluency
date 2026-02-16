// ============================================================================
// AI Correction API Route - Claude Writing Corrections
// ============================================================================
// Purpose: Submit text for AI-powered corrections
// Author: @dev (Dex)
// Based on: Task 11 (Claude API Integration)
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getWritingCorrections, calculateWritingScore, scoreToPerformance } from '@/lib/ai/claude-corrector';

interface CorrectionRequest {
  text: string;
  context: 'email' | 'presentation' | 'report' | 'meeting' | 'general';
  targetAudience: 'colleague' | 'manager' | 'client' | 'team';
  desiredTone: 'professional' | 'casual' | 'formal';
}

/**
 * POST /api/ai/correct
 *
 * Body: { text, context, targetAudience, desiredTone }
 *
 * Returns: WritingCorrection with errors, scores, and performance rating
 */
export async function POST(request: NextRequest) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request
    const body: CorrectionRequest = await request.json();
    const { text, context, targetAudience, desiredTone } = body;

    // Validate
    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (text.length > 2000) {
      return NextResponse.json({ error: 'Text too long (max 2000 characters)' }, { status: 400 });
    }

    // Get corrections from Claude API
    const correction = await getWritingCorrections({
      text,
      context: context || 'general',
      targetAudience: targetAudience || 'colleague',
      desiredTone: desiredTone || 'professional',
    });

    // Calculate overall score and performance rating
    const overallScore = calculateWritingScore(correction);
    const performance = scoreToPerformance(overallScore);

    // Return response
    return NextResponse.json({
      ...correction,
      overallScore,
      performance,
    });
  } catch (error) {
    console.error('POST /api/ai/correct error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
