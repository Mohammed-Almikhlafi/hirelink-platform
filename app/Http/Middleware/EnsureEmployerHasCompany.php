<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class EnsureEmployerHasCompany
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        
        // Only check for employer users
        if ($user->role !== 'employer') {
            return $next($request);
        }

        // If user has no company, redirect to company creation
        if (!$user->company) {
            // Store the intended URL before redirecting
            if (!$request->routeIs('employer.company.*')) {
                session()->put('url.intended', URL::full());
            }
            
            return redirect()->route('employer.company.create')
                ->with('error', 'You must set up your company before accessing this feature');
        }

        return $next($request);
    }
}