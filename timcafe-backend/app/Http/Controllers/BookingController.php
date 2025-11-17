<?php

namespace App\Http\Controllers;

use App\Services\BookingService;
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
}
