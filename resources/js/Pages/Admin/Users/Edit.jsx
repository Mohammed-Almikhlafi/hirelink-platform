import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Applayout from '@/Layouts/Applayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';

export default function Edit({ user, jobCategories }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        status: user.status,
        job_category_id: user.job_category_id || '',
        specialization: user.specialization || '',
        location: user.location || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    return (
        <Applayout>
            <Head title={`Edit User - ${user.name}`} />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                Edit User
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Update user information and permissions.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white dark:bg-slate-800 space-y-6 sm:p-6">
                                    {/* Name */}
                                    <div>
                                        <InputLabel htmlFor="name" value="Name" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <InputLabel htmlFor="password" value="Password" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            className="mt-1 block w-full"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            placeholder="Leave blank to keep current password"
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    {/* Role */}
                                    <div>
                                        <InputLabel htmlFor="role" value="Role" />
                                        <Select
                                            id="role"
                                            className="mt-1 block w-full"
                                            value={data.role}
                                            onChange={e => setData('role', e.target.value)}
                                            required
                                        >
                                            <option value="job_seeker">Job Seeker</option>
                                            <option value="employer">Employer</option>
                                            <option value="admin">Admin</option>
                                        </Select>
                                        <InputError message={errors.role} className="mt-2" />
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <InputLabel htmlFor="status" value="Status" />
                                        <Select
                                            id="status"
                                            className="mt-1 block w-full"
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                            required
                                        >
                                            <option value="active">Active</option>
                                            <option value="blocked">Blocked</option>
                                        </Select>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>

                                    {/* Job Category (only for job seekers) */}
                                    {data.role === 'job_seeker' && (
                                        <div>
                                            <InputLabel htmlFor="job_category_id" value="Job Category" />
                                            <Select
                                                id="job_category_id"
                                                className="mt-1 block w-full"
                                                value={data.job_category_id}
                                                onChange={e => setData('job_category_id', e.target.value)}
                                            >
                                                <option value="">Select a category</option>
                                                {jobCategories.map(category => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </Select>
                                            <InputError message={errors.job_category_id} className="mt-2" />
                                        </div>
                                    )}

                                    {/* Specialization (only for job seekers) */}
                                    {data.role === 'job_seeker' && (
                                        <div>
                                            <InputLabel htmlFor="specialization" value="Specialization" />
                                            <TextInput
                                                id="specialization"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.specialization}
                                                onChange={e => setData('specialization', e.target.value)}
                                            />
                                            <InputError message={errors.specialization} className="mt-2" />
                                        </div>
                                    )}

                                    {/* Location */}
                                    <div>
                                        <InputLabel htmlFor="location" value="Location" />
                                        <TextInput
                                            id="location"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.location}
                                            onChange={e => setData('location', e.target.value)}
                                        />
                                        <InputError message={errors.location} className="mt-2" />
                                    </div>
                                </div>

                                <div className="px-4 py-3 bg-gray-50 dark:bg-slate-700 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        disabled={processing}
                                    >
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Applayout>
    );
} 