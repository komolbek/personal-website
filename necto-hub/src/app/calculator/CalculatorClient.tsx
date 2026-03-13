'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Package } from 'lucide-react';

type ProjectTypeData = {
  id: string;
  name: string;
  basePrice: number;
  baseDescription: string;
  features: {
    id: string;
    name: string;
    price: number;
    supportsQuantity: boolean;
    unitLabel: string | null;
  }[];
};

export function CalculatorClient({ projectTypes }: { projectTypes: ProjectTypeData[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [checkedFeatures, setCheckedFeatures] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [rushFee, setRushFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [referralPercent, setReferralPercent] = useState(0);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentType = projectTypes[selectedIndex];

  if (!currentType) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Pricing Calculator</h1>
          <p className="text-muted-foreground">Generate project quotes with feature-based pricing</p>
        </div>
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No project types available. An admin needs to create project types in Settings.
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleTypeChange = (index: number) => {
    setSelectedIndex(index);
    setCheckedFeatures({});
    setQuantities({});
  };

  const toggleFeature = (featureId: string) => {
    setCheckedFeatures((prev) => ({ ...prev, [featureId]: !prev[featureId] }));
  };

  const getFeatureTotal = (feature: ProjectTypeData['features'][0]) => {
    if (!checkedFeatures[feature.id]) return 0;
    return feature.price * (quantities[feature.id] || 1);
  };

  const subtotal =
    currentType.basePrice +
    currentType.features.reduce((sum, f) => sum + getFeatureTotal(f), 0);

  const rushAmount = subtotal * (rushFee / 100);
  const afterRush = subtotal + rushAmount;
  const discountAmount = afterRush * (discount / 100);
  const total = afterRush - discountAmount;
  const referralAmount = total * (referralPercent / 100);
  const netRevenue = total - referralAmount;

  async function saveQuote() {
    if (!clientName.trim()) return;
    setSaving(true);

    const selectedItems = [
      {
        feature: `Base: ${currentType.baseDescription}`,
        price: currentType.basePrice,
        quantity: 1,
      },
      ...currentType.features
        .filter((f) => checkedFeatures[f.id])
        .map((f) => ({
          feature: f.name,
          price: getFeatureTotal(f),
          quantity: quantities[f.id] || 1,
        })),
    ];

    try {
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientPhone: clientPhone || null,
          items: selectedItems,
          basePrice: subtotal,
          totalPrice: total,
          rushFeeApplied: rushFee > 0,
          rushFeePercent: rushFee || null,
          discountPercent: discount || null,
          projectTypeName: currentType.name,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pricing Calculator</h1>
        <p className="text-muted-foreground">Generate project quotes with feature-based pricing</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {/* Project Type Tabs */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {projectTypes.map((pt, i) => (
                  <button
                    key={pt.id}
                    onClick={() => handleTypeChange(i)}
                    className={`shrink-0 p-3 rounded-lg border text-sm font-medium transition-colors ${
                      selectedIndex === i
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {pt.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Base Package */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" /> Base Package
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-primary/5 border-primary/30">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked disabled className="rounded" />
                  <span className="text-sm">
                    {currentType.baseDescription}
                    <span className="ml-2 text-xs text-muted-foreground">(always included)</span>
                  </span>
                </div>
                <span className="text-sm font-medium">${currentType.basePrice.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Feature Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Add-on Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentType.features.map((feature) => (
                  <label
                    key={feature.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      checkedFeatures[feature.id] ? 'bg-primary/5 border-primary/30' : 'hover:bg-accent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!checkedFeatures[feature.id]}
                        onChange={() => toggleFeature(feature.id)}
                        className="rounded"
                      />
                      <span className="text-sm">{feature.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {checkedFeatures[feature.id] && feature.supportsQuantity && (
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            min="1"
                            value={quantities[feature.id] || 1}
                            onChange={(e) =>
                              setQuantities((prev) => ({
                                ...prev,
                                [feature.id]: parseInt(e.target.value) || 1,
                              }))
                            }
                            className="w-16 h-7 text-xs text-center"
                            onClick={(e) => e.preventDefault()}
                          />
                          {feature.unitLabel && (
                            <span className="text-xs text-muted-foreground">{feature.unitLabel}</span>
                          )}
                        </div>
                      )}
                      <span className="text-sm font-medium w-20 text-right">
                        ${getFeatureTotal(feature).toLocaleString() || feature.price.toLocaleString()}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-4">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-4 w-4" /> Quote Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Client name for quote"
                />
              </div>

              <div className="space-y-2">
                <Label>Client Phone <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+998 ..."
                />
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span>Rush Fee</span>
                  <div className="flex items-center gap-1">
                    <select
                      value={rushFee}
                      onChange={(e) => setRushFee(parseInt(e.target.value))}
                      className="h-7 text-xs rounded border px-1"
                    >
                      <option value="0">None</option>
                      <option value="30">+30%</option>
                      <option value="50">+50%</option>
                    </select>
                    {rushFee > 0 && (
                      <span className="text-amber-600">+${rushAmount.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span>Discount</span>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      value={discount}
                      onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                      className="w-16 h-7 text-xs text-center"
                    />
                    <span className="text-xs">%</span>
                    {discount > 0 && (
                      <span className="text-green-600">-${discountAmount.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span>Referral Fee</span>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min="0"
                      max="20"
                      value={referralPercent}
                      onChange={(e) => setReferralPercent(parseInt(e.target.value) || 0)}
                      className="w-16 h-7 text-xs text-center"
                    />
                    <span className="text-xs">%</span>
                  </div>
                </div>
                {referralPercent > 0 && (
                  <>
                    <div className="flex justify-between text-amber-600">
                      <span>Referral payout</span>
                      <span>-${referralAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Your net revenue</span>
                      <span>${netRevenue.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </div>

              <Button onClick={saveQuote} disabled={saving || !clientName.trim()} className="w-full">
                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save as Quote'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
