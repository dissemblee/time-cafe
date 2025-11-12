<?php

namespace App\Services;

use App\Models\FoodItem;

class FoodItemService extends BaseService
{
    protected string $modelClass = FoodItem::class;

    protected function rules(int $id = null): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'type' => 'nullable|string|in:snack,drink,dessert,no',
        ];
    }
}
