<?php

namespace App\Http\Controllers;

use App\Services\BookingService;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    protected BookingService $service;

    public function __construct(BookingService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->all());
    }

    public function show($id)
    {
        $booking = $this->service->find($id);
        return $booking ? response()->json($booking) : response()->json(['message' => 'Booking not found'], 404);
    }

    public function store(Request $request)
    {
        $booking = $this->service->create($request->all());
        return response()->json($booking, 201);
    }

    public function update(Request $request, $id)
    {
        $booking = $this->service->update($id, $request->all());
        return $booking ? response()->json($booking) : response()->json(['message' => 'Booking not found'], 404);
    }

    public function destroy($id)
    {
        $deleted = $this->service->delete($id);
        return $deleted ? response()->json(['message' => 'Deleted']) : response()->json(['message' => 'Booking not found'], 404);
    }
}
