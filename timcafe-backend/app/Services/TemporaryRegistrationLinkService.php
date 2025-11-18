<?php

namespace App\Services;

use App\Models\TemporaryRegistrationLink;
use App\Models\User;
use Illuminate\Validation\Rule;

class TemporaryRegistrationLinkService extends BaseService
{
    protected string $modelClass = TemporaryRegistrationLink::class;

    protected function rules(int $id = null): array
    {
        return [
            'role_hash' => ['required', 'string', 'max:64'],
            'expires_at' => ['required', 'date', 'after:now'],
            'created_by' => ['required', 'exists:users,id'],
        ];
    }

    public function generateLink(string $role, User $creator): TemporaryRegistrationLink
    {
        $data = [
            'token' => TemporaryRegistrationLink::generateToken(),
            'role_hash' => TemporaryRegistrationLink::hashRole($role),
            'expires_at' => now()->addDays(7),
            'created_by' => $creator->id,
            'is_used' => false,
        ];

        return $this->create($data);
    }

    public function findByToken(string $token): ?TemporaryRegistrationLink
    {
        return $this->modelClass::where('token', $token)->first();
    }

    public function isValidLink(string $token): bool
    {
        $link = $this->findByToken($token);
        return $link && $link->isValid();
    }

    public function markAsUsed(string $token): bool
    {
        $link = $this->findByToken($token);
        if (!$link) {
            return false;
        }

        return $link->update(['is_used' => true]);
    }

    public function getRoleFromHash(string $roleHash): ?string
    {
        $roles = ['admin', 'client'];
        
        foreach ($roles as $role) {
            if (TemporaryRegistrationLink::hashRole($role) === $roleHash) {
                return $role;
            }
        }
        
        return null;
    }
}
