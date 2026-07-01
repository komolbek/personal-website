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

export function ProjectFormDialog({ action }: { action: (formData: FormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

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
    { value: '', label: t('projects.selectType') },
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

  return (
    <>
      <DialogTriggerButton onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> {t('projects.newProject')}
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title={t('projects.newProject')}>
        <form
          action={async (formData) => {
            const customType = (formData.get('customType') as string)?.trim();
            if (customType) {
              formData.set('type', customType);
            }
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="space-y-2">
            <Label htmlFor="name">{t('projects.projectName')}</Label>
            <Input id="name" name="name" placeholder={t('projects.projectNamePlaceholder')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">{t('common.type')}</Label>
            <Select id="type" name="type" options={PROJECT_TYPES} placeholder={t('projects.selectType')} />
            <Input name="customType" placeholder={t('projects.customTypePlaceholder')} className="mt-1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">{t('common.status')}</Label>
            <Select id="status" name="status" defaultValue="LEAD" options={PROJECT_STATUSES} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalPrice">{t('projects.totalPriceUsd')}</Label>
            <AmountInput id="totalPrice" name="totalPrice" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientContact">{t('projects.clientContact')}</Label>
            <Input id="clientContact" name="clientContact" placeholder={t('common.name')} />
          </div>
          <div className="space-y-2">
            <Label>{t('projects.clientPhone')}</Label>
            <PhoneInput name="clientPhone" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">{t('common.notes')}</Label>
            <Textarea id="notes" name="notes" placeholder={t('projects.notesPlaceholder')} rows={2} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">{t('projects.createProject')}</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
