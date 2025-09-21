<?php

namespace App\Services;

use App\Models\BoardGame;

class BoardGameService extends BaseService
{
    protected string $modelClass = BoardGame::class;

    protected function rules(int $id = null): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity' => 'nullable|integer|min:0',
        ];
    }
}
