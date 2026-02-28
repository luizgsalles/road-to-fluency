import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'conditionals-zero',
  title: 'Zero Conditional',
  category: 'Conditionals',
  color: '#EC4899',
  level: 'beginner',
  theory: {
    formation: 'If + present simple, present simple',
    usage: [
      'General truths and scientific facts: "If you heat water to 100°C, it boils."',
      'Rules and procedures: "If a payment is late, a penalty applies."',
      'Cause and effect (always true): "If costs exceed budget, the project pauses."',
    ],
    examples: [
      { en: 'If cash flow drops below zero, the system sends an alert.',    pt: 'Se o fluxo de caixa cair abaixo de zero, o sistema envia um alerta.' },
      { en: 'Employees get a bonus if they exceed targets.',                 pt: 'Funcionários recebem bônus se superarem as metas.' },
      { en: 'If a client requests a refund, we process it within 5 days.',  pt: 'Se um cliente solicitar reembolso, processamos em 5 dias.' },
      { en: 'If the server overloads, it restarts automatically.',           pt: 'Se o servidor sobrecarregar, ele reinicia automaticamente.' },
      { en: 'When prices rise, demand falls.',                               pt: 'Quando os preços sobem, a demanda cai.' },
      { en: 'If you press this button, the report exports as PDF.',          pt: 'Se você pressionar este botão, o relatório é exportado como PDF.' },
    ],
    commonMistakes: [
      'Using "will" in zero conditional: "If you heat it, it will boil" (use present simple for zero conditional)',
      'Confusing with first conditional: zero = always true; first = likely future possibility',
    ],
    tips: 'You can often replace "if" with "when" in zero conditional — if the meaning stays the same, it\'s zero conditional.',
  },
  exercises: [
    {
      id: 'learn-conditionals-zero-1',
      type: 'multiple-choice',
      question: 'If the system ___ an error, it ___ the admin automatically.',
      options: ['detects / will notify', 'detects / notifies', 'detected / notifies', 'will detect / notifies'],
      correctAnswer: 'detects / notifies',
      explanation: 'Zero conditional: if + present simple, present simple.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-zero-2',
      type: 'fill-in-blank',
      question: 'Complete: "If employees ___ (miss) a deadline, they ___ (submit) an explanation."',
      correctAnswer: 'miss / submit',
      explanation: 'Company policy (always true) → zero conditional: present + present.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-zero-3',
      type: 'multiple-choice',
      question: 'Which is a zero conditional sentence?',
      options: [
        'If we win the contract, we will expand the team.',
        'If demand increases, prices rise.',
        'If I were the manager, I would change the policy.',
        'If we had invested, we would have profited.',
      ],
      correctAnswer: 'If demand increases, prices rise.',
      explanation: 'Zero conditional = general/always true fact: if + present, present.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-zero-4',
      type: 'multiple-choice',
      question: 'If a transaction ___ flagged, the compliance team ___ it.',
      options: ['is / review', 'is / reviews', 'will be / reviews', 'was / reviewed'],
      correctAnswer: 'is / reviews',
      explanation: 'Standing procedure → zero conditional.',
      xpBase: 25,
    },
    {
      id: 'learn-conditionals-zero-5',
      type: 'fill-in-blank',
      question: 'Complete: "When market conditions ___ (change), strategies ___ (need) adjusting."',
      correctAnswer: 'change / need',
      explanation: 'General truth using "when" → same structure as zero conditional.',
      xpBase: 25,
    },
  ],
};

export default topic;
