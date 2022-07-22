<?php

namespace Database\Factories;

use App\Models\Offerer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rate>
 */
class RateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $offerers_id = Offerer::all()->pluck('id')->toArray();

        return [
            'id' => uniqid("", true),
            'offerer_id' => $this->faker->randomElement($offerers_id),
            'anonymous' => $this->faker->randomElement([true, false]),
            'value' => $this->faker->randomNumber([1, 2, 3, 4, 5]),
            'comment' => $this->faker->text()
        ];
    }
}
