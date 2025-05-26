<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Job;
use App\Models\Company;
use App\Models\JobCategory;

class JobsSeeder extends Seeder
{
    public function run()
    {
        $company = Company::first();
        $jobCategory = JobCategory::first();

        if (!$company || !$jobCategory) {
            $this->command->error('Make sure you have data in companies and job_categories tables.');
            return;
        }

        Job::create([
            'company_id' => $company->id,
            'job_category_id' => $jobCategory->id,
            'title' => 'Senior Software Engineer',
            'description' => 'Responsible for developing and maintaining web applications using Laravel and React.',
            'location' => 'Riyadh, Saudi Arabia',
            'salary_range' => '10000 - 15000 SAR',
            'job_type' => 'Full-time',
            'status' => 'active',
            'application_deadline' => now()->addWeeks(2),
        ]);

        Job::create([
            'company_id' => $company->id,
            'job_category_id' => $jobCategory->id,
            'title' => 'Digital Marketing Specialist',
            'description' => 'Experience in social media marketing and SEO.',
            'location' => 'Jeddah, Saudi Arabia',
            'salary_range' => '7000 - 12000 SAR',
            'job_type' => 'Part-time',
            'status' => 'active',
            'application_deadline' => now()->addWeeks(3),
        ]);
    }
}