<?php

namespace Database\Factories;

use App\Models\Offerer;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bid>
 */
class BidFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $posts_id = Post::all()->pluck('id')->toArray();
        $offerers_id = Offerer::all()->pluck('id')->toArray();

        return [
            'post_id' => $this->faker->randomElement($posts_id),
            'offerer_id' => $this->faker->randomElement($offerers_id),
            'amount' => $this->faker->randomFloat(2, 100, 10000),
            'currency' => $this->faker->currencyCode()
        ];
    }
}
