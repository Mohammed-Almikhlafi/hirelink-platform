// resources/js/Pages/Home.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/NavLink';
import HeroSection from '@/Components/HeroSection';
import CategoriesSection from '@/Components/CategoriesSection';
import ProfessionalsSection from '@/Components/ProfessionalsSection';
import FeaturedJobsSection from '@/Components/FeaturedJobsSection';
import Footer from '@/Components/Footer';
// import "../../css/theme.css";
export default function Home({ user = null, jobs = [], categories = [], users = [] }) {
  // Loading check
  if (!Array.isArray(jobs) || !Array.isArray(categories) || !Array.isArray(users)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 theme-dark">
        <Head title="Home theme-dark" />
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading…</p>
      </div>
    );
  }

  return (
    <>
      <Head title="Home theme-dark" />
      <div className="-[#BDAEAD] min-h-screen flex flex-col">
        <Navbar user={user} className="theme-dark theme-dark" />
        <HeroSection className="theme-dark theme-dark" />
        <main className="flex-grow max-w-7xl mx-auto px-4 py-12 md:py-20 space-y-16 theme-dark">
          <CategoriesSection categories={categories} className="theme-dark" />
          <ProfessionalsSection users={users} className="theme-dark" />
          <FeaturedJobsSection jobs={jobs.slice(0, 6)} className="theme-dark" />
        </main>
        <Footer className="theme-dark" />
      </div>
    </>
    
  );

  
}
