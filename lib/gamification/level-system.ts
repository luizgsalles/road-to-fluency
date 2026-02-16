// ============================================================================
// Level System - Business English RPG
// ============================================================================
// Purpose: Manage user levels and skill progression
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 8 (XP & Level System)
// ============================================================================

export type Skill = 'grammar' | 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing';

export interface SkillLevels {
  grammar: number;
  vocabulary: number;
  listening: number;
  speaking: number;
  reading: number;
  writing: number;
}

export interface UserLevel {
  overall: number; // Overall level (1-100)
  skills: SkillLevels; // Individual skill levels (0-10 per skill)
  totalXP: number;
  skillXP: Record<Skill, number>;
}

/**
 * Calculate skill level from skill XP
 *
 * Skill levels: 0-10
 * Formula: Similar to overall levels but capped at 10
 *
 * Skill XP Thresholds:
 * - Level 1: 0 XP
 * - Level 2: 50 XP
 * - Level 3: 150 XP
 * - Level 5: 500 XP
 * - Level 10: 3,000 XP
 */
export function getSkillLevelFromXP(skillXP: number): number {
  if (skillXP < 50) return 1;
  if (skillXP < 150) return 2;
  if (skillXP < 300) return 3;
  if (skillXP < 500) return 4;
  if (skillXP < 800) return 5;
  if (skillXP < 1200) return 6;
  if (skillXP < 1700) return 7;
  if (skillXP < 2300) return 8;
  if (skillXP < 3000) return 9;
  return 10; // Max skill level
}

/**
 * Calculate XP required for next skill level
 */
export function getXPRequiredForSkillLevel(level: number): number {
  const thresholds = [0, 50, 150, 300, 500, 800, 1200, 1700, 2300, 3000];
  return thresholds[level] || 3000;
}

/**
 * Calculate skill levels from skill XP
 */
export function calculateSkillLevels(skillXP: Record<Skill, number>): SkillLevels {
  return {
    grammar: getSkillLevelFromXP(skillXP.grammar || 0),
    vocabulary: getSkillLevelFromXP(skillXP.vocabulary || 0),
    listening: getSkillLevelFromXP(skillXP.listening || 0),
    speaking: getSkillLevelFromXP(skillXP.speaking || 0),
    reading: getSkillLevelFromXP(skillXP.reading || 0),
    writing: getSkillLevelFromXP(skillXP.writing || 0),
  };
}

/**
 * Calculate overall level from total XP and skill levels
 *
 * Formula: Weighted average
 * - 70% from skills (average of 6 skills)
 * - 30% from total XP
 *
 * This encourages balanced skill development
 */
export function calculateOverallLevel(
  totalXP: number,
  skillLevels: SkillLevels
): number {
  // Level from total XP (using same formula as xp-system.ts)
  const levelFromXP = getLevelFromTotalXP(totalXP);

  // Average skill level
  const skillValues = Object.values(skillLevels);
  const avgSkillLevel = skillValues.reduce((sum, level) => sum + level, 0) / skillValues.length;

  // Weighted average (70% skills, 30% XP)
  // Scale skill level to 1-100 range (multiply by 10)
  const scaledSkillLevel = avgSkillLevel * 10;
  const overallLevel = Math.floor(scaledSkillLevel * 0.7 + levelFromXP * 0.3);

  return Math.max(1, Math.min(100, overallLevel));
}

/**
 * Helper: Get level from total XP (same as xp-system.ts)
 */
function getLevelFromTotalXP(totalXP: number): number {
  let level = 1;
  let cumulativeXP = 0;

  while (level <= 100) {
    const xpForNextLevel = Math.floor(100 * Math.pow(level + 1, 1.5) + 50);
    if (cumulativeXP + xpForNextLevel > totalXP) {
      break;
    }
    cumulativeXP += xpForNextLevel;
    level++;
  }

  return level;
}

/**
 * Check if content is unlocked for user
 *
 * Content unlocking rules:
 * - Overall level requirement
 * - Skill level requirement (specific skill must be at level X)
 */
export function isContentUnlocked(
  userLevel: UserLevel,
  requiredOverallLevel: number,
  requiredSkillLevel?: { skill: Skill; level: number }
): boolean {
  // Check overall level
  if (userLevel.overall < requiredOverallLevel) {
    return false;
  }

  // Check skill level (if specified)
  if (requiredSkillLevel) {
    const userSkillLevel = userLevel.skills[requiredSkillLevel.skill];
    if (userSkillLevel < requiredSkillLevel.level) {
      return false;
    }
  }

  return true;
}

/**
 * Get level milestones (badges/achievements unlock at these levels)
 */
export const LEVEL_MILESTONES = [1, 5, 10, 20, 30, 50, 75, 100];

/**
 * Get skill milestones
 */
export const SKILL_MILESTONES = [1, 3, 5, 7, 10];

/**
 * Check if level is a milestone
 */
export function isMilestone(level: number, milestones: number[] = LEVEL_MILESTONES): boolean {
  return milestones.includes(level);
}

/**
 * Get next milestone level
 */
export function getNextMilestone(currentLevel: number, milestones: number[] = LEVEL_MILESTONES): number | null {
  const nextMilestone = milestones.find((m) => m > currentLevel);
  return nextMilestone || null;
}

/**
 * Calculate skill progress toward next level
 */
export function getSkillProgress(skill: Skill, skillXP: number): {
  level: number;
  currentXP: number;
  requiredXP: number;
  percentage: number;
} {
  const level = getSkillLevelFromXP(skillXP);
  const currentLevelThreshold = getXPRequiredForSkillLevel(level);
  const nextLevelThreshold = getXPRequiredForSkillLevel(level + 1);
  const currentXP = skillXP - currentLevelThreshold;
  const requiredXP = nextLevelThreshold - currentLevelThreshold;
  const percentage = Math.min(100, (currentXP / requiredXP) * 100);

  return {
    level,
    currentXP,
    requiredXP,
    percentage: Math.floor(percentage),
  };
}
