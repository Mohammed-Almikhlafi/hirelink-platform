<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobCategory;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    /**
     * Display the landing page.
     */
    public function index()
    {
        $jobs = Job::with(['company', 'category'])
            ->where('status', 'open')
            ->whereDate('application_deadline', '>', now())
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'company' => [
                        'name' => $job->company->name,
                        'logo' => $job->company->logo_url,
                    ],
                    'location' => $job->location,
                    'type' => $job->job_type,
                    'salary' => $job->salary_range,
                    'posted_at' => $job->created_at->diffForHumans(),
                ];
            });

        $categories = JobCategory::withCount('jobs')
            ->orderByDesc('jobs_count')
            ->take(8)
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'jobs_count' => $category->jobs_count,
                ];
            });

        $users = User::where('role', 'job_seeker')
            ->where('is_active', true)
            ->with(['jobCategory', 'skills'])
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'headline' => $user->headline,
                    'avatar_url' => $user->avatar_url,
                    'location' => $user->location,
                    'category' => $user->jobCategory ? $user->jobCategory->name : null,
                    'skills' => $user->skills->pluck('name')->take(3),
                ];
            });

        return Inertia::render('Home', [
            'jobs' => $jobs,
            'categories' => $categories,
            'users' => $users,
        ]);
    }

    /**
     * Search jobs, companies, or professionals.
     */
    public function search(Request $request)
    {
        $query = $request->input('query');
        $type = $request->input('type', 'jobs');
        $category = $request->input('category');
        $location = $request->input('location');

        switch ($type) {
            case 'jobs':
                $results = Job::with(['company', 'category'])
                    ->where('status', 'open')
                    ->whereDate('application_deadline', '>', now())
                    ->when($query, function ($q) use ($query) {
                        $q->where('title', 'like', "%{$query}%")
                            ->orWhere('description', 'like', "%{$query}%");
                    })
                    ->when($category, function ($q) use ($category) {
                        $q->where('job_category_id', $category);
                    })
                    ->when($location, function ($q) use ($location) {
                        $q->where('location', 'like', "%{$location}%");
                    })
                    ->latest()
                    ->paginate(10);
                break;

            case 'companies':
                $results = Company::withCount('jobs')
                    ->when($query, function ($q) use ($query) {
                        $q->where('name', 'like', "%{$query}%")
                            ->orWhere('description', 'like', "%{$query}%");
                    })
                    ->when($location, function ($q) use ($location) {
                        $q->where('location', 'like', "%{$location}%");
                    })
                    ->latest()
                    ->paginate(10);
                break;

            case 'professionals':
                $results = User::where('role', 'job_seeker')
                    ->where('is_active', true)
                    ->with(['jobCategory', 'skills'])
                    ->when($query, function ($q) use ($query) {
                        $q->where(function ($q) use ($query) {
                            $q->where('name', 'like', "%{$query}%")
                                ->orWhere('headline', 'like', "%{$query}%")
                                ->orWhere('specialization', 'like', "%{$query}%");
                        });
                    })
                    ->when($location, function ($q) use ($location) {
                        $q->where('location', 'like', "%{$location}%");
                    })
                    ->latest()
                    ->paginate(10);
                break;

            default:
                abort(400, 'Invalid search type');
        }

        return Inertia::render('Search', [
            'results' => $results,
            'type' => $type,
            'query' => $query,
            'category' => $category,
            'location' => $location,
            'categories' => JobCategory::all(),
        ]);
    }
} 