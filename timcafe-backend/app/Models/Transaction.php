<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\TransactionStatus;

class Transaction extends Model
{
  use HasFactory;

  protected $fillable = [
    'client_id',
    'table_id',
    'hours',
    'price',
    'status',
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
