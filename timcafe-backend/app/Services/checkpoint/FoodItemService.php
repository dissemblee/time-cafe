<?php

namespace App\Services;

use App\Models\FoodItem;

class FoodItemService
{
    public function all()
    {
        return FoodItem::all();
    }

    public function find(int $id): ?FoodItem
    {
        return FoodItem::find($id);
    }

    public function create(array $data): FoodItem
    {
        return FoodItem::create($data);
    }

    public function update(int $id, array $data): ?FoodItem
    {
        $item = FoodItem::find($id);
        if (!$item) return null;

        $item->update($data);
        return $item;
    }

    public function delete(int $id): bool
    {
        $item = FoodItem::find($id);
        if (!$item) return false;

        return $item->delete();
    }
}
