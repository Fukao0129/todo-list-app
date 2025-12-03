<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model
{
    use SoftDeletes;

    // 定数
    const STATUS_NOT_STARTED = 1;
    const STATUS_COMPLETED = 2;

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'status_id',
        'due_date',
        'priority',
        'is_trashed',
        'completed_at',
        'reminder_at',
    ];

    public function status()
    {
        return $this->belongsTo('App\Models\Status');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
