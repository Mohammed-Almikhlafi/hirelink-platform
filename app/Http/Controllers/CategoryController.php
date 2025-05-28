<?php 
namespace App\Http\Controllers;

use App\Models\JobCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show(JobCategory $category)
    {
        $category->load(['users', 'jobs'])->loadCount('jobs');

        $users = $category->users->map(fn($user) => [
            'id'             => $user->id,
            'name'           => $user->name,
            'specialization' => $user->specialization,
        ]);

        $jobs = $category->jobs->map(fn($job) => [
            'id'          => $job->id,
            'title'       => $job->title,
            'description' => $job->description,
        ]);

        return Inertia::render('Categories/Show', [
            'category' => [
                'id'          => $category->id,
                'name'        => $category->name,
                'description' => $category->description ?? '',
                'users'       => $users,
                'jobs_count'  => $category->jobs_count,
                'jobs'        => $jobs,
            ],
        ]);
    }

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

    public function update(Request $request, JobCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:job_categories,name,' . $category->id,
            'description' => 'nullable|string',
        ]);

        $category->update($validated);

        return to_route('job-categories.index')->with('success', 'Category updated successfully.');
    }}