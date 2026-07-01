'use client';

import { useState } from 'react';
import { Dialog, DialogTriggerButton } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { AmountInput } from '@/components/ui/amount-input';
import { Plus } from 'lucide-react';
import { useI18n } from '@/components/i18n/I18nProvider';

const PAYMENT_CATEGORY_VALUES = [
  'PROJECT_REVENUE',
  'PRODUCT_REVENUE',
  'HOSTING',
  'DOMAINS',
  'OFFICE',
  'SMS_API',
  'MARKETING',
  'SALARY',
  'TRANSPORT',
  'TOOLS',
  'OTHER',
];

interface TransactionDialogProps {
  action: (formData: FormData) => Promise<void>;
  projects: { id: string; name: string }[];
  products: { id: string; name: string }[];
}

export function TransactionDialog({ action, projects, products }: TransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const paymentCategories = PAYMENT_CATEGORY_VALUES.map((value) => ({
    value,
    label: t(`enum.${value}`),
  }));

  return (
    <>
      <DialogTriggerButton onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> {t('finances.recordTransaction')}
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title={t('finances.recordTransaction')}>
        <form
          action={async (formData) => {
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
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
                { value: 'USD', label: t('enum.USD') },
                { value: 'UZS', label: t('enum.UZS') },
              ]}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('common.category')}</Label>
            <Select name="category" defaultValue="OTHER" options={paymentCategories} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.description')}</Label>
            <Input name="description" placeholder={t('finances.descriptionPlaceholder')} required />
          </div>
          <div className="space-y-2">
            <Label>{t('common.date')}</Label>
            <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="space-y-2">
            <Label>{t('finances.linkToProject')}</Label>
            <Select
              name="projectId"
              defaultValue=""
              options={[
                { value: '', label: t('finances.none') },
                ...projects.map((p) => ({ value: p.id, label: p.name })),
              ]}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('finances.linkToProduct')}</Label>
            <Select
              name="productId"
              defaultValue=""
              options={[
                { value: '', label: t('finances.none') },
                ...products.map((p) => ({ value: p.id, label: p.name })),
              ]}
            />
          </div>
          <div className="space-y-2 flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="recurring" className="rounded" />
              {t('finances.recurringLabel')}
            </label>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">{t('finances.recordTransaction')}</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
