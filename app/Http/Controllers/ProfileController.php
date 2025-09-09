<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Project;
use App\Http\Resources\ProjectResource;

class ProfileController extends Controller
{
    /**
     * Show profile page with user's projects and filters
     */
    public function index(Request $request)
    {
        $query = Project::with(['createdBy', 'lastEditedBy'])
            ->where('created_by', Auth::id());

        // Filters
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $projects = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Profile/Index', [
            'user'        => Auth::user(),
            'projects'    => [
                'data'         => ProjectResource::collection($projects)->resolve(),
                'links'        => $projects->links(),
                'total'        => $projects->total(),
                'per_page'     => $projects->perPage(),
                'current_page' => $projects->currentPage(),
            ],
            'queryParams' => $request->query(),
        ]);
    }

    /**
     * Show the profile edit form
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'user'            => $request->user(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status'          => session('status'),
        ]);
    }

    /**
     * Update profile information
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('success', 'Profile updated successfully.');
    }

    /**
     * Update user's password
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password'         => ['required', 'confirmed', 'min:8'],
        ]);

        $user = $request->user();
        $user->password = bcrypt($request->password);
        $user->save();

        return redirect()->back()->with('success', 'Password updated successfully.');
    }

    /**
     * Delete user's account
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
