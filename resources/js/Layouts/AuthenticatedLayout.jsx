// resources/js/Layouts/AuthenticatedLayout.jsx
import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ title, header, children }) {
  const { auth } = usePage().props;

  return (
    <>
      <Head title={title} />

      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-semibold"
          >
            Home
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-200">
              👋 <strong>{auth.user.name}</strong>
            </span>
            <Link
              href="/logout"
              method="post"
              as="button"
              className="
                px-4 py-2 
                bg-red-600 hover:bg-red-700 
                text-white font-medium 
                rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-red-500
                transition
              "
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      {header && (
        <div className="bg-gray-50 dark:bg-gray-900 border-b">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </div>
      )}

      <main className="bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-4rem)] py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  );
}
