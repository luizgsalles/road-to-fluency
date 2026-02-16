// ============================================================================
// Vocabulary Flashcards Component
// ============================================================================
// Purpose: Interactive flashcards for vocabulary learning
// Author: @dev (Dex) + @tutor (Socrates)
// Based on: Task 10 (Exercise System)
// ============================================================================

'use client';

import { useState } from 'react';

interface Flashcard {
  id: string;
  word: string;
  definition: string;
  example: string;
  businessContext: string;
}

interface VocabularyFlashcardsProps {
  cards: Flashcard[];
  onComplete: (masteredCards: string[]) => void;
}

export function VocabularyFlashcards({ cards, onComplete }: VocabularyFlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [reviewLaterCards, setReviewLaterCards] = useState<string[]>([]);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;
  const isLastCard = currentIndex === cards.length - 1;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastered = () => {
    setMasteredCards((prev) => new Set(prev).add(currentCard.id));
    handleNext();
  };

  const handleReviewLater = () => {
    setReviewLaterCards((prev) => [...prev, currentCard.id]);
    handleNext();
  };

  const handleNext = () => {
    if (isLastCard) {
      onComplete(Array.from(masteredCards));
    } else {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <span>{masteredCards.size} mastered</span>
        </div>
        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000 mb-6">
        <div
          className={`relative w-full h-96 cursor-pointer transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center backface-hidden ${
              isFlipped ? 'invisible' : 'visible'
            }`}
          >
            <div className="text-center">
              <div className="text-sm text-neutral-500 mb-4">Word</div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">{currentCard.word}</h2>
              <p className="text-sm text-neutral-500 italic">Click to see definition</p>
            </div>
          </div>

          {/* Back */}
          <div
            className={`absolute inset-0 bg-primary-50 rounded-xl shadow-lg p-8 backface-hidden rotate-y-180 ${
              isFlipped ? 'visible' : 'invisible'
            }`}
          >
            <div className="h-full flex flex-col">
              <div className="text-sm text-primary-600 font-semibold mb-2">Definition</div>
              <p className="text-lg text-neutral-900 mb-4">{currentCard.definition}</p>

              <div className="text-sm text-primary-600 font-semibold mb-2">Example</div>
              <p className="text-neutral-700 italic mb-4">&ldquo;{currentCard.example}&rdquo;</p>

              <div className="text-sm text-primary-600 font-semibold mb-2">Business Context</div>
              <p className="text-neutral-700 flex-1">{currentCard.businessContext}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {isFlipped && (
        <div className="flex gap-4">
          <button
            onClick={handleReviewLater}
            className="flex-1 px-6 py-4 bg-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-300 transition-colors"
          >
            📚 Review Later
          </button>
          <button
            onClick={handleMastered}
            className="flex-1 px-6 py-4 bg-success-500 text-white font-semibold rounded-lg hover:bg-success-600 transition-colors"
          >
            ✓ Mastered
          </button>
        </div>
      )}

      {!isFlipped && (
        <div className="text-center text-sm text-neutral-500">
          Tap the card to reveal the definition
        </div>
      )}
    </div>
  );
}
