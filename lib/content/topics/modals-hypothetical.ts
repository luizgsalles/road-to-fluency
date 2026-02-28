import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'modals-hypothetical',
  title: 'Hypothetical & Polite',
  category: 'Modals',
  color: '#8B5CF6',
  level: 'intermediate',
  theory: {
    formation: 'Subject + would/could + base verb (for hypothetical / polite requests)',
    usage: [
      'Hypothetical situations: "With more funding, we would double the team."',
      'Polite requests: "Could you send me the file by noon?"',
      'Polite offers: "Would you like to review the draft?"',
      'Suggestions: "We could explore a joint venture instead."',
      'Past possibility not taken: "We could have avoided this if we had planned."',
    ],
    examples: [
      { en: 'Would you be able to present on Monday?',              pt: 'Você conseguiria apresentar na segunda-feira?' },
      { en: 'I would restructure the pricing model.',               pt: 'Eu reestruturaria o modelo de preços.' },
      { en: 'Could we schedule a follow-up call?',                  pt: 'Poderíamos agendar uma chamada de acompanhamento?' },
      { en: 'If I were the CEO, I would focus on retention.',       pt: 'Se eu fosse o CEO, focaria na retenção.' },
      { en: 'You could consider a phased rollout.',                 pt: 'Você poderia considerar uma implementação em fases.' },
      { en: 'That would have been a costly mistake.',               pt: 'Isso teria sido um erro custoso.' },
    ],
    commonMistakes: [
      '"Would you like that I send?" ✗ → "Would you like me to send?" ✓',
      '"I would can do it" ✗ → "I would be able to do it" ✓ (don\'t stack modals)',
      'Confusing "could" (ability/polite) with "might" (possibility)',
    ],
    tips: '"Would you..." and "Could you..." are far more polite than "Can you..." in professional emails and meetings.',
  },
  exercises: [
    {
      id: 'learn-modals-hypothetical-1',
      type: 'multiple-choice',
      question: '___ you mind reviewing the contract before the deadline?',
      options: ['Will', 'Could', 'Would', 'Should'],
      correctAnswer: 'Would',
      explanation: '"Would you mind + -ing" = very polite request.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-hypothetical-2',
      type: 'fill-in-blank',
      question: 'Complete: "If we invested more in R&D, we ___ (launch) better products."',
      correctAnswer: 'would launch',
      explanation: 'Hypothetical (second conditional) → would + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-hypothetical-3',
      type: 'multiple-choice',
      question: 'Instead of cutting the team, we ___ explore remote hiring.',
      options: ['would', 'could', 'should', 'might'],
      correctAnswer: 'could',
      explanation: '"Could" as a suggestion presents a possible alternative.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-hypothetical-4',
      type: 'multiple-choice',
      question: '___ you like to attend the executive briefing? (polite offer)',
      options: ['Do', 'Could', 'Would', 'Can'],
      correctAnswer: 'Would',
      explanation: '"Would you like...?" = polite offer/invitation.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-hypothetical-5',
      type: 'fill-in-blank',
      question: 'Complete: "With a bigger team, we ___ (could/handle) more clients."',
      correctAnswer: 'could handle',
      explanation: 'Hypothetical ability → could + base verb.',
      xpBase: 25,
    },
  ],
};

export default topic;
