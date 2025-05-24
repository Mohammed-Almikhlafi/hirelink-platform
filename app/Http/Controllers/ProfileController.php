<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    // عرض صفحة البروفايل مع كل بيانات المستخدم
    public function show($id)
    {
        $user = User::with([
            'jobCategory',          // تصنيف الوظيفة
            'company',             // الشركة (لو موجودة)
            'skills',              // المهارات
            'educations',          // التعليم
            'workExperiences',     // الخبرات العملية
            'connections',         // الاتصال (المعارف)
        ])->findOrFail($id);

        return Inertia::render('Profile/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'specialization' => $user->specialization,
                'headline' => $user->headline,
                'summary' => $user->summary,
                'location' => $user->location,
                'website_url' => $user->website_url,
                'avatar_url' => $user->avatar_url,
                'jobCategory' => $user->jobCategory ? $user->jobCategory->name : null,
                'company' => $user->company ? [
                    'name' => $user->company->name,
                    'website' => $user->company->website ?? null,
                    'logo_url' => $user->company->logo_url ?? null,
                ] : null,
                'skills' => $user->skills->map(function ($skill) {
                    return [
                        'name' => $skill->name,
                        'proficiency_level' => $skill->pivot->proficiency_level ?? null,
                    ];
                }),
                'educations' => $user->educations->map(function ($edu) {
                    return [
                        'school' => $edu->school,
                        'degree' => $edu->degree,
                        'field_of_study' => $edu->field_of_study,
                        'start_year' => $edu->start_year,
                        'end_year' => $edu->end_year,
                    ];
                }),
                'workExperiences' => $user->workExperiences->map(function ($work) {
                    return [
                        'company' => $work->company,
                        'position' => $work->position,
                        'start_date' => $work->start_date,
                        'end_date' => $work->end_date,
                        'description' => $work->description,
                    ];
                }),
                'connections_count' => $user->connections->count(),
            ],
        ]);
    }


    /**
     * Update the user's profile information.
     */
        public function update(ProfileUpdateRequest $request): RedirectResponse
        {
            $request->user()->fill($request->validated());

            if ($request->user()->isDirty('email')) {
                $request->user()->email_verified_at = null;
            }

            $request->user()->save();

            return Redirect::route('profile.edit');
        }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}