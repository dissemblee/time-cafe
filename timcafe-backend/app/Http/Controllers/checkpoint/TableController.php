<?php

namespace App\Http\Controllers;

use App\Services\TableService;
use Illuminate\Http\Request;

class TableController extends Controller
{
    protected TableService $service;

    public function __construct(TableService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->all());
    }

    public function show($id)
    {
        $table = $this->service->find($id);
        return $table ? response()->json($table) : response()->json(['message' => 'Table not found'], 404);
    }

    public function store(Request $request)
    {
        $table = $this->service->create($request->all());
        return response()->json($table, 201);
    }

    public function update(Request $request, $id)
    {
        $table = $this->service->update($id, $request->all());
        return $table ? response()->json($table) : response()->json(['message' => 'Table not found'], 404);
    }

    public function destroy($id)
    {
        $deleted = $this->service->delete($id);
        return $deleted ? response()->json(['message' => 'Deleted']) : response()->json(['message' => 'Table not found'], 404);
    }
}
