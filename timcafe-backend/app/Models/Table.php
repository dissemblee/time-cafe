<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\TableStatus;

class Table extends Model
{
  use HasFactory;

  protected $fillable = [
    'room_id',
    'name',
    'seats',
    'sofas',
    'has_console',
    'has_tv',
    'status',
  ];

  protected $casts = [
    'has_console' => 'boolean',
    'has_tv' => 'boolean',
    'status' => TableStatus::class,
  ];

  public function room()
  {
    return $this->belongsTo(Room::class);
  }

  public function bookings()
  {
    return $this->hasMany(Booking::class);
  }

  public function transactions()
  {
    return $this->hasMany(Transaction::class);
  }
}
