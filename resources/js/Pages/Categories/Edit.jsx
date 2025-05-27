import React from "react";
import { Head, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { route } from "ziggy-js";
import { Link } from "@inertiajs/react";


/**
 * Category Edit Page
 * URL: /job-categories/{id}/edit
 * Props:
 *  - category: { id, name, description }
 */
export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        description: category.description || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("job-categories.update", { category: category.id }));
    };

    return (
        <MainLayout>
            <Head title="Edit Category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Page Title (بديل مؤقت لـ PageHeader) */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Edit Category
                        </h1>
                        <Link
                            href={route("job-categories.index")}
                            className={
                                "inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150" 
                                   
                            
                            }
                          
                            aria-label="Back to Categories"
                        >
                            Back
                        </Link>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white dark:bg-slate-800 shadow sm:rounded-lg overflow-hidden">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                        required
                                        aria-invalid={
                                            errors.name ? true : false
                                        }
                                        aria-describedby="name-error"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                        id="name-error"
                                    />
                                </div>

                                {/* Description Field */}
                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        rows={4}
                                        aria-invalid={
                                            errors.description ? true : false
                                        }
                                        aria-describedby="description-error"
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                        id="description-error"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-end">
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Update Category
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
