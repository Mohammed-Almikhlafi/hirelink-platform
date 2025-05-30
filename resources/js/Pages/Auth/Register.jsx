import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register({
    categories = [],
    defaultRole = "job_seeker",
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        job_category_id: "",
        password: "",
        password_confirmation: "",
        specialization: "",
        role: defaultRole,
        location: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, [reset]);

    const handleOnChange = (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Site Title as Text */}
            <div className="flex justify-center mt-8 mb-6">
                <h1 className="text-2xl font-bold text-blue-600">HireLink</h1>
            </div>

            <form onSubmit={submit}>
                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Role Selection */}
                <div className="mt-4">
                    <InputLabel htmlFor="role" value="I want to" />
                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        onChange={handleOnChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700"
                        required
                    >
                        <option value="job_seeker">
                            Find Job Opportunities
                        </option>
                        <option value="employer">Hire Professionals</option>
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                {/* Specialization */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="specialization"
                        value="Specialization"
                    />
                    <TextInput
                        id="specialization"
                        name="specialization"
                        value={data.specialization}
                        className="mt-1 block w-full"
                        onChange={handleOnChange}
                        required
                    />
                    <InputError
                        message={errors.specialization}
                        className="mt-2"
                    />
                </div>

                {/* Location */}
                <div className="mt-4">
                    <InputLabel htmlFor="location" value="Location" />
                    <TextInput
                        id="location"
                        name="location"
                        value={data.location}
                        className="mt-1 block w-full"
                        placeholder="City, Country"
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.location} className="mt-2" />
                </div>

                {/* Profession */}
                <div className="mt-4">
                    <InputLabel htmlFor="job_category_id" value="Profession" />
                    <select
                        id="job_category_id"
                        name="job_category_id"
                        value={data.job_category_id}
                        onChange={handleOnChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700"
                        required
                    >
                        <option value="">Select your profession</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <InputError
                        message={errors.job_category_id}
                        className="mt-2"
                    />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end mt-4">
                    <Link
                        href="/login"
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
