import React from 'react';
import { Link } from '@inertiajs/react';
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight, Building2 } from 'lucide-react';

export default function FeaturedJobsSection({ jobs, className = '' }) {
  return (
    <section className={className}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-primary" />
          <div>
            <h2 className="section-title mb-1">Featured Opportunities</h2>
            <p className="section-subtitle mb-0 text-base">
              Discover top positions from leading companies
            </p>
          </div>
        </div>

        <Link 
          href="/jobs"
          className="btn-secondary inline-flex items-center gap-2 text-sm whitespace-nowrap"
        >
          All Jobs
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <article
              key={job.id}
              className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 
                hover:shadow-lg transition-all duration-200
                border border-slate-200 dark:border-slate-700/50"
            >
              {/* Company Logo */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  {job.company?.logo ? (
                    <img
                      src={job.company.logo}
                      alt={job.company.name}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <Building2 className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                    {job.company?.name || 'Company Name'}
                  </p>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location || 'Remote'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>{job.type || 'Full-time'}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {job.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium text-primary-600 dark:text-primary-400 
                        bg-primary-50 dark:bg-primary-900/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action */}
              <Link
                href={`/jobs/${job.id}`}
                className="btn-primary w-full text-center text-sm"
              >
                View Details
              </Link>

              {/* Posted Time */}
              <div className="absolute top-6 right-6 text-xs text-slate-500 dark:text-slate-400">
                {job.posted_at}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            No featured jobs available at the moment.
          </p>
        </div>
      )}
    </section>
  );
}