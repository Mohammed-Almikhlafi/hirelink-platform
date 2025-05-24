<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate all tables
        $tables = [
            'users',
            'companies',
            'job_categories',
            'jobs',
            'applications',
            'skills',
            'user_skill',
            'educations',
            'work_experiences',
            'connections',
            'notifications',
        ];

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Seed Job Categories
        $categories = [
            ['name' => 'Software Development'],
            ['name' => 'Digital Marketing'],
            ['name' => 'Graphic Design'],
            ['name' => 'Data Science'],
            ['name' => 'Project Management']
        ];
        DB::table('job_categories')->insert($categories);


        // Seed Users
        // Seed Users
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@hirelink.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'headline' => 'Platform Administrator',
                // Explicitly set nullable fields
                'specialization' => null,
                'job_category_id' => null,
                'location' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Tech Corp',
                'email' => 'employer@techcorp.com',
                'password' => Hash::make('password'),
                'role' => 'employer',
                'headline' => 'Hiring Manager at Tech Corp',
                'specialization' => null,
                'job_category_id' => null,
                'location' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => Hash::make('password'),
                'role' => 'job_seeker',
                'job_category_id' => 1,
                'headline' => 'Full Stack Developer',
                'location' => 'Riyadh, Saudi Arabia',
                'specialization' => 'Software Development',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ];
        DB::table('users')->insert($users);

        // Seed Companies
        $companies = [
            [
                'user_id' => 2,
                'name' => 'Modern Tech Company',
                'description' => 'A leading company in software development and tech solutions.',
                'industry' => 'Information Technology',
                'website' => 'https://moderntech.com',
                'logo_url' => '/images/logos/moderntech.png',
                'location' => 'Riyadh, Saudi Arabia',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'user_id' => 2,
                'name' => 'Digital Marketing Agency',
                'description' => 'Specialized in digital marketing and data analytics.',
                'industry' => 'Marketing',
                'website' => 'https://digitalmarketing.com',
                'logo_url' => '/images/logos/digitalmarketing.png',
                'location' => 'Jeddah, Saudi Arabia',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ];
        DB::table('companies')->insert($companies);

       

        // Seed Skills
        $skills = [
            ['name' => 'PHP'],
            ['name' => 'JavaScript'],
            ['name' => 'Laravel'],
            ['name' => 'React'],
            ['name' => 'Digital Marketing']
        ];
        DB::table('skills')->insert($skills);

        // Seed User Skills
        DB::table('user_skill')->insert([
            [
                'user_id' => 3,
                'skill_id' => 1,
                'proficiency_level' => 'expert',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'user_id' => 3,
                'skill_id' => 2,
                'proficiency_level' => 'expert',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        // Seed Jobs
        $jobs = [
            [
                'company_id' => 1,
                'job_category_id' => 1,
                'title' => 'Senior PHP Developer',
                'description' => 'Looking for experienced PHP developer with Laravel experience.',
                'location' => 'Riyadh, Saudi Arabia',
                'salary_range' => 'SAR 15,000 - SAR 20,000',
                'job_type' => 'full-time',
                'status' => 'open',
                'application_deadline' => Carbon::now()->addMonth(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'company_id' => 2,
                'job_category_id' => 2,
                'title' => 'Digital Marketing Specialist',
                'description' => 'Seeking digital marketing expert with SEO/SEM experience.',
                'location' => 'Jeddah, Saudi Arabia',
                'salary_range' => 'SAR 10,000 - SAR 15,000',
                'job_type' => 'full-time',
                'status' => 'open',
                'application_deadline' => Carbon::now()->addMonth(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ];
        DB::table('jobs')->insert($jobs);

        // Seed Applications
        DB::table('applications')->insert([
            [
                'user_id' => 3,
                'job_id' => 1,
                'application_status' => 'pending',
                'resume_path' => '/resumes/john_doe.pdf',
                'cover_letter' => 'I am excited to apply for the Senior PHP Developer position...',
                'applied_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        // Seed Educations
        DB::table('educations')->insert([
            [
                'user_id' => 3,
                'institution' => 'King Saud University',
                'degree' => 'Bachelor of Science',
                'field_of_study' => 'Computer Science',
                'start_date' => '2015-09-01',
                'end_date' => '2019-06-01',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        // Seed Work Experiences
        DB::table('work_experiences')->insert([
            [
                'user_id' => 3,
                'company' => 'Tech Solutions Ltd.',
                'position' => 'Junior Developer',
                'location' => 'Riyadh, Saudi Arabia',
                'start_date' => '2019-07-01',
                'end_date' => '2021-12-31',
                'description' => 'Developed web applications using PHP and Laravel',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        // Seed Connections
        DB::table('connections')->insert([
            [
                'user_id' => 3,
                'connected_user_id' => 1,
                'status' => 'accepted',
                'connected_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        // Seed Notifications
        DB::table('notifications')->insert([
            [
                'user_id' => 3,
                'type' => 'application_status',
                'message' => 'Your application for Senior PHP Developer is pending',
                'read_at' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}