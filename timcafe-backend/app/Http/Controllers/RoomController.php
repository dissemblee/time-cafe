<?php

namespace App\Http\Controllers;

use App\Services\RoomService;

class RoomController extends BaseController
{
    public function __construct(RoomService $service)
    {
        parent::__construct($service);
    }
}
