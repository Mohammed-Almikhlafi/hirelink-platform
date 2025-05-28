import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links }) {
    if (links.length <= 3) return null;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 justify-between sm:hidden">
                {links[0].url && (
                    <Link
                        href={links[0].url}
                        className="btn-secondary"
                    >
                        Previous
                    </Link>
                )}
                {links[links.length - 1].url && (
                    <Link
                        href={links[links.length - 1].url}
                        className="btn-secondary"
                    >
                        Next
                    </Link>
                )}
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {links.map((link, index) => {
                            if (link.url === null) {
                                return (
                                    <span
                                        key={index}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 cursor-default"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            }

                            const isFirst = index === 0;
                            const isLast = index === links.length - 1;
                            const isActive = link.active;

                            return (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                        isActive
                                            ? 'z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                                            : 'text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                                    } ${
                                        isFirst ? 'rounded-l-md' : ''
                                    } ${
                                        isLast ? 'rounded-r-md' : ''
                                    } border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800`}
                                >
                                    {isFirst ? (
                                        <ChevronLeft className="h-4 w-4" />
                                    ) : isLast ? (
                                        <ChevronRight className="h-4 w-4" />
                                    ) : (
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
} 