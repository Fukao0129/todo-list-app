<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // マスタデータ
        $this->call(StatusesTableSeeder::class);

        $this->call(UsersTableSeeder::class);
        $this->call(TodosTableSeeder::class);
    }
}
