import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'conditionals-mixed',
  title: 'Mixed Conditionals',
  category: 'Conditionals',
  color: '#EC4899',
  level: 'advanced',
  theory: {
    formation: 'Type A: If + past perfect, would + base verb (past condition → present result)\nType B: If + past simple, would have + past participle (present condition → past result)',
    usage: [
      'Past condition with present result (Type A): "If we had diversified earlier, we would be profitable now."',
      'Present condition with past result (Type B): "If she were more experienced, she would have handled it better."',
      'Connecting different timeframes in cause-effect reasoning.',
    ],
    examples: [
      { en: 'If we had pivoted in 2022, we would be leading the market now.',       pt: 'Se tivéssemos pivotado em 2022, lideraríamos o mercado agora.' },
      { en: 'If she were a better negotiator, she would have closed the deal.',     pt: 'Se ela fosse uma negociadora melhor, teria fechado o acordo.' },
      { en: 'If I had taken the job offer, I would be living in New York now.',     pt: 'Se eu tivesse aceitado a oferta de emprego, estaria em Nova York agora.' },
      { en: 'If the CEO were visionary, he would have expanded internationally.',   pt: 'Se o CEO fosse visionário, teria expandido internacionalmente.' },
      { en: 'We would be more competitive if we had invested in R&D years ago.',   pt: 'Seríamos mais competitivos se tivéssemos investido em P&D anos atrás.' },
      { en: 'If I spoke better English, I would have got the promotion.',           pt: 'Se eu falasse inglês melhor, teria conseguido a promoção.' },
    ],
    commonMistakes: [
      'Using the wrong tense combination — identify which timeframe each clause refers to',
      '"If we would have done" ✗ → "If we had done" ✓ (no "would" in if-clause)',
      'Confusing type A and B — ask: is the condition in the past or present?',
    ],
    tips: 'Identify the timeframe of each clause separately: if-clause (past/present) + main clause (present/past). Then choose the right tense for each.',
  },
  exercises: [
    {
      id: 'learn-conditionals-mixed-1',
      type: 'multiple-choice',
      question: 'If we ___ the acquisition, we ___ market leaders today.',
      options: ['had completed / would be', 'completed / would be', 'had completed / would have been', 'completed / are'],
      correctAnswer: 'had completed / would be',
      explanation: 'Past condition (had + PP) → present result (would be): Mixed Type A.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-mixed-2',
      type: 'fill-in-blank',
      question: 'Complete: "If she ___ (be) more detail-oriented, she ___ (catch) the error in the report."',
      correctAnswer: 'were / would have caught',
      explanation: 'Present condition (were) → past result (would have + PP): Mixed Type B.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-mixed-3',
      type: 'multiple-choice',
      question: 'Which is a Type A mixed conditional (past condition → present result)?',
      options: [
        'If she were organised, she would have met the deadline.',
        'If we had started sooner, we would be finished now.',
        'If demand rises, prices increase.',
        'If we expand, we will hire.',
      ],
      correctAnswer: 'If we had started sooner, we would be finished now.',
      explanation: 'Past condition (had started) + present result (would be) = Type A mixed.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-mixed-4',
      type: 'multiple-choice',
      question: 'If I ___ a native English speaker, I ___ that negotiation differently.',
      options: ['am / handled', 'were / would have handled', 'had been / would handle', 'was / will handle'],
      correctAnswer: 'were / would have handled',
      explanation: 'Present condition (were) → past result (would have handled): Mixed Type B.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-mixed-5',
      type: 'fill-in-blank',
      question: 'Complete: "If we ___ (invest) in cloud infrastructure early, our systems ___ (be) much faster now."',
      correctAnswer: 'had invested / would be',
      explanation: 'Past action → present situation: if + had + PP, would + base verb.',
      xpBase: 25,
    },
  ],
};

export default topic;
