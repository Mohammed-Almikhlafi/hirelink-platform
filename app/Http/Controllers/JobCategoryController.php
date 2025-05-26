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

    public function index()
    {
        $categories = JobCategory::withCount('jobs')
            ->latest()
            ->get();

        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:job_categories',
            'description' => 'nullable|string',
        ]);

        JobCategory::create($validated);

        return redirect()->route('job-categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function show(JobCategory $jobCategory)
    {
        $jobCategory->load(['jobs' => function ($query) {
            $query->where('status', 'open')
                ->with('company')
                ->latest();
        }]);

        return Inertia::render('Categories/Show', [
            'category' => $jobCategory
        ]);
    }

    public function edit(JobCategory $jobCategory)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $jobCategory
        ]);
    }

    public function update(Request $request, JobCategory $jobCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:job_categories,name,' . $jobCategory->id,
            'description' => 'nullable|string',
        ]);

        $jobCategory->update($validated);

        return redirect()->route('job-categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function destroy(JobCategory $jobCategory)
    {
        // Check if category has jobs
        if ($jobCategory->jobs()->exists()) {
            return back()->with('error', 'Cannot delete category with existing jobs.');
        }

        $jobCategory->delete();

        return redirect()->route('job-categories.index')
            ->with('success', 'Category deleted successfully.');
    }
} 