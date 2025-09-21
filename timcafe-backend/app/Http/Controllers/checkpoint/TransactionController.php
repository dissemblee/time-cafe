<?php

namespace App\Http\Controllers;

use App\Services\TransactionService;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    protected TransactionService $service;

    public function __construct(TransactionService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->all());
    }

    public function show($id)
    {
        $transaction = $this->service->find($id);
        return $transaction ? response()->json($transaction) : response()->json(['message' => 'Transaction not found'], 404);
    }

    public function store(Request $request)
    {
        $transaction = $this->service->create($request->all());
        return response()->json($transaction, 201);
    }

    public function update(Request $request, $id)
    {
        $transaction = $this->service->update($id, $request->all());
        return $transaction ? response()->json($transaction) : response()->json(['message' => 'Transaction not found'], 404);
    }

    public function destroy($id)
    {
        $deleted = $this->service->delete($id);
        return $deleted ? response()->json(['message' => 'Deleted']) : response()->json(['message' => 'Transaction not found'], 404);
    }
}
