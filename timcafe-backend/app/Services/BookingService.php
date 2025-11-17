<?php

namespace App\Services;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingService extends BaseService
{
    protected string $modelClass = Booking::class;

    protected function rules(int $id = null): array
    {
        return [
            'client_id' => 'required|exists:clients,id',
            'table_id' => 'required|exists:tables,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after_or_equal:start_time',
            'status' => 'required|string',
            'price' => 'sometimes|numeric|min:1',
            'hours' => 'sometimes|numeric|min:1',
        ];
    }

    public function all(array $params = [])
    {
        $perPage = $params['per_page'] ?? 10;

        return $this->modelClass::with(['client', 'table'])->paginate($perPage);
    }

    public function myBookings(Request $request)
    {
        $user = $request->user();

        if (!$user || !$user->client) {
            return response()->json([
                'error' => 'У пользователя нет связанного клиента'
            ], 400);
        }

        $clientId = $user->client->id;

        $bookings = Booking::where('client_id', $clientId)
            ->with(['client', 'table'])
            ->paginate($request->get('per_page', 10));

        return response()->json($bookings);
    }

    public function store(Request $request, BookingService $bookingService)
    {
        try {
            $booking = $bookingService->create($request->all());
            return response()->json($booking, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

}
