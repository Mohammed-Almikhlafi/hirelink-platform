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
        'user_id', 'job_id', 'status', 'cover_letter'
    ];

    protected static function booted()
    {
        static::created(function ($application) {
            $application->recordJobApplication($application);
        });

        static::updating(function ($application) {
            if ($application->isDirty('status')) {
                $application->recordApplicationStatusUpdate(
                    $application,
                    $application->getOriginal('status')
                );
            }
        });
    }

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }
}
