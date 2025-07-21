<?php
namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Application;;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function index(Job $job)
    {
        $this->authorize('viewApplications', $job);

        $applications = $job->applications()
            ->with(['user'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Employer/Jobs/Applications', [
            'job' => $job->load('company'),
            'applications' => $applications,
        ]);
    }

    public function details(Job $job, Application $application)
    {
        $this->authorize('view', [$job, $application]);

        return Inertia::render('Employer/Jobs/ApplicationDetails', [
            'job' => $job->load('company'),
            'application' => $application->load(['user']),
        ]);
    }

    public function update(Request $request, Job $job, Application $application)
    {
        $this->authorize('update', [$job, $application]);

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,shortlisted,rejected,accepted'],
        ]);

        $application->update($validated);

        return back()->with('success', 'Application status updated successfully.');
    }

    public function downloadResume(Job $job, Application $application)
    {
        $this->authorize('view', [$job, $application]);

        if (!$application->resume_url) {
            abort(404, 'Resume not found');
        }

        return response()->download(storage_path('app/public/' . $application->resume_url));
    }

    public function allApplications(Request $request)
    {
        $applications = $request->user()->companyApplications()
            ->with([
                'job:id,title,status',
                'user:id,name,email',
                'user.profile:id,user_id,phone,resume_path'
            ])
            ->when($request->search, function($query) use ($request) {
                $query->whereHas('user', function($q) use ($request) {
                    $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%");
                })
                ->orWhereHas('job', function($q) use ($request) {
                    $q->where('title', 'like', "%{$request->search}%");
                });
            })
            ->when($request->status, function($query) use ($request) {
                $query->where('status', $request->status);
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