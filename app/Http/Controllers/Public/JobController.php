<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobCategory;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    /**
     * Display a listing of jobs.
     */
    public function index(Request $request)
    {
        $query = $request->input('query');
        $category = $request->input('category');
        $type = $request->input('type');
        $location = $request->input('location');

        $jobs = Job::with(['company', 'category'])
            ->where('status', 'open')
            ->when($query, function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%");
            })
            ->when($category, function ($q) use ($category) {
                $q->where('job_category_id', $category);
            })
            ->when($type, function ($q) use ($type) {
                $q->where('job_type', $type);
            })
            ->when($location, function ($q) use ($location) {
                $q->where('location', 'like', "%{$location}%");
            })
            ->latest()
            ->paginate(12);

        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs,
            'filters' => [
                'query' => $query,
                'category' => $category,
                'type' => $type,
                'location' => $location,
            ],
            'categories' => JobCategory::select('id', 'name')->get(),
        ]);
    }

    /**
     * Display the specified job.
     */
    public function show(Job $job)
    {
        if ($job->status !== 'open') {
            abort(404);
        }

        $job->load(['company', 'category']);

        $similarJobs = Job::with(['company', 'category'])
            ->where('status', 'open')
            ->where('id', '!=', $job->id)
            ->where(function ($query) use ($job) {
                $query->where('job_category_id', $job->category_id)
                    ->orWhere('company_id', $job->company_id);
            })
            ->latest()
            ->take(3)
            ->get();

        $hasApplied = auth()->check() ? 
            Application::where('job_id', $job->id)
                ->where('user_id', auth()->id())
                ->exists() : 
            false;

        return Inertia::render('Jobs/Show', [
            'job' => $job,
            'similarJobs' => $similarJobs,
            'hasApplied' => $hasApplied,
        ]);
    }

    /**
     * Apply for a job.
     */
    public function apply(Request $request, Job $job)
    {
        if ($job->status !== 'open') {
            abort(404);
        }

        $this->middleware(['auth', 'verified']);
        $this->middleware('role:professional');

        if (Application::where('job_id', $job->id)
            ->where('user_id', auth()->id())
            ->exists()) {
            return back()->with('error', 'You have already applied for this job.');
        }

        $validated = $request->validate([
            'cover_letter' => 'required|string|min:100',
        ]);

        $application = Application::create([
            'job_id' => $job->id,
            'user_id' => auth()->id(),
            'status' => 'pending',
            'cover_letter' => $validated['cover_letter'],
        ]);

        $application->recordJobApplication($application);

        return redirect()->route('jobs.show', $job)
            ->with('success', 'Application submitted successfully.');
    }
} 