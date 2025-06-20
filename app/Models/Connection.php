<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{
    protected $fillable = ['user_id', 'connected_user_id', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function connectedUser()
    {
        return $this->belongsTo(User::class, 'connected_user_id');
    }
}
