'use client';

import { useState, useCallback } from 'react';
import type { TopicExercise } from '@/lib/content/grammar-topics';

interface SubmitResult {
  correct: boolean;
  explanation: string;
  xpEarned: number;
}

interface ExercisesSectionProps {
  exercises: TopicExercise[];
  topicColor: string;
}

export function ExercisesSection({ exercises, topicColor }: ExercisesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [fillAnswer, setFillAnswer] = useState('');
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const [totalXP, setTotalXP] = useState(0);

  const current = exercises[currentIndex];

  const handleSubmit = useCallback(async () => {
    if (submitting || !current) return;

    const userAnswer = current.type === 'multiple-choice' ? selectedAnswer : fillAnswer.trim();
    if (!userAnswer) return;

    const correct = userAnswer.toLowerCase() === current.correctAnswer.toLowerCase();
    const accuracy = correct ? 100 : 0;

    setSubmitting(true);

    // Optimistic UI feedback
    setResult({
      correct,
      explanation: current.explanation,
      xpEarned: 0,
    });

    try {
      const res = await fetch(`/api/exercises/${current.id}/submit?mode=learn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accuracy,
          timeSpentSeconds: 30,
          userAnswer,
          correctAnswer: current.correctAnswer,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const earned = data.xpEarned ?? Math.round(current.xpBase * 0.5 * (correct ? 1 : 0.2));
        setTotalXP((prev) => prev + earned);
        setResult({ correct, explanation: current.explanation, xpEarned: earned });
        setCompleted((prev) => [...prev, currentIndex]);
      }
    } catch {
      // Network error — still show result
    } finally {
      setSubmitting(false);
    }
  }, [current, currentIndex, selectedAnswer, fillAnswer, submitting]);

  const handleNext = useCallback(() => {
    setResult(null);
    setSelectedAnswer('');
    setFillAnswer('');
    setCurrentIndex((prev) => Math.min(prev + 1, exercises.length - 1));
  }, [exercises.length]);

  if (!exercises.length) {
    return (
      <div className="text-center py-12 text-slate-500 text-sm">
        No exercises available yet. Run the seed script to populate.
      </div>
    );
  }

  const allDone = currentIndex === exercises.length - 1 && result !== null;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span>Exercise {currentIndex + 1} of {exercises.length}</span>
          <span className="font-semibold text-primary-600">+{totalXP} XP earned</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              backgroundColor: topicColor,
              width: `${((currentIndex + (result ? 1 : 0)) / exercises.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
          {current.type === 'multiple-choice' ? 'Multiple Choice' : 'Fill in the Blank'}
        </p>
        <p className="text-base font-medium text-slate-800">{current.question}</p>
      </div>

      {/* Answer input */}
      {!result && (
        <>
          {current.type === 'multiple-choice' && current.options ? (
            <div className="space-y-2">
              {current.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                    selectedAnswer === option
                      ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Type your answer..."
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-sm focus:border-primary-500 focus:outline-none transition-colors"
            />
          )}

          <button
            onClick={handleSubmit}
            disabled={submitting || (!selectedAnswer && !fillAnswer.trim())}
            className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-all disabled:opacity-50"
            style={{ backgroundColor: topicColor }}
          >
            {submitting ? 'Checking...' : 'Check Answer'}
          </button>
        </>
      )}

      {/* Result feedback */}
      {result && (
        <div className={`rounded-xl p-4 border ${result.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{result.correct ? '✓' : '✗'}</span>
            <span className={`font-semibold text-sm ${result.correct ? 'text-green-700' : 'text-red-700'}`}>
              {result.correct ? 'Correct!' : 'Not quite.'}
            </span>
            {result.xpEarned > 0 && (
              <span className="ml-auto text-xs font-bold text-primary-600">+{result.xpEarned} XP</span>
            )}
          </div>
          {!result.correct && (
            <p className="text-sm text-slate-600 mb-1">
              <span className="font-medium">Correct answer:</span> {current.correctAnswer}
            </p>
          )}
          <p className="text-sm text-slate-600">{result.explanation}</p>
        </div>
      )}

      {/* Navigation */}
      {result && (
        <div className="flex gap-3">
          {allDone ? (
            <div className="w-full text-center py-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-semibold text-green-700">
                Section complete! +{totalXP} XP earned
              </p>
              <p className="text-xs text-green-600 mt-0.5">
                These exercises are now in your spaced repetition queue.
              </p>
            </div>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-lg font-semibold text-sm text-white transition-all"
              style={{ backgroundColor: topicColor }}
            >
              Next Exercise →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
