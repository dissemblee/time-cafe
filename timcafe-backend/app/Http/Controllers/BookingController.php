<?php

namespace App\Http\Controllers;

use App\Services\BookingService;

class BookingController extends BaseController
{
    public function __construct(BookingService $service)
    {
        parent::__construct($service);
    }
}
