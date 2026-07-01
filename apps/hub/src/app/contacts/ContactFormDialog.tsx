'use client';

import { useState } from 'react';
import { Dialog, DialogTriggerButton } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { PhoneInput } from '@/components/ui/phone-input';
import { Plus } from 'lucide-react';
import { useI18n } from '@/components/i18n/I18nProvider';

const CONTACT_TYPE_VALUES = ['CLIENT', 'REFERRAL_SOURCE', 'POTENTIAL', 'PARTNER'];

const CONTACT_SOURCE_VALUES = [
  'PERSONAL',
  'IT_PARK',
  'TELEGRAM_GROUP',
  'INSTAGRAM',
  'REFERRAL',
  'OTHER',
];

export function ContactFormDialog({ action }: { action: (formData: FormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const contactTypes = CONTACT_TYPE_VALUES.map((value) => ({ value, label: t(`enum.${value}`) }));
  const contactSources = CONTACT_SOURCE_VALUES.map((value) => ({ value, label: t(`enum.${value}`) }));

  return (
    <>
      <DialogTriggerButton onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> {t('contacts.add')}
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title={t('contacts.add')}>
        <form
          action={async (formData) => {
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="space-y-2">
            <Label>{t('common.name')}</Label>
            <Input name="name" required />
          </div>
          <div className="space-y-2">
            <Label>{t('common.company')}</Label>
            <Input name="company" />
          </div>
          <div className="space-y-2">
            <Label>{t('common.role')}</Label>
            <Input name="role" placeholder={t('contacts.rolePlaceholder')} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.phone')}</Label>
            <PhoneInput name="phone" />
          </div>
          <div className="space-y-2">
            <Label>{t('common.email')}</Label>
            <Input name="email" type="email" />
          </div>
          <div className="space-y-2">
            <Label>{t('common.telegram')}</Label>
            <Input name="telegram" placeholder={t('contacts.telegramPlaceholder')} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.type')}</Label>
            <Select name="type" defaultValue="POTENTIAL" options={contactTypes} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.source')}</Label>
            <Select name="source" defaultValue="OTHER" options={contactSources} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>{t('common.notes')}</Label>
            <Textarea name="notes" rows={1} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">{t('contacts.add')}</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
