'use client';

import Link from 'next/link';
import type { TopicMeta } from '@/lib/content/grammar-topics';

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

interface TopicCardProps {
  topic: TopicMeta;
  exerciseCount?: number;
}

export function TopicCard({ topic, exerciseCount = 5 }: TopicCardProps) {
  return (
    <Link
      href={`/learn/${topic.slug}`}
      className="group block bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-md transition-all"
    >
      {/* Color bar */}
      <div
        className="w-full h-1 rounded-full mb-4"
        style={{ backgroundColor: topic.color }}
      />

      <h3 className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-primary-600 transition-colors mb-1">
        {topic.title}
      </h3>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span
          className="inline-flex items-center px-1.5 py-0.5 rounded font-medium"
          style={{ backgroundColor: `${topic.color}18`, color: topic.color }}
        >
          {LEVEL_LABELS[topic.level]}
        </span>
        <span>·</span>
        <span>{exerciseCount} exercises</span>
      </div>
    </Link>
  );
}
