import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'conditionals-second',
  title: 'Second Conditional',
  category: 'Conditionals',
  color: '#EC4899',
  level: 'intermediate',
  theory: {
    formation: 'If + past simple, would + base verb',
    usage: [
      'Unreal or hypothetical present/future: "If I were CEO, I would flatten the hierarchy."',
      'Unlikely situations: "If we doubled prices, we would lose customers."',
      'Advice: "If I were you, I would negotiate the equity."',
      'Imagining alternatives: "What would you do if the company went bankrupt?"',
    ],
    examples: [
      { en: 'If we had a bigger budget, we would run more campaigns.',   pt: 'Se tivéssemos um orçamento maior, faríamos mais campanhas.' },
      { en: 'I would restructure the team if I were the manager.',       pt: 'Eu reestruturaria a equipe se fosse o gestor.' },
      { en: 'If the company moved to Berlin, would you relocate?',       pt: 'Se a empresa se mudasse para Berlim, você se mudaria?' },
      { en: 'We wouldn\'t lose clients if we improved our service.',     pt: 'Não perderíamos clientes se melhorássemos nosso serviço.' },
      { en: 'If time zones weren\'t an issue, collaboration would be easier.', pt: 'Se fusos horários não fossem um problema, a colaboração seria mais fácil.' },
      { en: 'What would you prioritise if resources were unlimited?',     pt: 'O que você priorizaria se os recursos fossem ilimitados?' },
    ],
    commonMistakes: [
      '"If I was" vs "If I were" — "were" is technically correct for all persons in hypotheticals, but "was" is widely accepted',
      '"If we would have" ✗ → "If we had" ✓ (past simple in if-clause)',
      '"Would you relocate if we would move?" ✗ → "Would you relocate if we moved?" ✓',
    ],
    tips: 'The second conditional is great for diplomatic communication: "If we reallocated the budget, this might work better."',
  },
  exercises: [
    {
      id: 'learn-conditionals-second-1',
      type: 'multiple-choice',
      question: 'If we ___ remote-first, we ___ talent from anywhere in the world.',
      options: ['go / would recruit', 'went / would recruit', 'go / will recruit', 'went / recruited'],
      correctAnswer: 'went / would recruit',
      explanation: 'Hypothetical second conditional: if + past simple, would + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-second-2',
      type: 'fill-in-blank',
      question: 'Complete: "If I ___ (be) the CFO, I ___ (cut) discretionary spending."',
      correctAnswer: 'were / would cut',
      explanation: 'Hypothetical situation → if + were, would + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-second-3',
      type: 'multiple-choice',
      question: 'What ___ you do if your top client suddenly ___ the contract?',
      options: ['would / terminated', 'will / terminated', 'would / will terminate', 'do / terminated'],
      correctAnswer: 'would / terminated',
      explanation: 'Hypothetical question: would + subject + do if + past simple?',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-second-4',
      type: 'multiple-choice',
      question: 'Which sentence is CORRECT second conditional?',
      options: [
        'If we will expand, we would need more staff.',
        'If we expand, we will need more staff.',
        'If we expanded, we would need more staff.',
        'If we would expand, we need more staff.',
      ],
      correctAnswer: 'If we expanded, we would need more staff.',
      explanation: 'Second conditional: if + past simple, would + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-second-5',
      type: 'fill-in-blank',
      question: 'Complete: "We ___ (not/need) extra funding if we ___ (manage) costs better."',
      correctAnswer: "wouldn't need / managed",
      explanation: 'Hypothetical → wouldn\'t + base verb if + past simple.',
      xpBase: 25,
    },
  ],
};

export default topic;
