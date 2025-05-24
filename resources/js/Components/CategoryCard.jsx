// resources/js/Components/CategoryCard.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function CategoryCard({ category }) {
  const jobsCount = category.jobs_count ?? 0;
  const usersCount = category.users?.length ?? 0;

  return (
    <Link
      href={`/categories/${category.id}`}
      className="
        bg-gray-900 
        rounded-2xl 
        p-6 
        shadow-md hover:shadow-xl 
        transition-all duration-200 ease-out 
        transform hover:scale-105 
        ring-0 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-600 
        block space-y-4
      "
    >
      <h3 className="text-xl font-semibold text-white">{category.name}</h3>

      <div className="flex justify-between items-center text-sm">
        <span className="bg-indigo-700 text-white px-3 py-1 rounded-full">
          {jobsCount} {jobsCount === 1 ? 'Job' : 'Jobs'}
        </span>
        <span className="bg-green-700 text-white px-3 py-1 rounded-full">
          {usersCount} {usersCount === 1 ? 'User' : 'Users'}
        </span>
      </div>
    </Link>
  );
}
