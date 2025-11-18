<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'name',
    'phone',
    'bank_number',
  ];

  protected $casts = [
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
