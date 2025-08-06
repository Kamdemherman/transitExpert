<?php

namespace App\Http\Controllers;

use App\Models\ChatRoom;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use App\Events\MessageSent;

/**
 * Chat Controller
 * 
 * Handles all chat-related operations including:
 * - Creating and managing chat sessions
 * - Sending and retrieving messages
 * - Real-time communication via WebSockets
 */
class ChatController extends Controller
{
    /**
     * Initialize a new chat session
     */
    public function initializeSession(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'guest_name' => 'nullable|string|max:255',
            'guest_email' => 'nullable|email|max:255',
            'chat_type' => 'nullable|in:support,sales,general',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Create or get existing chat room
            $chatRoom = ChatRoom::firstOrCreate([
                'type' => $request->input('chat_type', 'support'),
                'is_active' => true,
            ], [
                'name' => 'Support Chat - ' . now()->format('Y-m-d H:i:s'),
            ]);

            // Create chat session
            $session = ChatSession::create([
                'chat_room_id' => $chatRoom->id,
                'user_id' => auth()->id(),
                'guest_name' => $request->input('guest_name'),
                'guest_email' => $request->input('guest_email'),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'last_activity' => now(),
            ]);

            // Send welcome message
            $welcomeMessage = ChatMessage::create([
                'chat_room_id' => $chatRoom->id,
                'message' => 'Bonjour ! Je suis votre assistant virtuel TransitExpert. Comment puis-je vous aider aujourd\'hui ?',
                'message_type' => 'system',
                'sender_name' => 'Assistant TransitExpert',
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'session_id' => $session->session_id,
                    'chat_room_id' => $chatRoom->id,
                    'welcome_message' => $welcomeMessage,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to initialize chat session',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send a message in the chat
     */
    public function sendMessage(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'session_id' => 'required|string|exists:chat_sessions,session_id',
            'message' => 'required|string|max:1000',
            'message_type' => 'nullable|in:text,file,image',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Get session and validate it's active
            $session = ChatSession::where('session_id', $request->session_id)
                ->where('status', 'active')
                ->firstOrFail();

            // Update session activity
            $session->updateActivity();

            // Create message
            $message = ChatMessage::create([
                'chat_room_id' => $session->chat_room_id,
                'user_id' => auth()->id(),
                'sender_name' => $session->guest_name ?? auth()->user()?->name,
                'sender_email' => $session->guest_email ?? auth()->user()?->email,
                'message' => $request->message,
                'message_type' => $request->input('message_type', 'text'),
            ]);

            // Broadcast message via WebSocket
            broadcast(new MessageSent($message))->toOthers();

            // Generate bot response if needed
            $this->generateBotResponse($session, $request->message);

            return response()->json([
                'success' => true,
                'data' => $message->load('user'),
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
     * Get messages for a chat session
     */
    public function getMessages(Request $request, string $sessionId): JsonResponse
    {
        try {
            $session = ChatSession::where('session_id', $sessionId)->firstOrFail();
            
            $messages = ChatMessage::where('chat_room_id', $session->chat_room_id)
                ->with('user')
                ->orderBy('created_at', 'asc')
                ->paginate(50);

            // Mark messages as read
            ChatMessage::where('chat_room_id', $session->chat_room_id)
                ->where('is_read', false)
                ->update(['is_read' => true, 'read_at' => now()]);

            return response()->json([
                'success' => true,
                'data' => $messages,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve messages',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Close a chat session
     */
    public function closeSession(Request $request, string $sessionId): JsonResponse
    {
        try {
            $session = ChatSession::where('session_id', $sessionId)->firstOrFail();
            $session->close();

            // Send closing message
            ChatMessage::create([
                'chat_room_id' => $session->chat_room_id,
                'message' => 'Cette conversation a été fermée. Merci d\'avoir contacté TransitExpert !',
                'message_type' => 'system',
                'sender_name' => 'Système',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Chat session closed successfully',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to close session',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get active chat sessions (for admin)
     */
    public function getActiveSessions(): JsonResponse
    {
        try {
            $sessions = ChatSession::active()
                ->with(['chatRoom', 'user'])
                ->recentActivity()
                ->orderBy('last_activity', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $sessions,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve active sessions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate automated bot response
     */
    private function generateBotResponse(ChatSession $session, string $userMessage): void
    {
        $response = $this->getBotResponse($userMessage);
        
        if ($response) {
            // Delay the response to simulate typing
            dispatch(function () use ($session, $response) {
                $botMessage = ChatMessage::create([
                    'chat_room_id' => $session->chat_room_id,
                    'message' => $response,
                    'message_type' => 'system',
                    'sender_name' => 'Assistant TransitExpert',
                ]);

                // Broadcast bot response
                broadcast(new MessageSent($botMessage))->toOthers();
            })->delay(now()->addSeconds(2));
        }
    }

    /**
     * Get bot response based on user input
     */
    private function getBotResponse(string $userInput): ?string
    {
        $input = strtolower($userInput);
        
        if (strpos($input, 'devis') !== false || strpos($input, 'prix') !== false || strpos($input, 'tarif') !== false) {
            return 'Je peux vous aider à obtenir un devis personnalisé ! Pouvez-vous me préciser : origine, destination, type de marchandise et poids approximatif ?';
        }
        
        if (strpos($input, 'transport') !== false || strpos($input, 'expédition') !== false) {
            return 'Nous proposons du transport aérien, maritime et terrestre vers plus de 150 destinations. Quel type de transport vous intéresse ?';
        }
        
        if (strpos($input, 'délai') !== false || strpos($input, 'temps') !== false || strpos($input, 'durée') !== false) {
            return 'Les délais varient selon le mode de transport : Express (24-48h), Standard (1-2 semaines), Économique (3-4 semaines). Quelle est votre urgence ?';
        }
        
        if (strpos($input, 'douane') !== false || strpos($input, 'dédouanement') !== false) {
            return 'Nous nous occupons de toutes les formalités douanières. Nos experts certifiés OEA simplifient vos démarches import/export.';
        }
        
        if (strpos($input, 'suivi') !== false || strpos($input, 'tracking') !== false) {
            return 'Notre plateforme de suivi temps réel vous permet de localiser vos marchandises 24h/24. Vous recevez des alertes à chaque étape.';
        }
        
        if (strpos($input, 'contact') !== false || strpos($input, 'téléphone') !== false || strpos($input, 'email') !== false) {
            return 'Vous pouvez nous joindre au +33 1 23 45 67 89 ou contact@transitaire-expert.fr. Nos experts sont disponibles 24h/7j pour les urgences.';
        }
        
        return 'Merci pour votre question ! Pour une réponse personnalisée, je vous invite à contacter directement nos experts au +33 1 23 45 67 89 ou à remplir notre formulaire de devis.';
    }
}