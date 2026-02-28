import type { TopicTheory } from '@/lib/content/grammar-topics';

interface TheorySectionProps {
  theory: TopicTheory;
  color: string;
}

export function TheorySection({ theory, color }: TheorySectionProps) {
  return (
    <div className="space-y-6">
      {/* Formation */}
      <div
        className="rounded-xl p-4 border"
        style={{ backgroundColor: `${color}0f`, borderColor: `${color}30` }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color }}>
          Formation
        </p>
        <p className="font-mono text-sm text-slate-800 whitespace-pre-line">{theory.formation}</p>
      </div>

      {/* When to use */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-2">When to use</h3>
        <ul className="space-y-1.5">
          {theory.usage.map((point, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-600">
              <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: color }}>
                {i + 1}
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Examples */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Examples</h3>
        <div className="space-y-2">
          {theory.examples.map((ex, i) => (
            <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <p className="text-sm font-medium text-slate-800">{ex.en}</p>
              <p className="text-xs text-slate-500 mt-0.5 italic">{ex.pt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Common mistakes */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Common mistakes</h3>
        <ul className="space-y-1.5">
          {theory.commonMistakes.map((mistake, i) => (
            <li key={i} className="flex gap-2 text-sm text-red-700 bg-red-50 rounded-lg p-2.5 border border-red-100">
              <span className="flex-shrink-0">✗</span>
              <span>{mistake}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tip */}
      <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
        <p className="text-xs font-semibold text-amber-700 mb-1">Quick tip</p>
        <p className="text-sm text-amber-800">{theory.tips}</p>
      </div>
    </div>
  );
}
