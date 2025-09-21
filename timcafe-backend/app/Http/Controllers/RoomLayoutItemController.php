<?php

namespace App\Http\Controllers;

use App\Services\RoomLayoutItemService;

class RoomLayoutItemController extends BaseController
{
    public function __construct(RoomLayoutItemService $service)
    {
        parent::__construct($service);
    }
}
