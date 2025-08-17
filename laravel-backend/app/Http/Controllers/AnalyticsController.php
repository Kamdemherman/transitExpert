<?php

namespace App\Http\Controllers;

use App\Models\WebsiteAnalytics;
use App\Models\UserAction;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

/**
 * Analytics Controller
 * 
 * Handles website analytics tracking and reporting
 */
class AnalyticsController extends Controller
{
    /**
     * Track a visitor
     */
    public function trackVisitor(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'page' => 'required|string',
            'referrer' => 'nullable|string',
            'user_agent' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $sessionId = $request->session()->getId();
            $userAgent = $request->userAgent();
            
            // Parse user agent for device info
            $deviceInfo = $this->parseUserAgent($userAgent);
            
            // Get location info (you can integrate with a GeoIP service)
            $locationInfo = $this->getLocationInfo($request->ip());

            WebsiteAnalytics::create([
                'session_id' => $sessionId,
                'ip_address' => $request->ip(),
                'user_agent' => $userAgent,
                'page_url' => $request->input('page'),
                'page_title' => $request->input('title'),
                'referrer' => $request->input('referrer'),
                'country' => $locationInfo['country'] ?? null,
                'city' => $locationInfo['city'] ?? null,
                'device_type' => $deviceInfo['device_type'],
                'browser' => $deviceInfo['browser'],
                'os' => $deviceInfo['os'],
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to track visitor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Track a user action
     */
    public function trackAction(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'action' => 'required|string',
            'page' => 'required|string',
            'data' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            UserAction::create([
                'session_id' => $request->session()->getId(),
                'action_type' => $request->input('action'),
                'page_url' => $request->input('page'),
                'action_data' => $request->input('data'),
                'ip_address' => $request->ip(),
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to track action',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get analytics dashboard data
     */
    public function getDashboard(Request $request): JsonResponse
    {
        try {
            $range = $request->input('range', '7d');
            $days = $this->parseDateRange($range);

            $data = [
                'totalVisitors' => WebsiteAnalytics::getTotalVisitors($days),
                'todayVisitors' => WebsiteAnalytics::getTodayVisitors(),
                'pageViews' => WebsiteAnalytics::getPageViews($days),
                'quoteRequests' => UserAction::getActionCount('quote_request', $days),
                'contactForms' => UserAction::getActionCount('contact_form', $days),
                'chatSessions' => UserAction::getActionCount('chat_start', $days),
                'topPages' => WebsiteAnalytics::getTopPages($days),
                'topCountries' => WebsiteAnalytics::getTopCountries($days),
                'recentActivity' => UserAction::getRecentActions(),
                'bounceRate' => WebsiteAnalytics::getBounceRate($days),
            ];

            return response()->json([
                'success' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get analytics data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Parse date range string to days
     */
    private function parseDateRange(string $range): int
    {
        return match($range) {
            '24h' => 1,
            '7d' => 7,
            '30d' => 30,
            '90d' => 90,
            default => 7,
        };
    }

    /**
     * Parse user agent for device information
     */
    private function parseUserAgent(string $userAgent): array
    {
        $deviceType = 'desktop';
        $browser = 'unknown';
        $os = 'unknown';

        // Simple user agent parsing (you can use a library like WhichBrowser for more accuracy)
        if (preg_match('/Mobile|Android|iPhone|iPad/', $userAgent)) {
            $deviceType = preg_match('/iPad/', $userAgent) ? 'tablet' : 'mobile';
        }

        if (preg_match('/Chrome/', $userAgent)) {
            $browser = 'Chrome';
        } elseif (preg_match('/Firefox/', $userAgent)) {
            $browser = 'Firefox';
        } elseif (preg_match('/Safari/', $userAgent)) {
            $browser = 'Safari';
        } elseif (preg_match('/Edge/', $userAgent)) {
            $browser = 'Edge';
        }

        if (preg_match('/Windows/', $userAgent)) {
            $os = 'Windows';
        } elseif (preg_match('/Mac/', $userAgent)) {
            $os = 'macOS';
        } elseif (preg_match('/Linux/', $userAgent)) {
            $os = 'Linux';
        } elseif (preg_match('/Android/', $userAgent)) {
            $os = 'Android';
        } elseif (preg_match('/iOS/', $userAgent)) {
            $os = 'iOS';
        }

        return [
            'device_type' => $deviceType,
            'browser' => $browser,
            'os' => $os,
        ];
    }

    /**
     * Get location information from IP address
     */
    private function getLocationInfo(string $ip): array
    {
        // For development, return sample data
        // In production, integrate with a GeoIP service like MaxMind or ipapi.co
        
        if ($ip === '127.0.0.1' || $ip === '::1') {
            return [
                'country' => 'France',
                'city' => 'Paris',
            ];
        }

        // Example integration with ipapi.co (free tier available)
        try {
            $response = file_get_contents("http://ipapi.co/{$ip}/json/");
            $data = json_decode($response, true);
            
            return [
                'country' => $data['country_name'] ?? null,
                'city' => $data['city'] ?? null,
            ];
        } catch (\Exception $e) {
            return [
                'country' => null,
                'city' => null,
            ];
        }
    }
}