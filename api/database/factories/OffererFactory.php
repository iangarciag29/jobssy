<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory
 */
class OffererFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users_id = User::all()->pluck('id')->toArray();

        return [
            'user_id' => $this->faker->randomElement($users_id),
            'rating' => $this->faker->randomElement([1, 2, 3, 4, 5]),
            'start_time' => $this->faker->date(),
            'description' => $this->faker->text(),
            'jobs_completed' => $this->faker->randomNumber()
        ];
    }
}
