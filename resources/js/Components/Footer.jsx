import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { auth } = usePage().props;
    const isAdmin = auth.user?.role === 'admin';

    // // Show minimal footer for admin pages
    // if (isAdmin) {
    //     return (
    //         <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700/50">
    //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    //                 <div className="text-center text-sm text-slate-600 dark:text-slate-400">
    //                     <p>&copy; {new Date().getFullYear()} HireInk. All rights reserved.</p>
    //                 </div>
    //             </div>
    //         </footer>
    //     );
    // }

    // Regular footer for other pages
    return (
        <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                            HireInk
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Connecting talented professionals with great opportunities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/jobs" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400">
                                    Find Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/professionals" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400">
                                    Find Talent
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400">
                                    Job Categories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            <li className="text-sm text-slate-600 dark:text-slate-400">
                                Email: contact@hireink.com
                            </li>
                            <li className="text-sm text-slate-600 dark:text-slate-400">
                                Phone: +1 234 567 890
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700/50">
                    <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                        &copy; {new Date().getFullYear()} HireInk. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}