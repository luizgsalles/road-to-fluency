import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'present-continuous',
  title: 'Present Continuous',
  category: 'Verb Tenses',
  color: '#3B82F6',
  level: 'beginner',
  theory: {
    formation: 'Subject + am/is/are + verb(-ing)',
    usage: [
      'Actions happening right now: "I\'m writing the proposal as we speak."',
      'Temporary situations: "She\'s working from home this month."',
      'Changing or developing trends: "The market is growing rapidly."',
      'Future arrangements (personal plans): "We\'re launching in Q4."',
      'Annoying habits (with "always"): "He\'s always interrupting in meetings."',
    ],
    examples: [
      { en: 'I\'m preparing the budget report.',             pt: 'Estou preparando o relatório de orçamento.' },
      { en: 'The team is working on a new feature.',         pt: 'A equipe está trabalhando em uma nova funcionalidade.' },
      { en: 'Are you attending the webinar tomorrow?',       pt: 'Você vai participar do webinar amanhã?' },
      { en: 'We\'re not hiring at the moment.',              pt: 'No momento, não estamos contratando.' },
      { en: 'Sales are declining this quarter.',             pt: 'As vendas estão caindo este trimestre.' },
      { en: 'She\'s always complaining about deadlines.',    pt: 'Ela sempre reclama dos prazos.' },
    ],
    commonMistakes: [
      'Using with stative verbs: "I\'m knowing the answer" ✗ → "I know the answer" ✓',
      'Forgetting am/is/are: "He working late" ✗ → "He is working late" ✓',
      'Confusing with present simple for habits: "I am checking email daily" ✗ → "I check email daily" ✓',
    ],
    tips: 'Stative verbs (know, understand, believe, want, have, see, hear) are NOT used in continuous forms.',
  },
  exercises: [
    {
      id: 'learn-present-continuous-1',
      type: 'multiple-choice',
      question: 'The project team ___ a client presentation right now.',
      options: ['prepare', 'prepares', 'is preparing', 'prepared'],
      correctAnswer: 'is preparing',
      explanation: '"Right now" signals a current ongoing action → present continuous.',
      xpBase: 25,
    },
    {
      id: 'learn-present-continuous-2',
      type: 'fill-in-blank',
      question: 'Complete: "Our company ___ (expand) into new markets this year."',
      correctAnswer: 'is expanding',
      explanation: 'Temporary ongoing situation → subject + is/are + verb(-ing).',
      xpBase: 25,
    },
    {
      id: 'learn-present-continuous-3',
      type: 'multiple-choice',
      question: 'Which is correct? "I ___ the quarterly results right now."',
      options: ['analyse', 'am analysing', 'am knowing', 'analyses'],
      correctAnswer: 'am analysing',
      explanation: '"Right now" + action verb → present continuous: am + verb(-ing).',
      xpBase: 25,
    },
    {
      id: 'learn-present-continuous-4',
      type: 'multiple-choice',
      question: 'Which sentence uses a stative verb INCORRECTLY?',
      options: [
        'I am working from home today.',
        'She is understanding the problem.',
        'They are launching a new product.',
        'We are reviewing the contract.',
      ],
      correctAnswer: 'She is understanding the problem.',
      explanation: '"Understand" is a stative verb. Use: "She understands the problem."',
      xpBase: 25,
    },
    {
      id: 'learn-present-continuous-5',
      type: 'fill-in-blank',
      question: 'Complete: "___ you ___ (join) the strategy meeting on Friday?"',
      correctAnswer: 'Are / joining',
      explanation: 'Future arrangement question: Are + subject + verb(-ing)?',
      xpBase: 25,
    },
  ],
};

export default topic;
