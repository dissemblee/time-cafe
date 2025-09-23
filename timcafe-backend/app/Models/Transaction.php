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
    'table_id',
    'booking_id',
    'status',
  ];

  public function client()
  {
    return $this->belongsTo(Client::class);
  }

  public function table()
  {
    return $this->belongsTo(Table::class);
  }

  public function booking()
  {
    return $this->belongsTo(Booking::class);
  }
}
