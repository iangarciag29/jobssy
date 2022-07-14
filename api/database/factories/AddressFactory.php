<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{

    protected $model = Address::class;

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
            'first_line' => $this->faker->streetName(),
            'city' => $this->faker->city(),
            'state' => $this->faker->countryCode(),
            'country' => $this->faker->country(),
            'zipcode' => $this->faker->numberBetween(70000, 90000),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude()
        ];
    }
}
