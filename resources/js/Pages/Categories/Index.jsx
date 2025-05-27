// resources/js/Pages/Categories/Index.jsx
import React from "react";
import { Head, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import MainLayout from "@/Layouts/MainLayout.jsx";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

export default function Index({ categories, user }) {
    return (
        <MainLayout>
            <Head title="Job Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    Job Categories
                                </h1>
                                {user?.role === "admin" && (
                                    <Link
                                        href={route("job-categories.create")}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        <PlusCircle className="w-4 h-4 mr-2" />
                                        New Category
                                    </Link>
                                )}
                            </div>

                            {/* Categories Table */}
                            <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                                    <thead className="bg-gray-50 dark:bg-slate-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Jobs Count
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Created At
                                            </th>
                                            
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                        {categories.map((category) => (
                                            <tr key={category.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {category.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {category.jobs_count} jobs
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(
                                                        category.created_at
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {user?.role === 'admin' && (
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={route(
                                                                    "job-categories.edit",
                                                                    {
                                                                        category:
                                                                            category.id,
                                                                    }
                                                                )}
                                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                                                            >
                                                                <Pencil className="w-4 h-4" />
                                                            </Link>

                                                            <Link
                                                                href={route(
                                                                    "job-categories.destroy",
                                                                    {
                                                                        category:
                                                                            category.id,
                                                                    }
                                                                )}
                                                                method="delete"
                                                                as="button"
                                                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                                                onBefore={() =>
                                                                    confirm(
                                                                        "Are you sure you want to delete this category?"
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Link>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
