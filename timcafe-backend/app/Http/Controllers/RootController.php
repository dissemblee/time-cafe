<?php

namespace App\Http\Controllers;

use App\Services\RootService;

class RootController extends BaseController
{
    public function __construct(RootService $service)
    {
        parent::__construct($service);
    }
}
