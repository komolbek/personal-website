'use client';

import { useCallback } from 'react';

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
  labels?: {
    currency?: string;
    approx?: string;
  };
}

// UZS/USD rate constant
const UZS_PER_USD = 12_500;

// Logarithmic scale: min 10M, max 1B+ UZS
const MIN_LOG = Math.log(10_000_000);
const MAX_LOG = Math.log(1_500_000_000);

function logToValue(position: number): number {
  // position: 0-100 → UZS value on log scale
  const log = MIN_LOG + (position / 100) * (MAX_LOG - MIN_LOG);
  return Math.round(Math.exp(log));
}

function valueToLog(value: number): number {
  // UZS value → 0-100 position
  const clamped = Math.max(10_000_000, Math.min(1_500_000_000, value));
  return ((Math.log(clamped) - MIN_LOG) / (MAX_LOG - MIN_LOG)) * 100;
}

function formatUZS(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1).replace('.0', '')} mlrd`;
  }
  // Format with space separators
  return value.toLocaleString('ru-RU').replace(/,/g, ' ');
}

function formatUSD(uzs: number): string {
  const usd = Math.round(uzs / UZS_PER_USD);
  if (usd >= 1_000) {
    return `$${(usd / 1_000).toFixed(usd >= 10_000 ? 0 : 1)}k`;
  }
  return `$${usd.toLocaleString('en-US')}`;
}

const tickMarks = [
  { value: 10_000_000, label: '10M' },
  { value: 50_000_000, label: '50M' },
  { value: 100_000_000, label: '100M' },
  { value: 300_000_000, label: '300M' },
  { value: 500_000_000, label: '500M' },
  { value: 1_000_000_000, label: '1B+' },
];

export function BudgetSlider({ value, onChange, labels }: BudgetSliderProps) {
  const position = valueToLog(value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pos = Number(e.target.value);
      onChange(logToValue(pos));
    },
    [onChange]
  );

  const currency = labels?.currency || 'UZS';
  const approx = labels?.approx || '≈';

  return (
    <div className="w-full px-2">
      {/* Value display */}
      <div className="text-center mb-8">
        <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
          {formatUZS(value)} <span className="text-2xl sm:text-3xl">{currency}</span>
        </div>
        <div className="text-lg text-gray-500">
          {approx} {formatUSD(value)}
        </div>
      </div>

      {/* Slider */}
      <div className="relative py-4">
        {/* Track background */}
        <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 rounded-full bg-gray-200" />
        {/* Track fill */}
        <div
          className="absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all"
          style={{ width: `${position}%` }}
        />

        {/* Input */}
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={position}
          onChange={handleChange}
          className="relative w-full h-2 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-indigo-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-indigo-500/30 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-indigo-500 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing"
          style={{
            // Ensure thumb is above fill track
          }}
        />
      </div>

      {/* Tick marks */}
      <div className="relative mt-2 h-6">
        {tickMarks.map((tick) => {
          const pos = valueToLog(tick.value);
          return (
            <button
              key={tick.value}
              type="button"
              onClick={() => onChange(tick.value)}
              className="absolute -translate-x-1/2 text-xs text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer"
              style={{ left: `${pos}%` }}
            >
              {tick.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
