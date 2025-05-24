// resources/js/Pages/Jobs/CreateSuccess.jsx
import React from "react";
import { Head, Link } from "@inertiajs/react";
import { CheckCircle } from "lucide-react";

export default function CreateSuccess() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
            <Head title="Job Created" />

            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 text-center space-y-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Job Created Successfully!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Your job has been posted and is now live.
                </p>
                <div className="flex justify-center space-x-4 pt-6">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                        ← Back to Home
                    </Link>
                    <Link
                        href="/jobs/create"
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                    >
                        + Add Another Job
                    </Link>
                </div>
            </div>
        </div>
    );
}
