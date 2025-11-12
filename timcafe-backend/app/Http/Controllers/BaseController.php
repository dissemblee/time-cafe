<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BaseController extends Controller
{
    protected $service;

    public function __construct($service)
    {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        $data = $this->service->all($request->all());
        return response()->json([
            'success' => true,
            'data' => $data->items(),
            'meta' => [
                'current_page' => $data->currentPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
                'last_page' => $data->lastPage(),
            ],
        ]);
    }

    public function show(int $id): JsonResponse
    {
        try {
            $item = $this->service->find($id);
            return response()->json([
                'success' => true,
                ...$item->toArray(),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Not found',
            ], 404);
        }
    }

    public function store(Request $request): JsonResponse
    {
        $item = $this->service->create($request->all());
        return response()->json([
            'success' => true,
            ...$item->toArray(),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $item = $this->service->update($id, $request->all());
            return response()->json([
                'success' => true,
                ...$item->toArray(),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Not found',
            ], 404);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $this->service->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Not found',
            ], 404);
        }
    }
}
