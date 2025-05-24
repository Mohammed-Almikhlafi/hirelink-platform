<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\User;

class CompanySeeder extends Seeder
{
    public function run()
    {
        $user = User::where('role', 'employer')->first();

        if (!$user) {
            $this->command->error('No employer user found in users table.');
            return;
        }

        Company::create([
            'user_id' => $user->id,
            'name' => 'Modern Tech Company',
            'description' => 'A leading company in software development and tech solutions.',
            'industry' => 'Information Technology',
            'website' => 'https://moderntech.com',
            'logo_url' => '/images/logos/moderntech.png',
            'location' => 'Riyadh, Saudi Arabia',
        ]);

        Company::create([
            'user_id' => $user->id,
            'name' => 'Digital Marketing Agency',
            'description' => 'Specialized in digital marketing and data analytics.',
            'industry' => 'Marketing',
            'website' => 'https://digitalmarketing.com',
            'logo_url' => '/images/logos/digitalmarketing.png',
            'location' => 'Jeddah, Saudi Arabia',
        ]);
    }
}