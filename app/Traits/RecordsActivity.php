<?php
namespace App\Traits;

use App\Models\Activity;

trait RecordsActivity
{
    /**
     * Record an activity.
     */
    public function recordActivity(string $type, string $title, string $description, $subject = null, $user = null)
    {
        Activity::create([
            'user_id' => $user ? $user->id : auth()->id(),
            'type' => $type,
            'title' => $title,
            'description' => $description,
            'subject_type' => $subject ? get_class($subject) : null,
            'subject_id' => $subject ? $subject->id : null,
        ]);
    }

    /**
     * Record a job application activity.
     */
    public function recordJobApplication($application)
    {
        $this->recordActivity(
            'job_application',
            'New Application Received',
            "Application submitted for {$application->job->title}",
            $application,
            $application->user
        );
    }

    /**
     * Record an application status update activity.
     */
    public function recordApplicationStatusUpdate($application, $oldStatus)
    {
        $this->recordActivity(
            'application_status_updated',
            'Application Status Updated',
            "Application for {$application->job->title} was updated from {$oldStatus} to {$application->status}",
            $application
        );
    }

    /**
     * Record a job posting activity.
     */
    public function recordJobPosted($job)
    {
        $this->recordActivity(
            'job_posted',
            'New Job Posted',
            "{$job->company->name} posted a new job: {$job->title}",
            $job
        );
    }

    /**
     * Record a profile view activity.
     */
    public function recordProfileView($viewer, $profile)
    {
        $this->recordActivity(
            'profile_viewed',
            'Profile Viewed',
            "{$viewer->name} viewed your profile",
            $profile
        );
    }

    /**
     * Record a user registration activity.
     */
    public function recordUserRegistration($user)
    {
        $this->recordActivity(
            'user_registration',
            'New User Registration',
            "A new {$user->role} has joined the platform",
            $user,
            $user
        );
    }

    /**
     * Record a company registration activity.
     */
    public function recordCompanyRegistration($company)
    {
        $this->recordActivity(
            'company_registered',
            'New Company Registered',
            "{$company->name} has registered on the platform",
            $company,
            $company->user
        );
    }
} 