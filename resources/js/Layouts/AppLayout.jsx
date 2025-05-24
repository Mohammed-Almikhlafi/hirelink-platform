import React from 'react';
import GuestLayout from './GuestLayout';
import AuthenticatedLayout from './AuthenticatedLayout';
import { usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
  const { auth } = usePage().props;

  return auth.user ? (
    <AuthenticatedLayout user={auth.user}>
      {children}
    </AuthenticatedLayout>
  ) : (
    <GuestLayout user={auth.user}>
      {children}
    </GuestLayout>
  );
}
