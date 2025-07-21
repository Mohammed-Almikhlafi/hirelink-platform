import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { 
  FileText, User, Briefcase, CheckCircle, 
  XCircle, Clock, Search, Filter 
} from 'lucide-react';
import Pagination from '@/Components/Pagination';

export default function AllApplications({ applications, filters }) {
    const statusColors = {
        pending: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-500/20',
        accepted: 'text-green-600 bg-green-100 dark:bg-green-500/20',
        rejected: 'text-red-600 bg-red-100 dark:bg-red-500/20',
        shortlisted: 'text-blue-600 bg-blue-100 dark:bg-blue-500/20',
    };

    return (
        <AppLayout>
            <Head title="All Applications" />
            
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        All Applications
                    </h1>
                    <div className="flex gap-3">
                        <Link
                            href={route('employer.jobs.index')}
                            className="inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                            <Briefcase className="w-4 h-4 mr-2" />
                            View Jobs
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search applications..."
                                className="pl-10 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
                            />
                        </div>
                        <select
                            className="block w-full md:w-48 rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                            <Filter className="w-4 h-4 mr-2 inline" />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Applications List */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                        {applications.data.length > 0 ? (
                            applications.data.map(application => (
                                <Link
                                    key={application.id}
                                    href={route('employer.jobs.applications.show', [application.job_id, application.id])}
                                    className="block hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <div className="px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                                        <User className="h-5 w-5 text-slate-400" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-slate-900 dark:text-white">
                                                        {application.user.name}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                                        {application.job.title}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
                                                    {application.status}
                                                </span>
                                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                                    {application.created_at}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="px-6 py-12 text-center">
                                <FileText className="mx-auto h-12 w-12 text-slate-400" />
                                <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                                    No applications found
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    You haven't received any applications yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {applications.data.length > 0 && (
                    <div className="mt-6">
                        <Pagination links={applications.links} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}