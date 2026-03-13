import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatCurrency, formatDate, daysUntil } from '@/lib/utils';
import { DollarSign, FolderKanban, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import Link from 'next/link';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { ProjectPipelineChart } from '@/components/charts/ProjectPipelineChart';

function getMonthlyData(payments: { type: string; amount: number; currency: string; date: Date }[]) {
  const months: Record<string, { income: number; expenses: number }> = {};
  const now = new Date();

  // Last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    months[key] = { income: 0, expenses: 0 };
  }

  // Only include USD payments in the chart to avoid mixing currencies
  payments.filter((p) => p.currency === 'USD').forEach((p) => {
    const d = new Date(p.date);
    const key = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    if (months[key]) {
      if (p.type === 'INCOME') months[key].income += p.amount;
      else months[key].expenses += p.amount;
    }
  });

  return Object.entries(months).map(([month, data]) => ({ month, ...data }));
}

function getProjectPipeline(projects: { status: string; totalPrice: number | null }[]) {
  const statusLabels: Record<string, string> = {
    LEAD: 'Lead',
    PROPOSAL: 'Proposal',
    NEGOTIATING: 'Negotiating',
    IN_PROGRESS: 'In Progress',
    FROZEN: 'Frozen',
    DELIVERED: 'Delivered',
    PAID: 'Paid',
  };

  const pipeline: Record<string, { count: number; value: number }> = {};
  projects.forEach((p) => {
    if (!pipeline[p.status]) pipeline[p.status] = { count: 0, value: 0 };
    pipeline[p.status].count++;
    pipeline[p.status].value += p.totalPrice || 0;
  });

  return Object.entries(pipeline)
    .filter(([status]) => statusLabels[status])
    .map(([status, data]) => ({
      status: statusLabels[status],
      ...data,
    }));
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const [
    incomeUSD,
    incomeUZS,
    expenseUSD,
    expenseUZS,
    activeProjects,
    allProjects,
    products,
    upcomingDeadlines,
    overdueClients,
    pendingFollowUps,
    recentPayments,
    recentActivity,
  ] = await Promise.all([
    prisma.hubPayment.aggregate({
      where: { type: 'INCOME', currency: 'USD' },
      _sum: { amount: true },
    }),
    prisma.hubPayment.aggregate({
      where: { type: 'INCOME', currency: 'UZS' },
      _sum: { amount: true },
    }),
    prisma.hubPayment.aggregate({
      where: { type: 'EXPENSE', currency: 'USD' },
      _sum: { amount: true },
    }),
    prisma.hubPayment.aggregate({
      where: { type: 'EXPENSE', currency: 'UZS' },
      _sum: { amount: true },
    }),
    prisma.hubProject.findMany({
      where: { status: { in: ['IN_PROGRESS', 'FROZEN'] } },
      include: {
        milestones: true,
        payments: { where: { type: 'INCOME' } },
      },
      orderBy: { deadline: 'asc' },
    }),
    prisma.hubProject.findMany({
      where: { status: { notIn: ['LOST'] } },
      select: { status: true, totalPrice: true },
    }),
    prisma.hubProduct.findMany({
      where: { status: 'ACTIVE' },
      include: {
        leads: true,
        clients: true,
      },
    }),
    prisma.hubProject.findMany({
      where: {
        status: 'IN_PROGRESS',
        deadline: {
          lte: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          gte: new Date(),
        },
      },
      orderBy: { deadline: 'asc' },
    }),
    prisma.hubClient.findMany({
      where: { paymentStatus: 'OVERDUE' },
      include: { product: true },
    }),
    prisma.hubLead.findMany({
      where: {
        followUp: { lte: new Date() },
        status: { notIn: ['SIGNED', 'LOST'] },
      },
      include: { product: true },
    }),
    // Last 6 months of payments for chart
    prisma.hubPayment.findMany({
      where: {
        date: { gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) },
      },
      select: { type: true, amount: true, currency: true, date: true },
    }),
    // Recent activity
    prisma.hubActivityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ]);

  const totalEarnedUSD = incomeUSD._sum.amount || 0;
  const totalEarnedUZS = incomeUZS._sum.amount || 0;
  const totalExpensesUSD = expenseUSD._sum.amount || 0;
  const totalExpensesUZS = expenseUZS._sum.amount || 0;

  const outstandingMilestones = activeProjects.reduce((sum, p) => {
    const unpaid = p.milestones
      .filter((m) => m.status !== 'PAID')
      .reduce((s, m) => s + m.amount, 0);
    return sum + unpaid;
  }, 0);

  const outstandingProjects = activeProjects.reduce((sum, p) => {
    if (p.milestones.length > 0) return sum;
    const received = p.payments.reduce((s, pay) => s + pay.amount, 0);
    return sum + ((p.totalPrice || 0) - received);
  }, 0);

  const totalOutstanding = outstandingMilestones + outstandingProjects;
  const alertCount = upcomingDeadlines.length + overdueClients.length + pendingFollowUps.length;

  const monthlyData = getMonthlyData(recentPayments);
  const pipelineData = getProjectPipeline(allProjects);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session.name}</p>
      </div>

      {/* Financial Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalEarnedUSD)}</div>
            {totalEarnedUZS > 0 && (
              <div className="text-sm text-muted-foreground mt-1">{formatCurrency(totalEarnedUZS, 'UZS')}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{formatCurrency(totalOutstanding)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${alertCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {alertCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={monthlyData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectPipelineChart data={pipelineData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Active Projects
              <Link href="/projects" className="text-sm font-normal text-primary hover:underline">View all</Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active projects</p>
            ) : (
              <div className="space-y-4">
                {activeProjects.map((project) => {
                  const received = project.payments.reduce((s, p) => s + p.amount, 0);
                  const days = daysUntil(project.deadline);
                  const isUrgent = days !== null && days < 7 && received < (project.totalPrice || 0) * 0.5;

                  return (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className={`block rounded-lg border p-4 hover:bg-accent/50 transition-colors ${isUrgent ? 'border-red-300 bg-red-50' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{project.name}</span>
                        <StatusBadge status={project.status} />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {formatCurrency(received)} / {formatCurrency(project.totalPrice || 0)}
                        </span>
                        {project.deadline && (
                          <span className={isUrgent ? 'text-red-600 font-medium' : ''}>
                            {days !== null && days >= 0
                              ? `${days} days left`
                              : days !== null
                                ? `${Math.abs(days)} days overdue`
                                : ''}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Product Metrics
              <Link href="/products" className="text-sm font-normal text-primary hover:underline">View all</Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active products</p>
            ) : (
              <div className="space-y-4">
                {products.map((product) => {
                  const leadsCount = product.leads.length;
                  const clientsCount = product.clients.length;
                  const convRate = leadsCount > 0 ? ((clientsCount / leadsCount) * 100).toFixed(0) : '0';
                  const mrr = product.clients.reduce((s, c) => s + (c.monthlyFee || 0), 0);

                  return (
                    <div key={product.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">{product.name}</span>
                        <StatusBadge status={product.status} />
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                          <div className="text-lg font-semibold">{leadsCount}</div>
                          <div className="text-xs text-muted-foreground">Leads</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{clientsCount}</div>
                          <div className="text-xs text-muted-foreground">Clients</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{convRate}%</div>
                          <div className="text-xs text-muted-foreground">Conv.</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{formatCurrency(mrr)}</div>
                          <div className="text-xs text-muted-foreground">MRR</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-4 w-4" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p>
                        <span className="font-medium">{activity.userName}</span>{' '}
                        {activity.action} {activity.entityType}{' '}
                        {activity.entityName && (
                          <span className="font-medium">{activity.entityName}</span>
                        )}
                      </p>
                      {activity.details && (
                        <p className="text-xs text-muted-foreground">{activity.details}</p>
                      )}
                      <p className="text-xs text-muted-foreground">{formatDate(activity.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alerts */}
        {alertCount > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {upcomingDeadlines.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 text-sm p-2 rounded bg-amber-50 text-amber-800">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    <span>
                      <strong>{p.name}</strong> deadline in {daysUntil(p.deadline)} days
                    </span>
                  </div>
                ))}
                {overdueClients.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 text-sm p-2 rounded bg-red-50 text-red-800">
                    <DollarSign className="h-4 w-4 flex-shrink-0" />
                    <span>
                      <strong>{c.name}</strong> ({c.product.name}) payment overdue
                    </span>
                  </div>
                ))}
                {pendingFollowUps.map((l) => (
                  <div key={l.id} className="flex items-center gap-3 text-sm p-2 rounded bg-blue-50 text-blue-800">
                    <FolderKanban className="h-4 w-4 flex-shrink-0" />
                    <span>
                      Follow up with <strong>{l.name}</strong> ({l.product.name})
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
