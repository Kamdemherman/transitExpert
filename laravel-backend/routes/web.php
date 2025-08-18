<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return response()->json([
        'message' => 'TransitExpert API is running!',
        'version' => '1.0.0',
        'endpoints' => [
            'quotes' => '/api/quotes',
            'contact' => '/api/contact',
            'chat' => '/api/chat/*',
            'blog' => '/api/blog',
            'analytics' => '/api/analytics/*'
        ]
    ]);
});

// CORS preflight route
Route::options('{any}', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
})->where('any', '.*');