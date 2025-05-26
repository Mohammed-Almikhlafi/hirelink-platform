import React from 'react';
import { Link } from '@inertiajs/react';

const JobCard = ({ job }) => {
    return (
        <Link
            href={route('jobs.show', job.id)}
            className="block bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {job.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        {job.company?.name} • {job.location}
                    </p>
                    <div className="flex gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
                            {job.job_type}
                        </span>
                        {job.category?.name && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium rounded">
                                {job.category.name}
                            </span>
                        )}
                    </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(job.created_at).toLocaleDateString()}
                </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                {job.description}
            </p>

            {(job.salary_range || job.application_deadline) && (
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    {job.salary_range && <span>{job.salary_range}</span>}
                    {job.application_deadline && (
                        <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
                    )}
                </div>
            )}
        </Link>
    );
};

export default JobCard; 