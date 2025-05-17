<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JobCategory;

class JobCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
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
