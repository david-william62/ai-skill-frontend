import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export default function SkillChart({ skills, title = 'Skill Proficiency' }) {
  // Transform skills data for radar chart
  const chartData = skills.map((skill) => ({
    skill: skill.name,
    value: skill.proficiency || skill.level || 0,
    fullMark: 100,
  }));

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="#ffffff20" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: '#ffffff80', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#ffffff60', fontSize: 10 }}
          />
          <Radar
            name="Proficiency"
            dataKey="value"
            stroke="#22d3ee"
            fill="#22d3ee"
            fillOpacity={0.3}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1e2e',
              border: '1px solid #ffffff20',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#fff' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}