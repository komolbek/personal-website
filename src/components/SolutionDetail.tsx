'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { Solution } from '@/types';
import { getProjectBySlug } from '@/config/projects';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { CheckCircleIcon, ArrowRightIcon } from '@/components/ui/Icons';

interface SolutionDetailProps {
  solution: Solution;
}

export function SolutionDetail({ solution }: SolutionDetailProps) {
  const { locale, t } = useLocale();

  const relatedProjects = solution.relatedProjects
    .map((slug) => getProjectBySlug(slug))
    .filter(Boolean);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/solutions"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
        >
          ← {t.solutions.backToSolutions}
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="gradient-text">{solution.title[locale]}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {solution.fullDescription[locale]}
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t.solutions.features}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {solution.features[locale].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t.solutions.benefits}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {solution.benefits[locale].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-xl"
              >
                <ArrowRightIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span className="font-medium text-gray-900 dark:text-white">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t.solutions.technologies}
          </h2>
          <div className="flex flex-wrap gap-2">
            {solution.technologies.map((tech) => (
              <Badge key={tech} variant="primary" size="md">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t.solutions.relatedProjects}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedProjects.map((project) => (
                project && (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    locale={locale}
                  />
                )
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t.solutions.cta}
          </h2>
          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100"
          >
            {t.solutions.ctaButton}
          </Button>
        </div>
      </div>
    </div>
  );
}
