<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkExperience extends Model
{
    protected $fillable = [
        'user_id', 'company', 'position', 
        'location', 'start_date', 'end_date', 'description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}