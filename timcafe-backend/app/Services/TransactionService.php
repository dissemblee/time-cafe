<?php

namespace App\Services;

use App\Models\Transaction;

class TransactionService extends BaseService
{
    protected string $modelClass = Transaction::class;

    protected function rules(int $id = null): array
    {
        return [
            'client_id' => 'required|exists:clients,id',
            'table_id' => 'required|exists:tables,id',
            'booking_id' => 'required|exists:bookings,id',
            'hours' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'status' => 'required|string',
        ];
    }
}
