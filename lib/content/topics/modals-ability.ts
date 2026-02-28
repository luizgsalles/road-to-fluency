import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'modals-ability',
  title: 'Ability & Possibility',
  category: 'Modals',
  color: '#8B5CF6',
  level: 'beginner',
  theory: {
    formation: 'Subject + modal (can/could/may/might) + base verb',
    usage: [
      'Present ability: "She can speak four languages."',
      'Past ability: "He could code in Python before joining."',
      'Present possibility: "This strategy may work in our market."',
      'Uncertain possibility: "They might delay the launch."',
      'Formal permission request: "May I share this data externally?"',
    ],
    examples: [
      { en: 'Can you present the Q3 results?',                pt: 'Você pode apresentar os resultados do 3T?' },
      { en: 'She could negotiate better terms.',              pt: 'Ela conseguia negociar melhores condições.' },
      { en: 'The new hire might start on Monday.',            pt: 'O novo funcionário pode começar na segunda.' },
      { en: 'May I suggest an alternative approach?',         pt: 'Posso sugerir uma abordagem alternativa?' },
      { en: 'This solution may not be scalable.',             pt: 'Esta solução pode não ser escalável.' },
      { en: 'We can\'t proceed without board approval.',      pt: 'Não podemos prosseguir sem aprovação do conselho.' },
    ],
    commonMistakes: [
      '"She can to speak" ✗ → "She can speak" ✓ (no "to" after modals)',
      '"He could speaks" ✗ → "He could speak" ✓ (base verb, no -s)',
      'Confusing "may" (possibility ~50%) with "might" (lower possibility ~30%)',
    ],
    tips: '"Can" = ability/permission (informal). "May" = permission (formal) / possibility. "Might" = lower probability than may.',
  },
  exercises: [
    {
      id: 'learn-modals-ability-1',
      type: 'multiple-choice',
      question: 'She ___ fluently present data in three languages — it\'s impressive.',
      options: ['can', 'could', 'might', 'may'],
      correctAnswer: 'can',
      explanation: 'Current ability → can + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-ability-2',
      type: 'fill-in-blank',
      question: 'Complete: "The merger ___ (might) not go ahead if regulators object."',
      correctAnswer: 'might',
      explanation: '"Might not" expresses uncertain possibility.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-ability-3',
      type: 'multiple-choice',
      question: '___ I reschedule tomorrow\'s meeting to Thursday? (formal)',
      options: ['Can', 'May', 'Might', 'Could'],
      correctAnswer: 'May',
      explanation: '"May" is the formal way to ask permission.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-ability-4',
      type: 'multiple-choice',
      question: 'Before the reorg, the team ___ handle 50 clients per week.',
      options: ['can', 'could', 'may', 'might'],
      correctAnswer: 'could',
      explanation: 'Past ability → could + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-modals-ability-5',
      type: 'fill-in-blank',
      question: 'Complete: "This approach ___ (may) reduce operational costs significantly."',
      correctAnswer: 'may',
      explanation: 'Present possibility → may + base verb.',
      xpBase: 25,
    },
  ],
};

export default topic;
