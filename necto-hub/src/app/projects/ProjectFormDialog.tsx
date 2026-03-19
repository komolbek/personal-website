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

const PROJECT_STATUSES = [
  { value: 'LEAD', label: 'Lead' },
  { value: 'PROPOSAL', label: 'Proposal' },
  { value: 'NEGOTIATING', label: 'Negotiating' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'FROZEN', label: 'Frozen' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'PAID', label: 'Paid' },
  { value: 'LOST', label: 'Lost' },
];

const PROJECT_TYPES = [
  { value: '', label: 'Select type' },
  { value: 'Website / Landing Page', label: 'Website / Landing Page' },
  { value: 'Web Application / SaaS', label: 'Web Application / SaaS' },
  { value: 'Telegram Bot', label: 'Telegram Bot' },
  { value: 'Mobile Application', label: 'Mobile Application' },
  { value: 'CRM System', label: 'CRM System' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'AI/ML Solution', label: 'AI/ML Solution' },
  { value: 'Design / Branding', label: 'Design / Branding' },
  { value: 'Bitrix24 Integration', label: 'Bitrix24 Integration' },
  { value: 'IoT / Hardware Integration', label: 'IoT / Hardware Integration' },
  { value: 'Production Management System', label: 'Production Management System' },
];

export function ProjectFormDialog({ action }: { action: (formData: FormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogTriggerButton onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> New Project
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title="New Project">
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
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" name="name" placeholder="e.g., 4Event" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" options={PROJECT_TYPES} placeholder="Select type" />
            <Input name="customType" placeholder="Or enter custom type..." className="mt-1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select id="status" name="status" defaultValue="LEAD" options={PROJECT_STATUSES} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalPrice">Total Price (USD)</Label>
            <AmountInput id="totalPrice" name="totalPrice" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientContact">Client Contact</Label>
            <Input id="clientContact" name="clientContact" placeholder="Name" />
          </div>
          <div className="space-y-2">
            <Label>Client Phone</Label>
            <PhoneInput name="clientPhone" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Additional details..." rows={2} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">Create Project</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
