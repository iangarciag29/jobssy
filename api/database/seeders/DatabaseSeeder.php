<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Bid;
use App\Models\Category;
use App\Models\Job;
use App\Models\Offerer;
use App\Models\Post;
use App\Models\Rate;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        User::factory(60)->create();
        Category::factory(20)->create();
        Offerer::factory(60)->create();
        Address::factory(200)->create();
        Post::factory(50)->create();
        Bid::factory(1000)->create();
        Rate::factory(300)->create();
        Job::factory(50)->create();
        Service::factory(100)->create();
    }
}
