import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'future-going-to',
  title: 'Future (going to)',
  category: 'Verb Tenses',
  color: '#3B82F6',
  level: 'beginner',
  theory: {
    formation: 'Subject + am/is/are + going to + base verb',
    usage: [
      'Plans and intentions decided BEFORE speaking: "We\'re going to hire 20 engineers next year."',
      'Predictions based on evidence: "Look at those numbers — we\'re going to miss the target."',
      'Personal intentions: "I\'m going to request a performance review."',
    ],
    examples: [
      { en: 'We\'re going to restructure the sales team.',            pt: 'Vamos reestruturar a equipe de vendas.' },
      { en: 'Is the company going to open a new office?',             pt: 'A empresa vai abrir um novo escritório?' },
      { en: 'She\'s going to take over as interim CEO.',              pt: 'Ela vai assumir o cargo de CEO interina.' },
      { en: 'I\'m not going to renew the lease.',                     pt: 'Não vou renovar o contrato de aluguel.' },
      { en: 'Costs are going to increase — look at the forecast.',    pt: 'Os custos vão aumentar — veja a previsão.' },
      { en: 'They\'re going to launch in three markets simultaneously.',pt: 'Eles vão lançar em três mercados simultaneamente.' },
    ],
    commonMistakes: [
      '"We are going to launched" ✗ → "We are going to launch" ✓ (base verb, no -ed)',
      '"She is going to to present" ✗ → "She is going to present" ✓',
      'Using "going to" for spontaneous decisions: A: "The printer broke." B: "I\'m going to fix it." (better: "I\'ll fix it" — spontaneous)',
    ],
    tips: 'Rule of thumb: "going to" = plan already made. "will" = decision made right now.',
  },
  exercises: [
    {
      id: 'learn-future-going-to-1',
      type: 'multiple-choice',
      question: 'We have already booked the venue. We ___ hold the conference in June.',
      options: ['will', 'are going to', 'would', 'are'],
      correctAnswer: 'are going to',
      explanation: 'Pre-planned intention → going to.',
      xpBase: 25,
    },
    {
      id: 'learn-future-going-to-2',
      type: 'fill-in-blank',
      question: 'Complete: "The CEO ___ (announce) a merger at Monday\'s all-hands."',
      correctAnswer: 'is going to announce',
      explanation: 'Planned future action → subject + is/are + going to + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-future-going-to-3',
      type: 'multiple-choice',
      question: 'Expenses have doubled this month — we ___ exceed the budget.',
      options: ['are going to', 'will', 'are', 'go to'],
      correctAnswer: 'are going to',
      explanation: 'Prediction based on present evidence → going to.',
      xpBase: 25,
    },
    {
      id: 'learn-future-going-to-4',
      type: 'multiple-choice',
      question: '___ the company going to enter the Asian market?',
      options: ['Is', 'Will', 'Does', 'Has'],
      correctAnswer: 'Is',
      explanation: 'Question with going to: Am/Is/Are + subject + going to + base verb?',
      xpBase: 25,
    },
    {
      id: 'learn-future-going-to-5',
      type: 'fill-in-blank',
      question: 'Complete: "I ___ (not/renew) the partnership contract next year."',
      correctAnswer: "am not going to renew",
      explanation: 'Negative intention → subject + am/is/are + not + going to + base verb.',
      xpBase: 25,
    },
  ],
};

export default topic;
