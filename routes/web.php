<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployerJobController;
use App\Http\Controllers\Public\LandingController;
use App\Http\Controllers\Public\JobController as PublicJobController;
use App\Http\Controllers\Public\CompanyController as PublicCompanyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/search', [LandingController::class, 'search'])->name('search');

// Public job routes
Route::get('/jobs', [PublicJobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{job}', [PublicJobController::class, 'show'])->name('jobs.show');
Route::post('/jobs/{job}/apply', [PublicJobController::class, 'apply'])
    ->middleware(['auth', 'verified', 'role:professional'])
    ->name('jobs.apply');

// Public company routes
Route::get('/companies', [PublicCompanyController::class, 'index'])->name('companies.index');
Route::get('/companies/{company}', [PublicCompanyController::class, 'show'])->name('companies.show');
Route::get('/companies/{company}/jobs', [PublicCompanyController::class, 'jobs'])->name('companies.jobs');


// Authentication routes
Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');
Route::get('/register', fn() => Inertia::render('Auth/Register'))->name('register');


// Public category routes (index & show only)
Route::get('/job-categories', [JobCategoryController::class, 'index'])
    ->name('job-categories.index');
Route::get('/job-categories/{category}', [JobCategoryController::class, 'show'])
    ->whereNumber('category')
    ->name('job-categories.show');


// Admin routes (Job Categories & Users)
Route::middleware(['auth', 'can:admin'])->group(function () {
    // Job Categories CRUD
    Route::get('/job-categories/create', [JobCategoryController::class, 'create'])
        ->name('job-categories.create');
    Route::post('/job-categories', [JobCategoryController::class, 'store'])
        ->name('job-categories.store');
    Route::get('/job-categories/{category}/edit', [JobCategoryController::class, 'edit'])
        ->whereNumber('category')
        ->name('job-categories.edit');
    Route::put('/job-categories/{category}', [JobCategoryController::class, 'update'])
        ->whereNumber('category')
        ->name('job-categories.update');
    Route::delete('/job-categories/{category}', [JobCategoryController::class, 'destroy'])
        ->whereNumber('category')
        ->name('job-categories.destroy');

    // User management
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users/{user}/roles', [UserController::class, 'updateRoles'])
        ->name('users.updateRoles');
});
// Route::get('/job-categories/{category}/edit', [CategoryController::class, 'edit'])->name('job-categories.edit');
// Route::put('/job-categories/{category}', [CategoryController::class, 'update'])->name('job-categories.update');

Route::get('/categories/{category}', [CategoryController::class, 'show'])->name('categories.show');
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
    Route::get('/employer/jobs/{job}/applications', [EmployerJobController::class, 'applications'])->name('employer.jobs.applications');
    Route::put('/employer/jobs/{job}/applications/{application}', [EmployerJobController::class, 'updateApplicationStatus'])->name('employer.jobs.applications.update');
});

// User & Profile routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('users', UserController::class)
        ->only(['index', 'show']);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';