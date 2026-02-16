// ============================================================================
// AI Transcription API Route - Whisper Speech-to-Text
// ============================================================================
// Purpose: Transcribe audio files using Whisper API
// Author: @dev (Dex)
// Based on: Task 14 (Whisper Integration)
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { transcribeAudio, validateTranscription, getBusinessPrompt } from '@/lib/ai/whisper-transcriber';

/**
 * POST /api/ai/transcribe
 *
 * Body: FormData with 'audio' file and optional 'exerciseType'
 *
 * Returns: { text, duration, language, confidence }
 */
export async function POST(request: NextRequest) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse FormData
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File | null;
    const exerciseType = formData.get('exerciseType') as string | null;

    // Validate
    if (!audioFile) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    // Get business context prompt
    const prompt = exerciseType ? getBusinessPrompt(exerciseType) : undefined;

    // Transcribe using Whisper API
    const result = await transcribeAudio(audioFile, {
      language: 'en',
      prompt,
      temperature: 0,
    });

    // Validate transcription quality
    const validation = validateTranscription(result);

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Transcription quality check failed',
          issues: validation.issues,
        },
        { status: 422 }
      );
    }

    // Return transcription
    return NextResponse.json({
      text: result.text,
      duration: result.duration,
      language: result.language,
      confidence: result.confidence,
      validation,
    });
  } catch (error) {
    console.error('POST /api/ai/transcribe error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
