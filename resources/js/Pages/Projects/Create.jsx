import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        status: "pending",
        description: "",
        due_date: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("projects.store"), {
            onSuccess: () => reset(), // Reset form after successful submission
        });
    };

    return (
        <AuthenticatedLayout
            user={auth?.user ?? null}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create New Activity
                </h2>
            }
        >
            <Head title="Create Activity" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-4">
                            {/* Project Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Activity Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel htmlFor="description" value="Activity Description" />
                                <TextInput
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Status */}
                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    className="mt-1 block w-full border-gray-300 dark:bg-gray-700 dark:text-gray-200 rounded"
                                    onChange={(e) => setData("status", e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="done">Done</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            {/* Due Date */}
                            <div>
                                <InputLabel htmlFor="due_date" value="Due Date" />
                                <TextInput
                                    type="date"
                                    id="due_date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("due_date", e.target.value)}
                                />
                                <InputError message={errors.due_date} className="mt-2" />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Create
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    onClick={() => window.history.back()}
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
