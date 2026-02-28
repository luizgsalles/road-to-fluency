import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'present-perfect-continuous',
  title: 'Present Perfect Continuous',
  category: 'Verb Tenses',
  color: '#3B82F6',
  level: 'intermediate',
  theory: {
    formation: 'Subject + have/has + been + verb(-ing)',
    usage: [
      'Ongoing actions that started in the past and continue now: "We\'ve been working on this project for six months."',
      'Recent activity with present results: "I\'ve been reviewing reports — that\'s why I\'m tired."',
      'Temporary situations in progress: "She\'s been covering for the manager this week."',
      'Emphasis on duration/continuity (vs. completion): "He has been calling clients all afternoon."',
    ],
    examples: [
      { en: 'I\'ve been waiting for your reply since Monday.',     pt: 'Estou aguardando sua resposta desde segunda-feira.' },
      { en: 'She has been leading the project for three months.',  pt: 'Ela está liderando o projeto há três meses.' },
      { en: 'Have you been experiencing any issues with the system?', pt: 'Você tem tido algum problema com o sistema?' },
      { en: 'We\'ve been negotiating the contract all week.',      pt: 'Temos negociado o contrato a semana toda.' },
      { en: 'The team hasn\'t been meeting its deadlines.',        pt: 'A equipe não tem cumprido seus prazos.' },
      { en: 'How long have you been working in this field?',       pt: 'Há quanto tempo você trabalha nessa área?' },
    ],
    commonMistakes: [
      'Using with stative verbs: "I\'ve been knowing him" ✗ → "I\'ve known him" ✓',
      'Confusing "for" and "since": "since six months" ✗ → "for six months" ✓',
      'Omitting "been": "I have working here" ✗ → "I have been working here" ✓',
    ],
    tips: 'Compare: "I\'ve written 5 reports" (completed, focus on number) vs "I\'ve been writing reports" (ongoing, focus on activity).',
  },
  exercises: [
    {
      id: 'learn-present-perfect-continuous-1',
      type: 'multiple-choice',
      question: 'The dev team ___ on the new platform for six months.',
      options: ['worked', 'has been working', 'is working', 'have worked'],
      correctAnswer: 'has been working',
      explanation: '"For + duration" with ongoing activity → present perfect continuous.',
      xpBase: 25,
    },
    {
      id: 'learn-present-perfect-continuous-2',
      type: 'fill-in-blank',
      question: 'Complete: "How long ___ you ___ (wait) for the client\'s decision?"',
      correctAnswer: 'have / been waiting',
      explanation: 'Question form: How long + have/has + subject + been + verb(-ing)?',
      xpBase: 25,
    },
    {
      id: 'learn-present-perfect-continuous-3',
      type: 'multiple-choice',
      question: 'My eyes hurt because I ___ at screens all day.',
      options: ['looked', 'have been looking', 'am looking', 'was looking'],
      correctAnswer: 'have been looking',
      explanation: 'Recent continuous activity causing a present result → present perfect continuous.',
      xpBase: 25,
    },
    {
      id: 'learn-present-perfect-continuous-4',
      type: 'multiple-choice',
      question: 'Which sentence uses the tense CORRECTLY?',
      options: [
        'She has been knowing the CEO for years.',
        'We have been finalising the budget since Monday.',
        'I have been wrote three emails.',
        'They have been see the results.',
      ],
      correctAnswer: 'We have been finalising the budget since Monday.',
      explanation: 'Ongoing activity since a point in time → have/has + been + verb(-ing).',
      xpBase: 25,
    },
    {
      id: 'learn-present-perfect-continuous-5',
      type: 'fill-in-blank',
      question: 'Complete: "Sales ___ (decline) since the competitor entered the market."',
      correctAnswer: 'have been declining',
      explanation: 'Ongoing trend from a past point → have + been + verb(-ing).',
      xpBase: 25,
    },
  ],
};

export default topic;
