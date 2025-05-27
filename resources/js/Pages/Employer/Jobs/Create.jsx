// resources/js/Pages/Employer/Jobs/Create.jsx

import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import MainLayout from '@/Layouts/MainLayout';
import Select from '@/Components/Select';

export default function Create({ categories, jobTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        location: '',
        job_category_id: '',     // ✅ MATCHES controller
        job_type: '',            // ✅ MATCHES controller
        salary_range: '',
        application_deadline: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('employer.jobs.store'));
    };

    return (
        <MainLayout title="Post a New Job">
            <Head title="Post a New Job" />
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700/50">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                        Post a New Job
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Job Title" />
                            <TextInput id="title" type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className="mt-1 block w-full" required />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="job_category_id" value="Job Category" />
                            <Select id="job_category_id" value={data.job_category_id} onChange={(e) => setData('job_category_id', e.target.value)} className="mt-1 block w-full" required>
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </Select>
                            <InputError message={errors.job_category_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="job_type" value="Job Type" />
                            <Select id="job_type" value={data.job_type} onChange={(e) => setData('job_type', e.target.value)} className="mt-1 block w-full" required>
                                <option value="">Select job type</option>
                                {(jobTypes ?? []).map((type) => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </Select>
                            <InputError message={errors.job_type} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="location" value="Location" />
                            <TextInput id="location" type="text" value={data.location} onChange={(e) => setData('location', e.target.value)} className="mt-1 block w-full" required />
                            <InputError message={errors.location} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="salary_range" value="Salary Range" />
                            <TextInput id="salary_range" type="text" value={data.salary_range} onChange={(e) => setData('salary_range', e.target.value)} className="mt-1 block w-full" placeholder="e.g. $50,000 - $70,000" required />
                            <InputError message={errors.salary_range} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="application_deadline" value="Application Deadline" />
                            <TextInput id="application_deadline" type="date" value={data.application_deadline} onChange={(e) => setData('application_deadline', e.target.value)} className="mt-1 block w-full" min={new Date().toISOString().split('T')[0]} required />
                            <InputError message={errors.application_deadline} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Job Description" />
                            <TextArea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} className="mt-1 block w-full" rows={6} required />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end">
                            <button type="submit" className="btn-primary" disabled={processing}>
                                {processing ? 'Posting...' : 'Post Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
