<?php

namespace App\Services;

use App\Models\Booking;

class BookingService
{
    public function all()
    {
        return Booking::with(['client', 'table'])->get();
    }

    public function find(int $id): ?Booking
    {
        return Booking::with(['client', 'table'])->find($id);
    }

    public function create(array $data): Booking
    {
        return Booking::create($data);
    }

    public function update(int $id, array $data): ?Booking
    {
        $booking = Booking::find($id);
        if (!$booking) return null;

        $booking->update($data);
        return $booking;
    }

    public function delete(int $id): bool
    {
        $booking = Booking::find($id);
        if (!$booking) return false;

        return $booking->delete();
    }
}
