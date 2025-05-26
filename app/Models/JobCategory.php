<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User; // تأكد من الاستيراد

class JobCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    // لو عندك علاقة بوظائف منفصلة، احتفظ فيها
    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

    // علاقة الـ users عبر المفتاح job_category_id
    public function users()
    {
        return $this->hasMany(User::class, 'job_category_id');
    }
}