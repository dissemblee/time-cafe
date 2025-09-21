<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('room_layout_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            $table->foreignId('table_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type');
            $table->float('x');
            $table->float('y');
            $table->float('width');
            $table->float('height');
            $table->float('rotation');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('room_layout_items');
    }
};
