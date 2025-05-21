import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function HomeStandalone({ user = null, jobs = [], categories = [] }) {
  // Loading state
  if (!Array.isArray(jobs) || !Array.isArray(categories)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Head title="Home" />
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Head title="Home" />

      {/* Navbar: fixed across all pages */}
      <header className="bg-indigo-500 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Job Portal</h1>
          <nav className="flex items-center">
            {/* Nav Links with animated underline */}
            {['Home', 'Jobs', 'About Us'].map((label, idx) => (
              <Link
                key={label}
                href={idx === 0 ? '/' : idx === 1 ? '/jobs' : '/about'}
                className="group relative mx-2 px-1 py-1 transform transition-transform duration-300 hover:scale-105"
              >
                <span className="relative z-10">{label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
            {/* Auth Links / Add Job */}
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transform transition-transform duration-200 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform transition-transform duration-200 hover:scale-105"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link
                href="/jobs/create"
                className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transform transition-transform duration-200 hover:scale-105"
              >
                + Add Job
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section with Search: only on Home */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Find Your <span className="text-purple-200">Perfect Job</span>
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Start your career journey with thousands of opportunities across various fields
              </p>
              {/* Search Input (only here) */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto lg:mx-0">
                <input
                  type="text"
                  placeholder="Job title or keywords"
                  className="flex-grow px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transform transition-transform duration-300 hover:scale-105"
                />
                <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-50 transform transition-transform duration-300 hover:scale-105 shadow-sm">
                  Search
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 hidden lg:block">
              <img src="/images/hero-illustration.svg" alt="Job Search" className="w-full max-w-xl mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Statistics, Categories, Featured Jobs ... */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Statistics Bar */}
        <div className="flex justify-around bg-gray-50 dark:bg-gray-800 py-8 rounded-xl mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-indigo-600">{jobs.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">Available Jobs</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-indigo-600">{categories.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">Job Categories</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-indigo-600">0</h3>
            <p className="text-gray-600 dark:text-gray-300">New Applicants</p>
          </div>
        </div>

        {/* Categories Grid */}
        <section className="mb-16">
  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Categories</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {categories.map((cat) => (
    
      <div key={cat.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">{cat.name}</h3>
        <p className="text-gray-600 dark:text-gray-400">{cat.jobs_count} jobs</p>
        <p className="text-gray-600 dark:text-gray-400">{cat.users?.length || 0} employees</p>
        {cat.users && cat.users.length > 0 && (
          <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-400">{cat.users.length} employees</p>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Users in this category:</h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm max-h-32 overflow-auto">
              {cat.users.map((user) => (
                <li key={user.id}>
                  {user.name} {user.specialization ? `- ${user.specialization}` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    ))}
  </div>
</section>


        {/* Featured Jobs */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Featured Jobs</h2>
            <Link href="/jobs" className="group relative text-indigo-600 hover:text-indigo-800 font-medium mx-2 px-1 py-1 transform transition-transform duration-300 hover:scale-105">
              View All →
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 6).map((job) => (
              <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    <Link href={`/jobs/${job.id}`} className="group relative hover:text-indigo-600 transform transition-transform duration-300 hover:scale-105">
                      {job.title}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 ease-out group-hover:w-full" />
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{job.company?.name || '-'}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{job.posted_at}</span>
                  <Link href={`/jobs/${job.id}`} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform transition-transform duration-300 hover:scale-105">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Job Portal. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
