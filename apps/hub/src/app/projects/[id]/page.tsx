import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft, Plus, DollarSign, Trash2, FileText, FileCheck, Download } from 'lucide-react';
import { getServerT, getLocale } from '@/lib/i18n/server';
import { PhoneInput } from '@/components/ui/phone-input';
import { AmountInput } from '@/components/ui/amount-input';
import { AddPaymentDialog, AddQuoteDialog, CreateContractDialog } from './ProjectDetailClient';
import {
  updateProject,
  addMilestone,
  updateMilestoneStatus,
  deleteMilestone,
  addPayment,
  deletePayment,
  deleteProject,
  createQuote,
  updateQuoteStatus,
  createContract,
  updateContractStatus,
} from '@/lib/project-actions';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect('/login');
  const t = getServerT();
  const locale = getLocale();

  const PROJECT_STATUSES = [
    { value: 'LEAD', label: t('enum.LEAD') },
    { value: 'PROPOSAL', label: t('enum.PROPOSAL') },
    { value: 'NEGOTIATING', label: t('enum.NEGOTIATING') },
    { value: 'IN_PROGRESS', label: t('enum.IN_PROGRESS') },
    { value: 'FROZEN', label: t('enum.FROZEN') },
    { value: 'DELIVERED', label: t('enum.DELIVERED') },
    { value: 'PAID', label: t('enum.PAID') },
    { value: 'LOST', label: t('enum.LOST') },
  ];

  const PROJECT_TYPES = [
    { value: '', label: t('projects.typeNone') },
    { value: 'Website / Landing Page', label: t('projectType.website') },
    { value: 'Web Application / SaaS', label: t('projectType.webApp') },
    { value: 'Telegram Bot', label: t('projectType.telegramBot') },
    { value: 'Mobile Application', label: t('projectType.mobileApp') },
    { value: 'CRM System', label: t('projectType.crm') },
    { value: 'E-commerce', label: t('projectType.ecommerce') },
    { value: 'AI/ML Solution', label: t('projectType.aiMl') },
    { value: 'Design / Branding', label: t('projectType.design') },
    { value: 'Bitrix24 Integration', label: t('projectType.bitrix24') },
    { value: 'IoT / Hardware Integration', label: t('projectType.iot') },
    { value: 'Production Management System', label: t('projectType.production') },
  ];

  const REFERRAL_SOURCES = [
    { value: '', label: t('projects.referralNone') },
    { value: 'Personal Network', label: t('projects.referralPersonalNetwork') },
    { value: 'IT Park', label: t('projects.referralItPark') },
    { value: 'Partner', label: t('projects.referralPartner') },
    { value: 'Telegram Group', label: t('projects.referralTelegramGroup') },
    { value: 'Instagram', label: t('common.instagram') },
    { value: 'LinkedIn', label: t('projects.referralLinkedin') },
    { value: 'Friend / Colleague', label: t('projects.referralFriendColleague') },
    { value: 'Event', label: t('projects.referralEvent') },
    { value: 'Other', label: t('enum.OTHER') },
  ];

  const REFERRAL_FEES = [
    { value: '0', label: t('projects.referralFeeNone') },
    { value: '5', label: '5%' },
    { value: '10', label: '10%' },
    { value: '15', label: '15%' },
  ];

  const MILESTONE_STATUSES = [
    { value: 'PENDING', label: t('enum.PENDING') },
    { value: 'INVOICED', label: t('enum.INVOICED') },
    { value: 'PAID', label: t('enum.PAID') },
  ];

  const project = await prisma.hubProject.findUnique({
    where: { id: params.id },
    include: {
      milestones: { orderBy: { dueDate: 'asc' } },
      payments: { orderBy: { date: 'desc' } },
      quotes: { orderBy: { createdAt: 'desc' } },
      contract: true,
    },
  });

  if (!project) notFound();

  const totalReceived = project.payments
    .filter((p) => p.type === 'INCOME')
    .reduce((s, p) => s + p.amount, 0);

  const dateToInput = (d: Date | null) => d ? new Date(d).toISOString().split('T')[0] : '';
  const isEditor = ['ADMIN', 'MANAGER'].includes(session.role);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/projects">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={project.status} />
            {project.type && <span className="text-sm text-muted-foreground">{project.type}</span>}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Project Details Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('projects.detailsTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateProject} className="grid gap-4 sm:grid-cols-2">
              <input type="hidden" name="id" value={project.id} />
              <div className="space-y-2">
                <Label htmlFor="name">{t('common.name')}</Label>
                <Input id="name" name="name" defaultValue={project.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">{t('common.type')}</Label>
                <Select id="type" name="type" defaultValue={project.type || ''} options={PROJECT_TYPES} />
                <Input name="customType" placeholder={t('projects.customTypePlaceholder')} className="mt-1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">{t('common.status')}</Label>
                <Select id="status" name="status" defaultValue={project.status} options={PROJECT_STATUSES} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalPrice">{t('projects.totalPriceUsd')}</Label>
                <AmountInput id="totalPrice" name="totalPrice" defaultValue={project.totalPrice} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientContact">{t('projects.clientContact')}</Label>
                <Input id="clientContact" name="clientContact" defaultValue={project.clientContact || ''} />
              </div>
              <div className="space-y-2">
                <Label>{t('projects.clientPhone')}</Label>
                <PhoneInput name="clientPhone" defaultValue={project.clientPhone || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">{t('projects.startDate')}</Label>
                <Input id="startDate" name="startDate" type="date" defaultValue={dateToInput(project.startDate)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">{t('common.deadline')}</Label>
                <Input id="deadline" name="deadline" type="date" defaultValue={dateToInput(project.deadline)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referralSource">{t('projects.referralSource')}</Label>
                <Select id="referralSource" name="referralSource" defaultValue={project.referralSource || ''} options={REFERRAL_SOURCES} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referralFeePercent">{t('projects.referralFee')}</Label>
                <Select id="referralFeePercent" name="referralFeePercent" defaultValue={String(project.referralFeePercent || 0)} options={REFERRAL_FEES} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="notes">{t('common.notes')}</Label>
                <Textarea id="notes" name="notes" defaultValue={project.notes || ''} rows={3} />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <Button type="submit" size="sm">{t('common.saveChanges')}</Button>
              </div>
            </form>

            {/* Kept outside the edit form: a form nested inside another is
                invalid HTML, so the browser dropped it and this button
                submitted the edit action instead of deleting anything. */}
            {session.role === 'ADMIN' && (
              <form action={deleteProject} className="mt-6 pt-4 border-t">
                <input type="hidden" name="id" value={project.id} />
                <Button type="submit" variant="destructive" size="sm">
                  {t('projects.deleteProject')}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card>
          <CardHeader>
            <CardTitle>{t('projects.financialSummary')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t('projects.totalPrice')}</span>
              <span className="font-medium">{formatCurrency(project.totalPrice || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t('projects.received')}</span>
              <span className="font-medium text-green-600">{formatCurrency(totalReceived)}</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-sm font-medium">{t('projects.outstanding')}</span>
              <span className="font-bold text-amber-600">
                {formatCurrency(Math.max(0, (project.totalPrice || 0) - totalReceived))}
              </span>
            </div>
            {project.referralSource && (
              <>
                <div className="border-t pt-4 flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('projects.referralLabel', { source: project.referralSource })}</span>
                  <span className="text-sm">{project.referralFeePercent || 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('projects.netAfterReferral')}</span>
                  <span className="font-medium">
                    {formatCurrency((project.totalPrice || 0) * (1 - (project.referralFeePercent || 0) / 100))}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Contract */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" /> {t('projects.contract')}
          </CardTitle>
          {!project.contract && isEditor && session.role === 'ADMIN' && (
            <CreateContractDialog
              projectId={project.id}
              clientName={project.clientContact || ''}
              clientContact={project.clientPhone || ''}
              totalPrice={project.totalPrice || 0}
              action={createContract}
            />
          )}
        </CardHeader>
        <CardContent>
          {project.contract ? (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{t('projects.client')}</span>
                  <p className="font-medium">{project.contract.clientName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('common.total')}</span>
                  <p className="font-medium">{formatCurrency(project.contract.totalPrice, project.contract.currency)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('common.status')}</span>
                  <p><StatusBadge status={project.contract.status} /></p>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('projects.timeline')}</span>
                  <p>{formatDate(project.contract.startDate, locale)} — {formatDate(project.contract.deadline, locale)}</p>
                </div>
              </div>
              {project.contract.scopeDescription && (
                <div className="text-sm">
                  <span className="text-muted-foreground">{t('projects.scope')}</span>
                  <p className="whitespace-pre-wrap mt-1">{project.contract.scopeDescription}</p>
                </div>
              )}
              {project.contract.paymentTerms && (
                <div className="text-sm">
                  <span className="text-muted-foreground">{t('projects.paymentTerms')}</span>
                  <p className="whitespace-pre-wrap mt-1">{project.contract.paymentTerms}</p>
                </div>
              )}
              {project.contract.signedDate && (
                <div className="text-sm">
                  <span className="text-muted-foreground">{t('projects.signed')}</span>
                  <p>{formatDate(project.contract.signedDate, locale)}</p>
                </div>
              )}
              <div className="flex items-center gap-2 pt-2">
                <a href={`/api/contracts/${project.contract.id}/pdf`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> PDF
                  </Button>
                </a>
                {session.role === 'ADMIN' && (
                  <form action={updateContractStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={project.contract.id} />
                    <input type="hidden" name="projectId" value={project.id} />
                    <Select
                      name="status"
                      defaultValue={project.contract.status}
                      options={[
                        { value: 'DRAFT', label: t('enum.DRAFT') },
                        { value: 'SENT', label: t('enum.SENT') },
                        { value: 'SIGNED', label: t('enum.SIGNED') },
                      ]}
                      className="h-8 text-xs w-28"
                    />
                    <Button type="submit" size="sm" variant="outline" className="h-8">{t('projects.update')}</Button>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<FileCheck className="h-8 w-8" />}
              title={t('projects.noContract')}
              description={t('projects.noContractDescription')}
            />
          )}
        </CardContent>
      </Card>

      {/* Quotes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> {t('projects.quotes')} ({project.quotes.length})
          </CardTitle>
          {isEditor && (
            <AddQuoteDialog
              projectId={project.id}
              clientName={project.clientContact || ''}
              clientPhone={project.clientPhone || ''}
              action={createQuote}
            />
          )}
        </CardHeader>
        <CardContent>
          {project.quotes.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-8 w-8" />}
              title={t('projects.noQuotes')}
              description={t('projects.noQuotesDescription')}
            />
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">{t('projects.client')}</th>
                    <th className="text-left p-3 font-medium">{t('common.total')}</th>
                    <th className="text-left p-3 font-medium">{t('common.status')}</th>
                    <th className="text-left p-3 font-medium">{t('projects.validUntil')}</th>
                    <th className="text-left p-3 font-medium">{t('projects.created')}</th>
                    <th className="p-3 w-32"></th>
                  </tr>
                </thead>
                <tbody>
                  {project.quotes.map((quote) => (
                    <tr key={quote.id} className="border-b">
                      <td className="p-3 font-medium">{quote.clientName}</td>
                      <td className="p-3 font-medium">{formatCurrency(quote.totalPrice, quote.currency)}</td>
                      <td className="p-3"><StatusBadge status={quote.status} /></td>
                      <td className="p-3">{formatDate(quote.validUntil, locale)}</td>
                      <td className="p-3">{formatDate(quote.createdAt, locale)}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <a href={`/api/quotes/${quote.id}/pdf`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              <Download className="h-3 w-3 mr-1" /> PDF
                            </Button>
                          </a>
                          {/* Viewers still see the quote's status in its own
                              column; they just cannot change it. */}
                          {isEditor && (
                            <form action={updateQuoteStatus} className="flex items-center gap-1">
                              <input type="hidden" name="id" value={quote.id} />
                              <input type="hidden" name="projectId" value={project.id} />
                              <Select
                                name="status"
                                defaultValue={quote.status}
                                options={[
                                  { value: 'DRAFT', label: t('enum.DRAFT') },
                                  { value: 'SENT', label: t('enum.SENT') },
                                  { value: 'ACCEPTED', label: t('enum.ACCEPTED') },
                                  { value: 'REJECTED', label: t('enum.REJECTED') },
                                ]}
                                className="h-7 text-xs w-24"
                              />
                              <Button type="submit" size="sm" variant="ghost" className="h-7 text-xs">{t('projects.update')}</Button>
                            </form>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>{t('projects.milestones')}</CardTitle>
        </CardHeader>
        <CardContent>
          {project.milestones.length > 0 && (
            <div className="border rounded-lg overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">{t('projects.milestoneTitle')}</th>
                    <th className="text-left p-3 font-medium">{t('common.amount')}</th>
                    <th className="text-left p-3 font-medium">{t('projects.dueDate')}</th>
                    <th className="text-left p-3 font-medium">{t('common.status')}</th>
                    <th className="text-left p-3 font-medium">{t('projects.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {project.milestones.map((ms) => (
                    <tr key={ms.id} className="border-b">
                      <td className="p-3 font-medium">{ms.title}</td>
                      <td className="p-3">{formatCurrency(ms.amount)}</td>
                      <td className="p-3">{formatDate(ms.dueDate, locale)}</td>
                      <td className="p-3"><StatusBadge status={ms.status} /></td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {ms.status !== 'PAID' && isEditor && (
                            <form action={updateMilestoneStatus} className="flex items-center gap-2">
                              <input type="hidden" name="id" value={ms.id} />
                              <input type="hidden" name="projectId" value={project.id} />
                              <Select
                                name="status"
                                defaultValue={ms.status}
                                options={MILESTONE_STATUSES}
                                className="h-8 text-xs w-28"
                              />
                              <Button type="submit" size="sm" variant="outline" className="h-8">
                                {t('projects.update')}
                              </Button>
                            </form>
                          )}
                          {ms.status === 'PAID' && (
                            <span className="text-xs text-muted-foreground">{t('projects.paidOn', { date: formatDate(ms.paidDate, locale) })}</span>
                          )}
                          {isEditor && (
                            <form action={deleteMilestone}>
                              <input type="hidden" name="id" value={ms.id} />
                              <input type="hidden" name="projectId" value={project.id} />
                              <Button type="submit" variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </form>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {isEditor && (
            <form action={addMilestone} className="flex items-end gap-3 flex-wrap">
              <input type="hidden" name="projectId" value={project.id} />
              <div className="space-y-1">
                <Label className="text-xs">{t('projects.milestoneTitle')}</Label>
                <Input name="title" placeholder={t('projects.milestoneTitlePlaceholder')} required className="h-9 w-40" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('projects.amountUsd')}</Label>
                <AmountInput name="amount" required placeholder="0" className="h-9 w-28" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('projects.dueDate')}</Label>
                <Input name="dueDate" type="date" className="h-9 w-36" />
              </div>
              <Button type="submit" size="sm" variant="outline" className="h-9">
                <Plus className="h-3 w-3 mr-1" /> {t('projects.addMilestone')}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('projects.paymentHistory')}</CardTitle>
          {isEditor && (
            <AddPaymentDialog projectId={project.id} action={addPayment} />
          )}
        </CardHeader>
        <CardContent>
          {project.payments.length === 0 ? (
            <EmptyState
              icon={<DollarSign className="h-8 w-8" />}
              title={t('projects.noPayments')}
              description={t('projects.noPaymentsDescription')}
            />
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">{t('common.date')}</th>
                    <th className="text-left p-3 font-medium">{t('common.description')}</th>
                    <th className="text-left p-3 font-medium">{t('common.type')}</th>
                    <th className="text-right p-3 font-medium">{t('common.amount')}</th>
                    {isEditor && <th className="p-3 w-12"></th>}
                  </tr>
                </thead>
                <tbody>
                  {project.payments.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="p-3">{formatDate(payment.date, locale)}</td>
                      <td className="p-3">{payment.description}</td>
                      <td className="p-3">
                        <StatusBadge status={payment.type} />
                      </td>
                      <td className={`p-3 text-right font-medium ${payment.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                        {payment.type === 'INCOME' ? '+' : '-'}{formatCurrency(payment.amount)}
                      </td>
                      {isEditor && (
                        <td className="p-3">
                          <form action={deletePayment}>
                            <input type="hidden" name="id" value={payment.id} />
                            <input type="hidden" name="projectId" value={project.id} />
                            <Button type="submit" variant="ghost" size="sm" className="h-7 text-destructive hover:text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </form>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
