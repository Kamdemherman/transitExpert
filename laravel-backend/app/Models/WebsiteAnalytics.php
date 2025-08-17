<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * Website Analytics Model
 * 
 * Tracks website visitors and page views
 */
class WebsiteAnalytics extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_id',
        'ip_address',
        'user_agent',
        'page_url',
        'page_title',
        'referrer',
        'country',
        'city',
        'device_type',
        'browser',
        'os',
        'time_on_page',
        'is_bounce',
    ];

    protected $casts = [
        'is_bounce' => 'boolean',
        'time_on_page' => 'integer',
    ];

    /**
     * Get total visitors for a date range
     */
    public static function getTotalVisitors($days = 7)
    {
        return static::where('created_at', '>=', now()->subDays($days))
            ->distinct('ip_address')
            ->count('ip_address');
    }

    /**
     * Get today's visitors
     */
    public static function getTodayVisitors()
    {
        return static::whereDate('created_at', today())
            ->distinct('ip_address')
            ->count('ip_address');
    }

    /**
     * Get total page views
     */
    public static function getPageViews($days = 7)
    {
        return static::where('created_at', '>=', now()->subDays($days))->count();
    }

    /**
     * Get top pages
     */
    public static function getTopPages($days = 7, $limit = 10)
    {
        return static::where('created_at', '>=', now()->subDays($days))
            ->select('page_url', DB::raw('count(*) as views'))
            ->groupBy('page_url')
            ->orderBy('views', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'page' => $item->page_url,
                    'views' => $item->views
                ];
            });
    }

    /**
     * Get top countries
     */
    public static function getTopCountries($days = 7, $limit = 10)
    {
        return static::where('created_at', '>=', now()->subDays($days))
            ->whereNotNull('country')
            ->select('country', DB::raw('count(distinct ip_address) as visitors'))
            ->groupBy('country')
            ->orderBy('visitors', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'country' => $item->country,
                    'visitors' => $item->visitors
                ];
            });
    }

    /**
     * Get bounce rate
     */
    public static function getBounceRate($days = 7)
    {
        $total = static::where('created_at', '>=', now()->subDays($days))->count();
        $bounces = static::where('created_at', '>=', now()->subDays($days))
            ->where('is_bounce', true)
            ->count();

        return $total > 0 ? ($bounces / $total) * 100 : 0;
    }
}