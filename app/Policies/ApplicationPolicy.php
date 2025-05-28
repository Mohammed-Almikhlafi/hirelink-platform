<?php

namespace App\Policies;

use App\Models\Application;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ApplicationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Application $application): bool
    {
        // Job seekers can view their own applications
        if ($user->role === 'job_seeker') {
            return $user->id === $application->user_id;
        }

        // Employers can view applications for their jobs
        if ($user->role === 'employer') {
            return $user->company && $user->company->id === $application->job->company_id;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'job_seeker';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Application $application): bool
    {
        // Only employers can update applications (to change status)
        if ($user->role === 'employer') {
            return $user->company && $user->company->id === $application->job->company_id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Application $application): bool
    {
        // Job seekers can withdraw their applications
        if ($user->role === 'job_seeker') {
            return $user->id === $application->user_id;
        }

        return false;
    }
} 