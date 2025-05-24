// resources/js/Pages/Users/EditRoles.jsx
import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";

export default function EditRoles({ user, roles, userRoles }) {
    const form = useForm({
        roles: userRoles, // مصفوفة الأدوار الحالية
    });

    function submit(e) {
        e.preventDefault();
        form.post(route("users.updateRoles", user.id));
    }

    return (
        <div className="p-8 max-w-2xl mx-auto bg-white shadow rounded-lg">
            <Head title={`Edit Roles: ${user.name}`} />
            <h1 className="text-2xl font-bold mb-4">
                Edit Roles for {user.name}
            </h1>

            <form onSubmit={submit} className="space-y-4">
                {roles.map((r) => (
                    <label key={r} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            value={r}
                            checked={form.data.roles.includes(r)}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                form.setData(
                                    "roles",
                                    checked
                                        ? [...form.data.roles, r]
                                        : form.data.roles.filter((x) => x !== r)
                                );
                            }}
                            className="form-checkbox"
                        />
                        <span className="capitalize">{r}</span>
                    </label>
                ))}

                {form.errors.roles && (
                    <p className="text-red-600 text-sm">{form.errors.roles}</p>
                )}

                <div className="flex space-x-4 pt-4">
                    <Link
                        href="/users"
                        className="px-4 py-2 bg-gray-300 rounded text-gray-800"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="px-6 py-2 bg-indigo-600 text-white rounded"
                    >
                        {form.processing ? "Saving…" : "Save Roles"}
                    </button>
                </div>
            </form>
        </div>
    );
}
