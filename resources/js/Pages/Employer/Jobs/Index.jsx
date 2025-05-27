import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Plus, Edit, Trash2, Users, Eye } from 'lucide-react';
import Pagination from '@/Components/Pagination';

export default function Index({ jobs, flash = {} }) {
    const { delete: destroy } = useForm();

    const handleDelete = (jobId) => {
        if (confirm('Are you sure you want to delete this job?')) {
            destroy(route('employer.jobs.destroy', jobId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <MainLayout>
            <Head title="Manage Jobs" />

            {flash.success && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="bg-green-50 dark:bg-green-500/20 p-4 rounded-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                    {flash.success}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    Manage Jobs
                                </h1>
                                <Link
                                    href={route('employer.jobs.create')}
                                    className="btn-primary flex items-center"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Post New Job
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full whitespace-nowrap">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700/50 text-left">
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Job Title</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applications</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Posted</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {jobs.data.map((job) => (
                                            <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {job.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {job.location}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                                                        {/* {job.job_category.name} */}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={route('employer.jobs.applications', job.id)}
                                                        className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary"
                                                    >
                                                        <Users className="w-4 h-4 mr-1" />
                                                        {job.applications_count || 0}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        job.status === 'open'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'
                                                    }`}>
                                                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(job.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Link
                                                            href={route('employer.jobs.show', job.id)}
                                                            className="text-gray-400 hover:text-primary"
                                                            title="View"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <Link
                                                            href={route('employer.jobs.edit', job.id)}
                                                            className="text-gray-400 hover:text-primary"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(job.id)}
                                                            className="text-gray-400 hover:text-red-600"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {jobs.data.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-gray-500 dark:text-gray-400">
                                            No jobs posted yet
                                        </div>
                                        <Link
                                            href={route('employer.jobs.create')}
                                            className="btn-primary mt-4"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Post Your First Job
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {jobs.links && (
                                <div className="mt-6">
                                    <Pagination links={jobs.links} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
