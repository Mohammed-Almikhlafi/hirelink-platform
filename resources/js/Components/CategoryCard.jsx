// resources/js/Components/CategoryCard.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { Briefcase, Users, TrendingUp } from 'lucide-react';

export default function CategoryCard({ category }) {
  const jobsCount = category.jobs_count ?? 0;
  const usersCount = category.users?.length ?? 0;
  const growthRate = category.growth_rate ?? 0;

  return (
    <Link
      href={`/categories/${category.id}`}
      className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 
        hover:shadow-lg transition-all duration-200
        border border-slate-200 dark:border-slate-700/50
        hover:border-primary/50 dark:hover:border-primary/50"
    >
      {/* Category Icon - You can customize this based on category */}
      <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 
        flex items-center justify-center mb-4
        group-hover:scale-110 transition-transform duration-200">
        <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>

      {/* Category Name */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 
        group-hover:text-primary transition-colors">
        {category.name}
      </h3>

      {/* Description if available */}
      {category.description && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {category.description}
        </p>
      )}

      {/* Stats */}
      <div className="flex flex-wrap gap-3 mt-auto">
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {jobsCount} {jobsCount === 1 ? 'Job' : 'Jobs'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-success" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {usersCount} {usersCount === 1 ? 'Pro' : 'Pros'}
          </span>
        </div>

        {growthRate > 0 && (
          <div className="flex items-center gap-1.5 text-success">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">
              +{growthRate}%
            </span>
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-primary/[0.02] opacity-0 
        group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Link>
  );
}
