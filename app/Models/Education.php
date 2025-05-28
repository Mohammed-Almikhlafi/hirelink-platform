<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = 'educations';

    protected $fillable = [
        'user_id', 'institution', 'degree', 
        'field_of_study', 'start_date', 'end_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}