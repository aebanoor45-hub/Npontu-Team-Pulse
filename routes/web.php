<?php

use App\Http\Controllers\ReportController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Redirect root to dashboard
Route::redirect('/', '/dashboard');

// Routes requiring authentication
Route::middleware(['auth'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [ProjectController::class, 'dashboard'])->name('dashboard');

    // Projects
    Route::resource('projects', ProjectController::class);
    

    // Tasks
    Route::resource('tasks', TaskController::class);
    

    // Users
    Route::resource('users', UserController::class);

    // Reports
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

    // Profile management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
