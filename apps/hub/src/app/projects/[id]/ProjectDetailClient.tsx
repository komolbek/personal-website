'use client';

import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { AmountInput } from '@/components/ui/amount-input';
import { Plus } from 'lucide-react';
import { useI18n } from '@/components/i18n/I18nProvider';

export function AddPaymentDialog({ projectId, action }: { projectId: string; action: (formData: FormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const PAYMENT_CATEGORIES = [
    { value: 'PROJECT_REVENUE', label: t('enum.PROJECT_REVENUE') },
    { value: 'HOSTING', label: t('enum.HOSTING') },
    { value: 'DOMAINS', label: t('enum.DOMAINS') },
    { value: 'MARKETING', label: t('enum.MARKETING') },
    { value: 'TOOLS', label: t('enum.TOOLS') },
    { value: 'OTHER', label: t('enum.OTHER') },
  ];

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-1" /> {t('projects.recordPayment')}
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title={t('projects.recordPayment')}>
        <form
          action={async (formData) => {
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <input type="hidden" name="projectId" value={projectId} />
          <div className="space-y-2">
            <Label>{t('common.type')}</Label>
            <Select
              name="type"
              defaultValue="INCOME"
              options={[
                { value: 'INCOME', label: t('enum.INCOME') },
                { value: 'EXPENSE', label: t('enum.EXPENSE') },
              ]}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('common.amount')}</Label>
            <AmountInput name="amount" required placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label>{t('common.currency')}</Label>
            <Select
              name="currency"
              defaultValue="USD"
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'UZS', label: 'UZS' },
              ]}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('common.category')}</Label>
            <Select name="category" defaultValue="PROJECT_REVENUE" options={PAYMENT_CATEGORIES} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.description')}</Label>
            <Input name="description" placeholder={t('projects.paymentDescriptionPlaceholder')} required />
          </div>
          <div className="space-y-2">
            <Label>{t('common.date')}</Label>
            <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">{t('projects.recordPayment')}</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export function AddQuoteDialog({ projectId, clientName, clientPhone, action }: {
  projectId: string;
  clientName: string;
  clientPhone: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const [items, setItems] = useState([{ feature: '', price: '' }]);

  const addItem = () => setItems([...items, { feature: '', price: '' }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: 'feature' | 'price', value: string) => {
    const updated = [...items];
    updated[idx][field] = value;
    setItems(updated);
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-1" /> {t('projects.newQuote')}
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title={t('projects.createQuote')}>
        <form
          action={async (formData) => {
            formData.set('items', JSON.stringify(
              items.filter(i => i.feature && i.price).map(i => ({
                feature: i.feature,
                price: parseFloat(i.price),
              }))
            ));
            await action(formData);
            setOpen(false);
            setItems([{ feature: '', price: '' }]);
          }}
          className="space-y-4"
        >
          <input type="hidden" name="projectId" value={projectId} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t('projects.clientName')}</Label>
              <Input name="clientName" defaultValue={clientName} required />
            </div>
            <div className="space-y-2">
              <Label>{t('projects.clientPhone')}</Label>
              <Input name="clientPhone" defaultValue={clientPhone} />
            </div>
            <div className="space-y-2">
              <Label>{t('common.currency')}</Label>
              <Select
                name="currency"
                defaultValue="USD"
                options={[
                  { value: 'USD', label: 'USD' },
                  { value: 'UZS', label: 'UZS' },
                ]}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('projects.discountPercent')}</Label>
              <Input name="discountPercent" type="number" step="0.1" min="0" max="100" placeholder="0" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('projects.lineItems')}</Label>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    placeholder={t('projects.featureServicePlaceholder')}
                    value={item.feature}
                    onChange={(e) => updateItem(idx, 'feature', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder={t('projects.price')}
                    value={item.price}
                    onChange={(e) => updateItem(idx, 'price', e.target.value)}
                    className="w-28"
                  />
                  {items.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(idx)} className="text-destructive h-9 px-2">
                      &times;
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addItem} className="mt-1">
              <Plus className="h-3 w-3 mr-1" /> {t('projects.addItem')}
            </Button>
          </div>

          <div className="space-y-2">
            <Label>{t('common.notes')}</Label>
            <Textarea name="notes" rows={2} placeholder={t('projects.additionalNotesPlaceholder')} />
          </div>

          <Button type="submit" size="sm">{t('projects.createQuote')}</Button>
        </form>
      </Dialog>
    </>
  );
}

export function CreateContractDialog({ projectId, clientName, clientContact, totalPrice, action }: {
  projectId: string;
  clientName: string;
  clientContact: string;
  totalPrice: number;
  action: (formData: FormData) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-1" /> {t('projects.createContract')}
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title={t('projects.createContract')}>
        <form
          action={async (formData) => {
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <input type="hidden" name="projectId" value={projectId} />
          <div className="space-y-2">
            <Label>{t('projects.clientName')}</Label>
            <Input name="clientName" defaultValue={clientName} required />
          </div>
          <div className="space-y-2">
            <Label>{t('projects.clientContact')}</Label>
            <Input name="clientContact" defaultValue={clientContact} />
          </div>
          <div className="space-y-2">
            <Label>{t('projects.totalPrice')}</Label>
            <AmountInput name="totalPrice" defaultValue={totalPrice || undefined} required />
          </div>
          <div className="space-y-2">
            <Label>{t('common.currency')}</Label>
            <Select
              name="currency"
              defaultValue="USD"
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'UZS', label: 'UZS' },
              ]}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('projects.startDate')}</Label>
            <Input name="startDate" type="date" />
          </div>
          <div className="space-y-2">
            <Label>{t('common.deadline')}</Label>
            <Input name="deadline" type="date" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>{t('projects.scopeDescription')}</Label>
            <Textarea name="scopeDescription" rows={3} placeholder={t('projects.scopeDescriptionPlaceholder')} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>{t('projects.paymentTerms')}</Label>
            <Textarea name="paymentTerms" rows={2} placeholder={t('projects.paymentTermsPlaceholder')} />
          </div>
          <div>
            <Button type="submit" size="sm">{t('projects.createContract')}</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
