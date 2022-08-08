<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $categories_id = Category::all()->pluck('id')->toArray();
        $users_id = User::all()->pluck('id')->toArray();

        return [
            'id' => uniqid("", true),
            'user_id' => $this->faker->randomElement($users_id),
            'category_id' => $this->faker->randomElement($categories_id),
            'title' => $this->faker->text(),
            'slug' => $this->faker->slug(),
            'description' => $this->faker->text(),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'visible' => $this->faker->randomElement([true, false]),
            'currency' => $this->faker->currencyCode()
        ];
    }
}
