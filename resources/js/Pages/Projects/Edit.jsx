import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Edit() {
    const { project, user } = usePage().props;

    const { data, setData, put, errors } = useForm({
        name: project?.name || "",
        status: project?.status || "pending",
        due_date: project?.due_date || "",
        remarks: project?.remarks || "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (!project) return;

        put(route("projects.update", { project: project.id }));
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Edit Activity</h2>}
        >
            <Head title="Edit Activity" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">

                            {/* Activity Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Activity Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                    placeholder="Enter activity name"
                                    required
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="done">Done</option>
                                </select>
                                {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Due Date</label>
                                <input
                                    type="date"
                                    value={data.due_date || ""}
                                    onChange={(e) => setData("due_date", e.target.value)}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                                {errors.due_date && <p className="text-red-600 text-sm mt-1">{errors.due_date}</p>}
                            </div>

                            {/* Remarks */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Remarks</label>
                                <textarea
                                    value={data.remarks || ""}
                                    onChange={(e) => setData("remarks", e.target.value)}
                                    className="mt-1 block w-full border rounded px-3 py-2 resize-none break-words"
                                    rows={1}
                                    style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                                    placeholder="Enter remarks here..."
                                />
                                {errors.remarks && <p className="text-red-600 text-sm mt-1">{errors.remarks}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex space-x-2 justify-end mt-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
