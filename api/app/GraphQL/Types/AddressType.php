<?php

namespace App\GraphQL\Types;

use App\Models\Address;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
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
                'type' => Type::nonNull(Type::id()),
                'description' => 'ID of the address'
            ],
            'user' => [
                'type' => GraphQL::type('User'),
                'description' => 'User linked to the address.'
            ],
            'name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Address name'
            ],
            'latitude' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Latitude'
            ],
            'longitude' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Longitude'
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Address creation date.'
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Last time address was updated.'
            ]
        ];
    }
}
