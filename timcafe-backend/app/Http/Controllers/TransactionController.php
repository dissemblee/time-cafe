<?php

namespace App\Http\Controllers;

use App\Services\TransactionService;
use App\Models\Booking;
use App\Models\Transaction;
use App\Enums\TableStatus;
use Illuminate\Http\Request;
use App\Enums\TransactionStatus;

class TransactionController extends BaseController
{
    public function __construct(TransactionService $service)
    {
        parent::__construct($service);
    }

    public function createPaymentSession(Request $request, TransactionService $service)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'client_id' => 'required|exists:clients,id',
        ]);

        $session = $service->createPaymentSession($request->booking_id, $request->client_id);

        return response()->json([
            'success' => true,
            'payment_url' => $session['payment_url'],
            'transaction_id' => $session['transaction']->id,
        ]);
    }

    public function paymentCallback($id)
    {
        $tx = Transaction::findOrFail($id);

        $success = rand(1, 100) > 10;

        $tx->update([
            'status' => $success ? TransactionStatus::COMPLETED : TransactionStatus::CANCELLED,
            'gateway_payload' => [
                'confirmed_at' => $success ? now() : null,
                'reason' => $success ? null : 'Simulated payment failure',
            ],
        ]);

        if (!$success && $tx->booking) {
            app(\App\Services\BookingService::class)->cancelBooking($tx->booking);
        }

        return $success
            ? "Оплата прошла успешно."
            : "Оплата не прошла. Бронирование отменено.";
    }
}
