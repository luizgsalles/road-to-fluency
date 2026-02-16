// ============================================================================
// XP Growth Chart - Line Chart Visualization
// ============================================================================
// Purpose: Show XP growth over time (last 7-30 days)
// Author: @viz-engineer (Pixel) + @dev (Dex)
// Based on: Task 12 (Dashboard Stats)
// ============================================================================

'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DailyXP {
  date: string; // YYYY-MM-DD or formatted
  xp: number;
}

interface XPGrowthChartProps {
  data: DailyXP[];
  period?: '7d' | '30d' | '90d';
}

export function XPGrowthChart({ data, period = '7d' }: XPGrowthChartProps) {
  // Format data for display
  const formattedData = data.map((item) => ({
    ...item,
    displayDate: formatDate(item.date, period),
  }));

  // Calculate stats
  const totalXP = data.reduce((sum, item) => sum + item.xp, 0);
  const avgXP = Math.round(totalXP / data.length);
  const maxXP = Math.max(...data.map((item) => item.xp));

  return (
    <div className="w-full h-full">
      {/* Stats Header */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <StatCard label="Total XP" value={totalXP.toLocaleString()} color="text-primary-500" />
        <StatCard label="Avg/Day" value={avgXP.toLocaleString()} color="text-neutral-700" />
        <StatCard label="Best Day" value={maxXP.toLocaleString()} color="text-success-500" />
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
            tick={{ fill: '#64748b', fontSize: 12 }}
            stroke="#cbd5e1"
            width={60}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [`${value} XP`, 'Earned']}
          />
          <Line
            type="monotone"
            dataKey="xp"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={{ fill: '#0ea5e9', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-neutral-500 mt-1">{label}</div>
    </div>
  );
}

function formatDate(dateStr: string, period: '7d' | '30d' | '90d'): string {
  const date = new Date(dateStr);

  if (period === '7d') {
    // Show weekday (Mon, Tue, etc.)
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  } else if (period === '30d') {
    // Show month/day (1/15)
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
  } else {
    // Show month (Jan, Feb, etc.)
    return date.toLocaleDateString('en-US', { month: 'short' });
  }
}
