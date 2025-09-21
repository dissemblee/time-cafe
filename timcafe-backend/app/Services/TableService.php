<?php

namespace App\Services;

use App\Models\Table;

class TableService extends BaseService
{
    protected string $modelClass = Table::class;

    protected function rules(int $id = null): array
    {
        return [
            'room_id' => 'required|exists:rooms,id',
            'name' => 'required|string|max:255',
            'seats' => 'nullable|integer|min:0',
            'sofas' => 'nullable|integer|min:0',
            'has_console' => 'nullable|boolean',
            'has_tv' => 'nullable|boolean',
            'status' => 'nullable|string',
        ];
    }
}
