<?php

namespace App\Http\Controllers;

use App\Models\JobCategory;
use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Company;

class JobController extends Controller
{
    public function index()
    {
        $jobs = Job::with('company')->latest()->get();
        $categories = JobCategory::select('id', 'name')->get();

        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs,
            'categories' => $categories,
        ]);
    }

    
        public function show(Job $job)
        {
            return Inertia::render('Jobs/Show', [
                'job' => $job,
            ]);
        }



    public function create()
    {
        $companies = Company::select('id', 'name')->get();
        $categories = JobCategory::select('id', 'name')->get();

        return Inertia::render('Jobs/Create', [
            'companies' => $companies,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'           => 'required|string|max:255',
            'description'     => 'required|string',
            'location'        => 'required|string|max:255',
            'company_id'      => 'required|exists:companies,id',
            'job_category_id' => 'required|exists:job_categories,id',
        ]);


        Job::create($request->all());

        return redirect()->route('jobs.index')->with('success', 'Job created successfully.');
    }

    public function edit(Job $job)
    {
        return Inertia::render('Jobs/Edit', [
            'job' => $job,
        ]);
    }

    public function update(Request $request, Job $job)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'company_id'  => 'required|exists:companies,id',
        ]);

        $job->update($request->all());

        return redirect()->route('jobs.index')->with('success', 'Job updated successfully.');
    }

    public function destroy(Job $job)
    {
        $job->delete();

        return redirect()->route('jobs.index')->with('success', 'Job deleted successfully.');
    }
}