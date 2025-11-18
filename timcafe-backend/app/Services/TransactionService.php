<?php

namespace App\Services;

use App\Models\Transaction;
use App\Enums\TransactionStatus;

class TransactionService extends BaseService
{
    protected string $modelClass = Transaction::class;

    protected function rules(int $id = null): array
    {
        return [
            'client_id' => 'required|exists:clients,id',
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:' . implode(',', array_column(TransactionStatus::cases(), 'value')),
            'transaction_code' => 'nullable|string',
            'gateway_payload' => 'nullable|array',
        ];
    }
}
