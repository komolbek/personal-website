'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type MonthlyData = {
  month: string;
  income: number;
  expenses: number;
};

export function RevenueChart({ data }: { data: MonthlyData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" fontSize={12} tickLine={false} />
        <YAxis fontSize={12} tickLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip
          formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
          labelStyle={{ fontWeight: 600 }}
        />
        <Legend />
        <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
