<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\Client;
use App\Models\Table;
use App\Enums\BookingStatus;
use Carbon\Carbon;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $clients = Client::all();
        $tables = Table::all();

        if ($clients->isEmpty() || $tables->isEmpty()) {
            $this->command->info('Нет клиентов или столов для создания бронирований.');
            return;
        }

        for ($i = 1; $i <= 10; $i++) {
            $start = Carbon::now()->addDays(rand(0, 7))->setHour(rand(10, 20))->setMinute(0);
            $end = (clone $start)->addHours(rand(1, 4));

            Booking::create([
                'client_id' => $clients->random()->id,
                'table_id' => $tables->random()->id,
                'start_time' => $start,
                'end_time' => $end,
                'status' => BookingStatus::cases()[array_rand(BookingStatus::cases())]->value,
                'price' => rand(500, 5000),
                'hours' => $end->diffInHours($start),
            ]);
        }

        $this->command->info('Сидер BookingSeeder выполнен.');
    }
}
