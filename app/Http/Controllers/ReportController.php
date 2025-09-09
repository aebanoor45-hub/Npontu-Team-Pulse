<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'start_date' => $request->start_date ?? now()->toDateString(),
            'end_date'   => $request->end_date ?? now()->toDateString(),
            'user_id'    => $request->user_id ?? null,
        ];

        $users = User::select('id', 'name')->get();

        // Projects for list
        $projectsQuery = Project::query()
            ->when($filters['user_id'], fn($q) => $q->where('last_edited_by', $filters['user_id']))
            ->whereDate('created_at', '>=', $filters['start_date'])
            ->whereDate('created_at', '<=', $filters['end_date']);

        $projects = $projectsQuery->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Analytics: separate queries for created and edited
        $analyticsCreated = Project::query()
            ->when($filters['user_id'], fn($q) => $q->where('created_by', $filters['user_id']))
            ->whereDate('created_at', '>=', $filters['start_date'])
            ->whereDate('created_at', '<=', $filters['end_date'])
            ->selectRaw('DATE(created_at) as day, COUNT(*) as count')
            ->groupBy('day')
            ->orderBy('day')
            ->pluck('count', 'day')
            ->toArray();

        $analyticsEdited = Project::query()
            ->when($filters['user_id'], fn($q) => $q->where('last_edited_by', $filters['user_id']))
            ->whereDate('last_edited_at', '>=', $filters['start_date'])
            ->whereDate('last_edited_at', '<=', $filters['end_date'])
            ->selectRaw('DATE(last_edited_at) as day, COUNT(*) as count')
            ->groupBy('day')
            ->orderBy('day')
            ->pluck('count', 'day')
            ->toArray();

        $analyticsStatus = Project::query()
            ->when($filters['user_id'], fn($q) => $q->where('last_edited_by', $filters['user_id']))
            ->whereDate('created_at', '>=', $filters['start_date'])
            ->whereDate('created_at', '<=', $filters['end_date'])
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        return Inertia::render('Reports/Index', [
            'projects'  => $projects,
            'analytics' => [
                'created' => $analyticsCreated,
                'edited'  => $analyticsEdited,
                'status'  => $analyticsStatus,
            ],
            'users'     => $users,
            'filters'   => $filters,
            'auth'      => Auth::user(),
        ]);
    }
}
