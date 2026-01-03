import { notFound } from 'next/navigation';
import { getAppById, apps } from '@/config/site';
import { AppDetail } from '@/components/AppDetail';

export function generateStaticParams() {
  return apps.map((app) => ({
    id: app.id,
  }));
}

export default async function AppDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = getAppById(id);

  if (!app) {
    notFound();
  }

  return <AppDetail app={app} />;
}
