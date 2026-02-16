// ============================================================================
// Writing Exercise Component - AI-Powered Corrections
// ============================================================================
// Purpose: Business email/report writing with Claude corrections
// Author: @dev (Dex) + @tutor (Socrates)
// Based on: Task 10 (Exercise System), Task 11 (Claude API)
// ============================================================================

'use client';

import { useState } from 'react';

interface WritingPrompt {
  id: string;
  title: string;
  scenario: string;
  context: 'email' | 'presentation' | 'report' | 'meeting';
  targetAudience: 'colleague' | 'manager' | 'client' | 'team';
  desiredTone: 'professional' | 'casual' | 'formal';
  wordCountMin: number;
  wordCountMax: number;
}

interface WritingExerciseProps {
  prompt: WritingPrompt;
  onSubmit: (text: string) => Promise<void>;
  isLoading?: boolean;
}

export function WritingExercise({ prompt, onSubmit, isLoading = false }: WritingExerciseProps) {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setWordCount(newText.trim().split(/\s+/).filter((word) => word.length > 0).length);
  };

  const handleSubmit = async () => {
    if (wordCount < prompt.wordCountMin || wordCount > prompt.wordCountMax) {
      alert(`Please write between ${prompt.wordCountMin} and ${prompt.wordCountMax} words.`);
      return;
    }

    await onSubmit(text);
  };

  const isWithinRange = wordCount >= prompt.wordCountMin && wordCount <= prompt.wordCountMax;
  const canSubmit = isWithinRange && !isLoading;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Prompt */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">{prompt.title}</h2>

        <div className="space-y-4 mb-6">
          <div>
            <div className="text-sm font-semibold text-neutral-700 mb-1">Scenario</div>
            <p className="text-neutral-600">{prompt.scenario}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold text-neutral-700 mb-1">Context</div>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full capitalize">
                {prompt.context}
              </span>
            </div>
            <div>
              <div className="font-semibold text-neutral-700 mb-1">Audience</div>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full capitalize">
                {prompt.targetAudience}
              </span>
            </div>
            <div>
              <div className="font-semibold text-neutral-700 mb-1">Tone</div>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full capitalize">
                {prompt.desiredTone}
              </span>
            </div>
          </div>
        </div>

        {/* Word Count Target */}
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Target: {prompt.wordCountMin}-{prompt.wordCountMax} words</span>
        </div>
      </div>

      {/* Writing Area */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Your Response</h3>
          <div
            className={`text-sm font-semibold ${
              isWithinRange ? 'text-success-600' : 'text-neutral-500'
            }`}
          >
            {wordCount} / {prompt.wordCountMin}-{prompt.wordCountMax} words
          </div>
        </div>

        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing your response here..."
          className="w-full h-96 p-4 border-2 border-neutral-200 rounded-lg resize-none focus:border-primary-500 focus:outline-none text-neutral-900"
          disabled={isLoading}
        />

        {/* Writing Tips */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="text-sm font-semibold text-blue-900 mb-2">💡 Tips</div>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use professional language appropriate for {prompt.targetAudience}</li>
            <li>• Maintain a {prompt.desiredTone} tone throughout</li>
            <li>• Check grammar, spelling, and punctuation</li>
            <li>• Be clear and concise</li>
          </ul>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => {
            setText('');
            setWordCount(0);
          }}
          disabled={isLoading || text.length === 0}
          className="px-6 py-3 bg-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Submit for AI Correction</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
