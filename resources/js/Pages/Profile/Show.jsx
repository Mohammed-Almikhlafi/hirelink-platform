// resources/js/Pages/Profile/Show.jsx
import React from "react";
import { Head } from "@inertiajs/react";
import {
    MapPin,
    Mail,
    Link as LinkIcon,
    Calendar,
    Briefcase,
    Star,
    MessageCircle,
} from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

export default function Show({ user, isOwnProfile }) {
    return (
        <MainLayout title={`${user.name}'s Profile`}>
            <Head title={`${user.name}'s Profile`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 sticky top-24">
                            {/* Profile Header */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <img
                                        src={
                                            user.avatar_url ||
                                            "/images/default-avatar.png"
                                        }
                                        alt={user.name}
                                        className="w-32 h-32 rounded-full object-cover ring-4 ring-white dark:ring-slate-700 mx-auto"
                                    />
                                    <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-success border-2 border-white dark:border-slate-700" />
                                </div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-4">
                                    {user.name}
                                </h1>
                                {user.specialization && (
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {user.specialization}
                                    </p>
                                )}
                            </div>

                            {/* Contact & Basic Info */}
                            <div className="space-y-4">
                                {user.location && (
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                        <MapPin className="w-5 h-5" />
                                        <span>{user.location}</span>
                                    </div>
                                )}
                                {user.email && (
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                        <Mail className="w-5 h-5" />
                                        <a
                                            href={`mailto:${user.email}`}
                                            className="hover:text-primary"
                                        >
                                            {user.email}
                                        </a>
                                    </div>
                                )}
                                {user.website && (
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                        <LinkIcon className="w-5 h-5" />
                                        <a
                                            href={user.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-primary"
                                        >
                                            {new URL(user.website).hostname}
                                        </a>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <Calendar className="w-5 h-5" />
                                    <span>
                                        Joined{" "}
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            {!isOwnProfile && (
                                <div className="mt-6 space-y-3">
                                    <button className="btn-primary w-full">
                                        <MessageCircle className="w-5 h-5" />
                                        <span>Send Message</span>
                                    </button>
                                    <button className="btn-secondary w-full">
                                        <Star className="w-5 h-5" />
                                        <span>Save Profile</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About */}
                        {user.bio && (
                            <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                    About
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                                    {user.bio}
                                </p>
                            </section>
                        )}

                        {/* Skills */}
                        {user.skills && user.skills.length > 0 && (
                            <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                    Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full text-sm font-medium
                        bg-primary-50 dark:bg-primary-900/20 
                        text-primary-600 dark:text-primary-400"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Experience */}
                        {user.experience && user.experience.length > 0 && (
                            <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                                    Experience
                                </h2>
                                <div className="space-y-6">
                                    {user.experience.map((exp, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                                    <Briefcase className="w-6 h-6 text-primary" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                    {exp.title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400">
                                                    {exp.company}
                                                </p>
                                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                                    {exp.start_date} -{" "}
                                                    {exp.end_date || "Present"}
                                                </p>
                                                {exp.description && (
                                                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                                                        {exp.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Portfolio */}
                        {user.portfolio && user.portfolio.length > 0 && (
                            <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                                    Portfolio
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {user.portfolio.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block"
                                        >
                                            <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <LinkIcon className="w-8 h-8 text-slate-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary">
                                                {item.title}
                                            </h3>
                                            {item.description && (
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {item.description}
                                                </p>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
