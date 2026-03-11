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

export function AddClientDialog({
  productId,
  slug,
  action,
}: {
  productId: string;
  slug: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogTriggerButton onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> Add Client
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title="Add Client">
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
            <Label>Business Name</Label>
            <Input name="name" placeholder="e.g., Seven Salon" required />
          </div>
          <div className="space-y-2">
            <Label>Contact Person</Label>
            <Input name="contactPerson" placeholder="Name" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <PhoneInput name="phone" />
          </div>
          <div className="space-y-2">
            <Label>Plan</Label>
            <Input name="plan" placeholder="e.g., Basic, Pro" />
          </div>
          <div className="space-y-2">
            <Label>Monthly Fee</Label>
            <AmountInput name="monthlyFee" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
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
            <Label>Notes</Label>
            <Textarea name="notes" rows={2} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">Add Client</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
