import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Search, Plus, Edit, Trash2, UserX, UserCheck } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ users, filters, stats }) {
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleSearch = (e) => {
        router.get(route('admin.users.index'), {
            search: e.target.value,
            role: filters.role,
            status: filters.status,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleRoleFilter = (role) => {
        router.get(route('admin.users.index'), {
            search: filters.search,
            role: role === filters.role ? null : role,
            status: filters.status,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusFilter = (value) => {
        router.get(route('admin.users.index'), {
            search: filters.search,
            role: filters.role,
            is_active: value === filters.is_active ? null : value, // toggle filter
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = () => {
        router.delete(route('admin.users.destroy', deleteUserId), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setDeleteUserId(null);
            },
        });
    };

    const handleToggleStatus = (userId) => {
        router.patch(route('admin.users.toggle-status', userId));
    };

    return (
        <AppLayout>
            <Head title="Manage Users" />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Manage Users
                    </h1>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                        View and manage all users in the system
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
                        <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Blocked</div>
                        <div className="text-2xl font-bold text-red-600">{stats.blocked}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Job Seekers</div>
                        <div className="text-2xl font-bold text-blue-600">{stats.job_seekers}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Employers</div>
                        <div className="text-2xl font-bold text-purple-600">{stats.employers}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Admins</div>
                        <div className="text-2xl font-bold text-orange-600">{stats.admins}</div>
                    </div>
                </div>

                {/* Filters and Actions */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                value={filters.search || ''}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleRoleFilter('job_seeker')}
                                className={`px-3 py-2 text-sm font-medium rounded-md ${
                                    filters.role === 'job_seeker'
                                        ? 'bg-primary text-white'
                                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                Job Seekers
                            </button>
                            <button
                                onClick={() => handleRoleFilter('employer')}
                                className={`px-3 py-2 text-sm font-medium rounded-md ${
                                    filters.role === 'employer'
                                        ? 'bg-primary text-white'
                                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                Employers
                            </button>
                            <button
                                onClick={() => handleRoleFilter('admin')}
                                className={`px-3 py-2 text-sm font-medium rounded-md ${
                                    filters.role === 'admin'
                                        ? 'bg-primary text-white'
                                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                Admins
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleStatusFilter(true)}
                                className={`px-3 py-2 text-sm font-medium rounded-md ${
                                    filters.is_active === true
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => handleStatusFilter(false)}
                                className={`px-3 py-2 text-sm font-medium rounded-md ${
                                    filters.is_active === false
                                        ? 'bg-red-600 text-white'
                                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                Blocked
                            </button>
                        </div>
                        <Link
                            href={route('admin.users.create')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Add User
                        </Link>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {users.data.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={user.avatar_url || '/images/default-avatar.png'}
                                                    alt={user.name}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${user.role === 'admin' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' : 
                                              user.role === 'employer' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' : 
                                              'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'}`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${user.status === 'active' 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {user.location || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleToggleStatus(user.id)}
                                                className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700
                                                    ${user.status === 'active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
                                                title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                                            >
                                                {user.status === 'active' ? (
                                                    <UserX className="h-5 w-5" />
                                                ) : (
                                                    <UserCheck className="h-5 w-5" />
                                                )}
                                            </button>
                                            <Link
                                                href={route('admin.users.edit', user.id)}
                                                className="p-1 text-primary hover:text-primary-dark rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                                                title="Edit User"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setDeleteUserId(user.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                                                title="Delete User"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {users.links && users.links.length > 3 && (
                    <div className="mt-4 flex justify-center">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            {users.links.map((link, index) => {
                                if (link.url === null) return null;
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                            ${link.active
                                                ? 'z-10 bg-primary border-primary text-white'
                                                : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                                            }
                                            ${index === 0 ? 'rounded-l-md' : ''}
                                            ${index === users.links.length - 1 ? 'rounded-r-md' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </nav>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                <Dialog
                    open={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    className="fixed z-10 inset-0 overflow-y-auto"
                >
                    <div className="flex items-center justify-center min-h-screen">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                        <div className="relative bg-white dark:bg-slate-800 rounded-lg max-w-md w-full mx-4 p-6">
                            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Delete User
                            </Dialog.Title>

                            <div className="mt-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this user? This action cannot be undone.
                                </p>
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </AppLayout>
    );
} 