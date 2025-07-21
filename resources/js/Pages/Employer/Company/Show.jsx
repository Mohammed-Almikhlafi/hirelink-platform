import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { 
  Building2, Briefcase, MapPin, Globe, 
  Edit, Users, FileText, BarChart2,
  CheckCircle, Clock, XCircle
} from 'lucide-react';

export default function EmployerCompanyShow({ company, stats, canEdit }) {
    return (
        <AppLayout>
            <Head title={`My Company - ${company.name}`} />
            
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with edit button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        My Company Profile
                    </h1>
                    {/* <Link
                        href={route('employer.company.edit')}
                        className="inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Link> */}
                </div>

                {/* Company Overview */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8 border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Logo and Basic Info */}
                        <div className="flex-shrink-0">
                            <div className="h-32 w-32 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                                {company.logo ? (
                                    <img 
                                        src={company.logo} 
                                        alt={company.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Building2 className="h-12 w-12 text-slate-400" />
                                )}
                            </div>
                        </div>

                        {/* Company Details */}
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{company.name}</h2>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">{company.description}</p>
                            
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 text-slate-500 dark:text-slate-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Location</h3>
                                        <p className="text-slate-900 dark:text-white">{company.location || 'Not specified'}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <Globe className="w-5 h-5 text-slate-500 dark:text-slate-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Website</h3>
                                        {company.website ? (
                                            <a 
                                                href={company.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-primary-600 hover:underline"
                                            >
                                                {company.website.replace(/^https?:\/\//, '')}
                                            </a>
                                        ) : (
                                            <p className="text-slate-900 dark:text-white">Not specified</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="md:w-48 flex-shrink-0">
                            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 h-full">
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {stats.totalJobs}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            Total Jobs
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {stats.activeJobs}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            Active Jobs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Active Jobs"
                        value={stats.activeJobs}
                        icon={Briefcase}
                        color="text-green-600 bg-green-50 dark:bg-green-900/20"
                    />
                    <StatCard
                        title="Draft Jobs"
                        value={stats.draftJobs}
                        icon={FileText}
                        color="text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
                    />
                    <StatCard
                        title="Closed Jobs"
                        value={stats.closedJobs}
                        icon={XCircle}
                        color="text-red-600 bg-red-50 dark:bg-red-900/20"
                    />
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href={route('employer.jobs.create')}
                            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
                        >
                            <div className="rounded-full p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <span className="font-medium">Post New Job</span>
                        </Link>
                        <Link
                            href={route('employer.jobs.index')}
                            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
                        >
                            <div className="rounded-full p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                                <FileText className="w-5 h-5" />
                            </div>
                            <span className="font-medium">View All Jobs</span>
                        </Link>
                        <Link
                            href={route('employer.applications.all')}
                            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
                        >
                            <div className="rounded-full p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                                <Users className="w-5 h-5" />
                            </div>
                            <span className="font-medium">View Applications</span>
                        </Link>
                        <Link
                            href={route('employer.company.edit')}
                            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
                        >
                            <div className="rounded-full p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                                <Edit className="w-5 h-5" />
                            </div>
                            <span className="font-medium">Edit Profile</span>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className={`bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {title}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                        {value}
                    </p>
                </div>
                <div className={`rounded-full p-2 ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}