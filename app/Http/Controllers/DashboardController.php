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
        $user           = $request->user();
        $stats          = [];
        $recentActivity = [];
        $applications   = [];

        // --------------------
        // Admin
        // --------------------
        if ($user->role === 'admin') {
            $stats = [
                'totalUsers'        => User::count(),
                'activeJobs'        => Job::where('status', 'open')->count(),
                'companies'         => Company::count(),
                'totalApplications' => Application::count(),
            ];

            $recentActivity = $this->getAdminActivity();
        }

        // --------------------
        // Employer
        // --------------------
        if ($user->role === 'employer') {
            $stats = [
                'activeJobs'           => Job::where('company_id', $user->company_id)
                                               ->where('status', 'open')
                                               ->count(),

                'receivedApplications' => Application::whereHas('job', function ($q) use ($user) {
                                               $q->where('company_id', $user->company_id);
                                           })
                                           ->count(),

                'shortlisted'          => Application::whereHas('job', function ($q) use ($user) {
                                               $q->where('company_id', $user->company_id);
                                           })
                                           ->where('application_status', 'shortlisted')
                                           ->count(),

                'pendingReview'        => Application::whereHas('job', function ($q) use ($user) {
                                               $q->where('company_id', $user->company_id);
                                           })
                                           ->where('application_status', 'pending')
                                           ->count(),
            ];

            $applications = Application::with(['user','job'])
                ->whereHas('job', function ($q) use ($user) {
                    $q->where('company_id', $user->company_id);
                })
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($app) {
                    return [
                        'jobTitle' => $app->job->title,
                        'company'  => $app->job->company->name,
                        'date' => $app->created_at ? $app->created_at->diffForHumans() : 'N/A',
                        'status'   => $app->application_status,
                        'jobId'    => $app->job->id,
                        'id'       => $app->id,
                    ];
                });

            $recentActivity = $this->getEmployerActivity($user);
        }

        // --------------------
        // Job Seeker
        // --------------------
        if ($user->role === 'job_seeker') {
            $stats = [
                'applications' => Application::where('user_id', $user->id)->count(),

                'shortlisted'  => Application::where('user_id', $user->id)
                                             ->where('application_status', 'shortlisted')
                                             ->count(),

                'rejected'     => Application::where('user_id', $user->id)
                                             ->where('application_status', 'rejected')
                                             ->count(),

                'pending'      => Application::where('user_id', $user->id)
                                             ->where('application_status', 'pending')
                                             ->count(),
            ];

            $applications = Application::with('job.company')
                ->where('user_id', $user->id)
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($app) {
                    return [
                        'jobTitle' => $app->job->title,
                        'company'  => $app->job->company->name,
                        'date' => $app->created_at ? $app->created_at->diffForHumans() : 'N/A',
                        'status'   => $app->application_status,
                    ];
                });

            $recentActivity = $this->getJobSeekerActivity($user);
        }

        return Inertia::render('Dashboard', [
            'auth'            => ['user' => $user],
            'stats'           => $stats,
            'recentActivity'  => $recentActivity,
            'applications'    => $applications,
        ]);
    }

    private function getAdminActivity()
    {
        return Activity::with('user')
            ->whereIn('type', [
                'user_registration',
                'job_posted',
                'company_registered',
            ])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($act) {
                return [
                    'title'       => $act->title,
                    'description' => $act->description,
                    'time'        => $act->created_at->diffForHumans(),
                ];
            });
    }

    private function getEmployerActivity($user)
    {
        return Activity::with(['user','subject'])
            ->where(function ($q) use ($user) {
                $q->whereHasMorph('subject', [Job::class], function ($q) use ($user) {
                    $q->where('company_id', $user->company_id);
                })
                ->orWhereHasMorph('subject', [Application::class], function ($q) use ($user) {
                    $q->whereHas('job', function ($q) use ($user) {
                        $q->where('company_id', $user->company_id);
                    });
                });
            })
            ->whereIn('type', [
                'job_application',
                'application_status_updated',
            ])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($act) {
                return [
                    'title'       => $act->title,
                    'description' => $act->description,
                    'time'        => $act->created_at->diffForHumans(),
                ];
            });
    }

    private function getJobSeekerActivity($user)
    {
        return Activity::with('subject')
            ->where(function ($q) use ($user) {
                $q->where('user_id', $user->id)
                  ->orWhereHasMorph('subject', [Application::class], function ($q) use ($user) {
                      $q->where('user_id', $user->id);
                  });
            })
            ->whereIn('type', [
                'job_application',
                'application_status_updated',
                'profile_viewed',
            ])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($act) {
                return [
                    'title'       => $act->title,
                    'description' => $act->description,
                    'time'        => $act->created_at->diffForHumans(),
                ];
            });
    }
}
