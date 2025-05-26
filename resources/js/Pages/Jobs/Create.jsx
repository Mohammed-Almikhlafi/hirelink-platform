// resources/js/Pages/Jobs/Create.jsx
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import MainLayout from '@/Layouts/MainLayout';

export default function Create({ companies, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        location: '',
        company_id: '',
        job_category_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('jobs.store'));
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

                        {/* Company */}
                        <div>
                            <InputLabel htmlFor="company_id" value="Company" />
                            <select
                                id="company_id"
                                value={data.company_id}
                                onChange={(e) => setData('company_id', e.target.value)}
                                className="input mt-1 block w-full"
                                required
                            >
                                <option value="">Select a company</option>
                                {companies.map(company => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.company_id} className="mt-2" />
                        </div>

                        {/* Category */}
                        <div>
                            <InputLabel htmlFor="job_category_id" value="Category" />
                            <select
                                id="job_category_id"
                                value={data.job_category_id}
                                onChange={(e) => setData('job_category_id', e.target.value)}
                                className="input mt-1 block w-full"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.job_category_id} className="mt-2" />
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
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={processing}
                            >
                                {processing ? 'Posting...' : 'Post Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
