<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\BookingStatus;

class Booking extends Model
{
  use HasFactory;

  protected $fillable = [
    'client_id',
    'table_id',
    'start_time',
    'end_time',
    'status',
  ];

  protected $casts = [
    'start_time' => 'datetime',
    'end_time' => 'datetime',
    'status' => BookingStatus::class,
  ];

  public function client()
  {
    return $this->belongsTo(Client::class);
  }

  public function table()
  {
    return $this->belongsTo(Table::class);
  }
}
