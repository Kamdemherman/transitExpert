<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BlogController;

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
| Quote Request Routes
|--------------------------------------------------------------------------
|
| Routes for handling quote requests from the calculator
|
*/

Route::prefix('quotes')->group(function () {
    Route::post('/', [QuoteController::class, 'store']);
    Route::get('/{referenceNumber}', [QuoteController::class, 'show']);
    
    // Protected routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [QuoteController::class, 'index']);
    });
});

/*
|--------------------------------------------------------------------------
| Contact Routes
|--------------------------------------------------------------------------
|
| Routes for handling contact form submissions
|
*/

Route::prefix('contact')->group(function () {
    Route::post('/', [ContactController::class, 'store']);
    
    // Protected routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [ContactController::class, 'index']);
        Route::patch('/{message}/read', [ContactController::class, 'markAsRead']);
    });
});

/*
|--------------------------------------------------------------------------
| Blog Routes
|--------------------------------------------------------------------------
|
| Routes for blog functionality and SEO content
|
*/

Route::prefix('blog')->group(function () {
    Route::get('/', [BlogController::class, 'index']);
    Route::get('/recent', [BlogController::class, 'recent']);
    Route::get('/popular', [BlogController::class, 'popular']);
    Route::get('/{post}', [BlogController::class, 'show']);
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
    Route::post('/quote-request', [QuoteController::class, 'store']);
    
    // Contact form submission
    Route::post('/contact', [ContactController::class, 'store']);
    
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

/*
|--------------------------------------------------------------------------
| Analytics Routes
|--------------------------------------------------------------------------
|
| Routes for tracking website analytics and user behavior
|
*/

Route::prefix('analytics')->group(function () {
    // Public tracking routes
    Route::post('/visitor', [App\Http\Controllers\AnalyticsController::class, 'trackVisitor']);
    Route::post('/action', [App\Http\Controllers\AnalyticsController::class, 'trackAction']);
    
    // Protected routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\AnalyticsController::class, 'getDashboard']);
    });
});