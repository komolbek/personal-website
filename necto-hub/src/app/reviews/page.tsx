import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { CalendarCheck, Plus } from 'lucide-react';

async function generateWeeklyReview(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session) return;

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay()); // Sunday
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  // Auto-calculate from payments
  const [incomeAgg, expenseAgg, newLeads, newClients, activeProjects, overduePayments] = await Promise.all([
    prisma.hubPayment.aggregate({
      where: { type: 'INCOME', date: { gte: weekStart, lte: weekEnd } },
      _sum: { amount: true },
    }),
    prisma.hubPayment.aggregate({
      where: { type: 'EXPENSE', date: { gte: weekStart, lte: weekEnd } },
      _sum: { amount: true },
    }),
    prisma.hubLead.count({ where: { createdAt: { gte: weekStart, lte: weekEnd } } }),
    prisma.hubClient.count({ where: { createdAt: { gte: weekStart, lte: weekEnd } } }),
    prisma.hubProject.count({ where: { status: { in: ['IN_PROGRESS', 'FROZEN'] } } }),
    prisma.hubClient.count({ where: { paymentStatus: 'OVERDUE' } }),
  ]);

  const totalIncome = incomeAgg._sum.amount || 0;
  const totalExpenses = expenseAgg._sum.amount || 0;

  await prisma.hubWeeklyReview.create({
    data: {
      userId: session.id,
      weekStart,
      weekEnd,
      totalIncome,
      totalExpenses,
      netCashFlow: totalIncome - totalExpenses,
      newLeadsThisWeek: newLeads,
      newClientsThisWeek: newClients,
      activeProjectsCount: activeProjects,
      overduePaymentsCount: overduePayments,
      biggestWin: (formData.get('biggestWin') as string) || null,
      biggestBlocker: (formData.get('biggestBlocker') as string) || null,
      avoidedTask: (formData.get('avoidedTask') as string) || null,
      priority1: (formData.get('priority1') as string) || null,
      priority2: (formData.get('priority2') as string) || null,
      priority3: (formData.get('priority3') as string) || null,
      energyLevel: formData.get('energyLevel') ? parseInt(formData.get('energyLevel') as string) : null,
      burnoutRisk: (formData.get('burnoutRisk') as string) || null,
      selfCarePlan: (formData.get('selfCarePlan') as string) || null,
    },
  });

  revalidatePath('/reviews');
}

export default async function ReviewsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const reviews = await prisma.hubWeeklyReview.findMany({
    include: { user: { select: { name: true } } },
    orderBy: { weekStart: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Weekly Reviews</h1>
        <p className="text-muted-foreground">Track progress and set priorities</p>
      </div>

      {/* New Review Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Weekly Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Financial data and metrics will be auto-calculated. Fill in the reflection fields below.
          </p>
          <form action={generateWeeklyReview} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Biggest Win</Label>
              <Textarea name="biggestWin" rows={2} placeholder="What went well this week?" />
            </div>
            <div className="space-y-2">
              <Label>Biggest Blocker</Label>
              <Textarea name="biggestBlocker" rows={2} placeholder="What held you back?" />
            </div>
            <div className="space-y-2">
              <Label>Something You Avoided</Label>
              <Textarea name="avoidedTask" rows={2} placeholder="What did you procrastinate on?" />
            </div>
            <div className="space-y-2">
              <Label>Energy Level (1-10)</Label>
              <Input name="energyLevel" type="number" min="1" max="10" />
            </div>
            <div className="space-y-2">
              <Label>Priority 1 (Next Week)</Label>
              <Input name="priority1" />
            </div>
            <div className="space-y-2">
              <Label>Priority 2</Label>
              <Input name="priority2" />
            </div>
            <div className="space-y-2">
              <Label>Priority 3</Label>
              <Input name="priority3" />
            </div>
            <div className="space-y-2">
              <Label>Burnout Risk</Label>
              <Input name="burnoutRisk" placeholder="Low / Medium / High" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Self-Care Plan</Label>
              <Input name="selfCarePlan" placeholder="One thing you'll do for yourself" />
            </div>
            <div>
              <Button type="submit" size="sm">Generate Review</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Past Reviews */}
      {reviews.length === 0 ? (
        <EmptyState
          icon={<CalendarCheck className="h-12 w-12" />}
          title="No reviews yet"
          description="Create your first weekly review to start tracking progress."
        />
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Week of {formatDate(review.weekStart)}</span>
                  <span className="text-sm font-normal text-muted-foreground">by {review.user.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
                  <div className="text-center p-3 rounded-lg bg-green-50">
                    <div className="text-lg font-bold text-green-600">{formatCurrency(review.totalIncome)}</div>
                    <div className="text-xs text-muted-foreground">Income</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-red-50">
                    <div className="text-lg font-bold text-red-600">{formatCurrency(review.totalExpenses)}</div>
                    <div className="text-xs text-muted-foreground">Expenses</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-50">
                    <div className="text-lg font-bold text-blue-600">{review.newLeadsThisWeek} / {review.newClientsThisWeek}</div>
                    <div className="text-xs text-muted-foreground">New Leads / Clients</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-purple-50">
                    <div className="text-lg font-bold text-purple-600">{review.activeProjectsCount}</div>
                    <div className="text-xs text-muted-foreground">Active Projects</div>
                  </div>
                </div>

                {(review.biggestWin || review.biggestBlocker || review.priority1) && (
                  <div className="grid gap-3 sm:grid-cols-3 text-sm border-t pt-4">
                    {review.biggestWin && (
                      <div>
                        <span className="text-muted-foreground font-medium">Win:</span>
                        <p>{review.biggestWin}</p>
                      </div>
                    )}
                    {review.biggestBlocker && (
                      <div>
                        <span className="text-muted-foreground font-medium">Blocker:</span>
                        <p>{review.biggestBlocker}</p>
                      </div>
                    )}
                    {review.priority1 && (
                      <div>
                        <span className="text-muted-foreground font-medium">Next week:</span>
                        <p>1. {review.priority1}</p>
                        {review.priority2 && <p>2. {review.priority2}</p>}
                        {review.priority3 && <p>3. {review.priority3}</p>}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
