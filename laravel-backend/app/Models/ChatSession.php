<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

/**
 * Chat Session Model
 * 
 * Tracks individual chat sessions for both authenticated and guest users.
 * Manages session state and activity tracking.
 */
class ChatSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_id',
        'chat_room_id',
        'user_id',
        'guest_name',
        'guest_email',
        'ip_address',
        'user_agent',
        'status',
        'last_activity',
    ];

    protected $casts = [
        'last_activity' => 'datetime',
    ];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($session) {
            if (empty($session->session_id)) {
                $session->session_id = Str::uuid();
            }
        });
    }

    /**
     * Get the chat room for this session
     */
    public function chatRoom(): BelongsTo
    {
        return $this->belongsTo(ChatRoom::class);
    }

    /**
     * Get the user for this session (if authenticated)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the display name for this session
     */
    public function getDisplayNameAttribute(): string
    {
        if ($this->user) {
            return $this->user->name;
        }
        
        return $this->guest_name ?? 'Guest User';
    }

    /**
     * Check if session is active
     */
    public function getIsActiveAttribute(): bool
    {
        return $this->status === 'active';
    }

    /**
     * Check if session is from authenticated user
     */
    public function getIsAuthenticatedAttribute(): bool
    {
        return !is_null($this->user_id);
    }

    /**
     * Update last activity timestamp
     */
    public function updateActivity(): void
    {
        $this->update(['last_activity' => now()]);
    }

    /**
     * Close the session
     */
    public function close(): void
    {
        $this->update(['status' => 'closed']);
    }

    /**
     * Scope for active sessions
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope for sessions with recent activity
     */
    public function scopeRecentActivity($query, int $minutes = 30)
    {
        return $query->where('last_activity', '>=', now()->subMinutes($minutes));
    }
}