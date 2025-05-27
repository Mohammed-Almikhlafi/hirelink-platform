<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    use HasRoles;
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'specialization',
        'role',
        'headline',
        'summary',
        'location',
        'website_url',
        'avatar_url',
        'job_category_id',    
    ];

    // ...

    // Relationships
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function jobs()
    {
        return $this->hasMany(Job::class, 'company_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'user_skill')
            ->withPivot('proficiency_level');
    }

    public function educations()
    {
        return $this->hasMany(Education::class);
    }

    public function workExperiences()
    {
        return $this->hasMany(WorkExperience::class);
    }

    public function connections()
    {
        return $this->belongsToMany(
            User::class,
            'connections',
            'user_id',
            'connected_user_id'
        )->withPivot('status', 'connected_at');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    /**
     * العلاقة مع تصنيف الوظيفة
     */
    public function jobCategory()
    {
        return $this->belongsTo(JobCategory::class, 'job_category_id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function isEmployer(): bool
    {
        return $this->role === 'employer';
    }
}