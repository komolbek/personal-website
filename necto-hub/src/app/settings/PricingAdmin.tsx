'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog } from '@/components/ui/dialog';
import { DollarSign, Plus, Pencil, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import {
  createProjectType,
  updateProjectType,
  toggleProjectTypeActive,
  deleteProjectType,
  createFeature,
  updateFeature,
  toggleFeatureActive,
  deleteFeature,
} from './pricing-actions';

type Feature = {
  id: string;
  name: string;
  price: number;
  supportsQuantity: boolean;
  unitLabel: string | null;
  sortOrder: number;
  isActive: boolean;
};

type ProjectType = {
  id: string;
  name: string;
  basePrice: number;
  baseDescription: string;
  sortOrder: number;
  isActive: boolean;
  features: Feature[];
};

type DialogState =
  | { mode: 'none' }
  | { mode: 'createType' }
  | { mode: 'editType'; data: ProjectType }
  | { mode: 'createFeature'; projectTypeId: string; projectTypeName: string }
  | { mode: 'editFeature'; data: Feature; projectTypeId: string };

export function PricingAdmin({ projectTypes }: { projectTypes: ProjectType[] }) {
  const [dialog, setDialog] = useState<DialogState>({ mode: 'none' });
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    let errorMsg: string | null = null;

    if (dialog.mode === 'createType') {
      errorMsg = await createProjectType(formData);
    } else if (dialog.mode === 'editType') {
      formData.set('id', dialog.data.id);
      errorMsg = await updateProjectType(formData);
    } else if (dialog.mode === 'createFeature') {
      formData.set('projectTypeId', dialog.projectTypeId);
      errorMsg = await createFeature(formData);
    } else if (dialog.mode === 'editFeature') {
      formData.set('id', dialog.data.id);
      errorMsg = await updateFeature(formData);
    }

    if (errorMsg) {
      setError(errorMsg);
    } else {
      setDialog({ mode: 'none' });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Project Types & Pricing
            </CardTitle>
            <Button size="sm" onClick={() => { setError(null); setDialog({ mode: 'createType' }); }}>
              <Plus className="h-3 w-3 mr-1" /> Add Type
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {projectTypes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No project types yet. Create one to get started.
            </p>
          ) : (
            <div className="space-y-2">
              {projectTypes.map((pt) => (
                <div key={pt.id} className="border rounded-lg">
                  {/* Project Type Row */}
                  <div className="flex items-center justify-between p-3">
                    <button
                      type="button"
                      className="flex items-center gap-2 text-sm font-medium"
                      onClick={() => setExpandedType(expandedType === pt.id ? null : pt.id)}
                    >
                      {expandedType === pt.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <span className={!pt.isActive ? 'opacity-50' : ''}>{pt.name}</span>
                      {!pt.isActive && (
                        <span className="text-xs bg-muted px-1.5 py-0.5 rounded">Inactive</span>
                      )}
                    </button>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-muted-foreground">
                        ${pt.basePrice.toLocaleString()} base
                      </span>
                      <span className="text-muted-foreground">
                        {pt.features.length} features
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => { setError(null); setDialog({ mode: 'editType', data: pt }); }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <form action={toggleProjectTypeActive}>
                          <input type="hidden" name="id" value={pt.id} />
                          <Button type="submit" variant="ghost" size="sm" className="h-7 px-2 text-xs">
                            {pt.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                        </form>
                        {pt.features.length === 0 && (
                          <form action={deleteProjectType}>
                            <input type="hidden" name="id" value={pt.id} />
                            <Button type="submit" variant="ghost" size="sm" className="h-7 px-2 text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Features */}
                  {expandedType === pt.id && (
                    <div className="border-t px-3 pb-3">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Features</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => {
                            setError(null);
                            setDialog({ mode: 'createFeature', projectTypeId: pt.id, projectTypeName: pt.name });
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add Feature
                        </Button>
                      </div>
                      {pt.features.length === 0 ? (
                        <p className="text-xs text-muted-foreground py-2">No features yet.</p>
                      ) : (
                        <div className="space-y-1">
                          {pt.features.map((f) => (
                            <div
                              key={f.id}
                              className={`flex items-center justify-between py-1.5 px-2 rounded text-sm ${
                                !f.isActive ? 'opacity-50' : ''
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span>{f.name}</span>
                                {f.supportsQuantity && (
                                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                    qty{f.unitLabel ? ` (${f.unitLabel})` : ''}
                                  </span>
                                )}
                                {!f.isActive && (
                                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded">Inactive</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">${f.price.toLocaleString()}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-1.5"
                                  onClick={() => {
                                    setError(null);
                                    setDialog({ mode: 'editFeature', data: f, projectTypeId: pt.id });
                                  }}
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                                <form action={toggleFeatureActive}>
                                  <input type="hidden" name="id" value={f.id} />
                                  <Button type="submit" variant="ghost" size="sm" className="h-6 px-1.5 text-xs">
                                    {f.isActive ? 'Off' : 'On'}
                                  </Button>
                                </form>
                                <form action={deleteFeature}>
                                  <input type="hidden" name="id" value={f.id} />
                                  <Button type="submit" variant="ghost" size="sm" className="h-6 px-1.5 text-destructive">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </form>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Type Dialog */}
      <Dialog
        open={dialog.mode === 'createType' || dialog.mode === 'editType'}
        onOpenChange={(open) => !open && setDialog({ mode: 'none' })}
        title={dialog.mode === 'editType' ? 'Edit Project Type' : 'New Project Type'}
      >
        <form action={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              name="name"
              required
              defaultValue={dialog.mode === 'editType' ? dialog.data.name : ''}
              placeholder="e.g. Website / Landing Page"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Base Price ($)</Label>
              <Input
                name="basePrice"
                type="number"
                step="0.01"
                min="0"
                required
                defaultValue={dialog.mode === 'editType' ? dialog.data.basePrice : ''}
              />
            </div>
            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Input
                name="sortOrder"
                type="number"
                min="0"
                defaultValue={dialog.mode === 'editType' ? dialog.data.sortOrder : 0}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Base Description</Label>
            <Textarea
              name="baseDescription"
              required
              rows={2}
              defaultValue={dialog.mode === 'editType' ? dialog.data.baseDescription : ''}
              placeholder="What's included in the base package..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setDialog({ mode: 'none' })}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {dialog.mode === 'editType' ? 'Save' : 'Create'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Feature Dialog */}
      <Dialog
        open={dialog.mode === 'createFeature' || dialog.mode === 'editFeature'}
        onOpenChange={(open) => !open && setDialog({ mode: 'none' })}
        title={
          dialog.mode === 'editFeature'
            ? 'Edit Feature'
            : dialog.mode === 'createFeature'
              ? `New Feature — ${dialog.projectTypeName}`
              : 'New Feature'
        }
      >
        <form action={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="space-y-2">
            <Label>Feature Name</Label>
            <Input
              name="name"
              required
              defaultValue={dialog.mode === 'editFeature' ? dialog.data.name : ''}
              placeholder="e.g. Additional page"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Price ($)</Label>
              <Input
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                defaultValue={dialog.mode === 'editFeature' ? dialog.data.price : ''}
              />
            </div>
            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Input
                name="sortOrder"
                type="number"
                min="0"
                defaultValue={dialog.mode === 'editFeature' ? dialog.data.sortOrder : 0}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="supportsQuantityCheckbox"
                defaultChecked={dialog.mode === 'editFeature' ? dialog.data.supportsQuantity : false}
                onChange={(e) => {
                  const hidden = e.target.form?.querySelector('input[name="supportsQuantity"]') as HTMLInputElement;
                  if (hidden) hidden.value = e.target.checked ? 'true' : 'false';
                }}
                className="rounded"
              />
              Supports quantity
            </label>
            <input
              type="hidden"
              name="supportsQuantity"
              defaultValue={dialog.mode === 'editFeature' && dialog.data.supportsQuantity ? 'true' : 'false'}
            />
          </div>
          <div className="space-y-2">
            <Label>Unit Label <span className="text-muted-foreground text-xs">(optional, e.g. &quot;page&quot;, &quot;language&quot;)</span></Label>
            <Input
              name="unitLabel"
              defaultValue={dialog.mode === 'editFeature' ? dialog.data.unitLabel || '' : ''}
              placeholder="page"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setDialog({ mode: 'none' })}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {dialog.mode === 'editFeature' ? 'Save' : 'Create'}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
