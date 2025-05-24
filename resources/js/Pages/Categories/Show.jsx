import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { User, Briefcase } from 'lucide-react';

export default function CategoryShow({ category }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
      <Head title={category.name} />

      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10">
        {/* عنوان التصنيف */}
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-6 drop-shadow-lg">
          {category.name}
        </h1>

        {/* الوصف */}
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
          {category.description || 'No description available.'}
        </p>

        {/* عنوان المستخدمين */}
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 border-b border-indigo-300 pb-2">
          Users in this category
        </h2>

        {category.users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {category.users.map(user => (
              <div
                key={user.id}
                className="bg-indigo-100/50 dark:bg-indigo-800/40 p-5 rounded-xl shadow-sm transition-transform hover:scale-[1.02] flex flex-col justify-between"
              >
                <div className="flex items-center mb-3">
                  <User className="w-6 h-6 text-indigo-600 mr-3" />
                  <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 truncate">
                    {user.name}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 mb-4">
                  <Briefcase className="w-4 h-4" />
                  <p className="text-sm italic truncate">{user.specialization}</p>
                </div>

                <Link
                  href={`/users/${user.id}`}
                  className="self-start px-4 py-1.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition text-sm"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 italic">No users registered in this category yet.</p>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block text-indigo-600 hover:text-indigo-800 font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
