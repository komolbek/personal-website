'use client';

import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

export function AddQuoteDialog({ projectId, clientName, clientPhone, action }: {
  projectId: string;
  clientName: string;
  clientPhone: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([{ feature: '', price: '' }]);

  const addItem = () => setItems([...items, { feature: '', price: '' }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: 'feature' | 'price', value: string) => {
    const updated = [...items];
    updated[idx][field] = value;
    setItems(updated);
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-1" /> New Quote
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title="Create Quote">
        <form
          action={async (formData) => {
            formData.set('items', JSON.stringify(
              items.filter(i => i.feature && i.price).map(i => ({
                feature: i.feature,
                price: parseFloat(i.price),
              }))
            ));
            await action(formData);
            setOpen(false);
            setItems([{ feature: '', price: '' }]);
          }}
          className="space-y-4"
        >
          <input type="hidden" name="projectId" value={projectId} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Input name="clientName" defaultValue={clientName} required />
            </div>
            <div className="space-y-2">
              <Label>Client Phone</Label>
              <Input name="clientPhone" defaultValue={clientPhone} />
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
              <Label>Discount %</Label>
              <Input name="discountPercent" type="number" step="0.1" min="0" max="100" placeholder="0" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Line Items</Label>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    placeholder="Feature / service"
                    value={item.feature}
                    onChange={(e) => updateItem(idx, 'feature', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => updateItem(idx, 'price', e.target.value)}
                    className="w-28"
                  />
                  {items.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(idx)} className="text-destructive h-9 px-2">
                      &times;
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addItem} className="mt-1">
              <Plus className="h-3 w-3 mr-1" /> Add Item
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea name="notes" rows={2} placeholder="Additional notes..." />
          </div>

          <Button type="submit" size="sm">Create Quote</Button>
        </form>
      </Dialog>
    </>
  );
}

export function CreateContractDialog({ projectId, clientName, clientContact, totalPrice, action }: {
  projectId: string;
  clientName: string;
  clientContact: string;
  totalPrice: number;
  action: (formData: FormData) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-1" /> Create Contract
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title="Create Contract">
        <form
          action={async (formData) => {
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <input type="hidden" name="projectId" value={projectId} />
          <div className="space-y-2">
            <Label>Client Name</Label>
            <Input name="clientName" defaultValue={clientName} required />
          </div>
          <div className="space-y-2">
            <Label>Client Contact</Label>
            <Input name="clientContact" defaultValue={clientContact} />
          </div>
          <div className="space-y-2">
            <Label>Total Price</Label>
            <AmountInput name="totalPrice" defaultValue={totalPrice || undefined} required />
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
            <Label>Start Date</Label>
            <Input name="startDate" type="date" />
          </div>
          <div className="space-y-2">
            <Label>Deadline</Label>
            <Input name="deadline" type="date" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Scope Description</Label>
            <Textarea name="scopeDescription" rows={3} placeholder="What you're building..." />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Payment Terms</Label>
            <Textarea name="paymentTerms" rows={2} placeholder="e.g., 50% upfront, 50% on delivery" />
          </div>
          <div>
            <Button type="submit" size="sm">Create Contract</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
