// resources/js/Pages/Dashboard.jsx
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
  return (
    <AuthenticatedLayout
      title="Dashboard"
      header={<PageHeader title="Dashboard" />}
      auth={auth}
    >
      <Head title="Dashboard" />
      <DashboardContent />
    </AuthenticatedLayout>
  );
}

function PageHeader({ title }) {
  return (
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
      {title}
    </h2>
  );
}

function DashboardContent() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <p className="text-gray-900 dark:text-gray-100">🎉 You're logged in!</p>
    </div>
  );
}
