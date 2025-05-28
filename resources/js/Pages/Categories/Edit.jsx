// resources/js/Pages/Categories/Edit.jsx
import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { route } from "ziggy-js";
import { Briefcase } from "lucide-react";

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
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header with Icon */}
                    <div className="flex items-center gap-4 mb-8">
                        <div
                            className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 \
                                flex items-center justify-center transition-transform duration-200"
                        >
                            <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Edit Category
                        </h1>
                        <Link
                            href={route("job-categories.index")}
                            className="ml-auto inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-md font-semibold text-sm text-gray-800 dark:text-gray-200 uppercase tracking-widest hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
                            aria-label="Back to Categories"
                        >
                            Back
                        </Link>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-hidden">
                        <div className="p-8">
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
                                        className="mt-1 block w-full border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50"
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
                                <div className="flex justify-end">
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
