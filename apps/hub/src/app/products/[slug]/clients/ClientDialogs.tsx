'use client';

import { useState } from 'react';
import { Dialog, DialogTriggerButton } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { PhoneInput } from '@/components/ui/phone-input';
import { AmountInput } from '@/components/ui/amount-input';
import { Plus } from 'lucide-react';
import { useI18n } from '@/components/i18n/I18nProvider';

export function AddClientDialog({
  productId,
  slug,
  action,
}: {
  productId: string;
  slug: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogTriggerButton onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> {t('clients.add')}
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title={t('clients.add')}>
        <form
          action={async (formData) => {
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="slug" value={slug} />
          <div className="space-y-2">
            <Label>{t('clients.businessName')}</Label>
            <Input name="name" placeholder={t('clients.businessNamePlaceholder')} required />
          </div>
          <div className="space-y-2">
            <Label>{t('clients.contactPerson')}</Label>
            <Input name="contactPerson" placeholder={t('clients.contactPersonPlaceholder')} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.phone')}</Label>
            <PhoneInput name="phone" />
          </div>
          <div className="space-y-2">
            <Label>{t('clients.plan')}</Label>
            <Input name="plan" placeholder={t('clients.planPlaceholder')} />
          </div>
          <div className="space-y-2">
            <Label>{t('clients.monthlyFee')}</Label>
            <AmountInput name="monthlyFee" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label>{t('common.currency')}</Label>
            <Select
              name="currency"
              defaultValue="UZS"
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'UZS', label: 'UZS' },
              ]}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>{t('common.notes')}</Label>
            <Textarea name="notes" rows={2} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">{t('clients.add')}</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
