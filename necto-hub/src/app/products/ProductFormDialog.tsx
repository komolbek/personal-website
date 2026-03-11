'use client';

import { useState } from 'react';
import { Dialog, DialogTriggerButton } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Plus } from 'lucide-react';

export function ProductFormDialog({ action }: { action: (formData: FormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogTriggerButton onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> Add Product
      </DialogTriggerButton>
      <Dialog open={open} onOpenChange={setOpen} title="Add Product">
        <form
          action={async (formData) => {
            await action(formData);
            setOpen(false);
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="e.g., Wabi" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              name="status"
              defaultValue="ACTIVE"
              options={[
                { value: 'ACTIVE', label: 'Active' },
                { value: 'PARKED', label: 'Parked' },
                { value: 'ARCHIVED', label: 'Archived' },
              ]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" name="url" placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Brief description..." rows={1} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">Add Product</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
