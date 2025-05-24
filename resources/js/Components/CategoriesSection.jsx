import React from 'react';
import CategoryCard from '@/Components/CategoryCard';

export default function CategoriesSection({ categories }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(cat => <CategoryCard key={cat.id} category={cat} />)}
      </div>
    </section>
  );
}
