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

const CONTACT_TYPES = [
  { value: 'CLIENT', label: 'Client' },
  { value: 'REFERRAL_SOURCE', label: 'Referral Source' },
  { value: 'POTENTIAL', label: 'Potential' },
  { value: 'PARTNER', label: 'Partner' },
];

const CONTACT_SOURCES = [
  { value: 'PERSONAL', label: 'Personal' },
  { value: 'IT_PARK', label: 'IT Park' },
  { value: 'TELEGRAM_GROUP', label: 'Telegram Group' },
  { value: 'INSTAGRAM', label: 'Instagram' },
  { value: 'REFERRAL', label: 'Referral' },
  { value: 'OTHER', label: 'Other' },
];

export function ContactFormDialog({ action }: { action: (formData: FormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogTriggerButton onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> Add Contact
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title="Add Contact">
        <form
          action={async (formData) => {
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="space-y-2">
            <Label>Name</Label>
            <Input name="name" required />
          </div>
          <div className="space-y-2">
            <Label>Company</Label>
            <Input name="company" />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Input name="role" placeholder="e.g., CEO, Manager" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <PhoneInput name="phone" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input name="email" type="email" />
          </div>
          <div className="space-y-2">
            <Label>Telegram</Label>
            <Input name="telegram" placeholder="@username" />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select name="type" defaultValue="POTENTIAL" options={CONTACT_TYPES} />
          </div>
          <div className="space-y-2">
            <Label>Source</Label>
            <Select name="source" defaultValue="OTHER" options={CONTACT_SOURCES} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Notes</Label>
            <Textarea name="notes" rows={1} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">Add Contact</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
