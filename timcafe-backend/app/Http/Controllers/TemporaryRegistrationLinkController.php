<?php

namespace App\Http\Controllers;

use App\Services\TemporaryRegistrationLinkService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class TemporaryRegistrationLinkController extends BaseController
{
    public function __construct(TemporaryRegistrationLinkService $service)
    {
        parent::__construct($service);
    }

    public function generate(Request $request): JsonResponse
    {
        $request->validate([
            'role' => ['required', 'string', Rule::in(['admin', 'client'])],
        ]);

        $link = $this->service->generateLink(
            $request->role,
            $request->user()
        );

        return response()->json([
            'success' => true,
            'registration_url' => url("http://localhost:3000/registration/{$link->token}"),
            'token' => $link->token,
            'expires_at' => $link->expires_at,
        ]);
    }

    public function validateLink(string $token): JsonResponse
    {
        $isValid = $this->service->isValidLink($token);
        
        if (!$isValid) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired registration link',
            ], 404);
        }

        $link = $this->service->findByToken($token);
        $role = $this->service->getRoleFromHash($link->role_hash);

        return response()->json([
            'success' => true,
            'role' => $role,
            'expires_at' => $link->expires_at,
        ]);
    }
}
