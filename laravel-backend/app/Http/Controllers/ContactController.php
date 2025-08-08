<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

/**
 * Contact Controller
 * 
 * Handles contact form submissions
 */
class ContactController extends Controller
{
    /**
     * Store a new contact message
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|in:devis,info,support,partenariat,carriere',
            'message' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $contact = ContactMessage::create([
                'name' => $request->name,
                'email' => $request->email,
                'company' => $request->company,
                'phone' => $request->phone,
                'subject' => $request->subject,
                'message' => $request->message,
                'ip_address' => $request->ip(),
            ]);

            // Here you could send notification emails, trigger workflows, etc.

            return response()->json([
                'success' => true,
                'message' => 'Your message has been sent successfully. We will respond within 2 business hours.',
                'data' => [
                    'message_id' => $contact->id,
                    'estimated_response_time' => '2 hours',
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send message',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all contact messages (admin only)
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $messages = ContactMessage::query()
                ->when($request->status, function ($query, $status) {
                    return $query->where('status', $status);
                })
                ->when($request->subject, function ($query, $subject) {
                    return $query->where('subject', $subject);
                })
                ->when($request->recent, function ($query) {
                    return $query->recent();
                })
                ->orderBy('created_at', 'desc')
                ->paginate(20);

            return response()->json([
                'success' => true,
                'data' => $messages
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve contact messages',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark message as read
     */
    public function markAsRead(ContactMessage $message): JsonResponse
    {
        try {
            $message->markAsRead();

            return response()->json([
                'success' => true,
                'message' => 'Message marked as read'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark message as read',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}