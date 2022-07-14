<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offerer>
 */
class OffererFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $users_id = User::all()->pluck('id')->toArray();

        return [
            'user_id' => $this->faker->randomElement($users_id),
            'rating' => $this->faker->randomNumber([1, 2, 3, 4, 5]),
            'start_time' => $this->faker->date(),
            'jobs_completed' => $this->faker->randomNumber()
        ];
    }
}
