<?php

namespace App\Mail;

use App\Models\QuoteRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * Quote Request Notification Email
 * 
 * Sent to admin when a new quote request is submitted
 */
class QuoteRequestNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $quoteRequest;

    /**
     * Create a new message instance.
     */
    public function __construct(QuoteRequest $quoteRequest)
    {
        $this->quoteRequest = $quoteRequest;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouvelle demande de devis - ' . $this->quoteRequest->reference_number,
            replyTo: [
                $this->quoteRequest->email => $this->quoteRequest->company,
            ],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.quote-request',
            with: [
                'quote' => $this->quoteRequest,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}