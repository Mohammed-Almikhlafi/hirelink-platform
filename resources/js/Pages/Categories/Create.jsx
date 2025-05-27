// resources/js/Pages/Categories/Create.jsx
import React from "react";
import { Head, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { route } from "ziggy-js"; // ← استيراد route

export default function CreateCategory() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("job-categories.store")); // ← الآن route معرفة
    };

    return (
        <MainLayout>
            <Head title="Create Category" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700/50">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        🗂️ Create New Job Category
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
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
                                aria-invalid={errors.name ? true : false}
                                aria-describedby="name-error"
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                                id="name-error"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400 rounded-md shadow-sm"
                                rows={4}
                                aria-invalid={errors.description ? true : false}
                                aria-describedby="description-error"
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                                id="description-error"
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end">
                            <PrimaryButton type="submit" disabled={processing}>
                                ➕ Create Category
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
