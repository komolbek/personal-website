'use client';

import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { AmountInput } from '@/components/ui/amount-input';
import { Plus } from 'lucide-react';

const PAYMENT_CATEGORIES = [
  { value: 'PROJECT_REVENUE', label: 'Project Revenue' },
  { value: 'HOSTING', label: 'Hosting' },
  { value: 'DOMAINS', label: 'Domains' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'TOOLS', label: 'Tools' },
  { value: 'OTHER', label: 'Other' },
];

export function AddPaymentDialog({ projectId, action }: { projectId: string; action: (formData: FormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-1" /> Record Payment
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title="Record Payment">
        <form
          action={async (formData) => {
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <input type="hidden" name="projectId" value={projectId} />
          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              name="type"
              defaultValue="INCOME"
              options={[
                { value: 'INCOME', label: 'Income' },
                { value: 'EXPENSE', label: 'Expense' },
              ]}
            />
          </div>
          <div className="space-y-2">
            <Label>Amount</Label>
            <AmountInput name="amount" required placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
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
            <Label>Category</Label>
            <Select name="category" defaultValue="PROJECT_REVENUE" options={PAYMENT_CATEGORIES} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input name="description" placeholder="Payment description" required />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">Record Payment</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
