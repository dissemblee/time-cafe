<?php

namespace App\Http\Controllers;

use App\Services\TransactionService;

class TransactionController extends BaseController
{
    public function __construct(TransactionService $service)
    {
        parent::__construct($service);
    }
}
