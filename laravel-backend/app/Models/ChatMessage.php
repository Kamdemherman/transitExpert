<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Chat Message Model
 * 
 * Represents individual messages within chat rooms.
 * Supports both authenticated users and guest users.
 */
class ChatMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'chat_room_id',
        'user_id',
        'sender_name',
        'sender_email',
        'message',
        'message_type',
        'file_path',
        'is_read',
        'read_at',
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'read_at' => 'datetime',
    ];

    /**
     * Get the chat room that owns the message
     */
    public function chatRoom(): BelongsTo
    {
        return $this->belongsTo(ChatRoom::class);
    }

    /**
     * Get the user that sent the message (if authenticated)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the sender's display name
     */
    public function getSenderDisplayNameAttribute(): string
    {
        if ($this->user) {
            return $this->user->name;
        }
        
        return $this->sender_name ?? 'Guest';
    }

    /**
     * Check if message is from authenticated user
     */
    public function getIsFromUserAttribute(): bool
    {
        return !is_null($this->user_id);
    }

    /**
     * Check if message is from guest
     */
    public function getIsFromGuestAttribute(): bool
    {
        return is_null($this->user_id);
    }

    /**
     * Mark message as read
     */
    public function markAsRead(): void
    {
        $this->update([
            'is_read' => true,
            'read_at' => now(),
        ]);
    }

    /**
     * Scope for unread messages
     */
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    /**
     * Scope for messages by type
     */
    public function scopeByType($query, string $type)
    {
        return $query->where('message_type', $type);
    }
}