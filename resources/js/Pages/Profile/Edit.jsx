import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function ProfileEdit({ user }) {
    const profileForm = useForm({
        name: user.name || "",
        email: user.email || "",
    });

    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.put(route("profile.update"));
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.post(route("profile.updatePassword"), {
            onSuccess: () => passwordForm.reset(),
        });
    };

    const handleDeleteAccount = () => {
        if (confirm("Are you sure you want to delete your account?")) {
            const password = prompt("Please enter your password to confirm:");
            if (password) {
                passwordForm.delete(route("profile.destroy"), {
                    data: { password },
                    onSuccess: () => alert("Account deleted successfully."),
                });
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Edit Profile</h2>}
        >
            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8 space-y-6">

                    {/* Profile Info */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
                        <form onSubmit={submitProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={profileForm.data.name}
                                    onChange={e => profileForm.setData("name", e.target.value)}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                                {profileForm.errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{profileForm.errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={profileForm.data.email}
                                    onChange={e => profileForm.setData("email", e.target.value)}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                                {profileForm.errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{profileForm.errors.email}</p>
                                )}
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
                                >
                                    Update Profile
                                </button>
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Password Update */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Update Password</h2>
                        <form onSubmit={submitPassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.current_password}
                                    onChange={e => passwordForm.setData("current_password", e.target.value)}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                                {passwordForm.errors.current_password && (
                                    <p className="text-red-500 text-sm mt-1">{passwordForm.errors.current_password}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.password}
                                    onChange={e => passwordForm.setData("password", e.target.value)}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                                {passwordForm.errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{passwordForm.errors.password}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.password_confirmation}
                                    onChange={e => passwordForm.setData("password_confirmation", e.target.value)}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Delete Account */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-2 text-red-600">Delete Account</h2>
                        <p className="mb-4 text-sm text-gray-600">
                            Once your account is deleted, all data will be permanently removed.
                        </p>
                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            Delete Account
                        </button>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
