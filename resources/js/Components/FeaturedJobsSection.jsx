import React from 'react';
import { Link } from '@inertiajs/react';

export default function FeaturedJobsSection({ jobs }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Featured Jobs</h2>
        <Link href="/jobs/Show" className="relative group text-indigo-600 hover:text-indigo-800 font-medium">
          View All →
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                <Link href={`/jobs/${job.id}`} className="relative group hover:text-indigo-600 transition-transform duration-300 hover:scale-105">
                  {job.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{job.company?.name || '-'}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{job.posted_at}</span>
              <Link href={`/jobs/${job.id}`} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">View Details</Link>
            </div>
          </div>
        ))}
      </div>
        </section>
        );

}