import React from 'react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:flex lg:items-center lg:justify-between gap-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Find Your <span className="text-purple-200">Perfect Job</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Start your career journey with thousands of opportunities across various fields
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto lg:mx-0">
            <input
              type="text"
              placeholder="Job title or keywords"
              className="flex-grow px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-transform duration-300 hover:scale-105"
            />
            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-50 transition-transform duration-300 hover:scale-105 shadow-sm">
              Search
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 hidden lg:block">
          <img src="/images/hero-illustration.svg" alt="Job Search" className="w-full max-w-xl mx-auto" />
        </div>
      </div>
    </section>
  );
}