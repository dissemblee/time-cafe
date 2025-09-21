<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomLayoutItem extends Model
{
  use HasFactory;

  protected $fillable = [
    'room_id',
    'type',
    'table_id',
    'x',
    'y',
    'width',
    'height',
    'rotation',
  ];

  protected $casts = [
    'x' => 'float',
    'y' => 'float',
    'width' => 'float',
    'height' => 'float',
    'rotation' => 'float',
  ];

  public function room()
  {
    return $this->belongsTo(Room::class);
  }

  public function table()
  {
    return $this->belongsTo(Table::class);
  }
}
