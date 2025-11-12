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
        'description',
        'smoking_allowed',
        'min_price',
        'features'
    ];

    protected $casts = [
        'name'            => 'string',
        'min_price'       => 'decimal:2',
        'description'     => 'string',
        'smoking_allowed' => 'boolean',
        'type'            => 'string',
        'features'        => 'array',
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
