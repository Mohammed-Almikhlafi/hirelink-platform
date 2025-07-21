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
use App\Http\Controllers\Public\JobController;
use App\Http\Controllers\Public\CompanyController as PublicCompanyController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CompanyController;
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

// Public category routes
Route::get('/job-categories', [JobCategoryController::class, 'index'])
    ->name('job-categories.index');
Route::get('/job-categories/{category}', [JobCategoryController::class, 'show'])
    ->whereNumber('category')
    ->name('job-categories.show');

// Admin routes
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

// Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Employer routes
Route::middleware(['auth', 'verified', 'role:employer'])->group(function () {
    // Company setup routes (available to all employers)
    Route::get('/employer/company/create', [CompanyController::class, 'create'])
        ->name('employer.company.create')
        ->withoutMiddleware('employer.hasCompany');
        
    Route::post('/employer/company', [CompanyController::class, 'store'])
        ->name('employer.company.store')
        ->withoutMiddleware('employer.hasCompany');
    
                // Add this route definition

    // Protected employer routes (require company setup)
    Route::middleware('employer.hasCompany')->group(function () {

        Route::get('/employer/company', [CompanyController::class, 'show'])
            ->name('employer.company.show');

        Route::get('/employer/company/edit', [CompanyController::class, 'edit'])
            ->name('employer.company.edit');
        
        Route::put('/employer/company', [CompanyController::class, 'update'])
            ->name('employer.company.update');

        // Job routes with proper naming
        Route::prefix('employer')->name('employer.')->group(function () {
            Route::resource('jobs', EmployerJobController::class)->names([
                'index' => 'jobs.index',
                'create' => 'jobs.create',
                'store' => 'jobs.store',
                'show' => 'jobs.show',
                'edit' => 'jobs.edit',
                'update' => 'jobs.update',
                'destroy' => 'jobs.destroy'
            ]);

            Route::get('/applications', [JobApplicationController::class, 'allApplications'])
                ->name('applications.all');

            Route::get('jobs/{job}', [EmployerJobController::class, 'show'])
                ->name('jobs.show');
            
            // Job Applications - Single definition with consistent naming
            Route::get('jobs/{job}/applications', [JobApplicationController::class, 'index'])
                ->name('jobs.applications');
            Route::get('jobs/{job}/applications/{application}', [JobApplicationController::class, 'show'])
                ->name('jobs.applications.show');
            Route::put('jobs/{job}/applications/{application}', [JobApplicationController::class, 'update'])
                ->name('jobs.applications.update');
            Route::get('jobs/{job}/applications/{application}/resume', [JobApplicationController::class, 'downloadResume'])
                ->name('jobs.applications.resume');
        });
    });
});

// Admin dashboard routes
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/reports', [AdminController::class, 'reports'])->name('reports');
    Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
    
    // User management
    Route::resource('users', App\Http\Controllers\Admin\UserController::class)->except(['show']);
    Route::patch('/users/{user}/toggle-status', [App\Http\Controllers\Admin\UserController::class, 'toggleStatus'])
        ->name('users.toggle-status');
});

// Profile routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Job seeker routes
Route::middleware(['auth', 'verified', 'role:job_seeker'])->group(function () {
    Route::get('/applications', [JobSeekerApplicationController::class, 'index'])
        ->name('jobseeker.applications.index');
    Route::get('/applications/{application}', [JobSeekerApplicationController::class, 'show'])
        ->name('jobseeker.applications.show');
    Route::get('/jobs/{job}/apply', [JobSeekerApplicationController::class, 'create'])
        ->name('jobseeker.applications.create');
    Route::post('/jobs/{job}/apply', [JobSeekerApplicationController::class, 'store'])
        ->name('jobseeker.applications.store');
    Route::get('/applications/{application}/resume', [JobSeekerApplicationController::class, 'downloadResume'])
        ->name('jobseeker.applications.resume');
});

Route::get('/professionals', [ProfessionalController::class, 'index'])
    ->name('professionals.index');

Route::get('/professionals/{professional}', [ProfessionalController::class, 'show'])
    ->name('professionals.show');


require __DIR__ . '/auth.php';