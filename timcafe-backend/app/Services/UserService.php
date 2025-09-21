<?php

namespace App\Services;

use App\Models\User;

class UserService extends BaseService
{
    protected string $modelClass = User::class;

    protected function rules(int $id = null): array
    {
        return [
            'login' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => $id ? 'nullable|string|min:6' : 'required|string|min:6',
        ];
    }
}
