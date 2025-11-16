<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use App\Models\User;
use App\Enums\ClientStatus;
use Faker\Factory as Faker;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->info('Нет пользователей для создания клиентов.');
            return;
        }

        for ($i = 1; $i <= 10; $i++) {
            $user = $users->random();

            Client::create([
                'user_id' => $user->id,
                'name' => $faker->name,
                'phone' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'note' => $faker->optional()->text(100),
                'bank_number' => $faker->optional()->bankAccountNumber,
                'discount_percent' => $faker->randomFloat(2, 0, 30),
                'status' => ClientStatus::cases()[array_rand(ClientStatus::cases())]->value,
                'date_of_birth' => $faker->optional()->date('Y-m-d', '2005-01-01'),
            ]);
        }

        $this->command->info('Сидер ClientSeeder выполнен.');
    }
}
