// ============================================================================
// Accuracy Trend Chart - Performance Over Time
// ============================================================================
// Purpose: Show accuracy trend with target line (70%)
// Author: @viz-engineer (Pixel) + @dev (Dex)
// Based on: Task 12 (Dashboard Stats)
// ============================================================================

'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface DailyAccuracy {
  date: string;
  accuracy: number; // 0-100
}

interface AccuracyTrendProps {
  data: DailyAccuracy[];
  targetAccuracy?: number; // Default: 70
}

export function AccuracyTrend({ data, targetAccuracy = 70 }: AccuracyTrendProps) {
  // Format data
  const formattedData = data.map((item) => ({
    ...item,
    displayDate: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
  }));

  // Calculate stats
  const avgAccuracy = Math.round(
    data.reduce((sum, item) => sum + item.accuracy, 0) / data.length
  );
  const trend = calculateTrend(data);

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">Accuracy Trend</h3>
          <p className="text-sm text-neutral-500">Last 7 days average: {avgAccuracy}%</p>
        </div>
        <TrendIndicator trend={trend} />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="displayDate"
            tick={{ fill: '#64748b', fontSize: 12 }}
            stroke="#cbd5e1"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 12 }}
            stroke="#cbd5e1"
            width={40}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [`${value}%`, 'Accuracy']}
          />
          {/* Target line */}
          <ReferenceLine
            y={targetAccuracy}
            stroke="#f59e0b"
            strokeDasharray="5 5"
            label={{ value: `Target ${targetAccuracy}%`, position: 'right', fill: '#f59e0b' }}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ fill: '#22c55e', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function TrendIndicator({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') {
    return (
      <div className="flex items-center gap-1 text-success-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-semibold">Improving</span>
      </div>
    );
  }

  if (trend === 'down') {
    return (
      <div className="flex items-center gap-1 text-error-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-semibold">Declining</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-neutral-500">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm font-semibold">Stable</span>
    </div>
  );
}

function calculateTrend(data: DailyAccuracy[]): 'up' | 'down' | 'stable' {
  if (data.length < 2) return 'stable';

  const firstHalf = data.slice(0, Math.floor(data.length / 2));
  const secondHalf = data.slice(Math.floor(data.length / 2));

  const firstAvg = firstHalf.reduce((sum, item) => sum + item.accuracy, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, item) => sum + item.accuracy, 0) / secondHalf.length;

  const diff = secondAvg - firstAvg;

  if (diff > 5) return 'up';
  if (diff < -5) return 'down';
  return 'stable';
}
