'use client';

import Image from 'next/image';
import { Partner } from '@/types';

interface PartnerLogoProps {
  partner: Partner;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-16',
};

export function PartnerLogo({ partner, size = 'md' }: PartnerLogoProps) {
  return (
    <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
      {partner.logo ? (
        <Image
          src={partner.logo}
          alt={partner.name}
          width={120}
          height={48}
          className={`${sizeClasses[size]} w-auto object-contain`}
        />
      ) : (
        <div className={`${sizeClasses[size]} flex items-center justify-center px-4 bg-gray-200 dark:bg-gray-700 rounded-lg`}>
          <span className="font-semibold text-gray-600 dark:text-gray-400 text-sm">
            {partner.name}
          </span>
        </div>
      )}
    </div>
  );
}
