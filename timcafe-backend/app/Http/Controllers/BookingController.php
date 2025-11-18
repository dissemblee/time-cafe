<?php

namespace App\Http\Controllers;

use App\Services\BookingService;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends BaseController
{
    public function __construct(BookingService $service)
    {
        parent::__construct($service);
    }

    public function myBookings(Request $request, BookingService $service)
    {
        return $service->myBookings($request);
    }

    public function cancel(Booking $booking)
    {
        $this->service->cancelBooking($booking);

        return response()->json([
            'success' => true,
            'message' => 'Бронирование отменено',
            'booking' => $booking->fresh()
        ]);
    }
}
