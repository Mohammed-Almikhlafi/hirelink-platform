// resources/js/Components/JobFilters.jsx
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Search, Filter, X } from 'lucide-react';

export default function JobFilters({ filters = {}, categories = [] }) {
  const [searchTerm, setSearchTerm] = useState(filters.query || '');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
  const [location, setLocation] = useState(filters.location || '');
  const [jobType, setJobType] = useState(filters.type || '');
  const [showFilters, setShowFilters] = useState(false);

  // Send filters back to server
  const applyFilters = () => {
    router.get(route('jobs.index'), {
      query: searchTerm || undefined,
      category: selectedCategory || undefined,
      location: location || undefined,
      type: jobType || undefined,
    }, { 
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Reset all
  const clearAll = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setLocation('');
    setJobType('');
    router.get(route('jobs.index'), {}, { 
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 border border-slate-200 dark:border-slate-700/50">
      {/* Search + Filter Buttons */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search jobs…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyFilters()}
            className="input pl-10"
          />
        </div>

        <button
          onClick={() => setShowFilters(o => !o)}
          className="btn-secondary inline-flex items-center gap-2 flex-shrink-0"
        >
          <Filter className="w-5 h-5" />
          Filters
          {(selectedCategory || location || jobType) && (
            <span className="w-2 h-2 rounded-full bg-primary" />
          )}
        </button>

        <button
          onClick={applyFilters}
          className="btn-primary inline-flex items-center justify-center px-6"
        >
          Apply
        </button>
      </div>

      {/* Expanded Filters Panel */}
      {showFilters && (
        <div className="mt-6 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="input"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="City, region, or keyword"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="input"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Job Type
            </label>
            <select
              value={jobType}
              onChange={e => setJobType(e.target.value)}
              className="input"
            >
              <option value="">Any Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          {/* Clear Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-2 text-sm text-red-600 hover:underline"
            >
              <X className="w-4 h-4" />
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
