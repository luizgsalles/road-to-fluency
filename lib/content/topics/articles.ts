import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'articles',
  title: 'Articles (a / an / the)',
  category: 'Structure',
  color: '#F59E0B',
  level: 'beginner',
  theory: {
    formation: 'a / an (indefinite) | the (definite) | Ø (zero article)',
    usage: [
      '"a/an" for singular countable nouns mentioned for the first time: "We need a strategy."',
      '"the" for specific/known nouns: "The strategy we discussed is solid."',
      '"the" for unique things: "the CEO, the board, the market."',
      'Zero article for general statements: "Business requires trust." / plural generics: "Clients expect results."',
      '"an" before vowel sounds: "an agenda, an hour, an MBA."',
    ],
    examples: [
      { en: 'We need a proposal for the client.',               pt: 'Precisamos de uma proposta para o cliente.' },
      { en: 'The report you sent contains an error.',           pt: 'O relatório que você enviou contém um erro.' },
      { en: 'She has an MBA from Stanford.',                    pt: 'Ela tem um MBA em Stanford.' },
      { en: 'Communication is key in business.',                pt: 'A comunicação é essencial nos negócios.' },
      { en: 'The CEO announced a new initiative.',              pt: 'O CEO anunciou uma nova iniciativa.' },
      { en: 'We operate in the European market.',               pt: 'Operamos no mercado europeu.' },
    ],
    commonMistakes: [
      '"a MBA" ✗ → "an MBA" ✓ (sound starts with /em/, a vowel sound)',
      '"The business is important" (general) ✗ → "Business is important" ✓ (zero article for general concepts)',
      '"I need an information" ✗ → "I need information" ✓ ("information" is uncountable)',
    ],
    tips: 'Uncountable nouns (advice, information, research, feedback, staff) never take "a/an." Use "a piece of advice," "some information."',
  },
  exercises: [
    {
      id: 'learn-articles-1',
      type: 'multiple-choice',
      question: 'She has ___ MBA from Wharton and works as ___ consultant.',
      options: ['a / a', 'an / a', 'an / an', 'a / an'],
      correctAnswer: 'an / a',
      explanation: '"MBA" starts with vowel sound /em/ → an. "Consultant" starts with consonant → a.',
      xpBase: 25,
    },
    {
      id: 'learn-articles-2',
      type: 'fill-in-blank',
      question: 'Complete: "We need ___ clear strategy. ___ strategy should focus on retention."',
      correctAnswer: 'a / The',
      explanation: 'First mention → a (indefinite). Second mention of same noun → the (definite).',
      xpBase: 25,
    },
    {
      id: 'learn-articles-3',
      type: 'multiple-choice',
      question: '___  business success depends on ___ trust of your clients.',
      options: ['The / a', '— / the', 'A / the', 'The / the'],
      correctAnswer: '— / the',
      explanation: '"Business success" (general concept) = zero article. "the trust of your clients" = specific trust.',
      xpBase: 25,
    },
    {
      id: 'learn-articles-4',
      type: 'multiple-choice',
      question: 'Which sentence is correct?',
      options: [
        'Can you give me an advice?',
        'Can you give me a advice?',
        'Can you give me some advice?',
        'Can you give me the advice?',
      ],
      correctAnswer: 'Can you give me some advice?',
      explanation: '"Advice" is uncountable — cannot use a/an. Use "some advice" or "a piece of advice."',
      xpBase: 25,
    },
    {
      id: 'learn-articles-5',
      type: 'fill-in-blank',
      question: 'Complete: "___ company was founded in 1998. It is now ___ global leader."',
      correctAnswer: 'The / a',
      explanation: 'Specific company (already known) → the. First mention of "global leader" → a.',
      xpBase: 25,
    },
  ],
};

export default topic;
