import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Header from '@/Components/Header';
import Nav from '@/Components/Nav';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';

export default function Home({ jobs = [], categories = [] }) {
  if (!Array.isArray(jobs) || !Array.isArray(categories)) {
    return (
      <AppLayout>
        <Head title="Home" />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <p className="text-lg text-gray-600 dark:text-gray-300">جارٍ التحميل…</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head title="Home" />

      {/* Header Section */}
      <Header />
      <Nav />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-emerald-500 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4">مرحباً بك في توظيفك</h1>
          <p className="text-xl mb-8">نحن هنا لنوفر لك أفضل الفرص الوظيفية.</p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="ابحث عن وظيفة أو شركة"
              className="w-full sm:w-2/3 lg:w-1/2 px-4 py-3 rounded-l-2xl focus:outline-none text-gray-800"
            />
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-r-2xl hover:bg-gray-100">
              بحث
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="bg-gray-50 dark:bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto flex justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-center px-4">
            <h3 className="text-2xl font-bold text-indigo-600">{jobs.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">وظيفة متوفرة</p>
          </div>
          <div className="text-center px-4">
            <h3 className="text-2xl font-bold text-indigo-600">{categories.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">قسم مهني</p>
          </div>
          <div className="text-center px-4">
            <h3 className="text-2xl font-bold text-indigo-600">0</h3>
            <p className="text-gray-600 dark:text-gray-300">متقدم جديد</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white dark:bg-gray-900">
      <div className="w-full py-6 px-4 sm:px-6 lg:px-12 xl:px-20">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">الأقسام</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(cat => (
              <div key={cat.id} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{cat.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{cat.jobs_count} وظيفة</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </AppLayout>
  );
}
