<?php

namespace App\Services;

use App\Models\Room;

class RoomService extends BaseService
{
    protected string $modelClass = Room::class;

    protected function rules(int $id = null): array
    {
        return [
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'smoking_allowed' => 'nullable|boolean',
            'layout' => 'nullable|array',
        ];
    }
}
