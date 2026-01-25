'use client';

import { useEffect, useState, useRef } from 'react';

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

interface StatsCounterProps {
  stats: StatItem[];
  className?: string;
}

interface SingleStatProps {
  end: number;
  suffix?: string;
  className?: string;
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setDisplayValue(Math.floor(easeOutQuart * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

// Single stat counter for individual use
export function StatCounter({ end, suffix = '', className = '' }: SingleStatProps) {
  return (
    <div className={className}>
      <AnimatedNumber value={end} suffix={suffix} />
    </div>
  );
}

// Grid of stats for section use
export function StatsCounter({ stats, className = '' }: StatsCounterProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
