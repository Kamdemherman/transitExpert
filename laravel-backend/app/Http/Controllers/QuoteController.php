<?php

namespace App\Http\Controllers;

use App\Models\QuoteRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

/**
 * Quote Controller
 * 
 * Handles quote requests from the frontend calculator
 */
class QuoteController extends Controller
{
    /**
     * Store a new quote request
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'origin' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'cargo_type' => 'required|in:general,perishable,dangerous,fragile,oversized,vehicles',
            'weight' => 'required|numeric|min:0.1',
            'volume' => 'nullable|numeric|min:0.1',
            'urgency' => 'required|in:express,urgent,standard,economy',
            'description' => 'nullable|string|max:1000',
            'company' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'contact_name' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $quote = QuoteRequest::create([
                'origin' => $request->origin,
                'destination' => $request->destination,
                'cargo_type' => $request->cargo_type,
                'weight' => $request->weight,
                'volume' => $request->volume,
                'urgency' => $request->urgency,
                'description' => $request->description,
                'company' => $request->company,
                'email' => $request->email,
                'phone' => $request->phone,
                'contact_name' => $request->contact_name,
            ]);

            // Here you could send notification emails, trigger workflows, etc.

            return response()->json([
                'success' => true,
                'message' => 'Quote request submitted successfully. We will respond within 2 business hours.',
                'data' => [
                    'reference_number' => $quote->reference_number,
                    'estimated_response_time' => '2 hours',
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit quote request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get quote request by reference number
     */
    public function show(string $referenceNumber): JsonResponse
    {
        try {
            $quote = QuoteRequest::where('reference_number', $referenceNumber)->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => $quote
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Quote request not found'
            ], 404);
        }
    }

    /**
     * Get all quote requests (admin only)
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $quotes = QuoteRequest::query()
                ->when($request->status, function ($query, $status) {
                    return $query->where('status', $status);
                })
                ->when($request->recent, function ($query) {
                    return $query->recent();
                })
                ->orderBy('created_at', 'desc')
                ->paginate(20);

            return response()->json([
                'success' => true,
                'data' => $quotes
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve quote requests',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}