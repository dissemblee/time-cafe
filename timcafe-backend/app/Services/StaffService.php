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
            'personal_discount' => 'nullable|integer|min:0|max:100',
            'responsible' => 'nullable|boolean',
            'role' => 'required|string',
        ];
    }
}
