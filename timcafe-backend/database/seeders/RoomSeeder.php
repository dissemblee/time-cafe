<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Room;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            [
                'name' => 'Игровая зона',
                'type' => 'gaming',
                'smoking_allowed' => false,
                'min_price' => 500,
                'features' => ['PS5', 'Xbox', 'Настольные игры'],
                'description' => 'Комната с консолями и настольными играми для геймеров',
                'layout' => null,
            ],
            [
                'name' => 'Lounge',
                'type' => 'lounge',
                'smoking_allowed' => true,
                'min_price' => 300,
                'features' => ['Барная зона', 'Комфортные диваны'],
                'description' => 'Уютная зона отдыха с баром и мягкими диванами',
                'layout' => null,
            ],
            [
                'name' => 'VR Комната',
                'type' => 'vr',
                'smoking_allowed' => false,
                'min_price' => 700,
                'features' => ['VR-очки', 'Сенсорные контроллеры'],
                'description' => 'Комната для виртуальной реальности с полным комплектом оборудования',
                'layout' => null,
            ],
            [
                'name' => 'Кинотеатр',
                'type' => 'cinema',
                'smoking_allowed' => false,
                'min_price' => 1000,
                'features' => ['Большой экран', 'Проектор', 'Комфортные кресла'],
                'description' => 'Комната с большим экраном и проектором для просмотра фильмов',
                'layout' => null,
            ],
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
