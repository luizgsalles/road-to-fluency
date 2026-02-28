// ============================================================================
// Content Index — All 25 Topic Content Files
// ============================================================================

import type { TopicContent } from './grammar-topics';

import presentSimple from './topics/present-simple';
import presentContinuous from './topics/present-continuous';
import presentPerfect from './topics/present-perfect';
import presentPerfectContinuous from './topics/present-perfect-continuous';
import pastSimple from './topics/past-simple';
import pastPerfect from './topics/past-perfect';
import futureWill from './topics/future-will';
import futureGoingTo from './topics/future-going-to';
import modalsAbility from './topics/modals-ability';
import modalsObligation from './topics/modals-obligation';
import modalsHypothetical from './topics/modals-hypothetical';
import conditionalsZero from './topics/conditionals-zero';
import conditionalsFirst from './topics/conditionals-first';
import conditionalsSecond from './topics/conditionals-second';
import conditionalsThird from './topics/conditionals-third';
import conditionalsMixed from './topics/conditionals-mixed';
import passiveVoice from './topics/passive-voice';
import reportedSpeech from './topics/reported-speech';
import questions from './topics/questions';
import articles from './topics/articles';
import prepositions from './topics/prepositions';
import businessEmails from './topics/business-emails';
import presentations from './topics/presentations';
import meetings from './topics/meetings';
import formalInformal from './topics/formal-informal';

export const ALL_TOPICS: TopicContent[] = [
  presentSimple,
  presentContinuous,
  presentPerfect,
  presentPerfectContinuous,
  pastSimple,
  pastPerfect,
  futureWill,
  futureGoingTo,
  modalsAbility,
  modalsObligation,
  modalsHypothetical,
  conditionalsZero,
  conditionalsFirst,
  conditionalsSecond,
  conditionalsThird,
  conditionalsMixed,
  passiveVoice,
  reportedSpeech,
  questions,
  articles,
  prepositions,
  businessEmails,
  presentations,
  meetings,
  formalInformal,
];

export function getTopicContent(slug: string): TopicContent | undefined {
  return ALL_TOPICS.find((t) => t.slug === slug);
}

export * from './grammar-topics';
export type { TopicContent };
