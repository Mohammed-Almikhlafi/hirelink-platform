import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import UserCard from '@/Components/UserCard';
import { Search, Filter, X } from 'lucide-react';
import qs from 'qs';

export default function Index({ professionals, categories, skills, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedSkills, setSelectedSkills] = useState(filters.skills ? filters.skills.split(',') : []);
    const [showFilters, setShowFilters] = useState(false);

    // Update URL with filters
    useEffect(() => {
        const query = {
            search: searchTerm || undefined,
            category: selectedCategory || undefined,
            skills: selectedSkills.length > 0 ? selectedSkills.join(',') : undefined,
        };

        // Remove undefined values
        Object.keys(query).forEach(key => query[key] === undefined && delete query[key]);

        router.get('/professionals', query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [searchTerm, selectedCategory, selectedSkills]);

    const handleSkillToggle = (skill) => {
        setSelectedSkills(prev =>
            prev.includes(skill)
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedSkills([]);
    };

    return (
        <AppLayout>
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
                            className="input pl-10 w-full"
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
                                    className="input w-full"
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
                                            key={skill.id}
                                            onClick={() => handleSkillToggle(skill.name)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                                                ${selectedSkills.includes(skill.name)
                                                    ? 'bg-primary text-white'
                                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                                }`}
                                        >
                                            {skill.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        {(selectedCategory || selectedSkills.length > 0) && (
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={clearFilters}
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
                        Showing {professionals.data.length} professionals
                        {searchTerm && ' matching "' + searchTerm + '"'}
                    </p>
                </div>

                {/* Professionals Grid */}
                {professionals.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {professionals.data.map(professional => (
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

                {/* Pagination */}
                {professionals.links && professionals.links.length > 3 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="flex items-center gap-2">
                            {professionals.links.map((link, index) => {
                                // Skip if it's just "..." placeholder
                                if (link.url === null) return null;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (!link.url) return;
                                            const params = qs.parse(link.url.split('?')[1]);
                                            router.get('/professionals', params, {
                                                preserveState: true,
                                                preserveScroll: true,
                                            });
                                        }}
                                        className={`px-3 py-1 rounded text-sm font-medium ${
                                            link.active
                                                ? 'bg-primary text-white'
                                                : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                                        }`}
                                        disabled={!link.url}
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 