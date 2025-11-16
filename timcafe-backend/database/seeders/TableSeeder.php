<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Table;
use App\Models\Room;
use App\Enums\TableStatus;
use Faker\Factory as Faker;

class TableSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $rooms = Room::all();

        if ($rooms->isEmpty()) {
            $this->command->info('Нет комнат для создания столов.');
            return;
        }
        // Создаём 10 столов
        for ($i = 1; $i <= 10; $i++) {
            $room = $rooms->random();

            Table::create([
                'room_id' => $room->id,
                'name' => 'Стол ' . $i,
                'seats' => $faker->numberBetween(2, 8),
                'sofas' => $faker->numberBetween(0, 2),
                'has_console' => $faker->boolean(30),
                'has_tv' => $faker->boolean(50),
                'status' => TableStatus::cases()[array_rand(TableStatus::cases())]->value,
            ]);
        }

        $this->command->info('Сидер TableSeeder выполнен.');
    }
}
