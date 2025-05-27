<?php

namespace App\Policies;

use App\Models\Job;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class JobPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'employer';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Job $job): bool
    {
        return $user->id === $job->company->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'employer';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Job $job): bool
    {
        return $user->id === $job->company->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Job $job): bool
    {
        return $user->id === $job->company->user_id;
    }

    /**
     * Determine whether the user can view applications for the job.
     */
    public function viewApplications(User $user, Job $job): bool
    {
        return $user->id === $job->company->user_id;
    }

    /**
     * Determine whether the user can manage applications for the job.
     */
    public function manageApplications(User $user, Job $job): bool
    {
        return $user->id === $job->company->user_id;
    }
} 