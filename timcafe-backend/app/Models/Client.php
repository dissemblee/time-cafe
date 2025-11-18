<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\ClientStatus;

class Client extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'name',
    'phone',
    'note',
    'bank_number',
    'discount_percent',
    'status',
    'date_of_birth',
  ];

  protected $casts = [
    'date_of_birth'     => 'date',
    'status'            => ClientStatus::class,
    'discount_percent'  => 'decimal:2',
    'bank_number'       => 'string',
    'phone'             => 'string',
    'email'             => 'string',
    'user_id'           => 'integer',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
