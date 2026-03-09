'use client';

import { Solution } from '@/types';
import { YuridixDetail } from '@/components/products/YuridixDetail';
import { OrdoDetail } from '@/components/products/OrdoDetail';
import { TalimXDetail } from '@/components/products/TalimXDetail';
import { GenericProductDetail } from '@/components/products/GenericProductDetail';

interface SolutionDetailProps {
  solution: Solution;
}

export function SolutionDetail({ solution }: SolutionDetailProps) {
  switch (solution.slug) {
    case 'yuridix':
      return <YuridixDetail solution={solution} />;
    case 'ordo':
      return <OrdoDetail solution={solution} />;
    case 'talimx':
      return <TalimXDetail solution={solution} />;
    default:
      return <GenericProductDetail solution={solution} />;
  }
}
