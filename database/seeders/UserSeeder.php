<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@hirelink.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'headline' => 'Platform Administrator',
        ]);

        User::create([
            'name' => 'Tech Corp',
            'email' => 'employer@techcorp.com',
            'password' => bcrypt('password'),
            'role' => 'employer',
            'headline' => 'Hiring Manager at Tech Corp',
        ]);

        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password'),
            'role' => 'job_seeker',
            'headline' => 'Full Stack Developer',
        ]);
    }
}