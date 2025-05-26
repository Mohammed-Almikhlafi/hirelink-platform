import React, { useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../css/theme.css";

export default function NavLink() {
    const { auth } = usePage().props;
    const user = auth?.user;

    // 🧠 Debug: عرض بيانات المستخدم في الكونسول
    useEffect(() => {
        console.log("🔍 بيانات المستخدم:", user);
    }, [user]);

    return (
        <header className="bg-indigo-500 text-white py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Hire Link</h1>
                <nav className="flex items-center space-x-4">
                    {[
                        { label: "Home", href: "/" },
                        { label: "Jobs", href: "/jobs/3" },
                        { label: "About Us", href: "/about" },
                    ].map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="relative group px-1 py-1 transform transition-transform duration-300 hover:scale-105"
                        >
                            <span className="relative z-10">{label}</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}

                    {/* 🔐 إذا المستخدم مش داخل */}
                    {!user && (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-transform duration-200 hover:scale-105"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-transform duration-200 hover:scale-105"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {/* 👮‍♂️ رابط الأدمن فقط */}
                    {user?.role === "admin" && (
                        <Link
                            href="/users"
                            className="px-4 py-2 rounded-lg text-black transition-transform duration-200 hover:scale-105"
                            style={{ backgroundColor: "var(--accent)" }}
                        >
                            👥 User Management
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
