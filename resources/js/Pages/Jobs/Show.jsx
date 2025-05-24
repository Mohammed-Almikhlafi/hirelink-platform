import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, MapPin, CalendarDays } from 'lucide-react';

export default function JobShow({ job }) {
  const company = job.company || {};

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
          <Head title={job.title} />

          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6">
              {/* Header */}
              <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {job.title}
                  </h1>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                      {company.name && (
                          <div className="flex items-center space-x-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{company.name}</span>
                          </div>
                      )}
                      {job.location && (
                          <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                          </div>
                      )}
                      {job.posted_at && (
                          <div className="flex items-center space-x-1">
                              <CalendarDays className="w-4 h-4" />
                              <span>{job.posted_at}</span>
                          </div>
                      )}
                  </div>
              </div>

              {/* Description */}
              <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      Job Description
                  </h2>
                  <p>{job.description || "No description provided."}</p>
              </div>

              {/* Buttons */}
              <div className="pt-6 flex justify-between items-center">
                  <Link
                      href="/"
                      className="inline-block text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                      &larr; Back to Home
                  </Link>{" "}
                  <a
                      href={`/apply/${job.id}`}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                  >
                      Apply Now
                  </a>
              </div>
          </div>
          <div className="flex justify-end">
              <Link href="/jobs/create" className="btn">
                  Create New Job
              </Link>
          </div>
      </div>
  );

}

