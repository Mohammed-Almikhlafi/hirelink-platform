import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Building2, Calendar, Download } from 'lucide-react';
import Pagination from '@/Components/Pagination';

export default function Applications({ job, applications, flash = {} }) {
    const { put } = useForm();

    const handleStatusChange = (applicationId, newStatus) => {
        put(route('employer.jobs.applications.update', { job: job.id, application: applicationId }), {
            status: newStatus,
        }, {
            preserveScroll: true,
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400',
            shortlisted: 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400',
            rejected: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400',
            accepted: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400',
        };
        return colors[status] || colors.pending;
    };

    return (
        <MainLayout>
            <Head title={`Applications - ${job.title}`} />

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
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={route('employer.jobs.show', job.id)}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                        >
                            ← Back to Job
                        </Link>
                        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                            Applications for {job.title}
                        </h1>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                <span>{job.company.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Applications List */}
                    <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700/50 text-left">
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applicant</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applied On</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {applications.data.map((application) => (
                                        <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={application.user.profile?.avatar_url || '/images/placeholder.png'}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {application.user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {application.user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(application.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={application.status}
                                                    onChange={(e) => handleStatusChange(application.id, e.target.value)}
                                                    className={`text-sm rounded-full px-2 py-1 border-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary focus:ring focus:ring-primary/20 ${getStatusColor(application.status)}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="shortlisted">Shortlisted</option>
                                                    <option value="rejected">Rejected</option>
                                                    <option value="accepted">Accepted</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => window.location.href = route('employer.jobs.applications.resume', { job: job.id, application: application.id })}
                                                        className="text-primary hover:text-primary/80 inline-flex items-center"
                                                        disabled={!application.resume_url}
                                                    >
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Resume
                                                    </button>
                                                    <Link
                                                        href={route('employer.jobs.applications.details', { job: job.id, application: application.id })}
                                                        className="text-primary hover:text-primary/80"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {applications.data.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-gray-500 dark:text-gray-400">
                                        No applications received yet
                                    </div>
                                </div>
                            )}
                        </div>

                        {applications.links && (
                            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                <Pagination links={applications.links} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 