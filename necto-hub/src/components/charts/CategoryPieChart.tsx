'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type CategoryData = {
  name: string;
  value: number;
};

const COLORS = ['#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1', '#14b8a6'];

export function CategoryPieChart({ data }: { data: CategoryData[] }) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground text-center py-8">No data yet</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
          fontSize={11}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']} />
      </PieChart>
    </ResponsiveContainer>
  );
}
