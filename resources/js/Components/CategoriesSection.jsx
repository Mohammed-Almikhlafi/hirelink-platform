// resources/js/Components/CategoriesSection.jsx
import React from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import CategoryCard from "@/Components/CategoryCard.jsx";
import { Grid, ArrowRight } from "lucide-react";

export default function CategoriesSection({ categories, className = "" }) {
    return (
        <section className={className}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <Grid className="w-8 h-8 text-primary" />
                    <div>
                        <h2 className="section-title mb-1">
                            Browse Categories
                        </h2>
                        <p className="section-subtitle mb-0 text-base">
                            Explore opportunities across various professional
                            fields
                        </p>
                    </div>
                </div>

                <Link
                    href={route("job-categories.index")}
                    className="btn-secondary inline-flex items-center gap-2 text-sm whitespace-nowrap"
                >
                    All Categories
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <Grid className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                        No categories available yet.
                    </p>
                </div>
            )}
        </section>
    );
}
