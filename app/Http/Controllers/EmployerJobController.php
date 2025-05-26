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
        $jobs = Job::with(['category', 'applications'])
            ->where('company_id', auth()->user()->company_id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Employer/Jobs/Index', [
            'jobs' => $jobs
        ]);
    }

    /**
     * Show the form for creating a new job.
     */
    public function create()
    {
        $categories = JobCategory::all();

        return Inertia::render('Employer/Jobs/Create', [
            'categories' => $categories
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
            'category_id' => 'required|exists:job_categories,id',
            'type' => 'required|in:full-time,part-time,contract,freelance',
            'location' => 'required|string|max:255',
            'salary_range' => 'required|string|max:255',
            'requirements' => 'required|string',
            'responsibilities' => 'required|string',
            'deadline' => 'required|date|after:today',
        ]);

        $job = Job::create([
            ...$validated,
            'company_id' => auth()->user()->company_id,
            'status' => 'open',
        ]);

        $job->recordJobPosted($job);

        return redirect()->route('employer.jobs.index')
            ->with('success', 'Job posted successfully.');
    }

    /**
     * Display the specified job.
     */
    public function show(Job $job)
    {
        $this->authorize('view', $job);

        $job->load(['category', 'applications.user', 'company']);

        return Inertia::render('Employer/Jobs/Show', [
            'job' => $job
        ]);
    }

    /**
     * Show the form for editing the specified job.
     */
    public function edit(Job $job)
    {
        $this->authorize('update', $job);

        $categories = JobCategory::all();

        return Inertia::render('Employer/Jobs/Edit', [
            'job' => $job,
            'categories' => $categories
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
            'category_id' => 'required|exists:job_categories,id',
            'type' => 'required|in:full-time,part-time,contract,freelance',
            'location' => 'required|string|max:255',
            'salary_range' => 'required|string|max:255',
            'requirements' => 'required|string',
            'responsibilities' => 'required|string',
            'deadline' => 'required|date|after:today',
            'status' => 'required|in:open,closed,draft',
        ]);

        $job->update($validated);

        return redirect()->route('employer.jobs.show', $job)
            ->with('success', 'Job updated successfully.');
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

    /**
     * Display job applications.
     */
    public function applications(Job $job)
    {
        $this->authorize('view', $job);

        $applications = $job->applications()
            ->with('user.profile')
            ->latest()
            ->paginate(10);

        return Inertia::render('Employer/Jobs/Applications', [
            'job' => $job,
            'applications' => $applications
        ]);
    }

    /**
     * Update application status.
     */
    public function updateApplicationStatus(Request $request, Job $job, Application $application)
    {
        $this->authorize('update', $job);

        $validated = $request->validate([
            'status' => 'required|in:pending,shortlisted,rejected,accepted'
        ]);

        $application->update($validated);

        return back()->with('success', 'Application status updated successfully.');
    }
} 