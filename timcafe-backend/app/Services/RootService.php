<?php

namespace App\Services;

use App\Models\Root;

class RootService extends BaseService
{
    protected string $modelClass = Root::class;

    protected function rules(int $id = null): array
    {
        return [
            'user_id' => 'nullable|exists:users,id',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'social_network' => 'nullable|string|max:255',
        ];
    }
}
