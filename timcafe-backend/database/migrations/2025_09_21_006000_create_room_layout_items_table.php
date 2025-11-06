<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('room_layout_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->unique()->constrained()->cascadeOnDelete();
            $table->json('items');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('room_layout_items');
    }
};
