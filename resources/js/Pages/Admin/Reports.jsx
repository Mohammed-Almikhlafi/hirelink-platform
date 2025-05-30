import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    BarChart3, 
    Users, 
    Briefcase, 
    Building2, 
    TrendingUp,
    FileText,
    Calendar
} from 'lucide-react';

export default function Reports({ stats, monthlyStats }) {
    return (
        <AppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Head title="Reports & Analytics" />
                    
                    {/* Header Section */}
                    <div className="flex items-center gap-3 mb-8">
                        <BarChart3 className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Reports & Analytics
                        </h1>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Users"
                            value={stats.totalUsers}
                            change={stats.userGrowth}
                            icon={Users}
                            color="blue"
                        />
                        <StatCard
                            title="Active Jobs"
                            value={stats.activeJobs}
                            change={stats.jobGrowth}
                            icon={Briefcase}
                            color="green"
                        />
                        <StatCard
                            title="Companies"
                            value={stats.totalCompanies}
                            change={stats.companyGrowth}
                            icon={Building2}
                            color="purple"
                        />
                        <StatCard
                            title="Applications"
                            value={stats.totalApplications}
                            change={stats.applicationGrowth}
                            icon={FileText}
                            color="orange"
                        />
                    </div>

                    {/* Monthly Stats */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Monthly Activity */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Monthly Activity
                                </h3>
                                <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="mt-4">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Month</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Users</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jobs</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applications</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {monthlyStats.map((month, index) => (
                                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{month.month}</td>
                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{month.users}</td>
                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{month.jobs}</td>
                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{month.applications}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* User Distribution */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    User Distribution
                                </h3>
                                <Users className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Job Seekers</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {stats.jobSeekers} ({Math.round((stats.jobSeekers / stats.totalUsers) * 100)}%)
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Employers</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {stats.employers} ({Math.round((stats.employers / stats.totalUsers) * 100)}%)
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Admins</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {stats.admins} ({Math.round((stats.admins / stats.totalUsers) * 100)}%)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Recent Activity
                            </h3>
                            <TrendingUp className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {stats.recentActivity?.map((activity, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {activity.event}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {activity.user}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {activity.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {activity.details}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ title, value, change, icon: Icon, color }) {
    const colors = {
        blue: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20',
        green: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
        purple: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20',
        orange: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {title}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </p>
                </div>
                <div className={`rounded-full p-3 ${colors[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            {change && (
                <div className="mt-4">
                    <div className="flex items-center">
                        <TrendingUp className={`w-4 h-4 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={`ml-2 text-sm font-medium ${change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {change > 0 ? '+' : ''}{change}%
                        </span>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">from last month</span>
                    </div>
                </div>
            )}
        </div>
    );
} 