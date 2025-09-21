<?php

namespace App\Services;

use App\Models\Booking;

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
        ];
    }
}
