<?php

namespace Database\Factories;

use App\Enum\JobState;
use App\Models\Offerer;
use App\Models\Rate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory
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
        $rates_id = Rate::all()->pluck('id')->toArray();
        return [
            'id' => uniqid("", true),
            'user_id' => $this->faker->randomElement($users_id),
            'offerer_id' => $this->faker->randomElement($offerers_id),
            'rate_id' => $this->faker->randomElement($rates_id),
            'description' => $this->faker->realText(),
            'price' => $this->faker->randomFloat(2, 1000, 10000),
            'state' => $this->faker->randomElement(JobState::options()),
            'currency' => $this->faker->currencyCode()
        ];
    }
}
