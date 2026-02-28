import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'past-simple',
  title: 'Past Simple',
  category: 'Verb Tenses',
  color: '#3B82F6',
  level: 'beginner',
  theory: {
    formation: 'Subject + verb(-ed) for regular verbs, or irregular past form',
    usage: [
      'Completed actions at a specific past time: "We signed the contract last Tuesday."',
      'A sequence of past events: "She presented, then answered questions."',
      'Past habits/states (no longer true): "The company used to operate from London."',
      'Historical facts: "The firm was founded in 1990."',
    ],
    examples: [
      { en: 'We launched the product in Q2.',                   pt: 'Lançamos o produto no segundo trimestre.' },
      { en: 'She didn\'t attend the board meeting yesterday.',   pt: 'Ela não participou da reunião do conselho ontem.' },
      { en: 'Did you send the contract to legal?',              pt: 'Você enviou o contrato para o jurídico?' },
      { en: 'The team completed the project ahead of schedule.',pt: 'A equipe concluiu o projeto antes do prazo.' },
      { en: 'He worked for three companies before joining us.', pt: 'Ele trabalhou em três empresas antes de entrar aqui.' },
      { en: 'Sales grew by 25% in the previous quarter.',       pt: 'As vendas cresceram 25% no trimestre anterior.' },
    ],
    commonMistakes: [
      '"I didn\'t went" ✗ → "I didn\'t go" ✓ (base verb after did/didn\'t)',
      '"Did she went?" ✗ → "Did she go?" ✓',
      'Using past simple with "since/for" when meaning continues: "I worked here for 5 years" (and still do) → use present perfect',
    ],
    tips: 'Key time markers: yesterday, last week/month/year, in [year], ago, at [time]. These always signal past simple.',
  },
  exercises: [
    {
      id: 'learn-past-simple-1',
      type: 'multiple-choice',
      question: 'The CEO ___ the merger announcement at yesterday\'s press conference.',
      options: ['make', 'makes', 'made', 'has made'],
      correctAnswer: 'made',
      explanation: '"Yesterday" signals a specific past time → past simple (irregular: make → made).',
      xpBase: 25,
    },
    {
      id: 'learn-past-simple-2',
      type: 'fill-in-blank',
      question: 'Complete: "Our revenue ___ (not/meet) the target last year."',
      correctAnswer: "didn't meet",
      explanation: 'Past simple negative: didn\'t + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-past-simple-3',
      type: 'multiple-choice',
      question: '___ the client ___ the proposal last week?',
      options: ['Did / accept', 'Did / accepted', 'Has / accepted', 'Does / accept'],
      correctAnswer: 'Did / accept',
      explanation: 'Past simple question: Did + subject + base verb?',
      xpBase: 25,
    },
    {
      id: 'learn-past-simple-4',
      type: 'multiple-choice',
      question: 'Which sentence is correct?',
      options: [
        'We didn\'t received the invoice.',
        'We didn\'t receive the invoice.',
        'We not received the invoice.',
        'We have not received the invoice last week.',
      ],
      correctAnswer: 'We didn\'t receive the invoice.',
      explanation: 'Negative: didn\'t + base verb (no -ed after didn\'t).',
      xpBase: 25,
    },
    {
      id: 'learn-past-simple-5',
      type: 'fill-in-blank',
      question: 'Complete: "She ___ (join) the company three years ago."',
      correctAnswer: 'joined',
      explanation: '"Three years ago" signals past simple → regular verb + -ed.',
      xpBase: 25,
    },
  ],
};

export default topic;
