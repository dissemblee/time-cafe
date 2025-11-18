<?php

namespace App\Services;

use App\Models\Staff;

class StaffService extends BaseService
{
    protected string $modelClass = Staff::class;

    protected function rules(int $id = null): array
    {
        return [
            'user_id' => 'nullable|exists:users,id',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
        ];
    }
}
