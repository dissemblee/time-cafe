<?php

namespace App\Services;

use App\Models\User;

class UserService extends BaseService
{
    protected string $modelClass = User::class;

    public function __construct(
        private ClientService $clientService
    ) {}

    protected function rules(int $id = null): array
    {
        return [
            'login' => 'required|string|max:255' . $id,
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => $id ? 'nullable|string|min:6' : 'required|string|min:6',
        ];
    }

    public function create(array $data): User
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user = parent::create($data);

        $this->clientService->create([
            'user_id' => $user->id,
            'name' => 'Аноним',
            'status' => 'active',
            'discount_percent' => 0,
        ]);

        return $user;
    }
}
