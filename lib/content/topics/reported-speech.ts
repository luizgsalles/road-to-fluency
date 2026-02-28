import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'reported-speech',
  title: 'Reported Speech',
  category: 'Structure',
  color: '#F59E0B',
  level: 'intermediate',
  theory: {
    formation: 'Tense backshift: present → past, past → past perfect, will → would',
    usage: [
      'Reporting what someone said: "She said that the merger had been approved."',
      'Indirect questions: "He asked whether we could extend the deadline."',
      'Reporting commands: "The manager told us to submit by Friday."',
      'Reporting requests: "She asked me to review the contract."',
    ],
    examples: [
      { en: '"We will close the deal." → He said they would close the deal.',       pt: '"Fecharemos o acordo." → Ele disse que fechariam o acordo.' },
      { en: '"I have submitted the report." → She said she had submitted it.',       pt: '"Eu enviei o relatório." → Ela disse que tinha enviado.' },
      { en: '"Are you interested?" → He asked if I was interested.',                pt: '"Você está interessado?" → Ele perguntou se eu estava interessado.' },
      { en: '"Please send the file." → She asked me to send the file.',             pt: '"Por favor, envie o arquivo." → Ela me pediu para enviar o arquivo.' },
      { en: '"Don\'t miss the deadline." → He told us not to miss the deadline.',   pt: '"Não perca o prazo." → Ele nos disse para não perder o prazo.' },
      { en: '"We can reschedule." → She said they could reschedule.',               pt: '"Podemos remarcar." → Ela disse que eles poderiam remarcar.' },
    ],
    commonMistakes: [
      '"She said me" ✗ → "She told me" ✓ (tell + person; say + that)',
      'Forgetting to backshift: "He said he works here" ✗ → "He said he worked here" ✓',
      '"She asked me that" ✗ → "She asked me if/whether" ✓ (for yes/no questions)',
    ],
    tips: 'If reporting something still true or very recent, backshift is optional: "Einstein said that energy IS mass × speed²."',
  },
  exercises: [
    {
      id: 'learn-reported-speech-1',
      type: 'multiple-choice',
      question: '"We will launch next month." → She said they ___ launch next month.',
      options: ['will', 'would', 'should', 'might'],
      correctAnswer: 'would',
      explanation: 'Will → would in reported speech.',
      xpBase: 25,
    },
    {
      id: 'learn-reported-speech-2',
      type: 'fill-in-blank',
      question: '"Please review the proposal." → He asked me ___ the proposal.',
      correctAnswer: 'to review',
      explanation: 'Reported request/command: asked + person + to + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-reported-speech-3',
      type: 'multiple-choice',
      question: '"Are you available on Friday?" → She asked ___ I was available on Friday.',
      options: ['that', 'if', 'what', 'which'],
      correctAnswer: 'if',
      explanation: 'Reported yes/no question: asked if/whether + subject + verb.',
      xpBase: 25,
    },
    {
      id: 'learn-reported-speech-4',
      type: 'multiple-choice',
      question: '"The CEO has resigned." → The press reported that the CEO ___ resigned.',
      options: ['has', 'had', 'have', 'was'],
      correctAnswer: 'had',
      explanation: 'Present perfect → past perfect in reported speech.',
      xpBase: 25,
    },
    {
      id: 'learn-reported-speech-5',
      type: 'fill-in-blank',
      question: '"Don\'t share this externally." → The director told us ___ share it externally.',
      correctAnswer: 'not to',
      explanation: 'Negative reported command: told + person + not to + base verb.',
      xpBase: 25,
    },
  ],
};

export default topic;
