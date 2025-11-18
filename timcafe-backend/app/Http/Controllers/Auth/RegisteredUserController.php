<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\TemporaryRegistrationLinkService;
use App\Services\UserService;
use App\Services\JwtService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    public function store(
        Request $request, 
        UserService $userService,
        TemporaryRegistrationLinkService $linkService,
        JwtService $jwtService
    ): JsonResponse {
        $role = null;
        if ($request->has('invitation_token')) {
            $link = $linkService->findByToken($request->invitation_token);
            
            if (!$link || !$link->isValid()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid or expired invitation link'
                ], 422);
            }
            
            $role = $linkService->getRoleFromHash($link->role_hash);
            
            $linkService->markAsUsed($request->invitation_token);
        }

        $request->validate([
            'login' => ['required', 'string', 'max:255', 'unique:'.User::class],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'invitation_token' => ['sometimes', 'string'],
        ]);

        $userData = [
            'login' => $request->login,
            'email' => $request->email,
            'password' => $request->password,
        ];

        if ($role === 'admin') {
            $user = $userService->createStaff($userData);
        } else {
            $user = $userService->create($userData);
        }

        event(new Registered($user));
        Auth::login($user);
        $user->load(['client', 'staff']);
        $jwt = $jwtService->generateToken($user);

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name ?? $user->login,
                'role' => $user->staff ? 'admin' : 'client',
            ],
            'token' => $jwt
        ]);
    }
}
