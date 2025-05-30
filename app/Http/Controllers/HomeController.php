<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Job;
use App\Models\JobCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the application home page with jobs, categories, and users.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // جلب أحدث 6 مستخدمين وتحويلهم إلى مصفوفة
        $users = User::select('id', 'name', 'specialization', 'avatar_url')
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($u) {
                return [
                    'id'             => $u->id,
                    'name'           => $u->name,
                    'specialization' => $u->specialization,
                    'avatar_url'     => $u->avatar_url,
                ];
            })
            ->toArray();

        // جلب الوظائف مع بيانات الشركة
        $jobs = Job::with('company')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($job) {
                return [
                    'id'        => $job->id,
                    'title'     => $job->title,
                    'location'  => $job->location,
                    'posted_at' => $job->created_at->toDateString(),
                    'company'   => ['name' => $job->company->name ?? null],
                ];
            })
            ->toArray();

        // جلب الأقسام مع عدد الوظائف والمستخدمين
        $categories = JobCategory::with(['users'])
            ->withCount('jobs')
            ->orderBy('name')
            ->get()
            ->map(function ($cat) {
                return [
                    'id'         => $cat->id,
                    'name'       => $cat->name,
                    'jobs_count' => $cat->jobs_count,
                    'users_count' => $cat->users->count(),
                    'users'      => $cat->users->map(function ($user) {
                        return [
                            'id'             => $user->id,
                            'name'           => $user->name,
                            'specialization' => $user->specialization,
                        ];
                    })->toArray(),
                ];
            })
            ->toArray();

        // عرض الصفحة مع تمرير البيانات للواجهة
        return Inertia::render('Home', [
            'jobs'       => $jobs,
            'categories' => $categories,
            'users'      => $users,
        ]);
    }
}