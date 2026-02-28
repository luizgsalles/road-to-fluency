import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'conditionals-first',
  title: 'First Conditional',
  category: 'Conditionals',
  color: '#EC4899',
  level: 'beginner',
  theory: {
    formation: 'If + present simple, will + base verb',
    usage: [
      'Real and likely future possibilities: "If we win the bid, we\'ll hire 10 developers."',
      'Warnings: "If you miss the deadline, there will be penalties."',
      'Negotiations: "If you increase the order, we\'ll offer a discount."',
      'Plans that depend on a condition: "If the board approves, we\'ll proceed."',
    ],
    examples: [
      { en: 'If we launch in Q1, we\'ll have a competitive advantage.',   pt: 'Se lançarmos no 1T, teremos vantagem competitiva.' },
      { en: 'If costs rise, we will have to revise our pricing.',          pt: 'Se os custos subirem, teremos que revisar nossos preços.' },
      { en: 'Will you attend if the meeting is rescheduled?',              pt: 'Você vai participar se a reunião for remarcada?' },
      { en: 'If the client doesn\'t respond, we won\'t proceed.',          pt: 'Se o cliente não responder, não prosseguiremos.' },
      { en: 'Unless we act now, we\'ll lose market share.',                pt: 'A menos que ajamos agora, perderemos participação no mercado.' },
      { en: 'If the prototype works, investors will fund Phase 2.',        pt: 'Se o protótipo funcionar, os investidores financiarão a Fase 2.' },
    ],
    commonMistakes: [
      '"If we will win" ✗ → "If we win" ✓ (present simple in if-clause)',
      '"If we win, we hire" ✗ → "If we win, we will hire" ✓ (will in main clause)',
      'Confusing with zero conditional: first = future possibility; zero = always true',
    ],
    tips: '"Unless" = "if not": "Unless you confirm, we won\'t proceed" = "If you don\'t confirm, we won\'t proceed."',
  },
  exercises: [
    {
      id: 'learn-conditionals-first-1',
      type: 'multiple-choice',
      question: 'If the investor ___ our pitch, we ___ the funding round.',
      options: ['likes / will close', 'will like / close', 'liked / would close', 'likes / close'],
      correctAnswer: 'likes / will close',
      explanation: 'First conditional: if + present simple, will + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-first-2',
      type: 'fill-in-blank',
      question: 'Complete: "If the pilot program succeeds, the company ___ (roll out) nationwide."',
      correctAnswer: 'will roll out',
      explanation: 'Likely future result → will + base verb in main clause.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-first-3',
      type: 'multiple-choice',
      question: '___  you receive the offer, ___ you accept it?',
      options: ['If / will', 'If / do', 'When / would', 'Unless / will'],
      correctAnswer: 'If / will',
      explanation: 'Future possibility question: If + present simple, will + subject + base verb?',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-first-4',
      type: 'multiple-choice',
      question: 'Which sentence is CORRECT?',
      options: [
        'If we will miss the deadline, there are penalties.',
        'If we miss the deadline, there will be penalties.',
        'If we missed the deadline, there will be penalties.',
        'If we miss the deadline, there are be penalties.',
      ],
      correctAnswer: 'If we miss the deadline, there will be penalties.',
      explanation: 'First conditional: if + present simple, will + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-first-5',
      type: 'fill-in-blank',
      question: 'Complete: "___ (unless) we improve quality, clients ___ (will/leave)."',
      correctAnswer: 'Unless / will leave',
      explanation: 'Unless = if not. Main clause still uses will.',
      xpBase: 25,
    },
  ],
};

export default topic;
