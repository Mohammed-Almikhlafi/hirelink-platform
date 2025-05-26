<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Job;
use App\Models\Company;
use App\Models\Activity;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $stats = [];
        $recentActivity = [];
        $applications = [];

        // Admin Stats
        if ($user->role === 'admin') {
            $stats = [
                'totalUsers' => User::count(),
                'activeJobs' => Job::where('status', 'open')->count(),
                'companies' => Company::count(),
                'totalApplications' => Application::count(),
            ];

            $recentActivity = $this->getAdminActivity();
        }

        // Employer Stats
        if ($user->role === 'employer') {
            $stats = [
                'activeJobs' => Job::where('company_id', $user->company_id)
                    ->where('status', 'open')
                    ->count(),
                'receivedApplications' => Application::whereHas('job', function ($query) use ($user) {
                    $query->where('company_id', $user->company_id);
                })->count(),
                'shortlisted' => Application::whereHas('job', function ($query) use ($user) {
                    $query->where('company_id', $user->company_id);
                })->where('status', 'shortlisted')->count(),
                'pendingReview' => Application::whereHas('job', function ($query) use ($user) {
                    $query->where('company_id', $user->company_id);
                })->where('status', 'pending')->count(),
            ];

            $applications = Application::with(['user', 'job'])
                ->whereHas('job', function ($query) use ($user) {
                    $query->where('company_id', $user->company_id);
                })
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($application) {
                    return [
                        'jobTitle' => $application->job->title,
                        'company' => $application->job->company->name,
                        'date' => $application->created_at->diffForHumans(),
                        'status' => $application->status,
                    ];
                });

            $recentActivity = $this->getEmployerActivity($user);
        }

        // Job Seeker Stats
        if ($user->role === 'professional') {
            $stats = [
                'applications' => Application::where('user_id', $user->id)->count(),
                'shortlisted' => Application::where('user_id', $user->id)
                    ->where('status', 'shortlisted')
                    ->count(),
                'rejected' => Application::where('user_id', $user->id)
                    ->where('status', 'rejected')
                    ->count(),
                'pending' => Application::where('user_id', $user->id)
                    ->where('status', 'pending')
                    ->count(),
            ];

            $applications = Application::with('job.company')
                ->where('user_id', $user->id)
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($application) {
                    return [
                        'jobTitle' => $application->job->title,
                        'company' => $application->job->company->name,
                        'date' => $application->created_at->diffForHumans(),
                        'status' => $application->status,
                    ];
                });

            $recentActivity = $this->getJobSeekerActivity($user);
        }

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
            'applications' => $applications,
        ]);
    }

    private function getAdminActivity()
    {
        return Activity::with('user')
            ->whereIn('type', ['user_registration', 'job_posted', 'company_registered'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($activity) {
                return [
                    'title' => $activity->title,
                    'description' => $activity->description,
                    'time' => $activity->created_at->diffForHumans(),
                ];
            });
    }

    private function getEmployerActivity($user)
    {
        return Activity::with(['user', 'subject'])
            ->where(function ($query) use ($user) {
                $query->whereHasMorph('subject', [Job::class], function ($query) use ($user) {
                    $query->where('company_id', $user->company_id);
                })->orWhereHasMorph('subject', [Application::class], function ($query) use ($user) {
                    $query->whereHas('job', function ($query) use ($user) {
                        $query->where('company_id', $user->company_id);
                    });
                });
            })
            ->whereIn('type', ['job_application', 'application_status_updated'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($activity) {
                return [
                    'title' => $activity->title,
                    'description' => $activity->description,
                    'time' => $activity->created_at->diffForHumans(),
                ];
            });
    }

    private function getJobSeekerActivity($user)
    {
        return Activity::with('subject')
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHasMorph('subject', [Application::class], function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    });
            })
            ->whereIn('type', ['application_submitted', 'application_status_updated', 'profile_viewed'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($activity) {
                return [
                    'title' => $activity->title,
                    'description' => $activity->description,
                    'time' => $activity->created_at->diffForHumans(),
                ];
            });
    }
} 