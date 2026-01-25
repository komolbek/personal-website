import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

async function getStats() {
  try {
    const [
      productsCount,
      projectsCount,
      partnersCount,
      pendingFeedback,
      unreadContacts,
      stats,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.clientProject.count(),
      prisma.partner.count(),
      prisma.feedback.count({ where: { status: 'PENDING' } }),
      prisma.contactSubmission.count({ where: { isRead: false } }),
      prisma.companyStat.findMany({ orderBy: { order: 'asc' } }),
    ]);

    return {
      productsCount,
      projectsCount,
      partnersCount,
      pendingFeedback,
      unreadContacts,
      stats,
    };
  } catch {
    return {
      productsCount: 0,
      projectsCount: 0,
      partnersCount: 0,
      pendingFeedback: 0,
      unreadContacts: 0,
      stats: [],
    };
  }
}

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const data = await getStats();

  const cards = [
    { label: 'Products/Solutions', value: data.productsCount, href: '/admin/products', icon: '💼', color: 'indigo' },
    { label: 'Client Projects', value: data.projectsCount, href: '/admin/projects', icon: '🏗️', color: 'green' },
    { label: 'Partners', value: data.partnersCount, href: '/admin/partners', icon: '🤝', color: 'blue' },
    { label: 'Pending Feedback', value: data.pendingFeedback, href: '/admin/feedback', icon: '💬', color: 'amber', highlight: data.pendingFeedback > 0 },
    { label: 'Unread Contacts', value: data.unreadContacts, href: '/admin/contacts', icon: '📧', color: 'pink', highlight: data.unreadContacts > 0 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {session.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your website
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border-2 transition-all hover:shadow-md ${
              card.highlight
                ? 'border-amber-400 dark:border-amber-500'
                : 'border-transparent'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{card.icon}</span>
              {card.highlight && (
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              )}
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {card.value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {card.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Company Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Company Statistics (Public)
          </h2>
          <Link
            href="/admin/stats"
            className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
          >
            Edit Stats →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.stats.map((stat) => (
            <div
              key={stat.id}
              className={`p-4 rounded-lg ${
                stat.isVisible
                  ? 'bg-gray-50 dark:bg-gray-700'
                  : 'bg-gray-100 dark:bg-gray-700/50 opacity-50'
              }`}
            >
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label_en}
              </div>
              {!stat.isVisible && (
                <div className="text-xs text-gray-400 mt-1">(Hidden)</div>
              )}
            </div>
          ))}
          {data.stats.length === 0 && (
            <p className="col-span-full text-gray-500 dark:text-gray-400">
              No statistics configured yet.{' '}
              <Link href="/admin/stats" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Add some stats
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-xl">➕</span>
            <span className="text-gray-700 dark:text-gray-300">Add Product</span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-xl">➕</span>
            <span className="text-gray-700 dark:text-gray-300">Add Project</span>
          </Link>
          <Link
            href="/admin/partners/new"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-xl">➕</span>
            <span className="text-gray-700 dark:text-gray-300">Add Partner</span>
          </Link>
          <Link
            href="/admin/feedback"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-xl">✅</span>
            <span className="text-gray-700 dark:text-gray-300">Review Feedback</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
