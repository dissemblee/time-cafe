<?php

namespace App\Services;

use App\Models\RoomLayoutItem;

class RoomLayoutItemService extends BaseService
{
    protected string $modelClass = RoomLayoutItem::class;

    protected function rules(int $id = null): array
    {
        $rules = [
            'items' => 'required|array|min:1',
            'items.*.type' => 'required|string|max:255',
            'items.*.table_id' => 'nullable|exists:tables,id',
            'items.*.x' => 'required|numeric',
            'items.*.y' => 'required|numeric',
            'items.*.width' => 'required|numeric',
            'items.*.height' => 'required|numeric',
            'items.*.rotation' => 'nullable|numeric',
        ];

        if (!$id) {
            $rules['room_id'] = 'required|exists:rooms,id';
        }

        return $rules;
    }
}
