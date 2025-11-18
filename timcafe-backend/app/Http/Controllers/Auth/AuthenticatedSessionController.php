<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Firebase\JWT\JWT;

class AuthenticatedSessionController extends Controller
{
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = $request->user();

        $payload = [
            'sub'  => $user->id,
            'name' => $user->name ?? $user->login,
            'role' => $user->client ? 'client' : 'admin',
            'iat'  => time(),
            'exp'  => time() + 60*60*24,
        ];

        $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name ?? $user->login,
                'role' => $payload['role'],
            ],
            'token' => $jwt
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
