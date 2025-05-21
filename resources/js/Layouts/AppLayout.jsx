import React from 'react';
import GuestLayout from './GuestLayout';
import AuthenticatedLayout from './AuthenticatedLayout';
import { usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
  const { auth } = usePage().props;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {auth.user ? (
        <AuthenticatedLayout>
          {children}
        </AuthenticatedLayout>
      ) : (
        <GuestLayout>
          {children}
        </GuestLayout>
      )}
    </div>
  );
}