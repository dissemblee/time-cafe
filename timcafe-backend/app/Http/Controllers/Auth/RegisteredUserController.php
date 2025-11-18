<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Http\JsonResponse;
use Firebase\JWT\JWT;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, UserService $userService): JsonResponse
    {
         $request->validate([
            'login' => ['required', 'string', 'max:255', 'unique:'.User::class],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = $userService->create([
            'login' => $request->login,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        event(new Registered($user));

        Auth::login($user);

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
}
