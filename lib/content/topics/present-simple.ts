import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'present-simple',
  title: 'Present Simple',
  category: 'Verb Tenses',
  color: '#3B82F6',
  level: 'beginner',
  theory: {
    formation: 'Subject + base verb (add -s/-es for he/she/it)',
    usage: [
      'Habits and routines: "I check my email every morning."',
      'General truths and facts: "Water boils at 100°C."',
      'Scheduled future events: "The meeting starts at 9 a.m."',
      'Instructions and directions: "You open the app and sign in."',
      'Permanent situations: "She works for a multinational company."',
    ],
    examples: [
      { en: 'I send reports every Friday.',            pt: 'Eu envio relatórios toda sexta-feira.' },
      { en: 'She manages the marketing department.',   pt: 'Ela gerencia o departamento de marketing.' },
      { en: 'He doesn\'t attend daily standups.',      pt: 'Ele não participa das reuniões diárias.' },
      { en: 'Do you speak English at work?',           pt: 'Você fala inglês no trabalho?' },
      { en: 'The office opens at 8 a.m.',              pt: 'O escritório abre às 8h.' },
      { en: 'We don\'t have a meeting on Fridays.',    pt: 'Não temos reunião às sextas-feiras.' },
    ],
    commonMistakes: [
      'Forgetting -s/-es for third person: "She work" ✗ → "She works" ✓',
      'Using present simple for temporary actions: "I am reading now" (not "I read now")',
      'Using "do" incorrectly: "Does she works here?" ✗ → "Does she work here?" ✓',
    ],
    tips: 'Use frequency adverbs (always, usually, often, sometimes, rarely, never) with present simple.',
  },
  exercises: [
    {
      id: 'learn-present-simple-1',
      type: 'multiple-choice',
      question: 'She ___ the weekly report every Monday.',
      options: ['send', 'sends', 'is sending', 'sended'],
      correctAnswer: 'sends',
      explanation: 'Third person singular (she/he/it) requires -s on the verb in present simple.',
      xpBase: 25,
    },
    {
      id: 'learn-present-simple-2',
      type: 'fill-in-blank',
      question: 'Complete: "The CEO ___ (not/attend) every conference call."',
      correctAnswer: "doesn't attend",
      explanation: 'Negative present simple: subject + don\'t/doesn\'t + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-present-simple-3',
      type: 'multiple-choice',
      question: '___ your team use Slack for communication?',
      options: ['Do', 'Does', 'Is', 'Are'],
      correctAnswer: 'Does',
      explanation: '"Your team" = third person singular → use "Does" for questions.',
      xpBase: 25,
    },
    {
      id: 'learn-present-simple-4',
      type: 'multiple-choice',
      question: 'Which sentence is correct?',
      options: [
        'She always arrive early.',
        'She always arrives early.',
        'She always is arriving early.',
        'She always arrived early.',
      ],
      correctAnswer: 'She always arrives early.',
      explanation: 'Third person singular with frequency adverb → subject + adverb + verb(-s).',
      xpBase: 25,
    },
    {
      id: 'learn-present-simple-5',
      type: 'fill-in-blank',
      question: 'Complete: "Our company ___ (have) offices in 12 countries."',
      correctAnswer: 'has',
      explanation: '"Have" becomes "has" for third person singular.',
      xpBase: 25,
    },
  ],
};

export default topic;
