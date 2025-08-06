<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Chat Routes
|--------------------------------------------------------------------------
|
| Routes for handling chat functionality including session management,
| message sending/receiving, and real-time communication.
|
*/

Route::prefix('chat')->group(function () {
    // Public routes (no authentication required for guest chat)
    Route::post('/initialize', [ChatController::class, 'initializeSession']);
    Route::post('/send-message', [ChatController::class, 'sendMessage']);
    Route::get('/messages/{sessionId}', [ChatController::class, 'getMessages']);
    Route::post('/close-session/{sessionId}', [ChatController::class, 'closeSession']);
    
    // Protected routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/active-sessions', [ChatController::class, 'getActiveSessions']);
    });
});

/*
|--------------------------------------------------------------------------
| Freight Forwarder Specific Routes
|--------------------------------------------------------------------------
|
| Additional routes that might be needed for the freight forwarding business
|
*/

Route::prefix('freight')->group(function () {
    // Quote calculation routes
    Route::post('/quote-request', function (Request $request) {
        // Handle quote requests from the frontend form
        return response()->json([
            'success' => true,
            'message' => 'Quote request received. We will respond within 2 business hours.',
            'reference_number' => 'QR-' . now()->format('YmdHis') . '-' . rand(1000, 9999)
        ]);
    });
    
    // Contact form submission
    Route::post('/contact', function (Request $request) {
        // Handle contact form submissions
        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent successfully. We will respond within 2 business hours.'
        ]);
    });
    
    // Tracking functionality (placeholder)
    Route::get('/track/{trackingNumber}', function ($trackingNumber) {
        // Placeholder for shipment tracking
        return response()->json([
            'success' => true,
            'tracking_number' => $trackingNumber,
            'status' => 'In Transit',
            'location' => 'Paris, France',
            'estimated_delivery' => now()->addDays(3)->toDateString()
        ]);
    });
});