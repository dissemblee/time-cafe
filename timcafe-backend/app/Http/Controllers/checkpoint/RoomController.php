<?php

namespace App\Http\Controllers;

use App\Services\RoomService;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    protected RoomService $service;

    public function __construct(RoomService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->all());
    }

    public function show($id)
    {
        $room = $this->service->find($id);
        return $room ? response()->json($room) : response()->json(['message' => 'Room not found'], 404);
    }

    public function store(Request $request)
    {
        $room = $this->service->create($request->all());
        return response()->json($room, 201);
    }

    public function update(Request $request, $id)
    {
        $room = $this->service->update($id, $request->all());
        return $room ? response()->json($room) : response()->json(['message' => 'Room not found'], 404);
    }

    public function destroy($id)
    {
        $deleted = $this->service->delete($id);
        return $deleted ? response()->json(['message' => 'Deleted']) : response()->json(['message' => 'Room not found'], 404);
    }
}
