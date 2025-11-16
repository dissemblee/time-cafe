<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Создаём 10 пользователей
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'login' => $faker->userName,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('password'),
            ]);
        }

        $this->command->info('Сидер UserSeeder выполнен.');
    }
}
