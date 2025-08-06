<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Chat Room Model
 * 
 * Represents a chat room where conversations take place.
 * Can be used for support, sales, or general inquiries.
 */
class ChatRoom extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'is_active',
        'participants',
    ];

    protected $casts = [
        'participants' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get all messages for this chat room
     */
    public function messages(): HasMany
    {
        return $this->hasMany(ChatMessage::class)->orderBy('created_at', 'asc');
    }

    /**
     * Get all sessions for this chat room
     */
    public function sessions(): HasMany
    {
        return $this->hasMany(ChatSession::class);
    }

    /**
     * Get the latest message for this chat room
     */
    public function latestMessage()
    {
        return $this->hasOne(ChatMessage::class)->latestOfMany();
    }

    /**
     * Get unread messages count
     */
    public function getUnreadMessagesCountAttribute(): int
    {
        return $this->messages()->where('is_read', false)->count();
    }

    /**
     * Scope for active chat rooms
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for chat rooms by type
     */
    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }
}