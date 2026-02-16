// ============================================================================
// Skills Radar Chart - Hexagon Visualization
// ============================================================================
// Purpose: Radar chart showing 6 skill levels (0-10 each)
// Author: @viz-engineer (Pixel) + @dev (Dex)
// Based on: Task 12 (Dashboard Stats)
// ============================================================================

'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface SkillLevel {
  grammar: number;
  vocabulary: number;
  listening: number;
  speaking: number;
  reading: number;
  writing: number;
}

interface SkillsRadarProps {
  skills: SkillLevel;
  maxLevel?: number;
}

export function SkillsRadar({ skills, maxLevel = 10 }: SkillsRadarProps) {
  // Transform data for recharts
  const data = [
    { skill: 'Grammar', level: skills.grammar, fullMark: maxLevel },
    { skill: 'Vocabulary', level: skills.vocabulary, fullMark: maxLevel },
    { skill: 'Listening', level: skills.listening, fullMark: maxLevel },
    { skill: 'Speaking', level: skills.speaking, fullMark: maxLevel },
    { skill: 'Reading', level: skills.reading, fullMark: maxLevel },
    { skill: 'Writing', level: skills.writing, fullMark: maxLevel },
  ];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#cbd5e1" strokeWidth={1} />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, maxLevel]}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <Radar
            name="Skills"
            dataKey="level"
            stroke="#0ea5e9"
            strokeWidth={2}
            fill="#0ea5e9"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Skills Radar with Labels
 */
export function SkillsRadarWithLabels({ skills, maxLevel = 10 }: SkillsRadarProps) {
  const skillColors: Record<keyof SkillLevel, string> = {
    grammar: '#3b82f6', // blue-500
    vocabulary: '#8b5cf6', // violet-500
    listening: '#ec4899', // pink-500
    speaking: '#f59e0b', // amber-500
    reading: '#10b981', // emerald-500
    writing: '#06b6d4', // cyan-500
  };

  return (
    <div className="space-y-4">
      {/* Radar Chart */}
      <div className="w-full h-80">
        <SkillsRadar skills={skills} maxLevel={maxLevel} />
      </div>

      {/* Skill Levels List */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(skills).map(([skill, level]) => (
          <div key={skill} className="flex items-center justify-between">
            <span className="text-sm font-medium capitalize" style={{ color: skillColors[skill as keyof SkillLevel] }}>
              {skill}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(level / maxLevel) * 100}%`,
                    backgroundColor: skillColors[skill as keyof SkillLevel],
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-neutral-600 w-8 text-right">
                {level}/{maxLevel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
