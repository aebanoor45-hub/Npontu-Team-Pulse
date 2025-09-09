import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth, projects }) {
    const formatDateTime = (dateStr) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    };

    const today = new Date();
    const isToday = (dateStr) => {
        if (!dateStr) return false;
        const date = new Date(dateStr);
        return date.getFullYear() === today.getFullYear() &&
               date.getMonth() === today.getMonth() &&
               date.getDate() === today.getDate();
    };

    const createdToday = [...projects ?? []].filter(p => isToday(p.created_at));
    const editedToday = [...projects ?? []]
        .filter(p => isToday(p.last_edited_at) && p.last_edited_at !== p.created_at)
        .sort((a, b) => new Date(b.last_edited_at) - new Date(a.last_edited_at));

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Dashboard</h2>
                    <Link
                        href={route("projects.create")}
                        className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all duration-200"
                    >
                        Add New Activity
                    </Link>
                </div>

                {/* Created & Edited Today */}
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    {/* Created Today */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded shadow overflow-x-auto">
                        <h2 className="text-xl font-bold p-4">Created Today ({createdToday.length})</h2>
                        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-b">
                                <tr>
                                    <th className="px-3 py-2">Activity Name</th>
                                    <th className="px-3 py-2">Created By</th>
                                    <th className="px-3 py-2">Created At</th>
                                    <th className="px-3 py-2">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {createdToday.map(p => (
                                    <tr key={p.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-3 py-2">{p.name}</td>
                                        <td className="px-3 py-2">{p.created_by?.name ?? "Unknown"}</td>
                                        <td className="px-3 py-2">{formatDateTime(p.created_at)}</td>
                                        <td className="px-3 py-2 truncate">{p.description ?? "No description"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Edited Today */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded shadow overflow-x-auto">
                        <h2 className="text-xl font-bold p-4">Edited Today ({editedToday.length})</h2>
                        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-b">
                                <tr>
                                    <th className="px-3 py-2">Activity Name</th>
                                    <th className="px-3 py-2">Edited By</th>
                                    <th className="px-3 py-2">Edited At</th>
                                    <th className="px-3 py-2">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {editedToday.map(p => (
                                    <tr key={p.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-3 py-2">{p.name}</td>
                                        <td className="px-3 py-2">{p.last_edited_by?.name ?? "Unknown"}</td>
                                        <td className="px-3 py-2">{formatDateTime(p.last_edited_at)}</td>
                                        <td className="px-3 py-2 truncate">{p.remarks ?? "No remarks"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
