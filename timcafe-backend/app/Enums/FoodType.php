<?php

namespace App\Enums;

enum FoodType: string
{
  case DRINK = 'drink';
  case SNACK = 'snack';
  case DESSERT = 'dessert';
  case NO = 'no';
}
