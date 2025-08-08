<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quote_requests', function (Blueprint $table) {
            $table->id();
            $table->string('reference_number')->unique();
            $table->string('origin');
            $table->string('destination');
            $table->enum('cargo_type', ['general', 'perishable', 'dangerous', 'fragile', 'oversized', 'vehicles']);
            $table->decimal('weight', 10, 2);
            $table->decimal('volume', 8, 2)->nullable();
            $table->enum('urgency', ['express', 'urgent', 'standard', 'economy']);
            $table->text('description')->nullable();
            $table->string('company');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('contact_name')->nullable();
            $table->enum('status', ['pending', 'processing', 'quoted', 'accepted', 'rejected'])->default('pending');
            $table->decimal('quoted_price', 10, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('quoted_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
            $table->index('reference_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quote_requests');
    }
};