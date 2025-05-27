<?php

namespace App\Http\Controllers;

use App\Models\JobCategory;
use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Company;

class JobController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
        $this->middleware('role:employer')->only(['create', 'store', 'edit', 'update', 'destroy']);
    }

    public function index()
    {
        $jobs = Job::with('company')->latest()->get();
        $categories = JobCategory::select('id', 'name')->get();

        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs,
            'categories' => $categories,
        ]);
    }

    
        public function show(Job $job)
        {
            return Inertia::render('Jobs/Show', [
                'job' => $job,
            ]);
        }



    public function create()
    {
        $categories = JobCategory::select('id', 'name')->get();

        return Inertia::render('Jobs/Create', [
            'categories' => $categories,
            'jobTypes' => ['full-time', 'part-time', 'contract', 'internship'],
        ]);
    }

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

        $job = Job::create([
            ...$validated,
            'company_id' => auth()->user()->company_id,
            'status' => 'open',
        ]);

        return redirect()->route('employer.jobs.show', $job)
            ->with('success', 'Job posted successfully.');
    }

    public function edit(Job $job)
    {
        $this->authorize('update', $job);

        return Inertia::render('Jobs/Edit', [
            'job' => $job->load('category'),
            'categories' => JobCategory::select('id', 'name')->get(),
            'jobTypes' => ['full-time', 'part-time', 'contract', 'internship'],
        ]);
    }

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
            'application_deadline' => 'required|date|after:today',
            'status' => 'required|in:open,closed',
        ]);

        $job->update($validated);

        return redirect()->route('employer.jobs.show', $job)
            ->with('success', 'Job updated successfully.');
    }

    public function destroy(Job $job)
    {
        $this->authorize('delete', $job);

        $job->delete();

        return redirect()->route('employer.jobs.index')
            ->with('success', 'Job deleted successfully.');
    }
}