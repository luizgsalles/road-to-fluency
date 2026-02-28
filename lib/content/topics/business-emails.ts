import type { TopicContent } from '../grammar-topics';

const topic: TopicContent = {
  slug: 'business-emails',
  title: 'Business Emails',
  category: 'Vocabulary',
  color: '#10B981',
  level: 'intermediate',
  theory: {
    formation: 'Structure: Opening → Purpose → Body → CTA → Closing',
    usage: [
      'Opening: "I hope this email finds you well." / "I am writing to..."',
      'Referring to previous contact: "Further to our conversation..." / "As per your last email..."',
      'Making requests (polite): "Could you please..." / "I would be grateful if..."',
      'Attaching documents: "Please find attached..." / "I have attached the..."',
      'Closing: "Please do not hesitate to contact me." / "I look forward to hearing from you."',
    ],
    examples: [
      { en: 'I hope this email finds you well.',                         pt: 'Espero que este e-mail o encontre bem.' },
      { en: 'I am writing to follow up on our previous conversation.',   pt: 'Escrevo para dar seguimento à nossa conversa anterior.' },
      { en: 'Please find the report attached for your review.',          pt: 'Por favor, encontre o relatório em anexo para sua análise.' },
      { en: 'Could you please confirm receipt of this email?',           pt: 'Você poderia confirmar o recebimento deste e-mail?' },
      { en: 'I look forward to your prompt response.',                   pt: 'Aguardo sua resposta breve.' },
      { en: 'Should you have any questions, please feel free to reach out.', pt: 'Caso tenha alguma dúvida, não hesite em entrar em contato.' },
    ],
    commonMistakes: [
      '"Please revert back" ✗ (redundant) → "Please respond" / "Please revert" ✓',
      '"I am doing the needful" ✗ (outdated) → "I will take care of it" ✓',
      '"As per my last email" (passive-aggressive tone) — prefer "As mentioned previously"',
    ],
    tips: 'Match formality to relationship. External clients = formal. Internal teams = semi-formal or informal. Always proofread before sending.',
  },
  exercises: [
    {
      id: 'learn-business-emails-1',
      type: 'multiple-choice',
      question: 'Which is the most professional email opening?',
      options: [
        'Hey! Hope all good.',
        'I hope this email finds you well.',
        'What\'s up? Writing to ask...',
        'Good day. I am emailing you because...',
      ],
      correctAnswer: 'I hope this email finds you well.',
      explanation: '"I hope this email finds you well" is the standard professional opener for external emails.',
      xpBase: 25,
    },
    {
      id: 'learn-business-emails-2',
      type: 'fill-in-blank',
      question: 'Complete: "Please ___ the budget proposal attached for your consideration."',
      correctAnswer: 'find',
      explanation: '"Please find [document] attached" is the standard phrase for sending attachments.',
      xpBase: 25,
    },
    {
      id: 'learn-business-emails-3',
      type: 'multiple-choice',
      question: 'Which closing is MOST appropriate for a formal client email?',
      options: [
        'Cheers!',
        'Bye for now.',
        'I look forward to hearing from you.',
        'Talk soon!',
      ],
      correctAnswer: 'I look forward to hearing from you.',
      explanation: '"I look forward to hearing from you" is the standard professional close.',
      xpBase: 25,
    },
    {
      id: 'learn-business-emails-4',
      type: 'multiple-choice',
      question: 'To make a polite request, which is BEST?',
      options: [
        'Send me the report today.',
        'I need the report today.',
        'Could you please send me the report by end of day?',
        'You have to send the report.',
      ],
      correctAnswer: 'Could you please send me the report by end of day?',
      explanation: '"Could you please..." is polite and professional. Direct commands sound rude in emails.',
      xpBase: 25,
    },
    {
      id: 'learn-business-emails-5',
      type: 'fill-in-blank',
      question: 'Complete: "___ you have any questions, please ___ hesitate to contact me."',
      correctAnswer: 'Should / not',
      explanation: '"Should you have... please do not hesitate" = formal conditional offer of help.',
      xpBase: 25,
    },
  ],
};

export default topic;
