<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'company_id', 'job_category_id', 'title', 'description', 
        'location', 'salary_range', 'job_type', 'status', 
        'application_deadline'
    ];

    protected $casts = [
        'application_deadline' => 'date',
    ];

    // Relationships
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function category()
    {
        return $this->belongsTo(JobCategory::class, 'job_category_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
