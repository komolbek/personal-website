import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

interface ClientProject {
  id: string;
  slug: string;
  title_en: string;
  title_ru: string;
  title_uz: string;
  clientName: string | null;
  clientLogo: string | null;
  category: string;
  desc_en: string;
  desc_ru: string;
  desc_uz: string;
  thumbnail: string;
  featured: boolean;
  isVisible: boolean;
  order: number;
  product: { id: string; title_en: string } | null;
}

async function getProjects(): Promise<ClientProject[]> {
  try {
    return await prisma.clientProject.findMany({
      orderBy: { order: 'asc' },
      include: { product: true },
    });
  } catch {
    return [];
  }
}

async function deleteProject(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;

  await prisma.clientProject.delete({ where: { id } });

  revalidatePath('/admin/projects');
  revalidatePath('/');
  revalidatePath('/projects');
}

async function toggleVisibility(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const isVisible = formData.get('isVisible') === 'true';

  await prisma.clientProject.update({
    where: { id },
    data: { isVisible: !isVisible },
  });

  revalidatePath('/admin/projects');
  revalidatePath('/');
  revalidatePath('/projects');
}

async function toggleFeatured(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const featured = formData.get('featured') === 'true';

  await prisma.clientProject.update({
    where: { id },
    data: { featured: !featured },
  });

  revalidatePath('/admin/projects');
  revalidatePath('/');
}

const categoryLabels: Record<string, string> = {
  mobile: '📱 Mobile',
  website: '🌐 Website',
  crm: '📊 CRM',
  ai: '🤖 AI',
  ecommerce: '🛒 E-commerce',
};

export default async function ProjectsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Client Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage projects you&apos;ve completed for clients
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          Add Project
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        {projects.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No projects added yet.{' '}
            <Link href="/admin/projects/new" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Add your first project
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {projects.map((project) => (
              <div key={project.id} className="p-6 flex items-center gap-6">
                {/* Thumbnail */}
                <div className="w-20 h-14 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt={project.title_en} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl text-gray-400">🖼️</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {project.title_en}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded">
                        Featured
                      </span>
                    )}
                    {!project.isVisible && (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded">
                        Hidden
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>{categoryLabels[project.category] || project.category}</span>
                    {project.clientName && <span>• {project.clientName}</span>}
                    {project.product && (
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded">
                        {project.product.title_en}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <form action={toggleFeatured}>
                    <input type="hidden" name="id" value={project.id} />
                    <input type="hidden" name="featured" value={project.featured.toString()} />
                    <button
                      type="submit"
                      className={`p-2 rounded-lg transition-colors ${
                        project.featured
                          ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'text-gray-400 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={project.featured ? 'Unfeature' : 'Feature'}
                    >
                      ⭐
                    </button>
                  </form>

                  <form action={toggleVisibility}>
                    <input type="hidden" name="id" value={project.id} />
                    <input type="hidden" name="isVisible" value={project.isVisible.toString()} />
                    <button
                      type="submit"
                      className={`p-2 rounded-lg transition-colors ${
                        project.isVisible
                          ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'text-gray-400 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={project.isVisible ? 'Hide' : 'Show'}
                    >
                      {project.isVisible ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </form>

                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Edit"
                  >
                    ✏️
                  </Link>

                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <button
                      type="submit"
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Delete"
                      onClick={(e) => {
                        if (!confirm('Are you sure you want to delete this project?')) {
                          e.preventDefault();
                        }
                      }}
                    >
                      🗑️
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
