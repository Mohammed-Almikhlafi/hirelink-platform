<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Job;
use App\Models\Company;
use App\Models\Application;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:admin']);
    }

    public function reports()
    {
        // Get basic statistics
        $stats = [
            'totalUsers' => User::count(),
            'activeJobs' => Job::where('status', 'open')->count(),
            'totalCompanies' => Company::count(),
            'totalApplications' => Application::count(),
            
            // Calculate growth percentages
            'userGrowth' => $this->calculateGrowth(User::class),
            'jobGrowth' => $this->calculateGrowth(Job::class),
            'companyGrowth' => $this->calculateGrowth(Company::class),
            'applicationGrowth' => $this->calculateGrowth(Application::class),

            // User distribution
            'jobSeekers' => User::where('role', 'job_seeker')->count(),
            'employers' => User::where('role', 'employer')->count(),
            'admins' => User::where('role', 'admin')->count(),

            // Recent activity
            'recentActivity' => $this->getRecentActivity()
        ];

        // Get monthly statistics
        $monthlyStats = $this->getMonthlyStats();

        return Inertia::render('Admin/Reports', [
            'stats' => $stats,
            'monthlyStats' => $monthlyStats,
        ]);
    }

    public function settings()
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
        ]);
    }

    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_description' => 'nullable|string',
            'contact_email' => 'required|email',
            'support_email' => 'required|email',
            'jobs_per_page' => 'required|integer|min:5|max:100',
            'enable_job_alerts' => 'boolean',
            'enable_email_notifications' => 'boolean',
            'maintenance_mode' => 'boolean',
            'allow_registration' => 'boolean',
            'default_user_role' => 'required|string|in:professional,employer',
            'file_upload_limit' => 'required|integer|min:1|max:50',
            'allowed_file_types' => 'required|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return redirect()->back()->with('success', 'Settings updated successfully');
    }

    private function calculateGrowth($model)
    {
        $now = Carbon::now();
        $lastMonth = Carbon::now()->subMonth();

        $currentCount = $model::whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)
            ->count();
            
        $lastMonthCount = $model::whereMonth('created_at', $lastMonth->month)
            ->whereYear('created_at', $lastMonth->year)
            ->count();

        if ($lastMonthCount === 0) {
            return $currentCount > 0 ? 100 : 0;
        }

        return round((($currentCount - $lastMonthCount) / $lastMonthCount) * 100, 1);
    }

    private function getMonthlyStats()
    {
        $months = collect(range(0, 11))->map(function ($month) {
            $date = Carbon::now()->subMonths($month);
            
            return [
                'month' => $date->format('M'),
                'users' => User::whereMonth('created_at', $date->month)
                    ->whereYear('created_at', $date->year)
                    ->count(),
                'jobs' => Job::whereMonth('created_at', $date->month)
                    ->whereYear('created_at', $date->year)
                    ->count(),
                'applications' => Application::whereMonth('created_at', $date->month)
                    ->whereYear('created_at', $date->year)
                    ->count(),
            ];
        })->reverse()->values();

        return $months;
    }

    private function getRecentActivity()
    {
        $activity = collect();

        // Get recent user registrations
        $recentUsers = User::latest()
            ->take(5)
            ->get()
            ->map(function ($user) {
                return [
                    'event' => 'New Registration',
                    'user' => $user->name,
                    'date' => $user->created_at? $user->created_at->diffForHumans() : "N/A",
                    'details' => "Registered as {$user->role}"
                ];
            });
        $activity = $activity->concat($recentUsers);

        // Get recent job postings
        $recentJobs = Job::with('company')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($job) {
                return [
                    'event' => 'New Job Posted',
                    'user' => $job->company->name,
                    'date' => $job->created_at? $job->created_at->diffForHumans() : "N/A",
                    'details' => $job->title
                ];
            });
        $activity = $activity->concat($recentJobs);

        // Get recent applications
        $recentApplications = Application::with(['user', 'job.company'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($application) {
                return [
                    'event' => 'New Application',
                    'user' => $application->user->name,
                    'date' => $application->created_at? $application->created_at->diffForHumans() : "N/A",
                    'details' => "Applied for {$application->job->title} at {$application->job->company->name}"
                ];
            });
        $activity = $activity->concat($recentApplications);

        // Sort by date and take the 10 most recent activities
        return $activity->sortByDesc('date')->take(10)->values();
    }
} 