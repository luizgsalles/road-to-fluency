// ============================================================================
// Claude Writing Corrector - AI-Powered Feedback
// ============================================================================
// Purpose: Integrate Claude API (Sonnet 4.5) for writing corrections
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 11 (AI Writing Corrections)
// API: Claude API (Anthropic)
// ============================================================================

export interface WritingCorrection {
  originalText: string;
  correctedText: string;
  errors: {
    type: 'grammar' | 'vocabulary' | 'structure' | 'tone' | 'clarity';
    original: string;
    corrected: string;
    explanation: string;
    severity: 'minor' | 'moderate' | 'critical';
  }[];
  overallFeedback: string;
  businessTone: 'professional' | 'casual' | 'formal';
  clarityScore: number; // 0-100
  grammarScore: number; // 0-100
  vocabularyScore: number; // 0-100
}

export interface CorrectionRequest {
  text: string;
  context: 'email' | 'presentation' | 'report' | 'meeting' | 'general';
  targetAudience: 'colleague' | 'manager' | 'client' | 'team';
  desiredTone: 'professional' | 'casual' | 'formal';
}

/**
 * Get writing corrections from Claude API
 *
 * Uses Claude Sonnet 4.5 to analyze and correct Business English writing
 *
 * @param request - Writing text and context
 * @returns Detailed corrections with explanations
 *
 * @example
 * const correction = await getWritingCorrections({
 *   text: "Hi boss, I sended the report yesterday.",
 *   context: 'email',
 *   targetAudience: 'manager',
 *   desiredTone: 'professional'
 * })
 * // Returns: { errors: [{ type: 'grammar', original: 'sended', corrected: 'sent', ... }], ... }
 */
export async function getWritingCorrections(
  request: CorrectionRequest
): Promise<WritingCorrection> {
  const { text, context, targetAudience, desiredTone } = request;

  // ============================================================================
  // STEP 1: Validate input
  // ============================================================================

  if (!text || text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  if (text.length > 2000) {
    throw new Error('Text too long (max 2000 characters)');
  }

  // ============================================================================
  // STEP 2: Build Claude API prompt
  // ============================================================================

  const systemPrompt = `You are an expert Business English writing coach. Analyze the provided text and provide detailed corrections with explanations.

Context: ${context}
Target Audience: ${targetAudience}
Desired Tone: ${desiredTone}

Provide corrections in the following JSON format:
{
  "correctedText": "Full corrected version",
  "errors": [
    {
      "type": "grammar|vocabulary|structure|tone|clarity",
      "original": "incorrect text",
      "corrected": "correct text",
      "explanation": "why this is wrong and how to fix it",
      "severity": "minor|moderate|critical"
    }
  ],
  "overallFeedback": "General feedback on writing quality",
  "businessTone": "professional|casual|formal",
  "clarityScore": 0-100,
  "grammarScore": 0-100,
  "vocabularyScore": 0-100
}

Focus on:
- Grammar errors (subject-verb agreement, tenses, articles)
- Vocabulary (formal vs informal, business-appropriate words)
- Sentence structure (clarity, conciseness)
- Professional tone (appropriate for ${targetAudience})
- Cultural appropriateness for business English

Be encouraging and constructive. Explain WHY something is wrong, not just THAT it's wrong.`;

  const userPrompt = `Please analyze and correct this Business English text:\n\n${text}`;

  // ============================================================================
  // STEP 3: Call Claude API
  // ============================================================================

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not found in environment variables');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4.5-20250929',
        max_tokens: 2048,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.3, // Lower temperature for more consistent corrections
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Claude API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();

    // ============================================================================
    // STEP 4: Parse Claude response
    // ============================================================================

    const messageContent = data.content?.[0]?.text;
    if (!messageContent) {
      throw new Error('No content in Claude API response');
    }

    // Extract JSON from response (Claude sometimes wraps JSON in markdown)
    const jsonMatch = messageContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Claude response');
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);

    // ============================================================================
    // STEP 5: Return structured correction
    // ============================================================================

    return {
      originalText: text,
      correctedText: parsedResponse.correctedText || text,
      errors: parsedResponse.errors || [],
      overallFeedback: parsedResponse.overallFeedback || '',
      businessTone: parsedResponse.businessTone || 'professional',
      clarityScore: Math.max(0, Math.min(100, parsedResponse.clarityScore || 0)),
      grammarScore: Math.max(0, Math.min(100, parsedResponse.grammarScore || 0)),
      vocabularyScore: Math.max(0, Math.min(100, parsedResponse.vocabularyScore || 0)),
    };
  } catch (error) {
    // Log error for debugging
    console.error('Claude API error:', error);

    // Return graceful fallback
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error calling Claude API'
    );
  }
}

/**
 * Calculate overall writing score from correction result
 */
export function calculateWritingScore(correction: WritingCorrection): number {
  const { clarityScore, grammarScore, vocabularyScore } = correction;

  // Weighted average: Grammar 40%, Clarity 35%, Vocabulary 25%
  const weightedScore = grammarScore * 0.4 + clarityScore * 0.35 + vocabularyScore * 0.25;

  return Math.round(weightedScore);
}

/**
 * Map writing score to performance rating (for SM-2 algorithm)
 */
export function scoreToPerformance(
  score: number
): 'again' | 'hard' | 'good' | 'easy' {
  if (score < 50) return 'again';
  if (score < 70) return 'hard';
  if (score < 86) return 'good';
  return 'easy';
}

/**
 * Get example correction prompts for different contexts
 */
export const CORRECTION_EXAMPLES: Record<
  string,
  { text: string; context: CorrectionRequest['context'] }
> = {
  email: {
    text: 'Hi boss, I sended the report yesterday. Please review it and give feedback.',
    context: 'email',
  },
  presentation: {
    text: 'Today I will talking about our new product. It is very good and customers likes it.',
    context: 'presentation',
  },
  report: {
    text: 'The sales was increased by 20% in last quarter. We done a good job.',
    context: 'report',
  },
  meeting: {
    text: "I think we should maybe do this thing. It's kinda important probably.",
    context: 'meeting',
  },
};
