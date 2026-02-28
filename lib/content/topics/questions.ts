import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'questions',
  title: 'Questions (Direct & Indirect)',
  category: 'Structure',
  color: '#F59E0B',
  level: 'beginner',
  theory: {
    formation: 'Direct: Aux + subject + verb? | Indirect: Do you know + when/if + subject + verb',
    usage: [
      'Direct questions (open): "What are the project deliverables?"',
      'Direct questions (yes/no): "Have you reviewed the contract?"',
      'Indirect questions (polite): "Could you tell me what the budget is?"',
      'Embedded questions in formal contexts: "I was wondering if you could elaborate."',
    ],
    examples: [
      { en: 'What time does the board meeting start?',                     pt: 'A que horas começa a reunião do conselho?' },
      { en: 'How many clients have you onboarded this quarter?',           pt: 'Quantos clientes você integrou este trimestre?' },
      { en: 'Could you tell me when the report will be ready?',            pt: 'Você poderia me dizer quando o relatório estará pronto?' },
      { en: 'Do you know if the contract has been signed?',                pt: 'Você sabe se o contrato foi assinado?' },
      { en: 'I was wondering whether you\'d be available tomorrow.',        pt: 'Eu queria saber se você estaria disponível amanhã.' },
      { en: 'Can you explain why the figures don\'t match?',               pt: 'Você pode explicar por que os números não batem?' },
    ],
    commonMistakes: [
      'Direct word order in indirect questions: "Could you tell me where IS the file?" ✗ → "where the file is" ✓',
      '"Do you know what does it mean?" ✗ → "Do you know what it means?" ✓',
      'Using question mark with indirect questions: "Can you tell me what the budget is?" (no need for ?) … actually yes, the whole sentence is a question.',
    ],
    tips: 'In professional settings, indirect questions are more polite: "Could you clarify..." / "I was wondering if you could..."',
  },
  exercises: [
    {
      id: 'learn-questions-1',
      type: 'multiple-choice',
      question: 'Which is the correct indirect question form?',
      options: [
        'Do you know where is the HR department?',
        'Do you know where the HR department is?',
        'Do you know where the HR department are?',
        'You know where is HR?',
      ],
      correctAnswer: 'Do you know where the HR department is?',
      explanation: 'Indirect questions use statement word order: where + subject + verb.',
      xpBase: 25,
    },
    {
      id: 'learn-questions-2',
      type: 'fill-in-blank',
      question: 'Complete: "Could you tell me ___ the budget has been approved?"',
      correctAnswer: 'whether / if',
      explanation: 'Indirect yes/no question: use whether or if.',
      xpBase: 25,
    },
    {
      id: 'learn-questions-3',
      type: 'multiple-choice',
      question: '___ many units ___ we sell last quarter?',
      options: ['How / do', 'How / did', 'How much / did', 'How / was'],
      correctAnswer: 'How / did',
      explanation: 'Direct past question: How many + did + subject + base verb?',
      xpBase: 25,
    },
    {
      id: 'learn-questions-4',
      type: 'multiple-choice',
      question: 'I\'d like to know ___ the CEO plans to address the concerns.',
      options: ['that', 'what', 'how', 'if'],
      correctAnswer: 'how',
      explanation: '"How" = in what way. Indirect question: I\'d like to know + how + subject + verb.',
      xpBase: 25,
    },
    {
      id: 'learn-questions-5',
      type: 'fill-in-blank',
      question: 'Make indirect: "Why was the meeting cancelled?" → "Could you explain ___ the meeting ___?"',
      correctAnswer: 'why / was cancelled',
      explanation: 'Indirect question: could you explain + why + subject + verb (statement order).',
      xpBase: 25,
    },
  ],
};

export default topic;
