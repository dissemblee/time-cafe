<?php

namespace App\Http\Controllers;

use App\Services\TableService;

class TableController extends BaseController
{
    public function __construct(TableService $service)
    {
        parent::__construct($service);
    }
}
