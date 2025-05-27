import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import MainLayout from '@/Layouts/MainLayout';
import Select from '@/Components/Select';

export default function Edit({ job, categories, jobTypes }) {
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
        put(route('jobs.update', job.id));
    };

    return (
        <MainLayout title="Edit Job">
            <Head title="Edit Job" />

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700/50">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                        Edit Job
                    </h1>

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
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
} 