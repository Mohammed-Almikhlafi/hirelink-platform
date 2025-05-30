<?php

namespace App\Models;

use App\Traits\RecordsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    use RecordsActivity;

    protected $fillable = [
        'user_id',
        'job_id',
        'cover_letter',
        'resume_path',          
        'application_status',   
        'applied_at',          
    ];

    protected static function booted()
    {
        static::created(function ($application) {
            $application->recordJobApplication($application);
        });

        static::updating(function ($application) {
            if ($application->isDirty('application_status')) {
                $application->recordApplicationStatusUpdate(
                    $application,
                    $application->getOriginal('application_status')
                );
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }
}
