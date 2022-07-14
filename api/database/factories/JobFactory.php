<?php

namespace Database\Factories;

use App\Models\Offerer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $users_id = User::all()->pluck('id')->toArray();
        $offerers_id = Offerer::all()->pluck('id')->toArray();
        return [
            'user_id' => $this->faker->randomElement($users_id),
            'offerer_id' => $this->faker->randomElement($offerers_id),
            'description' => $this->faker->realText(),
            'price' => $this->faker->randomFloat(2, 1000, 10000),
            'currency' => $this->faker->currencyCode()
        ];
    }
}
