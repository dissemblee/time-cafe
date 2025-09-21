<?php

namespace App\Services;

use App\Models\Client;

class ClientService extends BaseService
{
    protected string $modelClass = Client::class;

    protected function rules(int $id = null): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|unique:clients,email,' . $id,
            'note' => 'nullable|string',
            'bank_number' => 'nullable|string|max:50',
            'discount_percent' => 'nullable|numeric|min:0|max:100',
            'status' => 'required|in:active,inactive,banned',
            'date_of_birth' => 'nullable|date',
        ];
    }
}
