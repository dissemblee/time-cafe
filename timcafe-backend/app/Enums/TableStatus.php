<?php

namespace App\Enums;

enum TableStatus: string
{
    case FREE = 'free';
    case BOOKED = 'booked';
}
