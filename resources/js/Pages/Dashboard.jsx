// resources/js/Pages/Dashboard.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
  Briefcase, Users, Building2, ChartBar, 
  Clock, CheckCircle, XCircle, AlertCircle,
  Plus, FileText, Settings, User
} from 'lucide-react';

export default function Dashboard({ auth, stats = {}, recentActivity = [], applications = [] }) {
  const isAdmin = auth.user.role === 'admin';
  const isEmployer = auth.user.role === 'employer';
  const isJobSeeker = auth.user.role === 'professional';

  return (
    <AppLayout title="Dashboard">
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Welcome back, {auth.user.name}!
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Here's what's happening with your {isAdmin ? 'platform' : isEmployer ? 'jobs' : 'applications'}.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {isAdmin && (
              <>
                <StatCard
                  title="Total Users"
                  value={stats.totalUsers || 0}
                  icon={Users}
                  trend={+5}
                />
                <StatCard
                  title="Active Jobs"
                  value={stats.activeJobs || 0}
                  icon={Briefcase}
                  trend={+3}
                />
                <StatCard
                  title="Companies"
                  value={stats.companies || 0}
                  icon={Building2}
                  trend={+2}
                />
                <StatCard
                  title="Applications"
                  value={stats.totalApplications || 0}
                  icon={FileText}
                  trend={+8}
                />
              </>
            )}

            {isEmployer && (
              <>
                <StatCard
                  title="Active Jobs"
                  value={stats.activeJobs || 0}
                  icon={Briefcase}
                  trend={+2}
                />
                <StatCard
                  title="Total Applications"
                  value={stats.receivedApplications || 0}
                  icon={FileText}
                  trend={+5}
                />
                <StatCard
                  title="Shortlisted"
                  value={stats.shortlisted || 0}
                  icon={CheckCircle}
                  trend={+1}
                />
                <StatCard
                  title="Pending Review"
                  value={stats.pendingReview || 0}
                  icon={Clock}
                  trend={+3}
                />
              </>
            )}

            {isJobSeeker && (
              <>
                <StatCard
                  title="Applications"
                  value={stats.applications || 0}
                  icon={FileText}
                  trend={+2}
                />
                <StatCard
                  title="Shortlisted"
                  value={stats.shortlisted || 0}
                  icon={CheckCircle}
                  trend={+1}
                />
                <StatCard
                  title="Rejected"
                  value={stats.rejected || 0}
                  icon={XCircle}
                  trend={0}
                />
                <StatCard
                  title="Pending"
                  value={stats.pending || 0}
                  icon={Clock}
                  trend={0}
                />
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {isAdmin && (
                <>
                  <QuickAction
                    title="Add Category"
                 
                    href={route("job-categories.create")}
                 
                    icon={Plus}
                  />
                  <QuickAction
                    title="Manage Users"
                    href={route('users.index')}
                    icon={Users}
                  />
                  <QuickAction
                    title="View Reports"
                    href="#"
                    icon={ChartBar}
                  />
                  <QuickAction
                    title="Settings"
                    href="#"
                    icon={Settings}
                  />
                </>
              )}

              {isEmployer && (
                <>
                  <QuickAction
                    title="Post Job"
                    href={route('employer.jobs.create')}
                    icon={Plus}
                  />
                  <QuickAction
                    title="View Applications"
                    href="#applications"
                    icon={FileText}
                  />
                  <QuickAction
                    title="Company Profile"
                    href="#"
                    icon={Building2}
                  />
                  <QuickAction
                    title="Settings"
                    href="#"
                    icon={Settings}
                  />
                </>
              )}

              {isJobSeeker && (
                <>
                  <QuickAction
                    title="Browse Jobs"
                    href={route('jobs.index')}
                    icon={Briefcase}
                  />
                  <QuickAction
                    title="Update Profile"
                    href={route('profile.edit')}
                    icon={User}
                  />
                  <QuickAction
                    title="My Applications"
                    href="#applications"
                    icon={FileText}
                  />
                  <QuickAction
                    title="Settings"
                    href="#"
                    icon={Settings}
                  />
                </>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                  ))}
                  {recentActivity.length === 0 && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      No recent activity to show.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  {isEmployer ? 'Recent Applications' : 'My Applications'}
                </h2>
                <div className="space-y-4">
                  {applications.map((application, index) => (
                    <ApplicationItem key={index} application={application} />
                  ))}
                  {applications.length === 0 && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      No applications to show.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({ title, value, icon: Icon, trend }) {
  const trendColor = trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-slate-600';
  const trendText = trend > 0 ? `+${trend}%` : trend < 0 ? `${trend}%` : '0%';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className="rounded-full p-3 bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4 text-sm font-medium">
        <span className={trendColor}>{trendText}</span>
        <span className="text-slate-600 dark:text-slate-400"> vs last month</span>
      </div>
    </div>
  );
}

function QuickAction({ title, href, icon: Icon }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/50
        hover:border-primary dark:hover:border-primary transition-colors group"
    >
      <div className="rounded-full p-2 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-medium text-slate-900 dark:text-white">
        {title}
      </span>
    </Link>
  );
}

function ActivityItem({ activity }) {
  if (!activity) return null;
  
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full p-2 bg-primary/10 text-primary">
        <AlertCircle className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {activity.title}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {activity.description}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          {activity.time}
        </p>
      </div>
    </div>
  );
}

function ApplicationItem({ application }) {
  if (!application) return null;

  const statusColors = {
    pending: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-500/20',
    accepted: 'text-green-600 bg-green-100 dark:bg-green-500/20',
    rejected: 'text-red-600 bg-red-100 dark:bg-red-500/20',
    shortlisted: 'text-blue-600 bg-blue-100 dark:bg-blue-500/20',
  };

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {application.jobTitle}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {application.company}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          Applied {application.date}
        </p>
      </div>
      <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
        {application.status}
      </div>
    </div>
  );
}
