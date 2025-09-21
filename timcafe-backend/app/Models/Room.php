<?php

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
}
