<?php

namespace App\Services;

use App\Models\Transaction;
use App\Enums\TransactionStatus;
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

    public function createPaymentSession(int $bookingId, int $clientId)
    {
        $booking = \App\Models\Booking::findOrFail($bookingId);

        $transaction = Transaction::create([
            'client_id' => $clientId,
            'booking_id' => $bookingId,
            'amount' => $booking->price,
            'status' => TransactionStatus::PENDING,
            'transaction_code' => 'TX-' . strtoupper(uniqid()),
            'gateway_payload' => null,
        ]);

        return [
            'transaction' => $transaction,
            'payment_url' => url('http://localhost:3000/fake-gateway/pay/'.$transaction->id),
        ];
    }
}
