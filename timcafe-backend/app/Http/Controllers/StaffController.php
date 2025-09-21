<?php

namespace App\Http\Controllers;

use App\Services\StaffService;

class StaffController extends BaseController
{
    public function __construct(StaffService $service)
    {
        parent::__construct($service);
    }
}
