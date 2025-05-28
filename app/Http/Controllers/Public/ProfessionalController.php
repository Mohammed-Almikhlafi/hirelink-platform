<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\JobCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfessionalController extends Controller
{
    /**
     * Display a listing of professionals.
     */
    public function index(Request $request)
    {
        $query = User::where('role', 'job_seeker')
            ->with(['jobCategory'])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('specialization', 'like', "%{$search}%")
                        ->orWhereHas('skills', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->when($request->category, function ($query, $category) {
                $query->where('job_category_id', $category);
            })
            ->when($request->skills, function ($query, $skills) {
                $skills = explode(',', $skills);
                foreach ($skills as $skill) {
                    $query->whereHas('skills', function ($q) use ($skill) {
                        $q->where('name', $skill);
                    });
                }
            });

        $professionals = $query->latest()->paginate(12);
        $categories = JobCategory::all();
        $allSkills = \App\Models\Skill::orderBy('name')->get();

        return Inertia::render('Professionals/Index', [
            'professionals' => $professionals,
            'categories' => $categories,
            'skills' => $allSkills,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'skills' => $request->skills,
            ],
        ]);
    }

    /**
     * Display the specified professional's profile.
     */
    public function show(User $professional)
    {
        if ($professional->role !== 'job_seeker') {
            abort(404);
        }

        $professional->load([
            'jobCategory',
            'skills',
            'educations',
            'workExperiences'
        ]);

        return Inertia::render('Professionals/Show', [
            'professional' => [
                'id' => $professional->id,
                'name' => $professional->name,
                'email' => $professional->email,
                'specialization' => $professional->specialization,
                'headline' => $professional->headline,
                'bio' => $professional->bio,
                'location' => $professional->location,
                'website_url' => $professional->website_url,
                'avatar_url' => $professional->avatar_url,
                'job_category' => $professional->jobCategory ? [
                    'id' => $professional->jobCategory->id,
                    'name' => $professional->jobCategory->name,
                ] : null,
                'skills' => $professional->skills->pluck('name'),
                'educations' => $professional->educations->map(function ($edu) {
                    return [
                        'school' => $edu->school,
                        'degree' => $edu->degree,
                        'field_of_study' => $edu->field_of_study,
                        'start_year' => $edu->start_year,
                        'end_year' => $edu->end_year,
                    ];
                }),
                'work_experiences' => $professional->workExperiences->map(function ($exp) {
                    return [
                        'company' => $exp->company,
                        'title' => $exp->title,
                        'location' => $exp->location,
                        'start_date' => $exp->start_date,
                        'end_date' => $exp->end_date,
                        'description' => $exp->description,
                    ];
                }),
            ],
        ]);
    }
} 