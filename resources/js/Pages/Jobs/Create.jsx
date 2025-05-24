// resources/js/Pages/Jobs/Create.jsx
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Briefcase } from "lucide-react";

export default function Create({ companies = [], categories = [] }) {
    const form = useForm({
        title: "",
        description: "",
        location: "",
        company_id: companies.length ? companies[0].id : "",
        job_category_id: categories.length ? categories[0].id : "",
        job_type: "full-time",
        application_deadline: "",
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route("jobs.store"));
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
            <Head title="Create Job" />

            {/* Navbar (optional if layout already includes) */}
            <header className="bg-indigo-500 text-white py-4 shadow-md">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold">
                        Job Portal
                    </Link>
                    <Link
                        href="/jobs"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
                    >
                        Back to Jobs
                    </Link>
                </div>
            </header>

            {/* Form Container */}
            <div className="flex-grow bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10">
                    <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 flex items-center">
                        <Briefcase className="w-8 h-8 mr-3" />
                        Create New Job
                    </h1>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Job Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={form.data.title}
                                onChange={(e) =>
                                    form.setData("title", e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                            {form.errors.title && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.title}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={5}
                                value={form.data.description}
                                onChange={(e) =>
                                    form.setData("description", e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                            {form.errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.description}
                                </p>
                            )}
                        </div>

                        {/* Location & Company */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    value={form.data.location}
                                    onChange={(e) =>
                                        form.setData("location", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                />
                                {form.errors.location && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.location}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="company_id"
                                    className="block text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Company
                                </label>
                                <select
                                    id="company_id"
                                    value={form.data.company_id}
                                    onChange={(e) =>
                                        form.setData(
                                            "company_id",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                >
                                    {companies.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.company_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.company_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Category & Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="job_category_id"
                                    className="block text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Category
                                </label>
                                <select
                                    id="job_category_id"
                                    value={form.data.job_category_id}
                                    onChange={(e) =>
                                        form.setData(
                                            "job_category_id",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.job_category_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.job_category_id}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="job_type"
                                    className="block text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Job Type
                                </label>
                                <select
                                    id="job_type"
                                    value={form.data.job_type}
                                    onChange={(e) =>
                                        form.setData("job_type", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                >
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">
                                        Internship
                                    </option>
                                </select>
                                {form.errors.job_type && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.job_type}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Deadline & Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="application_deadline"
                                    className="block text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Application Deadline
                                </label>
                                <input
                                    id="application_deadline"
                                    type="date"
                                    value={form.data.application_deadline}
                                    onChange={(e) =>
                                        form.setData(
                                            "application_deadline",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                />
                                {form.errors.application_deadline && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.application_deadline}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-end space-x-4">
                                <Link
                                    href="/jobs"
                                    className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
                                >
                                    {form.processing
                                        ? "Creating…"
                                        : "Create Job"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
