<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomLayoutItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'items',
    ];

    protected $casts = [
        'items' => 'array',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
