import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { usePage, router } from "@inertiajs/react";
import { useState, useRef } from "react";

export default function Reports() {
    const { projects, analytics, users, filters, auth } = usePage().props;

    const [startDate, setStartDate] = useState(filters.start_date);
    const [endDate, setEndDate] = useState(filters.end_date);
    const [userId, setUserId] = useState(filters.user_id);

    const chartsRef = useRef(null);

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('reports.index'), {
            start_date: startDate,
            end_date: endDate,
            user_id: userId
        }, {
            preserveState: true,
            onSuccess: () => chartsRef.current?.scrollIntoView({ behavior: 'smooth' })
        });
    };

    // Pie chart data
    const statusData = Object.entries(analytics.status || {}).map(([status, count]) => ({
        name: status,
        value: count,
    }));

    const COLORS = ["#10B981", "#EF4444", "#3B82F6", "#F59E0B"];

    return (
        <AuthenticatedLayout user={auth} header={<h2 className="font-semibold text-xl">Reports</h2>}>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold">Reports & Analytics</h1>

                {/* Filter Form */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <form className="flex flex-wrap gap-4 items-end" onSubmit={handleFilter}>
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">User</label>
                            <select
                                value={userId || ''}
                                onChange={e => setUserId(e.target.value)}
                                className="border rounded px-3 py-2"
                            >
                                <option value="">All Users</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-emerald-500 text-white px-4 py-2 rounded shadow hover:bg-emerald-600 transition"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </form>
                </div>

                {/* Charts & Projects */}
                <div ref={chartsRef} className="space-y-6">
                    {/* Pie Chart */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Activity Status Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    label
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Activity List Table */}
                    <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                        <h2 className="text-lg font-semibold mb-2">Activity List</h2>
                        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-b">
                                <tr>
                                    <th className="px-4 py-2">Activity Name</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Created At</th>
                                    <th className="px-4 py-2">Edited At</th>
                                    <th className="px-4 py-2">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.data.map(project => (
                                    <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-4 py-2">{project.name}</td>
                                        <td className="px-4 py-2">{project.status}</td>
                                        <td className="px-4 py-2">{new Date(project.created_at).toLocaleString()}</td>
                                        <td className="px-4 py-2">{project.last_edited_at ? new Date(project.last_edited_at).toLocaleString() : "N/A"}</td>
                                        <td className="px-4 py-2">{project.remarks ?? "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-sm">Showing {projects.from} to {projects.to} of {projects.total}</span>
                            <div className="space-x-2">
                                {projects.prev_page_url && (
                                    <button
                                        onClick={() => router.get(projects.prev_page_url, { start_date: startDate, end_date: endDate, user_id: userId })}
                                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Previous
                                    </button>
                                )}
                                {projects.next_page_url && (
                                    <button
                                        onClick={() => router.get(projects.next_page_url, { start_date: startDate, end_date: endDate, user_id: userId })}
                                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
