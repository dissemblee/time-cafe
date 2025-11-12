<?php

namespace Database\Factories;

use App\Models\FoodItem;
use Illuminate\Database\Eloquent\Factories\Factory;

class FoodItemFactory extends Factory
{
    protected $model = FoodItem::class;

    public function definition(): array
    {
        $types = ['snack', 'drink', 'dessert', 'no'];

        return [
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->sentence(8),
            'price' => $this->faker->randomFloat(2, 50, 700),
            'type' => $this->faker->randomElement($types),
        ];
    }
}
