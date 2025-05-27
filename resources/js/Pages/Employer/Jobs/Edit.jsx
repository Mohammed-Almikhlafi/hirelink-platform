import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import Select from '@/Components/Select';

export default function Edit({ job, categories, jobTypes, flash = {} }) {
    const { data, setData, put, processing, errors } = useForm({
        title: job.title,
        description: job.description,
        location: job.location,
        job_category_id: job.job_category_id,
        job_type: job.job_type,
        salary_range: job.salary_range,
        application_deadline: job.application_deadline.split('T')[0],
        status: job.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('employer.jobs.update', job.id), {
            preserveScroll: true,
        });
    };

    return (
        <MainLayout>
            <Head title={`Edit Job - ${job.title}`} />

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
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Edit Job
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Update the job details below
                                    </p>
                                </div>
                                <Link
                                    href={route('employer.jobs.show', job.id)}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                                >
                                    ← Back to Job
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Job Title */}
                                <div>
                                    <InputLabel htmlFor="title" value="Job Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                {/* Job Category */}
                                <div>
                                    <InputLabel htmlFor="job_category_id" value="Job Category" />
                                    <Select
                                        id="job_category_id"
                                        value={data.job_category_id}
                                        onChange={(e) => setData('job_category_id', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <InputError message={errors.job_category_id} className="mt-2" />
                                </div>

                                {/* Job Type */}
                                <div>
                                    <InputLabel htmlFor="job_type" value="Job Type" />
                                    <Select
                                        id="job_type"
                                        value={data.job_type}
                                        onChange={(e) => setData('job_type', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    >
                                        <option value="">Select job type</option>
                                        {jobTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </option>
                                        ))}
                                    </Select>
                                    <InputError message={errors.job_type} className="mt-2" />
                                </div>

                                {/* Location */}
                                <div>
                                    <InputLabel htmlFor="location" value="Location" />
                                    <TextInput
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.location} className="mt-2" />
                                </div>

                                {/* Salary Range */}
                                <div>
                                    <InputLabel htmlFor="salary_range" value="Salary Range" />
                                    <TextInput
                                        id="salary_range"
                                        type="text"
                                        value={data.salary_range}
                                        onChange={(e) => setData('salary_range', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="e.g. $50,000 - $70,000"
                                        required
                                    />
                                    <InputError message={errors.salary_range} className="mt-2" />
                                </div>

                                {/* Application Deadline */}
                                <div>
                                    <InputLabel htmlFor="application_deadline" value="Application Deadline" />
                                    <TextInput
                                        id="application_deadline"
                                        type="date"
                                        value={data.application_deadline}
                                        onChange={(e) => setData('application_deadline', e.target.value)}
                                        className="mt-1 block w-full"
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                    <InputError message={errors.application_deadline} className="mt-2" />
                                </div>

                                {/* Job Status */}
                                <div>
                                    <InputLabel htmlFor="status" value="Job Status" />
                                    <Select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    >
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                    </Select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                {/* Description */}
                                <div>
                                    <InputLabel htmlFor="description" value="Job Description" />
                                    <TextArea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full"
                                        rows={6}
                                        required
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('employer.jobs.show', job.id)}
                                        className="btn-secondary"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="btn-primary flex items-center"
                                        disabled={processing}
                                    >
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 