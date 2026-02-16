// ============================================================================
// Grammar Drill Component - Fill-in-the-blank Exercise
// ============================================================================
// Purpose: Grammar exercise with sentence completion
// Author: @dev (Dex) + @tutor (Socrates)
// Based on: Task 10 (Exercise System)
// ============================================================================

'use client';

import { useState } from 'react';

interface GrammarQuestion {
  id: string;
  sentence: string; // "I ___ to the store yesterday." (blank = ___)
  options: string[]; // ["go", "went", "gone", "going"]
  correctAnswer: string; // "went"
  explanation: string;
}

interface GrammarDrillProps {
  questions: GrammarQuestion[];
  onComplete: (results: { questionId: string; correct: boolean; userAnswer: string }[]) => void;
}

export function GrammarDrill({ questions, onComplete }: GrammarDrillProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setShowFeedback(false);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    // Save answer
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedOption,
    }));

    // Show feedback
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate results
      const results = questions.map((q) => ({
        questionId: q.id,
        correct: userAnswers[q.id] === q.correctAnswer,
        userAnswer: userAnswers[q.id] || '',
      }));
      onComplete(results);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">
          {renderSentenceWithBlank(currentQuestion.sentence)}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectOption(option)}
              disabled={showFeedback}
              className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${
                selectedOption === option
                  ? showFeedback
                    ? isCorrect
                      ? 'border-success-500 bg-success-50'
                      : 'border-error-500 bg-error-50'
                    : 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              isCorrect ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{isCorrect ? '✓' : '✗'}</span>
              <div>
                <p className={`font-semibold mb-1 ${isCorrect ? 'text-success-700' : 'text-error-700'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-neutral-700 mb-2">
                    Correct answer: <strong>{currentQuestion.correctAnswer}</strong>
                  </p>
                )}
                <p className="text-sm text-neutral-600">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {!showFeedback ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
            >
              {isLastQuestion ? 'Finish' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function renderSentenceWithBlank(sentence: string) {
  const parts = sentence.split('___');
  return (
    <span>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="inline-block w-32 border-b-2 border-primary-500 mx-2" />
          )}
        </span>
      ))}
    </span>
  );
}
