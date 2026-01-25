'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/hooks/useLocale';
import { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AppleIcon, PlayStoreIcon, ExternalLinkIcon } from '@/components/ui/Icons';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { locale, t } = useLocale();

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
          href="/projects"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
        >
          ← {t.projects.backToProjects}
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="primary" size="md">
              {project.category}
            </Badge>
            {project.featured && (
              <Badge variant="warning" size="md">
                {t.common.featured}
              </Badge>
            )}
            {project.completedDate && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {project.completedDate}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="gradient-text">{project.title[locale]}</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.description[locale]}
          </p>
        </div>

        {/* Hero Image */}
        {project.images.length > 0 && (
          <div className="mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500/20 to-pink-500/20 p-8">
            <div className="relative h-64 md:h-96">
              <Image
                src={project.images[0]}
                alt={project.title[locale]}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* Challenge Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t.projects.challenge}
          </h2>
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.challenge[locale]}
            </p>
          </div>
        </div>

        {/* Solution Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t.projects.solution}
          </h2>
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.solution[locale]}
            </p>
          </div>
        </div>

        {/* Results Section */}
        {project.results && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.projects.results}
            </h2>
            <div className="p-6 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-xl">
              <p className="text-gray-900 dark:text-white font-medium leading-relaxed">
                {project.results[locale]}
              </p>
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t.projects.techStack}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="default" size="md">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Screenshots Gallery */}
        {project.images.length > 1 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Screenshots
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative h-48 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
                >
                  <Image
                    src={image}
                    alt={`${project.title[locale]} screenshot ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {project.links && (
          <div className="flex flex-wrap gap-4">
            {project.links.appStore && (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                <AppleIcon className="w-5 h-5" />
                <span>{t.projects.links.appStore}</span>
              </a>
            )}
            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                <PlayStoreIcon className="w-5 h-5" />
                <span>{t.projects.links.playStore}</span>
              </a>
            )}
            {project.links.website && (
              <a
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                <ExternalLinkIcon className="w-5 h-5" />
                <span>{t.projects.links.website}</span>
              </a>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Interested in a similar project?
          </p>
          <Button href="/contact">
            {t.common.contactUs}
          </Button>
        </div>
      </div>
    </div>
  );
}
