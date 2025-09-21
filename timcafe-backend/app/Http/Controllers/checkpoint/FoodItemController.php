<?php

namespace App\Http\Controllers;

use App\Services\FoodItemService;
use Illuminate\Http\Request;

class FoodItemController extends Controller
{
    protected FoodItemService $service;

    public function __construct(FoodItemService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->all());
    }

    public function show($id)
    {
        $item = $this->service->find($id);
        return $item ? response()->json($item) : response()->json(['message' => 'Food item not found'], 404);
    }

    public function store(Request $request)
    {
        $item = $this->service->create($request->all());
        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $item = $this->service->update($id, $request->all());
        return $item ? response()->json($item) : response()->json(['message' => 'Food item not found'], 404);
    }

    public function destroy($id)
    {
        $deleted = $this->service->delete($id);
        return $deleted ? response()->json(['message' => 'Deleted']) : response()->json(['message' => 'Food item not found'], 404);
    }
}
