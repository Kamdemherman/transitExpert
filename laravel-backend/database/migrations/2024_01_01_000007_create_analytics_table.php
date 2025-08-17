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
        Schema::create('website_analytics', function (Blueprint $table) {
            $table->id();
            $table->string('session_id')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('page_url');
            $table->string('page_title')->nullable();
            $table->string('referrer')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('device_type')->nullable(); // desktop, mobile, tablet
            $table->string('browser')->nullable();
            $table->string('os')->nullable();
            $table->integer('time_on_page')->nullable(); // seconds
            $table->boolean('is_bounce')->default(false);
            $table->timestamps();

            $table->index(['created_at', 'page_url']);
            $table->index('session_id');
            $table->index('ip_address');
        });

        Schema::create('user_actions', function (Blueprint $table) {
            $table->id();
            $table->string('session_id')->nullable();
            $table->string('action_type'); // quote_request, contact_form, chat_start, etc.
            $table->string('page_url');
            $table->json('action_data')->nullable(); // Additional data about the action
            $table->string('ip_address')->nullable();
            $table->timestamps();

            $table->index(['created_at', 'action_type']);
            $table->index('session_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_actions');
        Schema::dropIfExists('website_analytics');
    }
};