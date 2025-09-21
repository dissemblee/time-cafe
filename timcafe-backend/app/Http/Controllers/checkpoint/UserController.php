<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected UserService $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->all());
    }

    public function show($id)
    {
        $user = $this->service->find($id);
        return $user ? response()->json($user) : response()->json(['message' => 'User not found'], 404);
    }

    public function store(Request $request)
    {
        $user = $this->service->create($request->all());
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = $this->service->update($id, $request->all());
        return $user ? response()->json($user) : response()->json(['message' => 'User not found'], 404);
    }

    public function destroy($id)
    {
        $deleted = $this->service->delete($id);
        return $deleted ? response()->json(['message' => 'Deleted']) : response()->json(['message' => 'User not found'], 404);
    }
}
