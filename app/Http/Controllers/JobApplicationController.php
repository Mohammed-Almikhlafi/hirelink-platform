<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function index(Job $job)
    {
        $this->authorize('viewApplications', $job);

        $applications = $job->applications()
            ->with(['user'])
            ->select('id', 'user_id', 'application_status', 'created_at', 'resume_path')
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('Employer/Jobs/Applications', [
            'job' => $job->load('company'),
            'applications' => $applications,
        ]);
    }

    public function show(Job $job, Application $application)
    {
        $this->authorize('view', [$job, $application]);

        return Inertia::render('Employer/Jobs/ApplicationDetails', [
            'job' => $job->load('company'),
            'application' => $application->load(['user']),
        ]);
    }

    public function update(Request $request, Job $job, Application $application)
    {
        \Log::info('Hit update route', [
            'job_id' => $job->id,
            'application_id' => $application->id,
            'incoming_status' => $request->application_status,
        ]);

        $validated = $request->validate([
            'application_status' => ['required', 'string', 'in:pending,shortlisted,rejected,accepted'],
        ]);

        $application->update($validated);

        return response()->json(['success' => true]);
    }

    public function downloadResume(Job $job, Application $application)
    {
        $this->authorize('view', [$job, $application]);

        if (!$application->resume_path || !Storage::disk('public')->exists($application->resume_path)) {
            abort(404, 'Resume not found');
        }

        return Storage::disk('public')->download($application->resume_path);
    }

    public function allApplications(Request $request)
    {
        $applications = $request->user()->companyApplications()
            ->with([
                'job:id,title,status',
                'user:id,name,email',
            ])
            ->when($request->search, function ($query) use ($request) {
                $query->whereHas('user', function ($q) use ($request) {
                    $q->where('name', 'like', "%{$request->search}%")
                      ->orWhere('email', 'like', "%{$request->search}%");
                })
                ->orWhereHas('job', function ($q) use ($request) {
                    $q->where('title', 'like', "%{$request->search}%");
                });
            })
            ->when($request->status, function ($query) use ($request) {
                $query->where('application_status', $request->status);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Employer/Applications/All', [
            'applications' => $applications,
            'filters' => $request->only(['search', 'status']),
        ]);
    }
}
