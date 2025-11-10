<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'smoking_allowed',
    ];

    public function tables()
    {
        return $this->hasMany(Table::class);
    }

    public function layoutItems()
    {
        return $this->hasMany(RoomLayoutItem::class);
    }
}
