'use client';

import { useState } from 'react';
import { Dialog, DialogTriggerButton } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useI18n } from '@/components/i18n/I18nProvider';

export function ProductFormDialog({ action }: { action: (formData: FormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <>
      <DialogTriggerButton onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> {t('products.add')}
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title={t('products.add')}>
        <form
          action={async (formData) => {
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="space-y-2">
            <Label htmlFor="name">{t('common.name')}</Label>
            <Input id="name" name="name" placeholder={t('products.namePlaceholder')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">{t('common.status')}</Label>
            <Select
              id="status"
              name="status"
              defaultValue="ACTIVE"
              options={[
                { value: 'ACTIVE', label: t('enum.ACTIVE') },
                { value: 'PARKED', label: t('enum.PARKED') },
                { value: 'ARCHIVED', label: t('enum.ARCHIVED') },
              ]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">{t('products.url')}</Label>
            <Input id="url" name="url" placeholder={t('products.urlPlaceholder')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{t('common.description')}</Label>
            <Textarea id="description" name="description" placeholder={t('products.descriptionPlaceholder')} rows={1} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">{t('products.add')}</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
