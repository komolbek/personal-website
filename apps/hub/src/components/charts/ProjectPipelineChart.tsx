'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useI18n } from '@/components/i18n/I18nProvider';

type PipelineData = {
  status: string;
  count: number;
  value: number;
};

export function ProjectPipelineChart({ data }: { data: PipelineData[] }) {
  const { t } = useI18n();
  if (data.length === 0) return <p className="text-sm text-muted-foreground text-center py-8">{t('charts.noProjects')}</p>;

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" fontSize={12} tickFormatter={(v) => `$${v}`} />
        <YAxis type="category" dataKey="status" fontSize={12} tickLine={false} width={75} />
        <Tooltip formatter={(value: any, name: any) => {
          if (name === 'value') return [`$${Number(value).toLocaleString()}`, t('charts.totalValue')];
          return [value, t('charts.projects')];
        }} />
        <Bar dataKey="value" name="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
