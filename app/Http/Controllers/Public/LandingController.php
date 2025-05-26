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
        return Inertia::render('Home', [
            'featuredJobs' => Job::with(['company', 'category'])
                ->where('status', 'open')
                ->latest()
                ->take(6)
                ->get(),
            'categories' => JobCategory::withCount('jobs')
                ->orderByDesc('jobs_count')
                ->take(8)
                ->get(),
            'professionals' => User::where('role', 'professional')
                ->with('profile')
                ->latest()
                ->take(6)
                ->get(),
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
                    ->when($query, function ($q) use ($query) {
                        $q->where('title', 'like', "%{$query}%")
                            ->orWhere('description', 'like', "%{$query}%");
                    })
                    ->when($category, function ($q) use ($category) {
                        $q->where('category_id', $category);
                    })
                    ->when($location, function ($q) use ($location) {
                        $q->where('location', 'like', "%{$location}%");
                    })
                    ->latest()
                    ->paginate(10);
                break;

            case 'companies':
                $results = Company::with('jobs')
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
                $results = User::where('role', 'professional')
                    ->with('profile')
                    ->when($query, function ($q) use ($query) {
                        $q->where('name', 'like', "%{$query}%")
                            ->orWhereHas('profile', function ($q) use ($query) {
                                $q->where('title', 'like', "%{$query}%")
                                    ->orWhere('bio', 'like', "%{$query}%");
                            });
                    })
                    ->when($location, function ($q) use ($location) {
                        $q->whereHas('profile', function ($q) use ($location) {
                            $q->where('location', 'like', "%{$location}%");
                        });
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