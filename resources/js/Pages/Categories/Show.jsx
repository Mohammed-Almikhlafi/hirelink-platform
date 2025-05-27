import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import JobCard from '@/Components/JobCard';

const Show = ({ category }) => {
    return (
        <MainLayout>
            <Head title={category.name} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-8">
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {category.name}
                                </h1>
                                {category.description && (
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {category.description}
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-gray-200 dark:border-slate-700 pt-8">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Jobs in this Category
                                </h2>

                                <div className="space-y-6">
                                    {category.jobs.length > 0 ? (
                                        category.jobs.map((job) => (
                                            <JobCard key={job.id} job={job} />
                                        ))
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                            No jobs found in this category.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Show;
