# Laravel Chat Backend

This Laravel backend provides a complete chat system for the freight forwarder website with real-time messaging capabilities.

## Features

- **Real-time Chat**: WebSocket-based real-time messaging
- **Guest Support**: Chat functionality for both authenticated and guest users
- **Session Management**: Comprehensive chat session tracking
- **Automated Responses**: Intelligent bot responses for common freight forwarding queries
- **Message Types**: Support for text, file, and image messages
- **Admin Dashboard**: Active session monitoring for support staff

## Installation

### Prerequisites

- PHP 8.1 or higher
- Composer
- MySQL/PostgreSQL database
- Redis (for broadcasting)

### Setup Steps

1. **Install Dependencies**
   ```bash
   composer install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Configuration**
   Update your `.env` file with database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=freight_chat
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

4. **Broadcasting Configuration**
   For real-time features, configure broadcasting in `.env`:
   ```env
   BROADCAST_DRIVER=pusher
   PUSHER_APP_ID=your_app_id
   PUSHER_APP_KEY=your_app_key
   PUSHER_APP_SECRET=your_app_secret
   PUSHER_APP_CLUSTER=mt1
   ```

   Or use Laravel WebSockets (recommended for development):
   ```bash
   composer require pusher/pusher-php-server
   composer require beyondcode/laravel-websockets
   php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="migrations"
   ```

5. **Run Migrations**
   ```bash
   php artisan migrate
   ```

6. **Start Services**
   ```bash
   # Start Laravel development server
   php artisan serve
   
   # Start queue worker (for delayed bot responses)
   php artisan queue:work
   
   # Start WebSocket server (if using Laravel WebSockets)
   php artisan websockets:serve
   ```

## API Endpoints

### Chat Management

- `POST /api/chat/initialize` - Initialize a new chat session
- `POST /api/chat/send-message` - Send a message
- `GET /api/chat/messages/{sessionId}` - Get messages for a session
- `POST /api/chat/close-session/{sessionId}` - Close a chat session
- `GET /api/chat/active-sessions` - Get active sessions (admin only)

### Freight Forwarder Specific

- `POST /api/freight/quote-request` - Submit quote request
- `POST /api/freight/contact` - Submit contact form
- `GET /api/freight/track/{trackingNumber}` - Track shipment

## Database Schema

### Chat Rooms
- Manages different types of chat rooms (support, sales, general)
- Tracks participants and room status

### Chat Messages
- Stores all messages with support for different message types
- Handles both authenticated users and guest users
- Tracks read status and timestamps

### Chat Sessions
- Manages individual chat sessions
- Tracks user activity and session status
- Stores guest information for non-authenticated users

## Real-time Features

The system uses Laravel Broadcasting with WebSockets to provide real-time chat functionality:

1. **Message Broadcasting**: New messages are instantly broadcast to all participants
2. **Typing Indicators**: Shows when users are typing (can be implemented)
3. **Online Status**: Track user online/offline status
4. **Notifications**: Real-time notifications for new messages

## Bot Responses

The system includes intelligent automated responses for common freight forwarding queries:

- Quote requests and pricing information
- Transport modes and delivery times
- Customs clearance and documentation
- Shipment tracking and status updates
- Contact information and support hours

## Security Features

- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Prevents spam and abuse
- **Session Management**: Secure session handling
- **CORS Configuration**: Proper cross-origin resource sharing setup

## Customization

### Adding New Bot Responses

Edit the `getBotResponse()` method in `ChatController.php` to add new automated responses:

```php
private function getBotResponse(string $userInput): ?string
{
    $input = strtolower($userInput);
    
    // Add your custom responses here
    if (strpos($input, 'your_keyword') !== false) {
        return 'Your custom response';
    }
    
    // ... existing responses
}
```

### Extending Message Types

Add new message types by:

1. Updating the `message_type` enum in the migration
2. Adding handling logic in the controller
3. Updating the frontend to support the new type

## Production Deployment

1. **Environment Setup**
   - Use a production database (MySQL/PostgreSQL)
   - Configure Redis for caching and queues
   - Set up proper broadcasting (Pusher or Laravel WebSockets)

2. **Performance Optimization**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

3. **Queue Workers**
   Set up supervisor or similar process manager for queue workers:
   ```bash
   php artisan queue:work --daemon
   ```

4. **WebSocket Server**
   For production WebSocket server, consider using Laravel WebSockets with a reverse proxy (nginx).

## Monitoring and Maintenance

- Monitor active chat sessions through the admin endpoints
- Set up logging for chat activities
- Implement cleanup jobs for old messages and closed sessions
- Monitor WebSocket connections and performance

## Support

For technical support or customization requests, please refer to the Laravel documentation or contact the development team.