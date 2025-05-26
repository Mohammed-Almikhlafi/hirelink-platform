import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import UserCard from '@/Components/UserCard';
import { Search, Filter, X } from 'lucide-react';
import MainLayout from '@/Layouts/MainLayout';

export default function Index({ professionals, categories, skills }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter professionals based on search and filters
  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = searchTerm === '' || 
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (professional.specialization && professional.specialization.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === '' || 
      professional.category_id === selectedCategory;

    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.every(skill => professional.skills?.includes(skill));

    return matchesSearch && matchesCategory && matchesSkills;
  });

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <MainLayout title="Find Professionals">
      <Head title="Find Professionals" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, specialization, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters
            {(selectedCategory || selectedSkills.length > 0) && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-8 border border-slate-200 dark:border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skills Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                        ${selectedSkills.includes(skill)
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCategory || selectedSkills.length > 0) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedSkills([]);
                  }}
                  className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredProfessionals.length} professionals
            {searchTerm && ' matching "' + searchTerm + '"'}
          </p>
        </div>

        {/* Professionals Grid */}
        {filteredProfessionals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map(professional => (
              <UserCard key={professional.id} user={professional} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/50">
            <img
              src="/images/no-results.svg"
              alt="No results"
              className="w-32 h-32 mx-auto mb-4 opacity-75"
            />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              No professionals found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 