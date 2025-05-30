<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\JobCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request)
    {
        $query = User::query()
            ->with('jobCategory')
            ->when($request->search, fn($q, $search) =>
                $q->where(fn($q2) =>
                    $q2->where('name', 'like', "%{$search}%")
                       ->orWhere('email', 'like', "%{$search}%")
                       ->orWhere('role', 'like', "%{$search}%")
                )
            )
            ->when($request->role, fn($q, $role) => $q->where('role', $role))
            ->when($request->filled('is_active'), fn($q) => $q->where('is_active', $request->boolean('is_active')));

        $users = $query->latest()->paginate(10)->withQueryString();

        // Transform the users to include the status
        $users->through(function ($user) {
            $user->status = $user->is_active ? 'active' : 'blocked';
            return $user;
        });

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $request->search,
                'role' => $request->role,
                'is_active' => $request->boolean('is_active'),
            ],
            'stats' => [
                'total' => User::count(),
                'active' => User::where('is_active', true)->count(),
                'blocked' => User::where('is_active', false)->count(),
                'job_seekers' => User::where('role', 'job_seeker')->count(),
                'employers' => User::where('role', 'employer')->count(),
                'admins' => User::where('role', 'admin')->count(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        return Inertia::render('Admin/Users/Create', [
            'jobCategories' => JobCategory::all(),
        ]);
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', Password::defaults()],
            'role' => 'required|in:job_seeker,employer,admin',
            'is_active' => 'required|boolean',
            'job_category_id' => 'nullable|exists:job_categories,id',
            'specialization' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'is_active' => $request->is_active,
            'job_category_id' => $request->job_category_id,
            'specialization' => $request->specialization,
            'location' => $request->location,
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'is_active' => $user->is_active,
                'job_category_id' => $user->job_category_id,
                'specialization' => $user->specialization,
                'location' => $user->location,
            ],
            'jobCategories' => JobCategory::all(),
        ]);
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => $request->password ? [Password::defaults()] : '',
            'role' => 'required|in:job_seeker,employer,admin',
            'is_active' => 'required|boolean',
            'job_category_id' => 'nullable|exists:job_categories,id',
            'specialization' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'is_active' => $request->is_active,
            'job_category_id' => $request->job_category_id,
            'specialization' => $request->specialization,
            'location' => $request->location,
        ]);

        if ($request->password) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    /**
     * Toggle user status (active/blocked).
     */
    public function toggleStatus(User $user)
    {
        $user->update([
            'is_active' => !$user->is_active
        ]);

        return back()->with('success', 'User status updated successfully.');
    }
} 