<?php

namespace App\Services;

use App\Models\User;
use Firebase\JWT\JWT;

class JwtService
{
    public function generateToken(User $user): string
    {
        $role = 'client';
        
        if ($user->staff) {
            $role = 'admin';
        }

        $payload = [
            'sub'  => $user->id,
            'name' => $user->name ?? $user->login,
            'role' => $role,
            'iat'  => time(),
            'exp'  => time() + 60*60*24,
        ];

        return JWT::encode($payload, env('JWT_SECRET'), 'HS256');
    }
}
