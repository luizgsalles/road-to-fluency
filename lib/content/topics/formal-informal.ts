import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'formal-informal',
  title: 'Formal vs Informal',
  category: 'Vocabulary',
  color: '#10B981',
  level: 'beginner',
  theory: {
    formation: 'Register = level of formality. Choose based on: audience, medium, relationship, purpose.',
    usage: [
      'Formal: full forms, Latinate vocabulary, passive voice, complex sentences.',
      'Informal: contractions, phrasal verbs, colloquial words, shorter sentences.',
      'Professional (in between): natural but polished — no slang, no overly archaic words.',
      'Context clues: emails to clients = formal; Slack to teammates = informal.',
    ],
    examples: [
      { en: 'Formal: "I would like to request a meeting."',               pt: 'Formal: "Gostaria de solicitar uma reunião."' },
      { en: 'Informal: "Can we have a quick chat?"',                       pt: 'Informal: "Podemos bater um papo rápido?"' },
      { en: 'Formal: "Please be advised that the deadline has been extended."', pt: 'Formal: "Informamos que o prazo foi prorrogado."' },
      { en: 'Informal: "Just a heads up — deadline\'s been pushed."',       pt: 'Informal: "Só avisando — o prazo foi adiado."' },
      { en: 'Formal: "We regret to inform you that..."',                   pt: 'Formal: "Lamentamos informar que..."' },
      { en: 'Informal: "Unfortunately, we can\'t make it work."',           pt: 'Informal: "Infelizmente, não vai dar certo."' },
    ],
    commonMistakes: [
      'Using "gonna/wanna/gotta" in professional emails — always write full forms: "going to / want to / have to"',
      'Mixing registers: starting formally and ending with "Cheers mate!" — be consistent',
      'Overusing formal language in team chats — sounds cold and creates distance',
    ],
    tips: 'When in doubt, mirror the other person\'s register. If they\'re formal, be formal. If they write casually, you can relax slightly.',
  },
  exercises: [
    {
      id: 'learn-formal-informal-1',
      type: 'multiple-choice',
      question: 'Which is the FORMAL equivalent of "We need to figure out what went wrong"?',
      options: [
        'We gotta find out what happened.',
        'We need to identify the root cause of the issue.',
        'Something went wrong, let\'s check.',
        'We should figure out why this happened.',
      ],
      correctAnswer: 'We need to identify the root cause of the issue.',
      explanation: '"Identify the root cause" = formal/professional language for problem analysis.',
      xpBase: 25,
    },
    {
      id: 'learn-formal-informal-2',
      type: 'fill-in-blank',
      question: 'Make formal: "I wanna talk about the budget." → "I ___ ___ the budget."',
      correctAnswer: 'would like to discuss',
      explanation: '"Would like to discuss" = formal register. Never use contractions like "wanna" in professional writing.',
      xpBase: 25,
    },
    {
      id: 'learn-formal-informal-3',
      type: 'multiple-choice',
      question: 'Which closing is appropriate for a formal business email?',
      options: ['Cheers!', 'Talk soon!', 'Best regards,', 'Bye!'],
      correctAnswer: 'Best regards,',
      explanation: '"Best regards" / "Kind regards" / "Yours sincerely" = formal email closings.',
      xpBase: 25,
    },
    {
      id: 'learn-formal-informal-4',
      type: 'multiple-choice',
      question: '"We\'re gonna look into it." → What is the professional version?',
      options: [
        'We will investigate the matter.',
        'We\'re going to look into it.',
        'We will look into it ASAP.',
        'We will check it out.',
      ],
      correctAnswer: 'We will investigate the matter.',
      explanation: '"Investigate" is more formal than "look into." "The matter" is more formal than "it."',
      xpBase: 25,
    },
    {
      id: 'learn-formal-informal-5',
      type: 'fill-in-blank',
      question: 'Complete the formal version: "Please be ___ that your application has been ___."',
      correctAnswer: 'advised / received',
      explanation: '"Please be advised that..." = formal passive construction used in official communications.',
      xpBase: 25,
    },
  ],
};

export default topic;
