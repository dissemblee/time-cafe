<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\StaffRole;

class Staff extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'name',
    'phone',
    'personal_discount',
    'responsible',
    'role',
  ];

  protected $casts = [
    'personal_discount' => 'integer',
    'responsible' => 'boolean',
    'role' => StaffRole::class,
  ];

  protected $attributes = [
    'personal_discount' => 10,
    'responsible' => false,
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
