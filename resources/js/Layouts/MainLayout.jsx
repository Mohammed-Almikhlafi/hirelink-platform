import React from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from './AppLayout';
import AuthenticatedLayout from './AuthenticatedLayout';

const MainLayout = ({ children, title }) => {
    const { auth } = usePage().props;
    const isAuthenticated = auth && auth.user;

    // Use AuthenticatedLayout for authenticated users, AppLayout for guests
    const Layout = isAuthenticated ? AppLayout : AppLayout;

    return (
        <Layout>
            {children}
        </Layout>
    );
};

export default MainLayout; 