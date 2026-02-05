'use client';

import { Project } from '@/types';
import { MemoMindDetail } from '@/components/projects/MemoMindDetail';
import { FourEventDetail } from '@/components/projects/FourEventDetail';
import { StandAIDetail } from '@/components/projects/StandAIDetail';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  switch (project.slug) {
    case 'memomind':
      return <MemoMindDetail project={project} />;
    case '4event':
      return <FourEventDetail project={project} />;
    case 'standai':
      return <StandAIDetail project={project} />;
    default:
      return <MemoMindDetail project={project} />;
  }
}
