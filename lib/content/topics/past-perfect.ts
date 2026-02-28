import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'past-perfect',
  title: 'Past Perfect',
  category: 'Verb Tenses',
  color: '#3B82F6',
  level: 'intermediate',
  theory: {
    formation: 'Subject + had + past participle (PP)',
    usage: [
      'Action completed BEFORE another past action: "By the time the CEO arrived, the team had already presented."',
      'Reported speech backshift: "She said she had sent the report."',
      'Third conditional: "If we had planned better, we would have succeeded."',
      'Explaining a past situation: "The project failed because nobody had tested it."',
    ],
    examples: [
      { en: 'Before joining this firm, I had worked in consulting.',   pt: 'Antes de entrar nesta empresa, eu trabalhara em consultoria.' },
      { en: 'The deal had been signed before the news leaked.',        pt: 'O acordo tinha sido assinado antes de a notícia vazar.' },
      { en: 'Had you ever managed a remote team before?',              pt: 'Você já tinha gerenciado uma equipe remota antes?' },
      { en: 'We hadn\'t received payment when the project ended.',     pt: 'Não tínhamos recebido o pagamento quando o projeto terminou.' },
      { en: 'She had already left when I called.',                     pt: 'Ela já tinha saído quando liguei.' },
      { en: 'By 2020, the company had expanded to 10 countries.',      pt: 'Até 2020, a empresa havia se expandido para 10 países.' },
    ],
    commonMistakes: [
      'Using past simple when past perfect is needed: "When he arrived, we started" (ambiguous) vs "When he arrived, we had already started" (clear sequence)',
      '"Had went" ✗ → "had gone" ✓ (use past participle)',
      'Overusing past perfect — only use it when the sequence of events matters.',
    ],
    tips: 'Think of past perfect as the "past of the past." Use it to make a time sequence crystal clear.',
  },
  exercises: [
    {
      id: 'learn-past-perfect-1',
      type: 'multiple-choice',
      question: 'By the time the auditors arrived, the company ___ all financial records.',
      options: ['destroyed', 'had destroyed', 'has destroyed', 'was destroying'],
      correctAnswer: 'had destroyed',
      explanation: 'Action completed before another past event → past perfect.',
      xpBase: 25,
    },
    {
      id: 'learn-past-perfect-2',
      type: 'fill-in-blank',
      question: 'Complete: "She said she ___ (already/submit) the report."',
      correctAnswer: 'had already submitted',
      explanation: 'Reported speech backshift: present perfect → past perfect.',
      xpBase: 25,
    },
    {
      id: 'learn-past-perfect-3',
      type: 'multiple-choice',
      question: 'The client rejected the proposal because we ___ the requirements properly.',
      options: ['didn\'t understand', 'hadn\'t understood', 'don\'t understand', 'haven\'t understood'],
      correctAnswer: "hadn't understood",
      explanation: 'Explaining a past result with a prior cause → past perfect.',
      xpBase: 25,
    },
    {
      id: 'learn-past-perfect-4',
      type: 'multiple-choice',
      question: '___ you ever ___ an IPO process before you joined this company?',
      options: ['Did / managed', 'Had / managed', 'Have / managed', 'Were / managing'],
      correctAnswer: 'Had / managed',
      explanation: 'Past experience before another past event → had + past participle.',
      xpBase: 25,
    },
    {
      id: 'learn-past-perfect-5',
      type: 'fill-in-blank',
      question: 'Complete: "By 2023, the startup ___ (raise) $10 million in funding."',
      correctAnswer: 'had raised',
      explanation: '"By [past year]" → past perfect: had + past participle.',
      xpBase: 25,
    },
  ],
};

export default topic;
