<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class TemporaryRegistrationLink extends Model
{
    protected $fillable = [
        'token',
        'role_hash',
        'expires_at',
        'is_used',
        'created_by',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'is_used' => 'boolean',
    ];

    public static function generateToken(): string
    {
        return Str::random(32);
    }

    public static function hashRole(string $role): string
    {
        return hash('sha256', $role);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    public function isValid(): bool
    {
        return !$this->is_used && !$this->isExpired();
    }
}
