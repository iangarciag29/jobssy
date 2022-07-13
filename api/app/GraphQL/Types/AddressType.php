<?php

namespace App\GraphQL\Types;

use App\Models\Address;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class AddressType extends GraphQLType
{

    protected $attributes = [
        'name' => 'Address',
        'description' => 'Collection of addresses.',
        'model' => Address::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'ID of the address'
            ],
            'first_lane' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Address line 1'
            ],
            'second_line' => [
                'type' => Type::string(),
                'description' => 'Address line 2'
            ],
            'city' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'City'
            ],
            'state' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'State'
            ],
            'country' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Country'
            ],
            'zipcode' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Zip code'
            ],
            'latitude' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Latitude'
            ],
            'longitude' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Longitude'
            ],
        ];
    }
}
