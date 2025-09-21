<?php

namespace App\Http\Controllers;

use App\Services\BoardGameService;

class BoardGameController extends BaseController
{
    public function __construct(BoardGameService $service)
    {
        parent::__construct($service);
    }
}
