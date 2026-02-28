import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'meetings',
  title: 'Meetings & Discussions',
  category: 'Vocabulary',
  color: '#10B981',
  level: 'intermediate',
  theory: {
    formation: 'Opening → Agenda → Contributing → Disagreeing politely → Concluding',
    usage: [
      'Starting: "Let\'s get started. The purpose of today\'s meeting is to..."',
      'Contributing: "I\'d like to add..." / "Building on that point..."',
      'Interrupting politely: "Sorry to interrupt, but..." / "If I could just jump in..."',
      'Disagreeing diplomatically: "I see your point, however..." / "I\'m not sure I agree because..."',
      'Summarising: "So, to recap what we\'ve agreed..." / "The action items are..."',
    ],
    examples: [
      { en: 'Let\'s kick things off. Could someone take notes?',            pt: 'Vamos começar. Alguém poderia fazer anotações?' },
      { en: 'I\'d like to propose that we table this for next week.',        pt: 'Gostaria de propor que deixemos isso para a próxima semana.' },
      { en: 'If I could just follow up on that point...',                    pt: 'Se eu puder apenas continuar nesse ponto...' },
      { en: 'I\'m afraid I\'d have to disagree on the timeline.',            pt: 'Temo ter que discordar quanto ao cronograma.' },
      { en: 'To summarise, we\'ve agreed on three action items.',            pt: 'Para resumir, concordamos com três ações.' },
      { en: 'Can we circle back to the budget discussion?',                  pt: 'Podemos retomar a discussão sobre o orçamento?' },
    ],
    commonMistakes: [
      '"Table" in American English = postpone. In British English = put on the agenda. Context matters!',
      '"I disagree." (too direct) → "I see your point, but I\'d argue that..." (diplomatic)',
      'Dominating discussion — use "What does everyone think?" to include quieter participants',
    ],
    tips: 'Always summarise action items with owners and deadlines: "John will send the contract by Thursday." This prevents misunderstandings.',
  },
  exercises: [
    {
      id: 'learn-meetings-1',
      type: 'multiple-choice',
      question: 'To politely disagree in a meeting, you say:',
      options: [
        'That\'s wrong.',
        'I totally disagree.',
        'I take your point, but I\'m not sure that approach would work because...',
        'No, that\'s not right.',
      ],
      correctAnswer: "I take your point, but I'm not sure that approach would work because...",
      explanation: 'Acknowledge the other view first, then politely counter. This is collaborative disagreement.',
      xpBase: 25,
    },
    {
      id: 'learn-meetings-2',
      type: 'fill-in-blank',
      question: 'Complete: "___ we table the budget discussion and revisit it at the end?"',
      correctAnswer: 'Can / Could / Shall',
      explanation: '"Can/Could/Shall we..." = polite suggestion to adjust the meeting agenda.',
      xpBase: 25,
    },
    {
      id: 'learn-meetings-3',
      type: 'multiple-choice',
      question: 'To add to what a colleague just said:',
      options: [
        'Also, I want to say...',
        'Building on what Sarah said, I\'d add that...',
        'I also have a point.',
        'Yes, and another thing is...',
      ],
      correctAnswer: "Building on what Sarah said, I'd add that...",
      explanation: '"Building on..." = professional way to extend a colleague\'s contribution.',
      xpBase: 25,
    },
    {
      id: 'learn-meetings-4',
      type: 'multiple-choice',
      question: 'To close the meeting professionally, you say:',
      options: [
        'OK we\'re done. Bye.',
        'That\'s time. Let\'s go.',
        'To wrap up: the action items are X, Y, Z. Thanks, everyone.',
        'Meeting over!',
      ],
      correctAnswer: 'To wrap up: the action items are X, Y, Z. Thanks, everyone.',
      explanation: '"To wrap up" + summarising action items = professional meeting close.',
      xpBase: 25,
    },
    {
      id: 'learn-meetings-5',
      type: 'fill-in-blank',
      question: 'Complete: "Sorry to interrupt, ___ I could add a data point to support that."',
      correctAnswer: 'but',
      explanation: '"Sorry to interrupt, but..." = polite way to interject with relevant input.',
      xpBase: 25,
    },
  ],
};

export default topic;
