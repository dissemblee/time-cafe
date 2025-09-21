<?php

namespace App\Services;

use App\Models\RoomLayoutItem;

class RoomLayoutItemService extends BaseService
{
    protected string $modelClass = RoomLayoutItem::class;

    protected function rules(int $id = null): array
    {
        return [
            'room_id' => 'required|exists:rooms,id',
            'type' => 'required|string|max:255',
            'table_id' => 'nullable|exists:tables,id',
            'x' => 'required|numeric',
            'y' => 'required|numeric',
            'width' => 'required|numeric',
            'height' => 'required|numeric',
            'rotation' => 'nullable|numeric',
        ];
    }
}
