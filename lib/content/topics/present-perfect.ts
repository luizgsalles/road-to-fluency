import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'present-perfect',
  title: 'Present Perfect',
  category: 'Verb Tenses',
  color: '#3B82F6',
  level: 'intermediate',
  theory: {
    formation: 'Subject + have/has + past participle (PP)',
    usage: [
      'Experience (ever/never): "Have you ever led a global project?"',
      'Recent news/results (just/recently): "We\'ve just closed a major deal."',
      'Unfinished situations (for/since): "I\'ve worked here for three years."',
      'Changes over time: "Prices have increased significantly."',
      'Achievement: "The team has exceeded its targets this quarter."',
    ],
    examples: [
      { en: 'I have sent the report to the client.',         pt: 'Eu enviei o relatório para o cliente.' },
      { en: 'She has worked here since 2019.',               pt: 'Ela trabalha aqui desde 2019.' },
      { en: 'Have you ever presented to the board?',        pt: 'Você já fez uma apresentação para o conselho?' },
      { en: 'We haven\'t received the invoice yet.',         pt: 'Ainda não recebemos a fatura.' },
      { en: 'The company has expanded into Asia.',           pt: 'A empresa se expandiu para a Ásia.' },
      { en: 'They have just launched a new product line.',   pt: 'Eles acabaram de lançar uma nova linha de produtos.' },
    ],
    commonMistakes: [
      '"I have went" ✗ → "I have gone" ✓ (use past participle, not past simple)',
      '"I have seen him yesterday" ✗ — don\'t use with specific past times; use past simple instead',
      '"Since three years" ✗ → "for three years" / "since 2021" ✓',
    ],
    tips: 'Use "for" + duration (for six months) and "since" + point in time (since January). Present perfect connects the past to now.',
  },
  exercises: [
    {
      id: 'learn-present-perfect-1',
      type: 'multiple-choice',
      question: 'The board ___ the new strategy yet.',
      options: [
        'hasn\'t approved',
        'didn\'t approved',
        'doesn\'t approve',
        'hadn\'t approved',
      ],
      correctAnswer: "hasn't approved",
      explanation: '"Yet" signals an unfinished expected action → present perfect negative.',
      xpBase: 25,
    },
    {
      id: 'learn-present-perfect-2',
      type: 'fill-in-blank',
      question: 'Complete: "I ___ (live) in London for the past two years."',
      correctAnswer: 'have lived',
      explanation: '"For + duration" with present relevance → present perfect.',
      xpBase: 25,
    },
    {
      id: 'learn-present-perfect-3',
      type: 'multiple-choice',
      question: '___ you ever ___ a contract in English?',
      options: ['Did / negotiated', 'Have / negotiated', 'Have / negotiate', 'Do / negotiate'],
      correctAnswer: 'Have / negotiated',
      explanation: '"Ever" asks about life experience → have/has + past participle.',
      xpBase: 25,
    },
    {
      id: 'learn-present-perfect-4',
      type: 'multiple-choice',
      question: 'Which sentence is WRONG?',
      options: [
        'She has worked here since 2020.',
        'We have just finished the audit.',
        'I have seen him yesterday.',
        'They have already submitted the proposal.',
      ],
      correctAnswer: 'I have seen him yesterday.',
      explanation: '"Yesterday" is a finished past time → use past simple: "I saw him yesterday."',
      xpBase: 25,
    },
    {
      id: 'learn-present-perfect-5',
      type: 'fill-in-blank',
      question: 'Complete: "Our revenue ___ (grow) by 40% since last year."',
      correctAnswer: 'has grown',
      explanation: '"Since + point in time" + third person singular → has + past participle.',
      xpBase: 25,
    },
  ],
};

export default topic;
