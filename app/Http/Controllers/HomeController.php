<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the application home page with jobs and categories.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // جلب جميع الوظائف مع بيانات الشركة المرتبطة، مرتبة حسب الإنشاء (الأحدث أولاً)
        $jobs = Job::with('company')
            ->orderBy('created_at', 'desc') // بدل posted_at
            ->get()
            ->map(function ($job) {
                return [
                    'id'         => $job->id,
                    'title'      => $job->title,
                    'location'   => $job->location,
                    'posted_at'  => $job->created_at->toDateString(), // استخدم created_at كـ posted_at
                    'company'    => [
                        'name' => $job->company->name ?? null,
                    ],
                ];
            });

        // جلب الأقسام مع عدد الوظائف في كل قسم
        $categories = JobCategory::with(['users'])->withCount('jobs')
            ->orderBy('name')
            ->get()
            ->map(function ($cat) {
                return [
                    'id'         => $cat->id,
                    'name'       => $cat->name,
                    'jobs_count' => $cat->jobs_count,
                    'users'      => $cat->users->map(function ($user) {
                        return [
                            'id'             => $user->id,
                            'name'           => $user->name,
                            'specialization' => $user->specialization,
                        ];
                    }),
                ];
            });


        return Inertia::render('Home', [
            'jobs'       => $jobs,
            'categories' => $categories,
        ]);
    }
}
