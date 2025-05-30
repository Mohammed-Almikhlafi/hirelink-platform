import React, { useEffect, useState, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Index({ applications }) {
  const statusStyles = {
    pending: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-500/20',
    shortlisted: 'text-blue-600 bg-blue-100 dark:bg-blue-500/20',
    accepted: 'text-green-600 bg-green-100 dark:bg-green-500/20',
    rejected: 'text-red-600 bg-red-100 dark:bg-red-500/20',
  };

  const [items, setItems] = useState(applications.data);
  const [nextPageUrl, setNextPageUrl] = useState(applications.next_page_url);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && nextPageUrl && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [nextPageUrl, loading]);

  const loadMore = () => {
    setLoading(true);
    router.get(
      nextPageUrl,
      {},
      {
        preserveScroll: true,
        preserveState: true,
        only: ['applications'],
        onSuccess: (page) => {
          setItems((prev) => [...prev, ...page.props.applications.data]);
          setNextPageUrl(page.props.applications.next_page_url);
        },
        onFinish: () => setLoading(false),
      }
    );
  };

  return (
    <MainLayout title="My Applications">
      <Head title="My Applications" />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          My Applications
        </h1>

        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((app) => (
              <Link
                key={app.id}
                href={route('jobseeker.applications.show', app.id)}
                className="block bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 hover:shadow transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium text-slate-900 dark:text-white">
                      {app.job.title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {app.job.company.name}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      statusStyles[app.application_status] || 'text-slate-600'
                    }`}
                  >
                    {app.application_status.charAt(0).toUpperCase() +
                      app.application_status.slice(1)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Applied {app.applied_at}
                </p>
              </Link>
            ))}

            {/* Infinite Scroll Loader Trigger */}
            {nextPageUrl && (
              <div ref={observerRef} className="text-center py-6">
                <span className="text-slate-500 dark:text-slate-400">Loading more...</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-slate-600 dark:text-slate-400">
            You haven’t applied to any jobs yet.
          </p>
        )}
      </div>
    </MainLayout>
  );
}
