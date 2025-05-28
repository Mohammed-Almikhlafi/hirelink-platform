import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Building2, Calendar, Download, Mail, Phone, MapPin, User } from 'lucide-react';

export default function ApplicationDetails({ job, application, flash = {} }) {
    return (
        <MainLayout>
            <Head title={`Application Details - ${job.title}`} />

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
                    <div className="mb-6">
                        <Link
                            href={route('employer.jobs.applications', { job: job.id })}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                        >
                            ← Back to Applications
                        </Link>
                        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                            Application Details
                        </h1>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                <span>{job.title}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Applied on {new Date(application.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
                        <div className="p-6">
                            {/* Applicant Information */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Applicant Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex items-start gap-3">
                                            <User className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {application.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    Full Name
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {application.user.email}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    Email Address
                                                </div>
                                            </div>
                                        </div>
                                        {application.user.profile?.phone && (
                                            <div className="flex items-start gap-3">
                                                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        {application.user.profile.phone}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        Phone Number
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {application.user.profile?.location && (
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        {application.user.profile.location}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        Location
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Cover Letter */}
                                {application.cover_letter && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                            Cover Letter
                                        </h2>
                                        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                                            <div className="prose dark:prose-invert max-w-none">
                                                <div className="whitespace-pre-wrap">
                                                    {application.cover_letter}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Resume */}
                                {application.resume_url && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                            Resume
                                        </h2>
                                        <button
                                            onClick={() => window.location.href = route('employer.jobs.applications.resume', { job: job.id, application: application.id })}
                                            className="btn-secondary inline-flex items-center"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Resume
                                        </button>
                                    </div>
                                )}

                                {/* Application Status */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Application Status
                                    </h2>
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                        application.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400'
                                            : application.status === 'shortlisted'
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400'
                                            : application.status === 'rejected'
                                            ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'
                                            : 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                                    }`}>
                                        {application.application_status.charAt(0).toUpperCase() + application.application_status.slice(1)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 