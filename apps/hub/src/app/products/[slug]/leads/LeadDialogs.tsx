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

const LEAD_SOURCES = [
  { value: 'WALK_IN', label: 'Walk-in' },
  { value: 'INSTAGRAM', label: 'Instagram' },
  { value: 'REFERRAL', label: 'Referral' },
  { value: 'GOOGLE_MAPS', label: 'Google Maps' },
  { value: 'TWOGIS', label: '2GIS' },
  { value: 'OTHER', label: 'Other' },
];

export function AddLeadDialog({
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
        <Plus className="h-4 w-4 mr-2" /> Add Lead
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title="Add Lead">
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
            <Input name="name" placeholder="e.g., Salon Bella" required />
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
            <Label>Telegram</Label>
            <Input name="telegram" placeholder="@username" />
          </div>
          <div className="space-y-2">
            <Label>Source</Label>
            <Select name="source" defaultValue="OTHER" options={LEAD_SOURCES} />
          </div>
          <div className="space-y-2">
            <Label>Follow-up Date</Label>
            <Input name="followUp" type="date" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Notes</Label>
            <Textarea name="notes" placeholder="Initial observations..." rows={2} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">Add Lead</Button>
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
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title={`Edit: ${lead.name}`}>
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
            <Label>Business Name</Label>
            <Input name="name" defaultValue={lead.name} required />
          </div>
          <div className="space-y-2">
            <Label>Contact Person</Label>
            <Input name="contactPerson" defaultValue={lead.contactPerson || ''} />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <PhoneInput name="phone" defaultValue={lead.phone || ''} />
          </div>
          <div className="space-y-2">
            <Label>Telegram</Label>
            <Input name="telegram" defaultValue={lead.telegram || ''} placeholder="@username" />
          </div>
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input name="instagram" defaultValue={lead.instagram || ''} placeholder="@handle" />
          </div>
          <div className="space-y-2">
            <Label>Source</Label>
            <Select name="source" defaultValue={lead.source} options={LEAD_SOURCES} />
          </div>
          <div className="space-y-2">
            <Label>Follow-up Date</Label>
            <Input name="followUp" type="date" defaultValue={lead.followUp ? lead.followUp.split('T')[0] : ''} />
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea name="notes" defaultValue={lead.notes || ''} rows={2} />
          </div>
          <div className="sm:col-span-2 flex items-center gap-2">
            <Button type="submit" size="sm">Save Changes</Button>
            <form action={deleteAction}>
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="slug" value={slug} />
              <Button type="submit" variant="destructive" size="sm">Delete</Button>
            </form>
          </div>
        </form>
      </Dialog>
    </>
  );
}
