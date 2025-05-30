import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Settings as SettingsIcon,
    Mail,
    Bell,
    Shield,
    Globe,
    Database,
    FileText,
    Save
} from 'lucide-react';

export default function Settings({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        site_name: settings?.site_name || '',
        site_description: settings?.site_description || '',
        contact_email: settings?.contact_email || '',
        support_email: settings?.support_email || '',
        jobs_per_page: settings?.jobs_per_page || 10,
        enable_job_alerts: settings?.enable_job_alerts || false,
        enable_email_notifications: settings?.enable_email_notifications || false,
        maintenance_mode: settings?.maintenance_mode || false,
        allow_registration: settings?.allow_registration || true,
        default_user_role: settings?.default_user_role || 'professional',
        file_upload_limit: settings?.file_upload_limit || 5,
        allowed_file_types: settings?.allowed_file_types || '.pdf,.doc,.docx',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Head title="Admin Settings" />
                    
                    {/* Header Section */}
                    <div className="flex items-center gap-3 mb-8">
                        <SettingsIcon className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Admin Settings
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Site Settings */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                <Globe className="w-5 h-5" />
                                Site Settings
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Site Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.site_name}
                                        onChange={e => setData('site_name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.site_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.site_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Site Description
                                    </label>
                                    <textarea
                                        value={data.site_description}
                                        onChange={e => setData('site_description', e.target.value)}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Settings */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                <Mail className="w-5 h-5" />
                                Email Settings
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Contact Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.contact_email}
                                        onChange={e => setData('contact_email', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Support Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.support_email}
                                        onChange={e => setData('support_email', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notification Settings */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                <Bell className="w-5 h-5" />
                                Notification Settings
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="enable_job_alerts"
                                        checked={data.enable_job_alerts}
                                        onChange={e => setData('enable_job_alerts', e.target.checked)}
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    />
                                    <label htmlFor="enable_job_alerts" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Enable Job Alerts
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="enable_email_notifications"
                                        checked={data.enable_email_notifications}
                                        onChange={e => setData('enable_email_notifications', e.target.checked)}
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    />
                                    <label htmlFor="enable_email_notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Enable Email Notifications
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Security Settings */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                <Shield className="w-5 h-5" />
                                Security Settings
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="maintenance_mode"
                                        checked={data.maintenance_mode}
                                        onChange={e => setData('maintenance_mode', e.target.checked)}
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    />
                                    <label htmlFor="maintenance_mode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Enable Maintenance Mode
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="allow_registration"
                                        checked={data.allow_registration}
                                        onChange={e => setData('allow_registration', e.target.checked)}
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    />
                                    <label htmlFor="allow_registration" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Allow New Registrations
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Default User Role
                                    </label>
                                    <select
                                        value={data.default_user_role}
                                        onChange={e => setData('default_user_role', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="professional">Professional</option>
                                        <option value="employer">Employer</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* File Upload Settings */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                <FileText className="w-5 h-5" />
                                File Upload Settings
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        File Upload Limit (MB)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.file_upload_limit}
                                        onChange={e => setData('file_upload_limit', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Allowed File Types
                                    </label>
                                    <input
                                        type="text"
                                        value={data.allowed_file_types}
                                        onChange={e => setData('allowed_file_types', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder=".pdf,.doc,.docx"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {processing ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
} 