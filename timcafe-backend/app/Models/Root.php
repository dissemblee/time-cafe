<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Root extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'name',
    'phone',
    'social_network',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
