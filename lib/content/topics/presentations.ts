import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'presentations',
  title: 'Presentations',
  category: 'Vocabulary',
  color: '#10B981',
  level: 'intermediate',
  theory: {
    formation: 'Opening → Signposting → Data language → Transitions → Q&A → Close',
    usage: [
      'Opening: "Good morning, everyone. Today I\'d like to talk about..."',
      'Signposting structure: "First... Moving on to... Finally..."',
      'Referring to visuals: "As you can see from this chart..." / "This slide shows..."',
      'Emphasising: "The key point here is..." / "What\'s particularly interesting is..."',
      'Inviting questions: "I\'d be happy to take any questions."',
    ],
    examples: [
      { en: 'I\'d like to start by giving you some background.',              pt: 'Gostaria de começar fornecendo um contexto.' },
      { en: 'Let\'s turn now to the financial results.',                       pt: 'Passemos agora aos resultados financeiros.' },
      { en: 'As this graph illustrates, revenue grew by 30%.',                pt: 'Como este gráfico ilustra, a receita cresceu 30%.' },
      { en: 'In summary, our three key takeaways are...',                     pt: 'Em resumo, nossos três principais pontos são...' },
      { en: 'To wrap up, I\'d like to highlight the next steps.',              pt: 'Para finalizar, gostaria de destacar os próximos passos.' },
      { en: 'Does anyone have questions before I continue?',                   pt: 'Alguém tem perguntas antes de eu continuar?' },
    ],
    commonMistakes: [
      '"Let me to explain" ✗ → "Let me explain" ✓ (let + base verb, no "to")',
      'Reading slides verbatim — paraphrase and expand on bullet points',
      '"As you can see..." when the chart is complex — explain what to look at first',
    ],
    tips: 'Use the "Tell them" framework: Tell them what you\'ll say → Say it → Tell them what you said. Signposting = professional credibility.',
  },
  exercises: [
    {
      id: 'learn-presentations-1',
      type: 'multiple-choice',
      question: 'Which is the BEST way to open a formal presentation?',
      options: [
        'OK, so I\'m going to talk about sales.',
        'Good morning, everyone. Today I\'d like to present our Q3 sales results.',
        'Hi guys. Let\'s start.',
        'So, the thing is, we need to discuss sales.',
      ],
      correctAnswer: 'Good morning, everyone. Today I\'d like to present our Q3 sales results.',
      explanation: 'Professional opening = greeting + audience + clear statement of purpose.',
      xpBase: 25,
    },
    {
      id: 'learn-presentations-2',
      type: 'fill-in-blank',
      question: 'Complete: "___ you can see from this chart, customer acquisition costs have declined."',
      correctAnswer: 'As',
      explanation: '"As you can see from..." is the standard way to direct attention to visuals.',
      xpBase: 25,
    },
    {
      id: 'learn-presentations-3',
      type: 'multiple-choice',
      question: 'To move from one section to another, you say:',
      options: [
        'OK, now the next thing.',
        'Let\'s now turn to the operational highlights.',
        'Anyway, moving.',
        'Next slide please.',
      ],
      correctAnswer: "Let's now turn to the operational highlights.",
      explanation: '"Let\'s now turn to..." is a polished transition phrase in presentations.',
      xpBase: 25,
    },
    {
      id: 'learn-presentations-4',
      type: 'multiple-choice',
      question: 'To emphasise the most important finding, you say:',
      options: [
        'This is very important, I think.',
        'I want to stress that the data is good.',
        'The critical takeaway here is that conversion rates doubled.',
        'This number means things are OK.',
      ],
      correctAnswer: 'The critical takeaway here is that conversion rates doubled.',
      explanation: '"The key/critical takeaway here is..." = professional emphasis phrase.',
      xpBase: 25,
    },
    {
      id: 'learn-presentations-5',
      type: 'fill-in-blank',
      question: 'Complete: "___ sum up, our strategy is on track and we ___ exceed targets by Q4."',
      correctAnswer: 'To / expect to',
      explanation: '"To sum up..." = signpost for conclusion. "expect to" = professional forward-looking statement.',
      xpBase: 25,
    },
  ],
};

export default topic;
