<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Job;

class EnsureJobBelongsToEmployer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $jobId = $request->route('job');
        
        if ($jobId) {
            $job = Job::findOrFail($jobId);
            
            if ($job->company_id !== auth()->user()->company_id) {
                abort(403, 'You do not have permission to access this job.');
            }
        }

        return $next($request);
    }
} 