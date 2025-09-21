<?php

namespace App\Http\Controllers;

use App\Services\BoardGameService;
use Illuminate\Http\Request;

class BoardGameController extends Controller
{
    protected BoardGameService $service;

    public function __construct(BoardGameService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->all());
    }

    public function show($id)
    {
        $game = $this->service->find($id);
        return $game ? response()->json($game) : response()->json(['message' => 'Board game not found'], 404);
    }

    public function store(Request $request)
    {
        $game = $this->service->create($request->all());
        return response()->json($game, 201);
    }

    public function update(Request $request, $id)
    {
        $game = $this->service->update($id, $request->all());
        return $game ? response()->json($game) : response()->json(['message' => 'Board game not found'], 404);
    }

    public function destroy($id)
    {
        $deleted = $this->service->delete($id);
        return $deleted ? response()->json(['message' => 'Deleted']) : response()->json(['message' => 'Board game not found'], 404);
    }
}
