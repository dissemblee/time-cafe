<?php

namespace App\Http\Controllers;

use App\Services\ClientService;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    protected ClientService $service;

    public function __construct(ClientService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        return response()->json($this->service->all($request->all()));
    }

    public function show($id)
    {
        $client = $this->service->find($id);
        return $client ? response()->json($client) : response()->json(['message' => 'Client not found'], 404);
    }

    public function store(Request $request)
    {
        $client = $this->service->create($request->all());
        return response()->json($client, 201);
    }

    public function update(Request $request, $id)
    {
        $client = $this->service->update($id, $request->all());
        return $client ? response()->json($client) : response()->json(['message' => 'Client not found'], 404);
    }

    public function destroy($id)
    {
        $deleted = $this->service->delete($id);
        return $deleted ? response()->json(['message' => 'Deleted']) : response()->json(['message' => 'Client not found'], 404);
    }
}
