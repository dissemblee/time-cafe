<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\TableStatus;

return new class extends Migration {
    public function up(): void {
        Schema::create('tables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->integer('seats')->default(4);
            $table->integer('sofas')->default(0);
            $table->boolean('has_console')->default(false);
            $table->boolean('has_tv')->default(false);
            $table->enum('status', array_column(TableStatus::cases(), 'value'))->default(TableStatus::FREE->value);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('tables');
    }
};
