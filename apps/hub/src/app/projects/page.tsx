import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency, formatDate, daysUntil } from '@/lib/utils';
import Link from 'next/link';
import { FolderKanban } from 'lucide-react';
import { getServerT, getLocale } from '@/lib/i18n/server';
import { ProjectFormDialog } from './ProjectFormDialog';
import { createProject } from '@/lib/project-actions';

export default async function ProjectsPage() {
  const session = await getSession();
  if (!session) redirect('/login');
  const t = getServerT();
  const locale = getLocale();

  const projects = await prisma.hubProject.findMany({
    include: {
      milestones: true,
      payments: { where: { type: 'INCOME' } },
      _count: { select: { quotes: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Enquiries from the website arrive as projects in LEAD status. They are the
  // ones nobody has worked yet, so they are counted in the heading and tinted
  // in the table rather than being left to blend into finished work.
  const newEnquiries = projects.filter((p) => p.status === 'LEAD').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            {t('projects.title')}
            {newEnquiries > 0 && (
              <span className="px-2 py-0.5 rounded text-sm font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                {t('projects.newEnquiries', { count: newEnquiries })}
              </span>
            )}
          </h1>
          <p className="text-muted-foreground">{t('projects.subtitle')}</p>
        </div>
        {['ADMIN', 'MANAGER'].includes(session.role) && (
          <ProjectFormDialog action={createProject} />
        )}
      </div>

      {/* Project List */}
      {projects.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="h-12 w-12" />}
          title={t('projects.emptyTitle')}
          description={t('projects.emptyDescription')}
        />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">{t('common.name')}</th>
                  <th className="text-left p-3 font-medium">{t('common.status')}</th>
                  <th className="text-left p-3 font-medium">{t('common.total')}</th>
                  <th className="text-left p-3 font-medium">{t('projects.received')}</th>
                  <th className="text-left p-3 font-medium">{t('projects.outstanding')}</th>
                  <th className="text-left p-3 font-medium">{t('common.deadline')}</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => {
                  // Only payments in the project's own currency count towards
                  // what it has received. Adding a UZS payment to a USD price
                  // produces a figure that means nothing, and the row already
                  // states the price in one currency.
                  const received = project.payments
                    .filter((p) => p.currency === project.currency)
                    .reduce((s, p) => s + p.amount, 0);
                  const outstanding = (project.totalPrice || 0) - received;
                  const days = daysUntil(project.deadline);

                  return (
                    <tr
                      key={project.id}
                      className={`border-b hover:bg-muted/30 ${
                        project.status === 'LEAD' ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''
                      }`}
                    >
                      <td className="p-3">
                        <Link href={`/projects/${project.id}`} className="font-medium text-primary hover:underline">
                          {project.name}
                        </Link>
                        {project.type && (
                          <span className="ml-2 text-xs text-muted-foreground">{project.type}</span>
                        )}
                      </td>
                      <td className="p-3">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="p-3">
                        {formatCurrency(project.totalPrice || 0, project.currency)}
                      </td>
                      <td className="p-3 text-green-600">
                        {formatCurrency(received, project.currency)}
                      </td>
                      <td className="p-3 text-amber-600">
                        {formatCurrency(outstanding > 0 ? outstanding : 0, project.currency)}
                      </td>
                      <td className="p-3">
                        {project.deadline ? (
                          <span className={days !== null && days < 7 && days >= 0 ? 'text-red-600 font-medium' : ''}>
                            {formatDate(project.deadline, locale)}
                            {days !== null && days >= 0 && ` (${days}d)`}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
