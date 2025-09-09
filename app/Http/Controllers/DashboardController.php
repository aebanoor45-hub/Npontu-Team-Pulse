<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        // All projects created today
        $createdToday = Project::with('createdBy')->whereDate('created_at', $today)->get();

        // All projects edited today
        $editedToday = Project::with('lastEditedBy')->whereDate('updated_at', $today)->get();

        return inertia('Dashboard', [
            'createdToday' => $createdToday,
            'editedToday' => $editedToday,
            'auth' => auth(),
        ]);
    }
}
