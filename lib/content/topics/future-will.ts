import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'future-will',
  title: 'Future (will)',
  category: 'Verb Tenses',
  color: '#3B82F6',
  level: 'beginner',
  theory: {
    formation: 'Subject + will + base verb (won\'t = will not)',
    usage: [
      'Spontaneous decisions made at the moment of speaking: "I\'ll handle that for you."',
      'Predictions based on opinion/belief: "I think the market will recover soon."',
      'Promises and offers: "We will deliver by the deadline."',
      'Threats and warnings: "If costs rise, we will cut headcount."',
      'Facts about the future: "The conference will take place in Dubai."',
    ],
    examples: [
      { en: 'I\'ll send you the report by end of day.',           pt: 'Vou enviar o relatório até o final do dia.' },
      { en: 'The new branch will open next month.',               pt: 'A nova filial será aberta no próximo mês.' },
      { en: 'Will you be able to join the call tomorrow?',        pt: 'Você conseguirá participar da chamada amanhã?' },
      { en: 'We won\'t accept late submissions.',                  pt: 'Não aceitaremos entregas com atraso.' },
      { en: 'I think sales will increase in H2.',                 pt: 'Acho que as vendas vão aumentar no 2º semestre.' },
      { en: 'She will present the results to stakeholders.',       pt: 'Ela vai apresentar os resultados aos stakeholders.' },
    ],
    commonMistakes: [
      '"I will to go" ✗ → "I will go" ✓ (no "to" after will)',
      '"He wills work" ✗ → "He will work" ✓ (no -s on will)',
      'Using "will" for plans decided in advance: "I will go to Paris next week" (if planned, use going to)',
    ],
    tips: 'Use "will" for decisions made NOW. Use "going to" for plans decided BEFORE speaking.',
  },
  exercises: [
    {
      id: 'learn-future-will-1',
      type: 'multiple-choice',
      question: 'The phone is ringing. "Don\'t worry, I ___ answer it."',
      options: ['am going to', 'will', 'am answering', 'answer'],
      correctAnswer: 'will',
      explanation: 'Spontaneous decision made at the moment of speaking → will.',
      xpBase: 25,
    },
    {
      id: 'learn-future-will-2',
      type: 'fill-in-blank',
      question: 'Complete: "I promise we ___ (deliver) the project on time."',
      correctAnswer: 'will deliver',
      explanation: 'Promise about the future → subject + will + base verb.',
      xpBase: 25,
    },
    {
      id: 'learn-future-will-3',
      type: 'multiple-choice',
      question: 'Which sentence expresses a PREDICTION?',
      options: [
        'I\'m meeting a client at 3 p.m.',
        'I think AI will transform every industry.',
        'We are launching next quarter.',
        'She is going to the conference.',
      ],
      correctAnswer: 'I think AI will transform every industry.',
      explanation: '"I think + will" expresses a personal prediction/belief about the future.',
      xpBase: 25,
    },
    {
      id: 'learn-future-will-4',
      type: 'multiple-choice',
      question: '___ the board approve the budget increase?',
      options: ['Will', 'Is', 'Does', 'Shall'],
      correctAnswer: 'Will',
      explanation: 'Future question: Will + subject + base verb?',
      xpBase: 25,
    },
    {
      id: 'learn-future-will-5',
      type: 'fill-in-blank',
      question: 'Complete: "If costs continue to rise, we ___ (have to) raise prices."',
      correctAnswer: 'will have to',
      explanation: 'Prediction/consequence using will: will + base verb.',
      xpBase: 25,
    },
  ],
};

export default topic;
