// resources/js/Pages/Users/Index.jsx
import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Applayout from "@/Layouts/Applayout";

export default function UsersIndex({ users }) {
    return (
        <Applayout>
            <div className="p-8">
            <Head title="Users" />
            <h1 className="text-3xl font-bold mb-6">Users</h1>
            <table className="w-full bg-white shadow rounded-lg">
                <thead>
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Roles</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="border-t">
                            <td className="p-4">{u.name}</td>
                            <td className="p-4">{u.email}</td>
                            <td className="p-4">
                                {u.roles.map((r) => r.name).join(", ")}
                            </td>
                            <td className="p-4">
                                <Link
                                    href={`/users/${u.id}/edit-roles`}
                                    className="px-3 py-1 bg-indigo-600 text-white rounded"
                                >
                                    Edit Roles
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </Applayout>
    );
}
