import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Sun, Moon, Menu, X, Bell, Search } from "lucide-react";
import Footer from "@/Components/Footer";
import { route } from "ziggy-js";

export default function AppLayout({ children, title }) {
    const { auth } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Find Jobs", href: "/jobs" },
        { name: "Find Talent", href: "/professionals" },
        { name: "Categories", href: "/categories" },
        { name: "About", href: "/about" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-primary">
                                HireInk
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary-400"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Section */}
                        <div className="flex items-center gap-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="p-2 text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary-400"
                            >
                                {isDarkMode ? (
                                    <Sun className="w-5 h-5" />
                                ) : (
                                    <Moon className="w-5 h-5" />
                                )}
                            </button>

                            {auth?.user ? (
                                <>
                                    {/* Notifications */}
                                    <button className="p-2 text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary-400">
                                        <Bell className="w-5 h-5" />
                                    </button>

                                    {/* User Menu */}
                                    <Link
                                        href={route("profile.edit")}
                                        className="flex items-center gap-2"
                                    >
                                        <img
                                            src={
                                                auth.user.avatar_url ||
                                                "/images/default-avatar.png"
                                            }
                                            alt={auth.user.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                            {auth.user.name}
                                        </span>
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="
                                    text-sm font-medium text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary-400"
                                        data-confirm="Are you sure you want to logout?">
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link
                                        href="/login"
                                        className="text-sm font-medium text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary-400"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="btn-primary text-sm"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary-400"
                            >
                                {isMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700/50">
                            <nav className="flex flex-col gap-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-base font-medium text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary-400"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* Page Title */}
            {title && (
                <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {title}
                        </h1>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
