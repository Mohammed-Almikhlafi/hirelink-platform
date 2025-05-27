import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { 
    Building2, MapPin, Calendar, Clock, 
    Briefcase, Tag, DollarSign, Users,
    Edit, Trash2, CheckCircle, XCircle
} from 'lucide-react';

export default function Show({ job, flash = {} }) {
    const { delete: destroy, put } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this job?')) {
            destroy(route('employer.jobs.destroy', job.id), {
                onSuccess: () => {
                    window.location = route('employer.jobs.index');
                },
            });
        }
    };

    const toggleStatus = () => {
        const newStatus = job.status === 'open' ? 'closed' : 'open';
        put(route('employer.jobs.update', job.id), {
            ...job,
            status: newStatus,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <MainLayout>
            <Head title={job.title} />

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
                    {/* Actions Bar */}
                    <div className="mb-6 flex justify-between items-center">
                        <Link
                            href={route('employer.jobs.index')}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                        >
                            ← Back to Jobs
                        </Link>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleStatus}
                                className={`btn-secondary inline-flex items-center ${
                                    job.status === 'open' ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {job.status === 'open' ? (
                                    <>
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Close Job
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Reopen Job
                                    </>
                                )}
                            </button>
                            <Link
                                href={route('employer.jobs.edit', job.id)}
                                className="btn-secondary flex items-center justify-center px-4"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Job
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="btn-danger flex items-center justify-center px-4"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Job
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
                        {/* Job Header */}
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {job.title}
                                    </h1>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Building2 className="w-4 h-4" />
                                            <span>{job.company.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        job.status === 'open'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                                            : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'
                                    }`}>
                                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Job Details */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="col-span-2">
                                <div className="prose dark:prose-invert max-w-none">
                                    <h2 className="text-lg font-semibold mb-4">Job Description</h2>
                                    <div className="whitespace-pre-wrap">{job.description}</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                        Job Overview
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-sm">
                                            <Briefcase className="w-4 h-4 mr-3 text-gray-400" />
                                            <div>
                                                <p className="text-gray-600 dark:text-gray-400">Job Type</p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Tag className="w-4 h-4 mr-3 text-gray-400" />
                                            <div>
                                                <p className="text-gray-600 dark:text-gray-400">Category</p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {job.category.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <DollarSign className="w-4 h-4 mr-3 text-gray-400" />
                                            <div>
                                                <p className="text-gray-600 dark:text-gray-400">Salary Range</p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {job.salary_range}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Clock className="w-4 h-4 mr-3 text-gray-400" />
                                            <div>
                                                <p className="text-gray-600 dark:text-gray-400">Application Deadline</p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {new Date(job.application_deadline).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Users className="w-4 h-4 mr-3 text-gray-400" />
                                            <div>
                                                <p className="text-gray-600 dark:text-gray-400">Applications</p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {job.applications_count || 0} received
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={route('employer.jobs.applications', job.id)}
                                    className="btn-primary w-full justify-center flex"
                                >
                                    <Users className="w-4 h-4 mr-2" />
                                    View Applications
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 