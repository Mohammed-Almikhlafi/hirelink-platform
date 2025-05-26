import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import JobCard from '@/Components/JobCard';
import JobFilters from '@/Components/JobFilters';

const Index = ({ jobs = { data: [] }, filters = {}, categories = [] }) => {
    return (
        <MainLayout>
            <Head title="Jobs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                                Available Jobs
                            </h1>
                            
                            <JobFilters 
                                filters={filters} 
                                categories={categories} 
                            />

                            <div className="mt-6 space-y-6">
                                {jobs.data.length > 0 ? (
                                    jobs.data.map(job => (
                                        <JobCard key={job.id} job={job} />
                                    ))
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                        No jobs found matching your criteria.
                                    </p>
                                )}
                            </div>

                            {jobs.links && (
                                <div className="mt-6">
                                    {/* Add pagination component here if needed */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Index; 