<?php

namespace App\Services;

use App\Models\Client;

class ClientService extends BaseService
{
    protected string $modelClass = Client::class;

    protected function rules(int $id = null): array
    {
        return [
            'user_id' => $id ? 'sometimes|exists:users,id' : 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|unique:clients,email,' . $id,
            'bank_number' => 'nullable|string|max:50',
        ];
    }
}
