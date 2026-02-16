// ============================================================================
// Whisper Transcriber - Speech-to-Text
// ============================================================================
// Purpose: Integrate OpenAI Whisper API for audio transcription
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 14 (Audio Recording & Transcription)
// API: OpenAI Whisper API
// ============================================================================

export interface TranscriptionResult {
  text: string;
  duration: number; // seconds
  language: string; // detected language (should be 'en')
  confidence?: number; // 0-100 (if available)
}

export interface TranscriptionOptions {
  language?: 'en'; // Force English
  prompt?: string; // Optional context/prompt for better accuracy
  temperature?: number; // 0-1 (higher = more creative)
}

/**
 * Transcribe audio file using Whisper API
 *
 * Supports: mp3, mp4, mpeg, mpga, m4a, wav, webm (max 25MB)
 *
 * @param audioFile - Audio file (File or Blob)
 * @param options - Transcription options
 * @returns Transcription text and metadata
 *
 * @example
 * const file = new File([audioBlob], 'speaking.webm', { type: 'audio/webm' })
 * const result = await transcribeAudio(file, {
 *   language: 'en',
 *   prompt: 'Business English speaking exercise'
 * })
 * // Returns: { text: "I want to schedule a meeting...", duration: 15.3, language: 'en' }
 */
export async function transcribeAudio(
  audioFile: File | Blob,
  options: TranscriptionOptions = {}
): Promise<TranscriptionResult> {
  const { language = 'en', prompt, temperature = 0 } = options;

  // ============================================================================
  // STEP 1: Validate input
  // ============================================================================

  // Check file size (Whisper API limit: 25MB)
  const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
  if (audioFile.size > MAX_FILE_SIZE) {
    throw new Error('Audio file too large (max 25MB)');
  }

  // Check file type
  const validTypes = [
    'audio/mp3',
    'audio/mpeg',
    'audio/mp4',
    'audio/m4a',
    'audio/wav',
    'audio/webm',
    'audio/ogg',
  ];

  const fileType = audioFile.type;
  if (!validTypes.includes(fileType)) {
    throw new Error(
      `Invalid audio type: ${fileType}. Supported: mp3, mp4, mpeg, m4a, wav, webm, ogg`
    );
  }

  // ============================================================================
  // STEP 2: Prepare FormData for API request
  // ============================================================================

  const formData = new FormData();

  // Add file with proper filename extension
  const extension = fileType.split('/')[1] || 'webm';
  const filename = `audio.${extension}`;
  formData.append('file', audioFile, filename);

  // Add required parameters
  formData.append('model', 'whisper-1');
  formData.append('language', language);

  // Add optional parameters
  if (prompt) {
    formData.append('prompt', prompt);
  }
  if (temperature !== undefined) {
    formData.append('temperature', temperature.toString());
  }

  // Response format: json (includes text only)
  formData.append('response_format', 'json');

  // ============================================================================
  // STEP 3: Call Whisper API
  // ============================================================================

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not found in environment variables');
    }

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        // Note: Do NOT set Content-Type when using FormData (browser sets it automatically with boundary)
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Whisper API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();

    // ============================================================================
    // STEP 4: Parse and return result
    // ============================================================================

    return {
      text: data.text || '',
      duration: data.duration || 0,
      language: data.language || language,
      confidence: undefined, // Whisper doesn't return confidence in standard response
    };
  } catch (error) {
    console.error('Whisper API error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error calling Whisper API'
    );
  }
}

/**
 * Estimate audio duration from blob size (rough approximation)
 *
 * Used for progress indication before transcription completes
 *
 * @param audioBlob - Audio blob
 * @param bitrate - Audio bitrate in kbps (default: 128 for webm)
 * @returns Estimated duration in seconds
 */
export function estimateAudioDuration(audioBlob: Blob, bitrate = 128): number {
  // Formula: duration = (file_size_in_bytes * 8) / (bitrate * 1000)
  const sizeInBits = audioBlob.size * 8;
  const bitrateInBps = bitrate * 1000;
  const durationSeconds = sizeInBits / bitrateInBps;

  return Math.round(durationSeconds * 10) / 10; // Round to 1 decimal
}

/**
 * Validate transcription quality
 *
 * Check if transcription meets minimum quality standards
 */
export function validateTranscription(result: TranscriptionResult): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check text length
  if (!result.text || result.text.trim().length === 0) {
    issues.push('Empty transcription');
  }

  if (result.text.trim().length < 5) {
    issues.push('Transcription too short (min 5 characters)');
  }

  // Check language
  if (result.language !== 'en') {
    issues.push(`Incorrect language detected: ${result.language} (expected: en)`);
  }

  // Check duration
  if (result.duration < 1) {
    issues.push('Audio too short (min 1 second)');
  }

  if (result.duration > 120) {
    issues.push('Audio too long (max 2 minutes)');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Business English speaking prompts
 *
 * These prompts help Whisper better recognize business vocabulary
 */
export const BUSINESS_PROMPTS: Record<string, string> = {
  meeting: 'Business meeting with colleagues discussing projects, deadlines, and goals.',
  presentation:
    'Professional presentation about company products, services, or quarterly results.',
  email: 'Dictating a business email about schedules, meetings, or project updates.',
  phone: 'Business phone call with clients or team members.',
  general: 'Business English conversation in a professional context.',
};

/**
 * Get appropriate prompt for exercise type
 */
export function getBusinessPrompt(exerciseType: string): string {
  return BUSINESS_PROMPTS[exerciseType] || BUSINESS_PROMPTS.general;
}
