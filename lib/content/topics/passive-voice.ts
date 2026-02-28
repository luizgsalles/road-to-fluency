import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'passive-voice',
  title: 'Passive Voice',
  category: 'Structure',
  color: '#F59E0B',
  level: 'intermediate',
  theory: {
    formation: 'Subject + to be (conjugated) + past participle (+ by + agent)',
    usage: [
      'When the action is more important than who does it: "The report was submitted on time."',
      'When the agent is unknown/irrelevant: "The system was hacked."',
      'Formal and academic writing: "Results were analysed using regression analysis."',
      'Describing processes and procedures: "The invoice is processed within 3 days."',
    ],
    examples: [
      { en: 'The contract was signed by both parties.',                 pt: 'O contrato foi assinado por ambas as partes.' },
      { en: 'All applications are reviewed by the HR team.',            pt: 'Todas as candidaturas são analisadas pela equipe de RH.' },
      { en: 'The meeting has been rescheduled.',                        pt: 'A reunião foi remarcada.' },
      { en: 'A new CEO will be appointed next quarter.',                pt: 'Um novo CEO será nomeado no próximo trimestre.' },
      { en: 'The budget must be approved by the board.',                pt: 'O orçamento deve ser aprovado pelo conselho.' },
      { en: 'Targets were exceeded by 20% last year.',                  pt: 'As metas foram superadas em 20% no ano passado.' },
    ],
    commonMistakes: [
      '"The report was wrote" ✗ → "The report was written" ✓ (past participle)',
      '"It was approved by they" ✗ → "It was approved by them" ✓ (object pronoun)',
      'Overusing passive — active voice is clearer: "The team submitted the report" vs "The report was submitted by the team"',
    ],
    tips: 'In business writing, passive often sounds more formal and objective. Use it to describe processes, results, and policies.',
  },
  exercises: [
    {
      id: 'learn-passive-voice-1',
      type: 'multiple-choice',
      question: 'The quarterly results ___ to all shareholders last Friday.',
      options: ['presented', 'were presented', 'are presenting', 'have presented'],
      correctAnswer: 'were presented',
      explanation: 'Past passive: to be (were) + past participle.',
      xpBase: 25,
    },
    {
      id: 'learn-passive-voice-2',
      type: 'fill-in-blank',
      question: 'Change to passive: "The CEO approved the budget." → "The budget ___ by the CEO."',
      correctAnswer: 'was approved',
      explanation: 'Active → passive: object becomes subject + was/were + past participle.',
      xpBase: 25,
    },
    {
      id: 'learn-passive-voice-3',
      type: 'multiple-choice',
      question: 'All expenses ___ before reimbursement.',
      options: ['must submit', 'must be submitted', 'are must submitted', 'have been submitting'],
      correctAnswer: 'must be submitted',
      explanation: 'Modal passive: must + be + past participle.',
      xpBase: 25,
    },
    {
      id: 'learn-passive-voice-4',
      type: 'multiple-choice',
      question: 'Which is the correct passive form of: "We will announce the decision tomorrow"?',
      options: [
        'The decision will announce tomorrow.',
        'The decision will be announced tomorrow.',
        'The decision was announced tomorrow.',
        'The decision is announced tomorrow.',
      ],
      correctAnswer: 'The decision will be announced tomorrow.',
      explanation: 'Future passive: will + be + past participle.',
      xpBase: 25,
    },
    {
      id: 'learn-passive-voice-5',
      type: 'fill-in-blank',
      question: 'Complete: "A new policy ___ (introduce) to address the compliance gaps."',
      correctAnswer: 'has been introduced',
      explanation: 'Present perfect passive: has/have + been + past participle.',
      xpBase: 25,
    },
  ],
};

export default topic;
