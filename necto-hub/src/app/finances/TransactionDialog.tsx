'use client';

import { useState } from 'react';
import { Dialog, DialogTriggerButton } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { AmountInput } from '@/components/ui/amount-input';
import { Plus } from 'lucide-react';

const PAYMENT_CATEGORIES = [
  { value: 'PROJECT_REVENUE', label: 'Project Revenue' },
  { value: 'PRODUCT_REVENUE', label: 'Product Revenue' },
  { value: 'HOSTING', label: 'Hosting' },
  { value: 'DOMAINS', label: 'Domains' },
  { value: 'OFFICE', label: 'Office' },
  { value: 'SMS_API', label: 'SMS/API' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'SALARY', label: 'Salary' },
  { value: 'TRANSPORT', label: 'Transport' },
  { value: 'TOOLS', label: 'Tools' },
  { value: 'OTHER', label: 'Other' },
];

interface TransactionDialogProps {
  action: (formData: FormData) => Promise<void>;
  projects: { id: string; name: string }[];
  products: { id: string; name: string }[];
}

export function TransactionDialog({ action, projects, products }: TransactionDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogTriggerButton onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> Record Transaction
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title="Record Transaction">
        <form
          action={async (formData) => {
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
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
            <Select name="category" defaultValue="OTHER" options={PAYMENT_CATEGORIES} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input name="description" placeholder="What is this payment for?" required />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="space-y-2">
            <Label>Link to Project</Label>
            <Select
              name="projectId"
              defaultValue=""
              options={[
                { value: '', label: 'None' },
                ...projects.map((p) => ({ value: p.id, label: p.name })),
              ]}
            />
          </div>
          <div className="space-y-2">
            <Label>Link to Product</Label>
            <Select
              name="productId"
              defaultValue=""
              options={[
                { value: '', label: 'None' },
                ...products.map((p) => ({ value: p.id, label: p.name })),
              ]}
            />
          </div>
          <div className="space-y-2 flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="recurring" className="rounded" />
              Recurring
            </label>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">Record Transaction</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
