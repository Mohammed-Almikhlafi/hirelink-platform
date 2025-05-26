<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of companies.
     */
    public function index(Request $request)
    {
        $query = $request->input('query');
        $location = $request->input('location');
        $industry = $request->input('industry');

        $companies = Company::withCount('jobs')
            ->with('jobs')
            ->when($query, function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%");
            })
            ->when($location, function ($q) use ($location) {
                $q->where('location', 'like', "%{$location}%");
            })
            ->when($industry, function ($q) use ($industry) {
                $q->where('industry', $industry);
            })
            ->latest()
            ->paginate(12);

        return Inertia::render('Companies/Index', [
            'companies' => $companies,
            'filters' => [
                'query' => $query,
                'location' => $location,
                'industry' => $industry,
            ],
        ]);
    }

    /**
     * Display the specified company.
     */
    public function show(Company $company)
    {
        $company->load(['jobs' => function ($query) {
            $query->where('status', 'open')
                ->with('category')
                ->latest();
        }]);

        $similarCompanies = Company::where('id', '!=', $company->id)
            ->where(function ($query) use ($company) {
                $query->where('industry', $company->industry)
                    ->orWhere('location', 'like', "%{$company->location}%");
            })
            ->withCount('jobs')
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Companies/Show', [
            'company' => $company,
            'similarCompanies' => $similarCompanies,
        ]);
    }

    /**
     * Display company jobs.
     */
    public function jobs(Company $company)
    {
        $jobs = $company->jobs()
            ->where('status', 'open')
            ->with('category')
            ->latest()
            ->paginate(12);

        return Inertia::render('Companies/Jobs', [
            'company' => $company,
            'jobs' => $jobs,
        ]);
    }
} 