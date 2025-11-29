import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function MatchScoreChart({ data, title = 'Top Matches' }) {
  const getBarColor = (score) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: '#ffffff60' }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#ffffff80', fontSize: 12 }}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1e2e',
              border: '1px solid #ffffff20',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#fff' }}
            formatter={(value) => [`${value}%`, 'Match Score']}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}