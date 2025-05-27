<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployerJobController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
        $this->middleware('role:employer');
    }

    /**
     * Display a listing of the employer's jobs.
     */
    public function index()
    {
        $jobs = auth()->user()->company->jobs()
            ->withCount('applications')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Employer/Jobs/Index', [
            'jobs' => $jobs,
        ]);
    }

    /**
     * Show the form for creating a new job.
     */
    public function create()
    {
        return Inertia::render('Employer/Jobs/Create', [
            'categories' => JobCategory::all(),
            'jobTypes' => ['full-time', 'part-time', 'contract', 'internship'],
        ]);
    }

    /**
     * Store a newly created job in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'job_category_id' => 'required|exists:job_categories,id',
            'job_type' => 'required|in:full-time,part-time,contract,internship',
            'salary_range' => 'required|string|max:255',
            'application_deadline' => 'required|date|after:today',
        ]);

        $job = auth()->user()->company->jobs()->create($validated + [
            'status' => 'open',
        ]);

        return redirect()->route('employer.jobs.show', $job)
            ->with('success', 'Job posted successfully.');
    }

    /**
     * Display the specified job.
     */
    public function show(Job $job)
    {
        $this->authorize('view', $job);

        return Inertia::render('Employer/Jobs/Show', [
            'job' => $job->load(['company', 'category'])->loadCount('applications'),
        ]);
    }

    /**
     * Show the form for editing the specified job.
     */
    public function edit(Job $job)
    {
        $this->authorize('update', $job);

        return Inertia::render('Employer/Jobs/Edit', [
            'job' => $job->load(['company', 'category']),
            'categories' => JobCategory::all(),
            'jobTypes' => ['full-time', 'part-time', 'contract', 'internship'],
        ]);
    }

    /**
     * Update the specified job in storage.
     */
    public function update(Request $request, Job $job)
    {
        $this->authorize('update', $job);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'job_category_id' => 'required|exists:job_categories,id',
            'job_type' => 'required|in:full-time,part-time,contract,internship',
            'salary_range' => 'required|string|max:255',
            'application_deadline' => 'required|date',
            'status' => 'required|in:open,closed',
        ]);

        $job->update($validated);

        return back()->with('success', 'Job updated successfully.');
    }

    /**
     * Remove the specified job from storage.
     */
    public function destroy(Job $job)
    {
        $this->authorize('delete', $job);

        $job->delete();

        return redirect()->route('employer.jobs.index')
            ->with('success', 'Job deleted successfully.');
    }
} 