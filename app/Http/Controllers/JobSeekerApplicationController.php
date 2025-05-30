<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class JobSeekerApplicationController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified', 'role:job_seeker']);
    }

    /**
     * Show “apply” form.
     */
    public function create(Job $job)
    {
        // prevent double‐apply
        if ($job->applications()->where('user_id', auth()->id())->exists()) {
            return redirect()->route('jobs.show', $job)
                             ->with('error', 'You have already applied for this job.');
        }

        // still open?
        if ($job->status !== 'open' 
            || ($job->application_deadline && now()->isAfter($job->application_deadline))
        ) {
            return redirect()->route('jobs.show', $job)
                             ->with('error', 'This job is no longer accepting applications.');
        }

        return Inertia::render('Jobs/Apply', [
            'job'  => $job->load('company', 'category'),
            'user' => auth()->user()->load('educations', 'workExperiences'),
        ]);
    }

    /**
     * Handle form submit.
     */
    public function store(Request $request, Job $job)
    {
        // same guards
        if ($job->applications()->where('user_id', auth()->id())->exists()) {
            return back()->with('error', 'You have already applied.');
        }
        if ($job->status !== 'open' 
            || ($job->application_deadline && now()->isAfter($job->application_deadline))
        ) {
            return back()->with('error', 'Applications are closed.');
        }

        $validated = $request->validate([
            'cover_letter' => 'nullable|string|max:5000',
            'resume'       => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $resumePath = $request->file('resume')->store('resumes', 'public');

        Application::create([
            'user_id'            => auth()->id(),
            'job_id'             => $job->id,
            'cover_letter'       => $validated['cover_letter'] ?? null,
            'resume_path'        => $resumePath,
            'application_status' => 'pending',
            'applied_at'         => now(),
        ]);

        

        return redirect()
        ->route('jobseeker.applications.index')
        ->with('success', 'Your application has been submitted.');
    }

    /**
     * List my applications.
     */
    public function index()
{
    $applications = auth()->user()
        ->applications()
        ->with('job.company')
        ->latest('created_at')
        ->paginate(10)
        ->through(fn($app) => [
            'id' => $app->id,
            'job' => [
              'title'   => $app->job->title,
              'company' => ['name' => $app->job->company->name],
            ],
            'application_status' => $app->application_status,
'applied_at' => $app->applied_at
            ? Carbon::parse($app->applied_at)->diffForHumans()
            : null,
                ]);

    return Inertia::render('Professionals/Applications/Index', [
        'applications' => $applications,
    ]);
}


    /**
     * Show one.
     */
    public function show(Application $application)
    {
        $this->authorize('view', $application);

        return Inertia::render('JobSeeker/Applications/Show', [
            'application' => $application->load('job.company'),
        ]);
    }

    /**
     * Download resume.
     */
    public function downloadResume(Application $application)
    {
        $this->authorize('view', $application);

        return Storage::disk('public')->download($application->resume_path);
    }
}
