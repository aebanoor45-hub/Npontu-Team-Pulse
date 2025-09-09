import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constant.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, projects }) {
    const today = new Date();

    const isToday = (dateString) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        );
    };

    // Filter projects created today
    const createdToday = [...projects?.data ?? []].filter(project => isToday(project.created_at));

    // Filter projects edited today
    const editedToday = [...projects?.data ?? []].filter(project => isToday(project.last_edited_at));

    return (
        <AuthenticatedLayout
            user={auth?.user ?? null}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Dashboard
                    </h2>
                    <Link
                        href={route("projects.create")}
                        className="bg-emerald-500 py-2 px-4 text-white rounded shadow hover:bg-emerald-600"
                    >
                        Add New Activity
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">

                        {/* Created Today */}
                        <div className="bg-gray-100 dark:bg-gray-700 rounded shadow overflow-x-auto">
                            <h2 className="text-xl font-bold p-4">
                                Created Today ({createdToday.length})
                            </h2>
                            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-b">
                                    <tr>
                                        <th className="px-3 py-2">Project Name</th>
                                        <th className="px-3 py-2">Created By</th>
                                        <th className="px-3 py-2">Created At</th>
                                        <th className="px-3 py-2">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {createdToday.map(project => (
                                        <tr key={project.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-3 py-2">{project.name}</td>
                                            <td className="px-3 py-2">{project.createdBy?.name ?? "Unknown"}</td>
                                            <td className="px-3 py-2">{project.created_at ? new Date(project.created_at).toLocaleString() : "-"}</td>
                                            <td className="px-3 py-2 truncate">{project.remarks ?? "No remarks"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Edited Today */}
                        <div className="bg-gray-100 dark:bg-gray-700 rounded shadow overflow-x-auto">
                            <h2 className="text-xl font-bold p-4">
                                Edited Today ({editedToday.length})
                            </h2>
                            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-b">
                                    <tr>
                                        <th className="px-3 py-2">Project Name</th>
                                        <th className="px-3 py-2">Edited By</th>
                                        <th className="px-3 py-2">Edited At</th>
                                        <th className="px-3 py-2">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {editedToday.map(project => (
                                        <tr key={project.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-3 py-2">{project.name}</td>
                                            <td className="px-3 py-2">{project.lastEditedBy?.name ?? "Unknown"}</td>
                                            <td className="px-3 py-2">{project.last_edited_at ? new Date(project.last_edited_at).toLocaleString() : "-"}</td>
                                            <td className="px-3 py-2 truncate">{project.remarks ?? "No remarks"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
