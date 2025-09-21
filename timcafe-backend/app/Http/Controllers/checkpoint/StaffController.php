<?php

namespace App\Http\Controllers;

use App\Services\StaffService;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    protected StaffService $service;

    public function __construct(StaffService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->all());
    }

    public function show($id)
    {
        $staff = $this->service->find($id);
        return $staff ? response()->json($staff) : response()->json(['message' => 'Staff not found'], 404);
    }

    public function store(Request $request)
    {
        $staff = $this->service->create($request->all());
        return response()->json($staff, 201);
    }

    public function update(Request $request, $id)
    {
        $staff = $this->service->update($id, $request->all());
        return $staff ? response()->json($staff) : response()->json(['message' => 'Staff not found'], 404);
    }

    public function destroy($id)
    {
        $deleted = $this->service->delete($id);
        return $deleted ? response()->json(['message' => 'Deleted']) : response()->json(['message' => 'Staff not found'], 404);
    }
}
