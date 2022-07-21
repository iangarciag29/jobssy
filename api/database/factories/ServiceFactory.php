<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\Category;
use App\Models\Offerer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $offerers_id = Offerer::all()->pluck('id')->toArray();
        $addresses_id = Address::all()->pluck('id')->toArray();
        $categories_id = Category::all()->pluck('id')->toArray();

        return [
            'offerer_id' => $this->faker->randomElement($offerers_id),
            'address_id' => $this->faker->randomElement($addresses_id),
            'category_id' => $this->faker->randomElement($categories_id),
            'title' => $this->faker->words(5, true),
            'description' => $this->faker->text(),
            'price' => $this->faker->randomFloat(2, 1000, 10000),
            'currency' => $this->faker->currencyCode()
        ];
    }
}
