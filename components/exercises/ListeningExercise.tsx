// ============================================================================
// Listening Exercise Component
// ============================================================================
// Purpose: Audio playback with comprehension questions
// Author: @dev (Dex) + @tutor (Socrates)
// Based on: Task 10 (Exercise System), Task 14 (Audio)
// ============================================================================

'use client';

import { useState, useRef, useEffect } from 'react';

interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface ListeningExerciseProps {
  audioUrl: string;
  transcript: string;
  questions: ListeningQuestion[];
  onComplete: (results: { questionId: string; correct: boolean }[]) => void;
}

export function ListeningExercise({
  audioUrl,
  transcript,
  questions,
  onComplete,
}: ListeningExerciseProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnsweredCurrent = !!userAnswers[currentQuestion?.id];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setPlayCount((prev) => prev + 1);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSelectAnswer = (answer: string) => {
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
        correct: userAnswers[q.id] === q.correctAnswer,
      }));
      setShowResults(true);
      onComplete(results);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Audio Player */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <audio ref={audioRef} src={audioUrl} />

        <div className="flex items-center gap-4 mb-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-14 h-14 flex items-center justify-center bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {/* Progress Bar */}
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Play Count */}
          <div className="text-sm text-neutral-600">
            🔊 {playCount} {playCount === 1 ? 'play' : 'plays'}
          </div>
        </div>

        {/* Transcript Toggle */}
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-sm text-primary-500 hover:text-primary-600 font-medium"
        >
          {showTranscript ? 'Hide' : 'Show'} Transcript
        </button>

        {showTranscript && (
          <div className="mt-4 p-4 bg-neutral-50 rounded-lg text-sm text-neutral-700 leading-relaxed">
            {transcript}
          </div>
        )}
      </div>

      {/* Questions */}
      {!showResults && currentQuestion && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4 text-sm text-neutral-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>

          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
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

          <button
            onClick={handleNextQuestion}
            disabled={!hasAnsweredCurrent}
            className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
}
