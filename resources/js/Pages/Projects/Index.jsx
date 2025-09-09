import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, projects }) {

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        const date = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
        const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${date} ${time}`;
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this activity?')) {
            router.delete(route('projects.destroy', id), {
                onSuccess: () => router.reload(), // reload for pagination
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Activities</h2>
                     <Link
    href={route('projects.create')}
    className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all duration-200"
>
    Add New Activity
</Link>

                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-b">
                                <tr>
                                    <th className="px-3 py-2">Activity Name</th>
                                    <th className="px-3 py-2">Status</th>
                                    <th className="px-3 py-2">Due Date</th>
                                    <th className="px-3 py-2">Created At</th>
                                    <th className="px-3 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.data.map((project) => (
                                    <tr key={project.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-3 py-2">{project.name}</td>
                                        <td className="px-3 py-2">{project.status}</td>
                                        <td className="px-3 py-2">{formatDate(project.due_date)}</td>
                                        <td className="px-3 py-2">{formatDate(project.created_at)}</td>
                                        <td className="px-3 py-2 space-x-2">
                                         <div className="space-x-2 flex">
   <Link
    href={route('projects.edit', project.id)}
    className="bg-transparent text-black px-2 py-1 rounded border border-gray-300 hover:bg-emerald-500  hover:text-white transition-colors duration-200"
>
    Edit
</Link>

    {/* Delete Button */}
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(project.id)}
                                                className="bg-transparent text-black px-3 py-1 rounded border border-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200"
                                            >
                                                Delete
                                            </button>
</div>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                   
                     {/* Pagination */}
<div className="mt-4 flex justify-between">
    {projects.prev_page_url ? (
        <button
            onClick={() => router.get(projects.prev_page_url)}
            className="bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg transition-all duration-200"
        >
            Previous
        </button>
    ) : <div /> }

    {projects.next_page_url ? (
        <button
            onClick={() => router.get(projects.next_page_url)}
            className="bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg transition-all duration-200"
        >
            Next
        </button>
    ) : <div /> }
</div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
