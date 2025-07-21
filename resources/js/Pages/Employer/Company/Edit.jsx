// resources/js/Pages/Employer/Company/Edit.jsx
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { 
  Building2, MapPin, Globe, Save, ArrowLeft,
  Upload, X, Image as ImageIcon
} from 'lucide-react';
import { useState } from 'react';

export default function EmployerCompanyEdit({ company }) {
    const { data, setData, errors, post, processing } = useForm({
        name: company.name || '',
        description: company.description || '',
        industry: company.industry || '',
        website: company.website || '',
        location: company.location || '',
        logo: null,
        remove_logo: false
    });

    const [logoPreview, setLogoPreview] = useState(company.logo_url || null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('employer.company.update'), {
            preserveScroll: true,
            onSuccess: () => {
                // Optional: Show success message
            }
        });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            setLogoPreview(URL.createObjectURL(file));
            setData('remove_logo', false);
        }
    };

    const removeLogo = () => {
        setData('logo', null);
        setData('remove_logo', true);
        setLogoPreview(null);
    };

    return (
        <AppLayout>
            <Head title={`Edit Company - ${company.name}`} />
            
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Edit Company Profile
                    </h1>
                    <Link
                        href={route('employer.company.show')}
                        className="inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Profile
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8 border border-slate-200 dark:border-slate-700">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Logo Upload */}
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Company Logo
                                </label>
                                <div className="mt-1 flex items-center">
                                    <div className="relative">
                                        {logoPreview ? (
                                            <>
                                                <img
                                                    src={logoPreview}
                                                    alt="Company logo preview"
                                                    className="h-32 w-32 rounded-lg object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeLogo}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="h-32 w-32 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                                <ImageIcon className="h-12 w-12 text-slate-400" />
                                            </div>
                                        )}
                                    </div>
                                    <label className="ml-4 cursor-pointer">
                                        <div className="flex items-center px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm leading-4 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600">
                                            <Upload className="w-4 h-4 mr-2" />
                                            Upload
                                            <input
                                                type="file"
                                                className="sr-only"
                                                onChange={handleLogoChange}
                                                accept="image/*"
                                            />
                                        </div>
                                    </label>
                                </div>
                                {errors.logo && (
                                    <p className="mt-1 text-sm text-red-600">{errors.logo}</p>
                                )}
                            </div>

                            {/* Company Details */}
                            <div className="md:col-span-2 space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="industry" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Industry
                                </label>
                                <input
                                    type="text"
                                    id="industry"
                                    value={data.industry}
                                    onChange={(e) => setData('industry', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
                                />
                                {errors.industry && (
                                    <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Website
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-sm">
                                        https://
                                    </span>
                                    <input
                                        type="text"
                                        id="website"
                                        value={data.website?.replace(/^https?:\/\//, '') || ''}
                                        onChange={(e) => setData('website', e.target.value ? `https://${e.target.value}` : '')}
                                        className="flex-1 min-w-0 block w-full rounded-none rounded-r-md border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
                                    />
                                </div>
                                {errors.website && (
                                    <p className="mt-1 text-sm text-red-600">{errors.website}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
                                />
                                {errors.location && (
                                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}