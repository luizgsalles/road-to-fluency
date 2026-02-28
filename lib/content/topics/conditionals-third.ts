import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'conditionals-third',
  title: 'Third Conditional',
  category: 'Conditionals',
  color: '#EC4899',
  level: 'advanced',
  theory: {
    formation: 'If + past perfect (had + PP), would have + past participle',
    usage: [
      'Imagining different past outcomes: "If we had launched earlier, we would have captured the market."',
      'Regrets about the past: "If we had hired earlier, we wouldn\'t have missed the deadline."',
      'Counterfactual analysis: "Revenue would have doubled if we had entered the US market."',
    ],
    examples: [
      { en: 'If we had secured funding, we would have scaled faster.',       pt: 'Se tivéssemos obtido financiamento, teríamos escalado mais rápido.' },
      { en: 'Would you have accepted if they had made a better offer?',      pt: 'Você teria aceitado se eles tivessem feito uma oferta melhor?' },
      { en: 'We wouldn\'t have lost the client if we had communicated better.',pt: 'Não teríamos perdido o cliente se tivéssemos nos comunicado melhor.' },
      { en: 'The project would have succeeded if the team had been aligned.', pt: 'O projeto teria tido sucesso se a equipe tivesse alinhada.' },
      { en: 'If I had known about the issue, I would have escalated it.',     pt: 'Se eu tivesse sabido do problema, teria escalonado.' },
      { en: 'The deal would have closed if we had met the price.',            pt: 'O negócio teria fechado se tivéssemos atendido ao preço.' },
    ],
    commonMistakes: [
      '"If we had have" ✗ → "If we had" ✓',
      '"Would have went" ✗ → "Would have gone" ✓ (past participle)',
      '"If we would have launched" ✗ → "If we had launched" ✓ (no "would" in if-clause)',
    ],
    tips: 'Third conditional is used for post-mortems and retrospectives — analyzing what went wrong and what could have been done differently.',
  },
  exercises: [
    {
      id: 'learn-conditionals-third-1',
      type: 'multiple-choice',
      question: 'If we ___ the acquisition earlier, we ___ a stronger market position.',
      options: ['completed / would have', 'had completed / would have had', 'have completed / would have', 'completed / would had'],
      correctAnswer: 'had completed / would have had',
      explanation: 'Third conditional: if + had + PP, would have + PP.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-third-2',
      type: 'fill-in-blank',
      question: 'Complete: "The product ___ (not/fail) if we ___ (conduct) proper user testing."',
      correctAnswer: "wouldn't have failed / had conducted",
      explanation: 'Third conditional negative + if-clause.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-third-3',
      type: 'multiple-choice',
      question: '___ you ___ the position if they ___ a higher salary?',
      options: ['Would / accept / offered', 'Would / have accepted / had offered', 'Will / have accepted / offered', 'Did / accept / had offered'],
      correctAnswer: 'Would / have accepted / had offered',
      explanation: 'Third conditional question: Would + subject + have + PP if + had + PP?',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-third-4',
      type: 'multiple-choice',
      question: 'Which sentence is CORRECT third conditional?',
      options: [
        'If we invest more, we would have grown faster.',
        'If we had invested more, we would have grown faster.',
        'If we had invested more, we would grew faster.',
        'If we would have invested, we had grown faster.',
      ],
      correctAnswer: 'If we had invested more, we would have grown faster.',
      explanation: 'Third conditional: if + had + PP, would have + PP.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-third-5',
      type: 'fill-in-blank',
      question: 'Complete: "Revenue ___ (double) if we ___ (enter) the US market two years ago."',
      correctAnswer: 'would have doubled / had entered',
      explanation: 'Past counterfactual → would have + PP, if + had + PP.',
      xpBase: 25,
    },
  ],
};

export default topic;
