<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
        'due_date',
        'description',
        'remarks',
        'created_by',
        'updated_by',
        'last_edited_by',
        'last_edited_at',
    ];

    protected $casts = [
        'due_date' => 'datetime',
        'last_edited_at' => 'datetime',
    ];

    // Relations
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function lastEditedBy()
    {
        return $this->belongsTo(User::class, 'last_edited_by');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
