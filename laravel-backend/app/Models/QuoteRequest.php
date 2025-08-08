<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * Quote Request Model
 * 
 * Handles quote requests from the frontend calculator
 */
class QuoteRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference_number',
        'origin',
        'destination',
        'cargo_type',
        'weight',
        'volume',
        'urgency',
        'description',
        'company',
        'email',
        'phone',
        'contact_name',
        'status',
        'quoted_price',
        'notes',
        'quoted_at',
    ];

    protected $casts = [
        'weight' => 'decimal:2',
        'volume' => 'decimal:2',
        'quoted_price' => 'decimal:2',
        'quoted_at' => 'datetime',
    ];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($quote) {
            if (empty($quote->reference_number)) {
                $quote->reference_number = 'QR-' . now()->format('YmdHis') . '-' . strtoupper(Str::random(4));
            }
        });
    }

    /**
     * Get cargo type label
     */
    public function getCargoTypeLabelAttribute(): string
    {
        $labels = [
            'general' => 'Marchandise générale',
            'perishable' => 'Périssable',
            'dangerous' => 'Matière dangereuse',
            'fragile' => 'Fragile',
            'oversized' => 'Hors gabarit',
            'vehicles' => 'Véhicules',
        ];

        return $labels[$this->cargo_type] ?? $this->cargo_type;
    }

    /**
     * Get urgency label
     */
    public function getUrgencyLabelAttribute(): string
    {
        $labels = [
            'express' => 'Express (24-48h)',
            'urgent' => 'Urgent (2-5 jours)',
            'standard' => 'Standard (1-2 semaines)',
            'economy' => 'Économique (3-4 semaines)',
        ];

        return $labels[$this->urgency] ?? $this->urgency;
    }

    /**
     * Scope for pending quotes
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for recent quotes
     */
    public function scopeRecent($query, int $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }
}