// resources/js/Pages/Home.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import HeroSection from '@/Components/HeroSection';
import CategoriesSection from '@/Components/CategoriesSection';
import ProfessionalsSection from '@/Components/ProfessionalsSection';
import FeaturedJobsSection from '@/Components/FeaturedJobsSection';

export default function Home({ user = null, jobs = [], categories = [], users = [] }) {
  // Loading check
  if (!Array.isArray(jobs) || !Array.isArray(categories) || !Array.isArray(users)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Head title="Home" />
        <div className="animate-pulse space-y-4 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-primary/20" />
          <p className="text-lg text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
        
      </div>                                                                                                                                                                                                                              
    );
  }

  return (
    <AppLayout title="Home">
      <Head title="Home" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-600 to-accent-600">
        <div className="absolute inset-0 bg-grid-white/[0.2] dark:bg-grid-white/[0.1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find Your Next
              <span className="block mt-2 text-accent-200">Dream Career</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto mb-8">
              Connect with top employers and discover opportunities that match your skills and aspirations.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#search" className="btn-primary">
                Search Jobs
              </a>
              <a href="#categories" className="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/10">
                Browse Categories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <div id="search">
        <HeroSection categories={categories} />
      </div>

      {/* Main Content */}
      <main>
        {/* Categories Section */}
        <section id="categories" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategoriesSection 
              categories={categories} 
              className="scroll-mt-20" 
            />
          </div>
        </section>

        {/* Professionals Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProfessionalsSection 
              users={users} 
              className="scroll-mt-20" 
            />
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedJobsSection 
              jobs={jobs.slice(0, 6)} 
              className="scroll-mt-20" 
            />
          </div>
        </section>
      </main>
    </AppLayout>
  );
}
