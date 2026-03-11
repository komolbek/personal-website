'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';

type PricingItem = {
  name: string;
  type: string;
  price: number;
  checked: boolean;
};

const PROJECT_TYPES = [
  { value: 'website', label: 'Website / Landing Page' },
  { value: 'webapp', label: 'Web Application / SaaS' },
  { value: 'telegram_bot', label: 'Telegram Bot' },
  { value: 'mobile', label: 'Mobile Application' },
];

export function CalculatorClient({
  pricingData,
}: {
  pricingData: Record<string, { name: string; type: string; price: number }[]>;
}) {
  const [projectType, setProjectType] = useState('website');
  const [items, setItems] = useState<PricingItem[]>([]);
  const [rushFee, setRushFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState<Record<number, number>>({});
  const [clientName, setClientName] = useState('');
  const [referralPercent, setReferralPercent] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const data = pricingData[projectType] || [];
    setItems(data.map((i) => ({ ...i, checked: i.type === 'BASE' })));
    setQuantity({});
  }, [projectType, pricingData]);

  const toggleItem = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index && item.type !== 'BASE' ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getItemTotal = (item: PricingItem, index: number) => {
    if (!item.checked) return 0;
    return item.price * (quantity[index] || 1);
  };

  const subtotal = items.reduce((sum, item, i) => sum + getItemTotal(item, i), 0);
  const rushAmount = subtotal * (rushFee / 100);
  const afterRush = subtotal + rushAmount;
  const discountAmount = afterRush * (discount / 100);
  const total = afterRush - discountAmount;
  const referralAmount = total * (referralPercent / 100);
  const netRevenue = total - referralAmount;

  async function saveQuote() {
    if (!clientName.trim()) return;
    setSaving(true);

    const selectedItems = items
      .map((item, i) => ({
        feature: item.name,
        price: getItemTotal(item, i),
        quantity: quantity[i] || 1,
      }))
      .filter((_, i) => items[i].checked);

    try {
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          items: selectedItems,
          basePrice: subtotal,
          totalPrice: total,
          rushFeeApplied: rushFee > 0,
          rushFeePercent: rushFee || null,
          discountPercent: discount || null,
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
          {/* Project Type Selection */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {PROJECT_TYPES.map((pt) => (
                  <button
                    key={pt.value}
                    onClick={() => setProjectType(pt.value)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      projectType === pt.value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feature Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <label
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      item.checked ? 'bg-primary/5 border-primary/30' : 'hover:bg-accent'
                    } ${item.type === 'BASE' ? 'opacity-80 cursor-default' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(index)}
                        disabled={item.type === 'BASE'}
                        className="rounded"
                      />
                      <span className="text-sm">
                        {item.name}
                        {item.type === 'BASE' && (
                          <span className="ml-2 text-xs text-muted-foreground">(included)</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.checked && item.name.includes('per ') && (
                        <Input
                          type="number"
                          min="1"
                          value={quantity[index] || 1}
                          onChange={(e) =>
                            setQuantity((prev) => ({
                              ...prev,
                              [index]: parseInt(e.target.value) || 1,
                            }))
                          }
                          className="w-16 h-7 text-xs text-center"
                        />
                      )}
                      <span className="text-sm font-medium w-16 text-right">
                        ${getItemTotal(item, index).toLocaleString()}
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
