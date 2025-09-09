<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller

{
    /**
     * Dashboard (latest projects)
     */
    public function dashboard()
    {
        $projects = Project::with(['createdBy', 'lastEditedBy'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Dashboard/Index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Project list with filters
     */
    public function index(Request $request)
    {
        $query = Project::with(['createdBy', 'lastEditedBy']);

        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $projects = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Projects/Index', [
            'projects'    => $projects,
            'queryParams' => $request->query(),
        ]);
    }

    /**
     * Create page
     */
    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    /**
     * Store new project
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'status'      => 'required|in:pending,done',
            'description' => 'nullable|string|max:1000',
            'due_date'    => 'nullable|date',
        ]);

        Project::create([
            'name'           => $request->name,
            'status'         => $request->status,
            'description'    => $request->description,
            'due_date'       => $request->due_date,
            'created_by'     => Auth::id(),
            'updated_by'     => Auth::id(),
            'last_edited_by' => Auth::id(),
            'last_edited_at' => now(),
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Project created successfully.');
    }

    /**
     * Edit page
     */
    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project, // pass the raw project model
            'user'    => Auth::user(), // pass the logged-in user
        ]);
    }

    /**
     * Update project
     */
    public function update(Request $request, Project $project)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'status'   => 'required|in:pending,done',
            'due_date' => 'nullable|date',
            'remarks'  => 'nullable|string|max:1000',
        ]);

        $project->update([
            'name'           => $request->name,
            'status'         => $request->status,
            'due_date'       => $request->due_date,
            'remarks'        => $request->remarks,
            'updated_by'     => Auth::id(),
            'last_edited_by' => Auth::id(),
            'last_edited_at' => now(),
        ]);

        return redirect()->route('projects.index')
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Show single project
     */
    public function show(Project $project)
    {
        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }

    /**
     * Delete project
     */
    public function destroy(Project $project)
    {
        $project->tasks()->delete();
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted successfully.');
    }
}