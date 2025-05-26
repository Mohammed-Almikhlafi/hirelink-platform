<?php 
namespace App\Http\Controllers;

use App\Models\JobCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show($id)
    {
        $category = JobCategory::with(['users', 'jobs'])
            ->withCount('jobs')                         
            ->findOrFail($id);

        $users = $category->users->map(function ($user) {
            return [
                'id'             => $user->id,
                'name'           => $user->name,
                'specialization' => $user->specialization,
            ];
        });

        return Inertia::render('Categories/Show', [
            'category' => [
                'id'            => $category->id,
                'name'          => $category->name,
                'description'   => $category->description ?? '',
                'users'         => $users,
                'jobs_count'    => $category->jobs_count,
            ],
        ]);
    }
}