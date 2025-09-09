import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ProfileIndex() {
    const { user, projects, queryParams } = usePage().props;

    const [nameFilter, setNameFilter] = useState(queryParams?.name || '');
    const [statusFilter, setStatusFilter] = useState(queryParams?.status || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('profile.index'), {
            name: nameFilter,
            status: statusFilter,
        }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout user={user} header={<h2 className="font-semibold text-xl">My Profile</h2>}>
            <div className="p-6 space-y-6">

                {/* User Info */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">User Info</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Filter Projects</h2>
                    <form className="flex flex-wrap gap-4 items-end" onSubmit={handleFilter}>
                        <div>
                            <label className="block text-sm font-medium mb-1">Project Name</label>
                            <input
                                type="text"
                                value={nameFilter}
                                onChange={e => setNameFilter(e.target.value)}
                                className="border rounded px-3 py-2"
                                placeholder="Search name..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="border rounded px-3 py-2"
                            >
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="bg-emerald-500 text-white px-4 py-2 rounded shadow hover:bg-emerald-600 transition">
                                Apply Filters
                            </button>
                        </div>
                    </form>
                </div>

                {/* Project List */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">My Projects</h2>
                    {projects.data.length > 0 ? (
                        <ul className="space-y-2">
                            {projects.data.map(project => (
                                <li key={project.id} className="border-b py-2">
                                    <span className="font-semibold">{project.name}</span> - Status: {project.status}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No projects found.</p>
                    )}

                    {/* Pagination */}
                    <div className="mt-4 flex space-x-2">
                        {projects.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => link.url && router.get(link.url)}
                                disabled={!link.url}
                                className={`px-3 py-1 border rounded ${link.active ? 'bg-emerald-500 text-white' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
