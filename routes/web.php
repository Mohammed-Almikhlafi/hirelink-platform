<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])
    ->name('home');

Route::get('/login', fn() => Inertia::render('Auth/Login'))
    ->name('login');

Route::get('/register', fn() => Inertia::render('Auth/Register'))
    ->name('register');

Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// إنشاء وتخزين الفئات للمسؤولين
Route::middleware(['auth', 'can:admin'])->group(function () {
    Route::get('/categories/create', [CategoryController::class, 'create']);
    Route::post('/categories', [CategoryController::class, 'store'])
        ->name('categories.store');
});

// عرض الفئة لأي زائر
Route::get('/categories/{id}', [CategoryController::class, 'show'])
    ->name('categories.show');

// موارد الوظائف (index, create, store, show, edit, update, destroy)
Route::resource('jobs', JobController::class);

// مسارات المستخدمين والبروفايل مع مصادقة
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('users', UserController::class)
        ->only(['index', 'show']);
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

// حماية الوصول لقائمة المستخدمين باستخدام Gate 'admin'
Route::middleware(['auth', 'can:admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])
        ->name('users.index');
    Route::post('/users/{user}/roles', [UserController::class, 'updateRoles'])
        ->name('users.updateRoles');
});

require __DIR__ . '/auth.php';