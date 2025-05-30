<?php

namespace App\Http\Controllers\Auth;

use App\Models\JobCategory;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Traits\RecordsActivity;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{   
    use RecordsActivity;

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'categories' => JobCategory::all(),
            'defaultRole' => config('auth.defaults.role', 'job_seeker'),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'specialization' => 'required|string|max:255',
            'job_category_id' => 'required|exists:job_categories,id',
            'role' => 'required|in:job_seeker,employer',
            'location' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'specialization' => $request->specialization,
            'job_category_id' => $request->job_category_id,
            'role' => $request->role,
            'location' => $request->location,
            'is_active' => true,
        ]);

        // Dispatch the Registered event for email verification
        event(new Registered($user));

        // Log in the user first
        Auth::login($user);

        // Now record the activity after the user is authenticated
        $this->recordUserRegistration($user);

        return redirect(RouteServiceProvider::HOME);
    }
}