import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'modals-obligation',
  title: 'Obligation & Advice',
  category: 'Modals',
  color: '#8B5CF6',
  level: 'intermediate',
  theory: {
    formation: 'Subject + must/have to/should/ought to + base verb',
    usage: [
      'Strong obligation (internal): "All employees must complete the training."',
      'External obligation: "We have to file the report by Friday (it\'s the law)."',
      'Recommendation/advice: "You should align with legal before signing."',
      'Negative obligation (prohibition): "You must not share client data externally."',
      'Absence of obligation: "You don\'t have to attend every standup."',
    ],
    examples: [
      { en: 'All contractors must sign an NDA.',                    pt: 'Todos os prestadores devem assinar um NDA.' },
      { en: 'We have to submit the tax return by the 30th.',        pt: 'Temos que enviar a declaração fiscal até o dia 30.' },
      { en: 'You should set clearer project milestones.',           pt: 'Você deveria definir marcos de projeto mais claros.' },
      { en: 'Team leads must not approve their own expenses.',      pt: 'Líderes de equipe não devem aprovar suas próprias despesas.' },
      { en: 'You don\'t have to respond immediately.',              pt: 'Você não precisa responder imediatamente.' },
      { en: 'Ought we not to reconsider this approach?',            pt: 'Não deveríamos reconsiderar essa abordagem?' },
    ],
    commonMistakes: [
      '"Must" vs "have to": both express obligation but "must" = personal/internal, "have to" = external rule',
      '"Don\'t must" ✗ → "must not" ✓ (prohibition) or "don\'t have to" (no obligation)',
      '"Should to go" ✗ → "should go" ✓ (no "to" after modal)',
    ],
    tips: '"Should" = advice (soft). "Must" = strong obligation/necessity. "Don\'t have to" ≠ "must not" — they have very different meanings!',
  },
  exercises: [
    {
      id: 'learn-modals-obligation-1',
      type: 'multiple-choice',
      question: 'All vendors ___ provide proof of insurance. (external legal requirement)',
      options: ['should', 'must', 'have to', 'ought to'],
      correctAnswer: 'have to',
      explanation: 'External obligation (a rule from outside) → have to.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-obligation-2',
      type: 'fill-in-blank',
      question: 'Complete: "You ___ (not/share) confidential data outside the company."',
      correctAnswer: 'must not',
      explanation: 'Prohibition → must not + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-obligation-3',
      type: 'multiple-choice',
      question: 'Your communication style is too casual. You ___ use more formal language.',
      options: ['must not', 'have to', 'should', 'don\'t have to'],
      correctAnswer: 'should',
      explanation: 'Advice/recommendation → should + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-obligation-4',
      type: 'multiple-choice',
      question: 'It\'s optional. You ___ submit a cover letter, but it\'s recommended.',
      options: ['must not', 'must', 'don\'t have to', 'shouldn\'t'],
      correctAnswer: "don't have to",
      explanation: 'No obligation (it\'s optional) → don\'t have to.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-obligation-5',
      type: 'fill-in-blank',
      question: 'Complete: "All managers ___ (must/complete) the leadership workshop by Q4."',
      correctAnswer: 'must complete',
      explanation: 'Strong internal obligation → must + base verb.',
      xpBase: 25,
    },
  ],
};

export default topic;
