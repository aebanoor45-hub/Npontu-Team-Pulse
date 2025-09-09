import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ project }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight">Project Details</h2>}
        >
            <Head title="Project Details" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">{project.name}</h3>
                        <p><strong>Status:</strong> {project.status}</p>
                        <p><strong>Description:</strong> {project.description ?? 'No description'}</p>
                        <p><strong>Created By:</strong> {project.created_by?.name ?? 'Unknown'}</p>
                        <p><strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}</p>
                        <p><strong>Last Edited By:</strong> {project.last_edited_by?.name ?? 'Unknown'}</p>
                        <p><strong>Last Edited At:</strong> {new Date(project.last_edited_at).toLocaleString()}</p>
                        <Link
                            href={route('projects.index')}
                            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Back to Projects
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
