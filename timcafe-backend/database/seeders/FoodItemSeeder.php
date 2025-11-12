<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FoodItem;
use App\Enums\FoodType;

class FoodItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['name' => 'Coca-Cola', 'description' => 'Освежающий газированный напиток', 'price' => 100, 'type' => FoodType::DRINK],
            ['name' => 'Green Tea', 'description' => 'Зеленый чай с медом', 'price' => 120, 'type' => FoodType::DRINK],
            ['name' => 'Espresso', 'description' => 'Крепкий черный кофе', 'price' => 150, 'type' => FoodType::DRINK],

            ['name' => 'French Fries', 'description' => 'Картофель фри с солью', 'price' => 180, 'type' => FoodType::SNACK],
            ['name' => 'Nachos', 'description' => 'Чипсы с сырным соусом', 'price' => 200, 'type' => FoodType::SNACK],
            ['name' => 'Chicken Nuggets', 'description' => 'Наггетсы из куриного филе', 'price' => 220, 'type' => FoodType::SNACK],

            ['name' => 'Cheesecake', 'description' => 'Классический чизкейк с клубникой', 'price' => 300, 'type' => FoodType::DESSERT],
            ['name' => 'Chocolate Brownie', 'description' => 'Шоколадный брауни с орехами', 'price' => 250, 'type' => FoodType::DESSERT],
            ['name' => 'Ice Cream', 'description' => 'Мороженое ванильное с топпингом', 'price' => 200, 'type' => FoodType::DESSERT],
        ];

        foreach ($items as $item) {
            FoodItem::create($item);
        }
    }
}
