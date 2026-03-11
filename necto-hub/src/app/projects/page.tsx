import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency, formatDate, daysUntil } from '@/lib/utils';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { FolderKanban } from 'lucide-react';
import { logActivity } from '@/lib/activity';
import { ProjectFormDialog } from './ProjectFormDialog';

async function createProject(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || !['ADMIN', 'MANAGER'].includes(session.role)) return;

  const name = formData.get('name') as string;
  const project = await prisma.hubProject.create({
    data: {
      name,
      type: (formData.get('type') as string) || null,
      status: (formData.get('status') as any) || 'LEAD',
      clientContact: (formData.get('clientContact') as string) || null,
      clientPhone: (formData.get('clientPhone') as string) || null,
      totalPrice: formData.get('totalPrice') ? parseFloat(formData.get('totalPrice') as string) : null,
      currency: (formData.get('currency') as any) || 'USD',
      notes: (formData.get('notes') as string) || null,
    },
  });

  await logActivity('created', 'project', project.id, name);
  revalidatePath('/projects');
}

export default async function ProjectsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const projects = await prisma.hubProject.findMany({
    include: {
      milestones: true,
      payments: { where: { type: 'INCOME' } },
      _count: { select: { quotes: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Client projects and engagements</p>
        </div>
        {['ADMIN', 'MANAGER'].includes(session.role) && (
          <ProjectFormDialog action={createProject} />
        )}
      </div>

      {/* Project List */}
      {projects.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="h-12 w-12" />}
          title="No projects yet"
          description="Create your first project to start tracking work."
        />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Total</th>
                  <th className="text-left p-3 font-medium">Received</th>
                  <th className="text-left p-3 font-medium">Outstanding</th>
                  <th className="text-left p-3 font-medium">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => {
                  const received = project.payments.reduce((s, p) => s + p.amount, 0);
                  const outstanding = (project.totalPrice || 0) - received;
                  const days = daysUntil(project.deadline);

                  return (
                    <tr key={project.id} className="border-b hover:bg-muted/30">
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
                      <td className="p-3">{formatCurrency(project.totalPrice || 0)}</td>
                      <td className="p-3 text-green-600">{formatCurrency(received)}</td>
                      <td className="p-3 text-amber-600">{formatCurrency(outstanding > 0 ? outstanding : 0)}</td>
                      <td className="p-3">
                        {project.deadline ? (
                          <span className={days !== null && days < 7 && days >= 0 ? 'text-red-600 font-medium' : ''}>
                            {formatDate(project.deadline)}
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
