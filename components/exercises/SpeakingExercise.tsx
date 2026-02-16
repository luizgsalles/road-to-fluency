// ============================================================================
// Speaking Exercise Component - Voice Recording
// ============================================================================
// Purpose: Speaking practice with audio recording and transcription
// Author: @dev (Dex) + @tutor (Socrates)
// Based on: Task 10 (Exercise System), Task 14 (Audio Recording)
// ============================================================================

'use client';

import { useState, useRef } from 'react';
import { AudioRecorder } from '@/lib/audio/recorder';

interface SpeakingPrompt {
  id: string;
  question: string;
  sampleAnswer: string;
  tips: string[];
  maxDurationSeconds: number;
}

interface SpeakingExerciseProps {
  prompt: SpeakingPrompt;
  onSubmit: (audioBlob: Blob) => Promise<void>;
  isProcessing?: boolean;
}

export function SpeakingExercise({ prompt, onSubmit, isProcessing = false }: SpeakingExerciseProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartRecording = async () => {
    try {
      const recorder = new AudioRecorder({
        maxDuration: prompt.maxDurationSeconds,
        onStateChange: (state) => {
          setIsRecording(state === 'recording');
        },
        onDataAvailable: (blob) => {
          setAudioBlob(blob);
          setAudioUrl(URL.createObjectURL(blob));
        },
      });

      recorderRef.current = recorder;
      await recorder.start();

      // Start timer
      setDuration(0);
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Recording error:', error);
      alert('Failed to start recording. Please check microphone permissions.');
    }
  };

  const handleStopRecording = async () => {
    if (!recorderRef.current) return;

    try {
      await recorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } catch (error) {
      console.error('Stop recording error:', error);
    }
  };

  const handleReset = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setDuration(0);
    if (recorderRef.current) {
      recorderRef.current.destroy();
      recorderRef.current = null;
    }
  };

  const handleSubmit = async () => {
    if (!audioBlob) return;
    await onSubmit(audioBlob);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (duration / prompt.maxDurationSeconds) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Prompt */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">{prompt.question}</h2>

        {/* Sample Answer */}
        <div className="mb-4">
          <details className="group">
            <summary className="text-sm font-semibold text-primary-500 cursor-pointer hover:text-primary-600">
              📝 View Sample Answer
            </summary>
            <p className="mt-3 text-neutral-700 italic pl-4 border-l-4 border-primary-200">
              &ldquo;{prompt.sampleAnswer}&rdquo;
            </p>
          </details>
        </div>

        {/* Tips */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm font-semibold text-blue-900 mb-2">💡 Speaking Tips</div>
          <ul className="text-sm text-blue-800 space-y-1">
            {prompt.tips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recording Interface */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-6">
        {!audioBlob ? (
          // Recording State
          <div className="text-center">
            {/* Duration Display */}
            <div className="mb-6">
              <div
                className={`text-6xl font-bold ${
                  isRecording ? 'text-error-500 animate-pulse' : 'text-neutral-400'
                }`}
              >
                {formatDuration(duration)}
              </div>
              <div className="text-sm text-neutral-500 mt-2">
                Max: {formatDuration(prompt.maxDurationSeconds)}
              </div>
            </div>

            {/* Progress Bar */}
            {isRecording && (
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-error-500 transition-all duration-1000"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
            )}

            {/* Record Button */}
            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={isProcessing}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-error-500 hover:bg-error-600'
                  : 'bg-primary-500 hover:bg-primary-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isRecording ? (
                <div className="w-8 h-8 bg-white rounded-sm" />
              ) : (
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <p className="text-sm text-neutral-600 mt-4">
              {isRecording ? 'Click to stop recording' : 'Click to start recording'}
            </p>
          </div>
        ) : (
          // Playback State
          <div className="text-center">
            <div className="text-success-600 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Recording Complete</h3>
            <p className="text-neutral-600 mb-6">Duration: {formatDuration(duration)}</p>

            {/* Audio Player */}
            {audioUrl && (
              <div className="mb-6">
                <audio controls src={audioUrl} className="mx-auto" />
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleReset}
                disabled={isProcessing}
                className="px-6 py-3 bg-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Re-record
              </button>
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isProcessing ? (
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
                    <span>Transcribing...</span>
                  </>
                ) : (
                  <>
                    <span>Submit for Review</span>
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
        )}
      </div>
    </div>
  );
}
