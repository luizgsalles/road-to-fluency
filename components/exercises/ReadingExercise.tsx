// ============================================================================
// Reading Exercise Component - Comprehension Questions
// ============================================================================
// Purpose: Business document reading with comprehension questions
// Author: @dev (Dex) + @tutor (Socrates)
// Based on: Task 10 (Exercise System)
// ============================================================================

'use client';

import { useState } from 'react';

interface ReadingPassage {
  title: string;
  type: 'email' | 'article' | 'report' | 'memo';
  content: string;
  wordCount: number;
}

interface ReadingQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

interface ReadingExerciseProps {
  passage: ReadingPassage;
  questions: ReadingQuestion[];
  onComplete: (results: { questionId: string; correct: boolean; userAnswer: string }[]) => void;
}

export function ReadingExercise({ passage, questions, onComplete }: ReadingExerciseProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 = reading phase
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [readingTimeSeconds, setReadingTimeSeconds] = useState(0);
  const [showPassage, setShowPassage] = useState(true);

  const isReadingPhase = currentQuestionIndex === -1;
  const currentQuestion = !isReadingPhase ? questions[currentQuestionIndex] : null;
  const progress = isReadingPhase
    ? 0
    : ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleStartQuestions = () => {
    setCurrentQuestionIndex(0);
    setShowPassage(false);
  };

  const handleSelectAnswer = (answer: string) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate results
      const results = questions.map((q) => ({
        questionId: q.id,
        correct: userAnswers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase(),
        userAnswer: userAnswers[q.id] || '',
      }));
      onComplete(results);
    }
  };

  const hasAnsweredCurrent = currentQuestion && !!userAnswers[currentQuestion.id];
  const estimatedReadingTimeMinutes = Math.ceil(passage.wordCount / 200); // 200 WPM

  return (
    <div className="max-w-4xl mx-auto">
      {/* Reading Phase */}
      {isReadingPhase && (
        <div className="space-y-6">
          {/* Passage Info */}
          <div className="bg-primary-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-primary-900">Reading Exercise</h3>
              <p className="text-sm text-primary-700">
                {passage.wordCount} words • Est. reading time: {estimatedReadingTimeMinutes} min
              </p>
            </div>
            <span className="px-3 py-1 bg-primary-200 text-primary-800 text-xs font-semibold rounded-full uppercase">
              {passage.type}
            </span>
          </div>

          {/* Passage */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">{passage.title}</h2>
            <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed whitespace-pre-wrap">
              {passage.content}
            </div>
          </div>

          {/* Start Questions Button */}
          <div className="text-center">
            <button
              onClick={handleStartQuestions}
              className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors text-lg"
            >
              Start Comprehension Questions
            </button>
            <p className="text-sm text-neutral-500 mt-3">
              {questions.length} questions • You can review the passage during questions
            </p>
          </div>
        </div>
      )}

      {/* Questions Phase */}
      {!isReadingPhase && currentQuestion && (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <button
                onClick={() => setShowPassage(!showPassage)}
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                {showPassage ? 'Hide' : 'Show'} Passage
              </button>
            </div>
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Passage (collapsible) */}
          {showPassage && (
            <div className="bg-neutral-50 rounded-xl p-6 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">{passage.title}</h3>
              <div className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
                {passage.content}
              </div>
            </div>
          )}

          {/* Question */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              {currentQuestion.question}
            </h3>

            {/* Multiple Choice / True-False */}
            {(currentQuestion.type === 'multiple-choice' ||
              currentQuestion.type === 'true-false') && (
              <div className="space-y-3 mb-6">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(option)}
                    className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-colors ${
                      userAnswers[currentQuestion.id] === option
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Short Answer */}
            {currentQuestion.type === 'short-answer' && (
              <div className="mb-6">
                <textarea
                  value={userAnswers[currentQuestion.id] || ''}
                  onChange={(e) => handleSelectAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full h-32 p-4 border-2 border-neutral-200 rounded-lg resize-none focus:border-primary-500 focus:outline-none"
                />
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={handleNextQuestion}
              disabled={!hasAnsweredCurrent}
              className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
