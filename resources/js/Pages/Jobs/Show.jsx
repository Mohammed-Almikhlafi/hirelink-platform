import React from 'react';
import { Head } from '@inertiajs/react';
import { Building2, MapPin, Calendar } from 'lucide-react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { usePage } from '@inertiajs/react';


export default function Show({ job, hasApplied, canApply }) {
    const { auth } = usePage().props;

  return (
    <MainLayout title={job.title}>
      <Head title={job.title} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700/50">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  <span>{job.company.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            {/* Apply Button Section */}
<div className="mt-6">
  {!auth.user && (
    <Link
      href={route('login')}
      className="btn-primary w-full text-center"
    >
      Login to Apply
    </Link>
  )}
  
  {auth.user && auth.user.role !== 'job_seeker' && (
    <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
      Only job seekers can apply for jobs
    </div>
  )}

  {auth.user && auth.user.role === 'job_seeker' && (
    <>
      {hasApplied ? (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 p-4 rounded-lg text-center">
          You have already applied for this job
        </div>
      ) : canApply ? (
        <Link
          href={route('jobseeker.applications.create', job.id)}
          className="btn-primary w-full text-center"
        >
          Apply Now
        </Link>
      ) : (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 p-4 rounded-lg text-center">
          This job is no longer accepting applications
        </div>
      )}
    </>
  )}
</div>
          </div>

          {/* Description */}
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Job Description
            </h2>
            <div className="whitespace-pre-wrap text-slate-600 dark:text-slate-400">
              {job.description}
            </div>
          </div>

          {/* Company Info */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700/50">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              About {job.company.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {job.company.description || 'No company description available.'}
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

