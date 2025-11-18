<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Staff;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminStaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'login' => 'kusainovdavid@gmail.com',
            'email' => 'kusainovdavid@gmail.com',
            'password' => Hash::make('251315ru'),
            'email_verified_at' => now(),
        ]);

        Staff::create([
            'user_id' => $user->id,
            'name' => 'Давид Кусаинов',
            'phone' => null,
        ]);

        $this->command->info('Admin staff user created successfully!');
        $this->command->info('Email: kusainovdavid@gmail.com');
        $this->command->info('Password: 251315ru');
    }
}
