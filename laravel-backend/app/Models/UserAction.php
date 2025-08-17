<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * User Action Model
 * 
 * Tracks user interactions and conversions
 */
class UserAction extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_id',
        'action_type',
        'page_url',
        'action_data',
        'ip_address',
    ];

    protected $casts = [
        'action_data' => 'array',
    ];

    /**
     * Get action count by type
     */
    public static function getActionCount($actionType, $days = 7)
    {
        return static::where('action_type', $actionType)
            ->where('created_at', '>=', now()->subDays($days))
            ->count();
    }

    /**
     * Get recent actions
     */
    public static function getRecentActions($limit = 20)
    {
        return static::orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($action) {
                return [
                    'action' => ucfirst(str_replace('_', ' ', $action->action_type)),
                    'page' => $action->page_url,
                    'timestamp' => $action->created_at->toISOString(),
                ];
            });
    }

    /**
     * Get conversion funnel data
     */
    public static function getConversionFunnel($days = 7)
    {
        $visitors = WebsiteAnalytics::getTotalVisitors($days);
        $quoteRequests = static::getActionCount('quote_request', $days);
        $contactForms = static::getActionCount('contact_form', $days);
        $chatSessions = static::getActionCount('chat_start', $days);

        return [
            'visitors' => $visitors,
            'quote_requests' => $quoteRequests,
            'contact_forms' => $contactForms,
            'chat_sessions' => $chatSessions,
            'conversion_rate' => $visitors > 0 ? ($quoteRequests / $visitors) * 100 : 0,
        ];
    }
}