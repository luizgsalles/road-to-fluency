import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'prepositions',
  title: 'Prepositions of Time & Place',
  category: 'Structure',
  color: '#F59E0B',
  level: 'beginner',
  theory: {
    formation: 'at / on / in / by / for / since / during',
    usage: [
      '"at" — specific times, addresses: "at 9 a.m.", "at the office", "at the conference."',
      '"on" — days, dates, surfaces: "on Monday", "on 15 March", "on the agenda."',
      '"in" — months, years, periods, locations: "in January", "in 2024", "in the meeting room."',
      '"by" — deadline: "Submit by Friday."',
      '"for" — duration: "I\'ve worked here for three years."',
      '"since" — start point: "since 2019", "since the merger."',
    ],
    examples: [
      { en: 'The conference call is at 3 p.m. on Thursday.',    pt: 'A chamada de conferência é às 15h na quinta-feira.' },
      { en: 'Please submit your timesheet by Friday.',           pt: 'Por favor, envie seu timesheet até sexta-feira.' },
      { en: 'We have been working on this since January.',       pt: 'Trabalhamos nisso desde janeiro.' },
      { en: 'The CEO is in a meeting until noon.',               pt: 'O CEO está em reunião até o meio-dia.' },
      { en: 'I\'ll be on annual leave in August.',               pt: 'Estarei de férias em agosto.' },
      { en: 'During the Q4 review, all divisions presented.',    pt: 'Durante a revisão do 4T, todas as divisões apresentaram.' },
    ],
    commonMistakes: [
      '"at Monday" ✗ → "on Monday" ✓ | "in 3 p.m." ✗ → "at 3 p.m." ✓',
      '"since three months" ✗ → "for three months" ✓ | "for 2019" ✗ → "since 2019" ✓',
      '"in the night" ✗ → "at night" ✓ | "in Monday morning" ✗ → "on Monday morning" ✓',
    ],
    tips: 'Quick rule: AT a point (time/place). ON a surface (day/date). IN an area (month/year/room).',
  },
  exercises: [
    {
      id: 'learn-prepositions-1',
      type: 'multiple-choice',
      question: 'The annual review is ___ Monday ___ 10 a.m.',
      options: ['at / at', 'on / at', 'in / on', 'on / in'],
      correctAnswer: 'on / at',
      explanation: '"on Monday" (day) + "at 10 a.m." (specific time).',
      xpBase: 25,
    },
    {
      id: 'learn-prepositions-2',
      type: 'fill-in-blank',
      question: 'Complete: "Please send the invoice ___ the end of business today."',
      correctAnswer: 'by',
      explanation: '"By" = deadline — no later than this time.',
      xpBase: 25,
    },
    {
      id: 'learn-prepositions-3',
      type: 'multiple-choice',
      question: 'She has been the regional director ___ 2020.',
      options: ['for', 'since', 'at', 'in'],
      correctAnswer: 'since',
      explanation: '"Since" + specific point in time when something started.',
      xpBase: 25,
    },
    {
      id: 'learn-prepositions-4',
      type: 'multiple-choice',
      question: 'The new office will open ___ the summer.',
      options: ['at', 'on', 'in', 'by'],
      correctAnswer: 'in',
      explanation: '"In" for seasons and longer periods: in the summer, in Q3, in 2025.',
      xpBase: 25,
    },
    {
      id: 'learn-prepositions-5',
      type: 'fill-in-blank',
      question: 'Complete: "We\'ve been growing consistently ___ five years."',
      correctAnswer: 'for',
      explanation: '"For" + duration (length of time).',
      xpBase: 25,
    },
  ],
};

export default topic;
