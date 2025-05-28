<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployerJobController;
use App\Http\Controllers\Public\LandingController;
use App\Http\Controllers\Public\JobController as PublicJobController;
use App\Http\Controllers\Public\CompanyController as PublicCompanyController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Public\ProfessionalController;
use App\Http\Controllers\JobSeekerApplicationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/search', [LandingController::class, 'search'])->name('search');

// Public job routes
Route::get('/jobs', [PublicJobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{job}', [PublicJobController::class, 'show'])->name('jobs.show');

// Public company routes
Route::get('/companies', [PublicCompanyController::class, 'index'])->name('companies.index');
Route::get('/companies/{company}', [PublicCompanyController::class, 'show'])->name('companies.show');
Route::get('/companies/{company}/jobs', [PublicCompanyController::class, 'jobs'])->name('companies.jobs');

// Public professional routes
Route::get('/professionals', [ProfessionalController::class, 'index'])->name('professionals.index');
Route::get('/professionals/{professional}', [ProfessionalController::class, 'show'])->name('professionals.show');

// Authentication routes
Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');
Route::get('/register', fn() => Inertia::render('Auth/Register'))->name('register');

// Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Employer routes
Route::middleware(['auth', 'verified', 'role:employer'])->group(function () {
    Route::get('/employer/jobs', [EmployerJobController::class, 'index'])->name('employer.jobs.index');
    Route::get('/employer/jobs/create', [EmployerJobController::class, 'create'])->name('employer.jobs.create');
    Route::post('/employer/jobs', [EmployerJobController::class, 'store'])->name('employer.jobs.store');
    Route::get('/employer/jobs/{job}', [EmployerJobController::class, 'show'])->name('employer.jobs.show');
    Route::get('/employer/jobs/{job}/edit', [EmployerJobController::class, 'edit'])->name('employer.jobs.edit');
    Route::put('/employer/jobs/{job}', [EmployerJobController::class, 'update'])->name('employer.jobs.update');
    Route::delete('/employer/jobs/{job}', [EmployerJobController::class, 'destroy'])->name('employer.jobs.destroy');
    // Job Applications
    Route::get('/employer/jobs/{job}/applications', [JobApplicationController::class, 'index'])->name('employer.jobs.applications');
    Route::get('/employer/jobs/{job}/applications/{application}/details', [JobApplicationController::class, 'details'])->name('employer.jobs.applications.details');
    Route::put('/employer/jobs/{job}/applications/{application}', [JobApplicationController::class, 'update'])->name('employer.jobs.applications.update');
    Route::get('/employer/jobs/{job}/applications/{application}/resume', [JobApplicationController::class, 'downloadResume'])->name('employer.jobs.applications.resume');
});

// Admin routes
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/reports', [AdminController::class, 'reports'])->name('reports');
    Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
    
    // User management routes
    Route::get('/users', [App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [App\Http\Controllers\Admin\UserController::class, 'create'])->name('users.create');
    Route::post('/users', [App\Http\Controllers\Admin\UserController::class, 'store'])->name('users.store');
    Route::get('/users/{user}/edit', [App\Http\Controllers\Admin\UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [App\Http\Controllers\Admin\UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('users.destroy');
    Route::patch('/users/{user}/toggle-status', [App\Http\Controllers\Admin\UserController::class, 'toggleStatus'])->name('users.toggle-status');
});

// Category routes
Route::get('/job-categories/{id}', [JobCategoryController::class, 'show'])->name('job-categories.show');

// User and profile routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('users', UserController::class)->only(['index', 'show']);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/jobs/create', [JobController::class, 'create'])->name('jobs.create');
    Route::post('/jobs', [JobController::class, 'store'])->name('jobs.store');
    Route::get('/jobs/{job}/edit', [JobController::class, 'edit'])->name('jobs.edit');
    Route::put('/jobs/{job}', [JobController::class, 'update'])->name('jobs.update');
    Route::delete('/jobs/{job}', [JobController::class, 'destroy'])->name('jobs.destroy');
});

// Job seeker routes
Route::middleware(['auth', 'verified', 'role:job_seeker'])->group(function () {
    Route::get('/applications', [JobSeekerApplicationController::class, 'index'])->name('jobseeker.applications.index');
    Route::get('/applications/{application}', [JobSeekerApplicationController::class, 'show'])->name('jobseeker.applications.show');
    Route::get('/jobs/{job}/apply', [JobSeekerApplicationController::class, 'create'])
         ->name('jobseeker.applications.create');
    Route::post('/jobs/{job}/apply', [JobSeekerApplicationController::class, 'store'])->name('jobseeker.applications.store');
    Route::get('/applications/{application}/resume', [JobSeekerApplicationController::class, 'downloadResume'])->name('jobseeker.applications.resume');
});

require __DIR__ . '/auth.php';