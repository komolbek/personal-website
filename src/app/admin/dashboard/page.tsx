import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface DashboardData {
  productsCount: number;
  projectsCount: number;
  partnersCount: number;
  blogPostsCount: number;
  pendingFeedback: number;
  unreadContacts: number;
}

async function getStats(): Promise<DashboardData> {
  try {
    const [
      productsCount,
      projectsCount,
      partnersCount,
      blogPostsCount,
      pendingFeedback,
      unreadContacts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.clientProject.count(),
      prisma.partner.count(),
      prisma.blogPost.count(),
      prisma.feedback.count({ where: { status: 'PENDING' } }),
      prisma.contactSubmission.count({ where: { isRead: false } }),
    ]);

    return {
      productsCount,
      projectsCount,
      partnersCount,
      blogPostsCount,
      pendingFeedback,
      unreadContacts,
    };
  } catch {
    return {
      productsCount: 0,
      projectsCount: 0,
      partnersCount: 0,
      blogPostsCount: 0,
      pendingFeedback: 0,
      unreadContacts: 0,
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
    { label: 'Products/Solutions', value: data.productsCount, href: '/admin/products', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a4 4 0 0 0-8 0v2"/></svg>, color: 'indigo' },
    { label: 'Client Projects', value: data.projectsCount, href: '/admin/projects', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>, color: 'green' },
    { label: 'Partners', value: data.partnersCount, href: '/admin/partners', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, color: 'blue' },
    { label: 'Blog Posts', value: data.blogPostsCount, href: '/admin/blog', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>, color: 'purple' },
    { label: 'Pending Feedback', value: data.pendingFeedback, href: '/admin/feedback', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, color: 'amber', highlight: data.pendingFeedback > 0 },
    { label: 'Unread Contacts', value: data.unreadContacts, href: '/admin/contacts', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, color: 'pink', highlight: data.unreadContacts > 0 },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
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
              <span>{card.icon}</span>
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
            <span><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
            <span className="text-gray-700 dark:text-gray-300">Add Product</span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
            <span className="text-gray-700 dark:text-gray-300">Add Project</span>
          </Link>
          <Link
            href="/admin/partners/new"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
            <span className="text-gray-700 dark:text-gray-300">Add Partner</span>
          </Link>
          <Link
            href="/admin/feedback"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>
            <span className="text-gray-700 dark:text-gray-300">Review Feedback</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
