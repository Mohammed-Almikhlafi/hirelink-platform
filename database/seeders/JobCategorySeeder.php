<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobCategory;

class JobCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Software Development'],
            ['name' => 'Digital Marketing'],
            ['name' => 'Graphic Design'],
            ['name' => 'Data Science'],
            ['name' => 'Project Management'],
        ];

        foreach ($categories as $category) {
            JobCategory::create($category);
        }
    }
}