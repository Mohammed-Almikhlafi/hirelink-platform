import React from 'react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
  return (
    <div className="bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Headline */}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Find Your Next Opportunity
        </h1>
        <p className="text-lg text-gray-600 dark:text-slate-300 mb-8">
          Thousands of jobs from top companies—start exploring today.
        </p>

        {/* Primary CTA */}
        <Link
          href={route('jobs.index')}
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
        >
          Search Jobs
        </Link>
      </div>
    </div>
  );
}
