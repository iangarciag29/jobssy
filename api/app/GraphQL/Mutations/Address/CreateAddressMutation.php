<?php

namespace App\GraphQL\Mutations\Address;

use App\Models\Address;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class CreateAddressMutation extends Mutation
{

    protected $attributes = [
        'name' => 'createAddress',
        'description' => 'Creates a new address.'
    ];

    public function type(): GraphQLType
    {
        return GraphQL::type('Address');
    }

    public function args(): array
    {
        return [
            'first_line' => [
                'name' => 'first_line',
                'type' => Type::nonNull(Type::string()),
            ],
            'second_line' => [
                'name' => 'second_line',
                'type' => Type::string(),
            ],
            'city' => [
                'name' => 'city',
                'type' => Type::nonNull(Type::string()),
            ],
            'state' => [
                'name' => 'state',
                'type' => Type::nonNull(Type::string()),
            ],
            'country' => [
                'name' => 'country',
                'type' => Type::nonNull(Type::string()),
            ],
            'zipcode' => [
                'name' => 'zipcode',
                'type' => Type::nonNull(Type::int()),
            ],
            'latitude' => [
                'name' => 'latitude',
                'type' => Type::nonNull(Type::int()),
            ],
            'longitude' => [
                'name' => 'longitude',
                'type' => Type::nonNull(Type::int()),
            ],
        ];
    }

    public function resolve($root, $args): Address
    {
        $address = new Address();
        $address->fill($args);
        $address->save();

        return $address;
    }
}
