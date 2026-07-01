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

const LEAD_SOURCE_VALUES = ['WALK_IN', 'INSTAGRAM', 'REFERRAL', 'GOOGLE_MAPS', 'TWOGIS', 'OTHER'];

export function AddLeadDialog({
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
  const sourceOptions = LEAD_SOURCE_VALUES.map((value) => ({ value, label: t(`enum.${value}`) }));

  return (
    <>
      <DialogTriggerButton onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> {t('leads.add')}
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title={t('leads.add')}>
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
            <Label>{t('leads.businessName')}</Label>
            <Input name="name" placeholder={t('leads.businessNamePlaceholder')} required />
          </div>
          <div className="space-y-2">
            <Label>{t('leads.contactPerson')}</Label>
            <Input name="contactPerson" placeholder={t('leads.contactPersonPlaceholder')} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.phone')}</Label>
            <PhoneInput name="phone" />
          </div>
          <div className="space-y-2">
            <Label>{t('common.telegram')}</Label>
            <Input name="telegram" placeholder={t('leads.telegramPlaceholder')} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.source')}</Label>
            <Select name="source" defaultValue="OTHER" options={sourceOptions} />
          </div>
          <div className="space-y-2">
            <Label>{t('leads.followUpDate')}</Label>
            <Input name="followUp" type="date" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>{t('common.notes')}</Label>
            <Textarea name="notes" placeholder={t('leads.notesPlaceholder')} rows={2} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">{t('leads.add')}</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

interface LeadData {
  id: string;
  name: string;
  contactPerson: string | null;
  phone: string | null;
  telegram: string | null;
  instagram: string | null;
  source: string;
  notes: string | null;
  followUp: string | null;
}

export function EditLeadDialog({
  lead,
  slug,
  editAction,
  deleteAction,
}: {
  lead: LeadData;
  slug: string;
  editAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const sourceOptions = LEAD_SOURCE_VALUES.map((value) => ({ value, label: t(`enum.${value}`) }));

  return (
    <>
      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setOpen(true)}>
        {t('common.edit')}
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title={t('leads.editTitle', { name: lead.name })}>
        <form
          action={async (formData) => {
            await editAction(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <input type="hidden" name="id" value={lead.id} />
          <input type="hidden" name="slug" value={slug} />
          <div className="space-y-2">
            <Label>{t('leads.businessName')}</Label>
            <Input name="name" defaultValue={lead.name} required />
          </div>
          <div className="space-y-2">
            <Label>{t('leads.contactPerson')}</Label>
            <Input name="contactPerson" defaultValue={lead.contactPerson || ''} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.phone')}</Label>
            <PhoneInput name="phone" defaultValue={lead.phone || ''} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.telegram')}</Label>
            <Input name="telegram" defaultValue={lead.telegram || ''} placeholder={t('leads.telegramPlaceholder')} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.instagram')}</Label>
            <Input name="instagram" defaultValue={lead.instagram || ''} placeholder={t('leads.instagramPlaceholder')} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.source')}</Label>
            <Select name="source" defaultValue={lead.source} options={sourceOptions} />
          </div>
          <div className="space-y-2">
            <Label>{t('leads.followUpDate')}</Label>
            <Input name="followUp" type="date" defaultValue={lead.followUp ? lead.followUp.split('T')[0] : ''} />
          </div>
          <div className="space-y-2">
            <Label>{t('common.notes')}</Label>
            <Textarea name="notes" defaultValue={lead.notes || ''} rows={2} />
          </div>
          <div className="sm:col-span-2 flex items-center gap-2">
            <Button type="submit" size="sm">{t('common.saveChanges')}</Button>
            <form action={deleteAction}>
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="slug" value={slug} />
              <Button type="submit" variant="destructive" size="sm">{t('common.delete')}</Button>
            </form>
          </div>
        </form>
      </Dialog>
    </>
  );
}
