<?php

namespace App\Http\Controllers;

use App\Services\FoodItemService;

class FoodItemController extends BaseController
{
    public function __construct(FoodItemService $service)
    {
        parent::__construct($service);
    }
}
