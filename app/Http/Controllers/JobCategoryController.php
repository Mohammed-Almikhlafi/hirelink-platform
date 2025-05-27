<?php

namespace App\Http\Controllers;

use App\Models\JobCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobCategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified', 'can:admin'])->except(['index', 'show']);
    }

    /**
     * Display a listing of categories.
     */
    public function index()
    {
        $categories = JobCategory::withCount(['jobs', 'users'])
            ->latest()
            ->get()
            ->map(fn($c) => [
                'id'          => $c->id,
                'name'        => $c->name,
                'description' => $c->description,
                'jobs_count'  => $c->jobs_count,
                'users_count' => $c->users_count,
                'created_at'  => $c->created_at
                    ? $c->created_at->toDateTimeString()
                    : null,
            ]);

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
            'user' => auth()->user()
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255|unique:job_categories',
            'description' => 'nullable|string',
        ]);

        JobCategory::create($validated);

        return to_route('job-categories.index')
            ->with('success', 'Category created successfully.');
    }

    /**
     * Display the specified category and its open jobs.
     */
    public function show(JobCategory $category)
    {
        $category->loadCount(['jobs', 'users'])
            ->load([
                'jobs' => fn($q) =>
                $q->where('status', 'open')
                    ->with('company')
                    ->latest()
            ]);

        $payload = [
            'id'          => $category->id,
            'name'        => $category->name,
            'description' => $category->description,
            'jobs_count'  => $category->jobs_count,
            'users_count' => $category->users_count,
            'created_at'  => $category->created_at
                ? $category->created_at->toDateTimeString()
                : null,
            'jobs'        => $category->jobs->map(fn($j) => [
                'id'        => $j->id,
                'title'     => $j->title,
                'company'   => $j->company->name,
                'posted_at' => $j->created_at->diffForHumans(),
            ]),
        ];

        return Inertia::render('Categories/Show', [
            'category' => $payload,
        ]);
    }

    /** 
     * Show the form for editing the specified category.
     */
    public function edit(JobCategory $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => [
                'id'          => $category->id,
                'name'        => $category->name,
                'description' => $category->description,
            ],
        ]);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, JobCategory $category)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255|unique:job_categories,name,' . $category->id,
            'description' => 'nullable|string',
        ]);

        $category->update($validated);

        return to_route('job-categories.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(JobCategory $category)
    {
        if ($category->jobs()->exists()) {
            return back()->with('error', 'Cannot delete category with existing jobs.');
        }

        $category->delete();

        return to_route('job-categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}