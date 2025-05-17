<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Admin User
        User::create([
            'name' => 'Admin',
            'email' => 'admin@hireink.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'headline' => 'Platform Administrator',
        ]);

        // Employer User
        User::create([
            'name' => 'Tech Corp',
            'email' => 'employer@techcorp.com',
            'password' => bcrypt('password'),
            'role' => 'employer',
            'headline' => 'Hiring Manager at Tech Corp',
        ]);

        // Job Seeker User
        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password'),
            'role' => 'job_seeker',
            'headline' => 'Full Stack Developer',
        ]);
    }
}
