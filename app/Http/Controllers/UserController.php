<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{


    public function show($id)
    {
        $user = User::select('id', 'name', 'email', 'specialization', 'avatar_url')
            ->findOrFail($id);

        return Inertia::render('Profile/Show', [
            'user' => $user
        ]);
    }

    public function index()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }
        $users = User::with('roles')->get();
        return Inertia::render('Users/Index', compact('users'));
    }

    public function editRoles(User $user)
    {
        $roles = Role::pluck('name'); // جميع أسماء الأدوار
        $userRoles = $user->roles->pluck('name')->toArray();

        return Inertia::render('Users/EditRoles', [
            'user' => $user,
            'roles' => $roles,
            'userRoles' => $userRoles,
        ]);
    }


    public function updateRoles(Request $request, User $user)
    {
        $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'string|exists:roles,name',  // لو عندك جدول roles
        ]);

        // نفترض عندك علاقة many-to-many بين المستخدم والأدوار
        $user->roles()->sync($request->roles);

        return redirect()->route('users.index')->with('success', 'Roles updated successfully.');
    }
}