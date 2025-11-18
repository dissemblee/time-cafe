<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\TransactionStatus;

class Transaction extends Model
{
  use HasFactory;

  protected $fillable = [
    'client_id',
    'booking_id',
    'amount',
    'status',
    'transaction_code',
    'gateway_payload',
  ];

  protected $casts = [
    'gateway_payload' => 'array',
    'status' => TransactionStatus::class,
  ];

  public function client()
  {
    return $this->belongsTo(Client::class);
  }

  public function booking()
  {
    return $this->belongsTo(Booking::class);
  }
}
