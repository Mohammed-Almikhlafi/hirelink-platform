<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class CompanyController extends Controller
{
    public function create()
    {
        // Check if user already has a company
        if (auth()->user()->company) {
            return redirect()->route('dashboard');
        }

        return inertia::render('Auth/CompanySetup');
    }
    public function store(Request $request)
    {
        $user = auth()->user();

        if ($user->company) {
            return redirect()->route('dashboard')
                ->with('info', 'Your company is already set up');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'industry' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'location' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($user, $validated) {
            // Create the company with the user_id
            $company = Company::create(array_merge($validated, [
                'user_id' => $user->id
            ]));
            
            // Explicitly update the user's company_id
            $user->company_id = $company->id;
            $user->save();
        });

        return redirect()->route('dashboard')
            ->with('success', 'Company setup complete!');
    }

    public function edit(Request $request)
    {
        $company = $request->user()->company;
        
        if (!$company) {
            return redirect()->route('employer.company.create');
        }

        return Inertia::render('Employer/Company/Edit', [
            'company' => $company,
        ]);
    }

    public function update(Request $request)
    {
        $company = $request->user()->company;
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'industry' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'location' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'remove_logo' => 'nullable|boolean',
        ]);

        // Handle logo upload/removal
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($company->logo_url) {
                Storage::delete($company->logo_url);
            }
            
            $path = $request->file('logo')->store('company-logos', 'public');
            $validated['logo_url'] = $path;
        } elseif ($request->input('remove_logo') && $company->logo_url) {
            Storage::delete($company->logo_url);
            $validated['logo_url'] = null;
        }

        $company->update($validated);

        return redirect()->route('employer.company.show')
            ->with('success', 'Company profile updated successfully');
    }

    public function show(Request $request) {
        $company = $request->user()->company;
        
        if (!$company) {
            return redirect()->route('employer.company.create');
        }

        $company->loadCount('jobs');
        $stats = [
            'totalJobs' => $company->jobs()->count(),
            'activeJobs' => $company->jobs()->where('status', 'open')->count(),
            'draftJobs' => $company->jobs()->where('status', 'draft')->count(),
            'closedJobs' => $company->jobs()->where('status', 'closed')->count(),
        ];

        return Inertia::render('Employer/Company/Show', [
            'company' => $company,
            'stats' => $stats,
            'canEdit' => true, // Since this is the owner's view
        ]);
    }
}