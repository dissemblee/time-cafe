<?php

namespace App\Enums;

enum BookingStatus: string
{
    case ACTIVE = 'active';
    case CANCELLED = 'cancelled';
    case COMPLETED = 'completed';
}
