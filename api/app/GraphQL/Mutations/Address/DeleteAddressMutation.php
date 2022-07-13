<?php

namespace App\GraphQL\Mutations\Address;

use App\Models\Address;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;

class DeleteAddressMutation extends Mutation
{

    protected $attributes = [
        'name' => 'deleteAddress',
        'description' => 'Deletes an address.'
    ];

    public function type(): Type
    {
        return Type::boolean();
    }

    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::int()),
                'rules' => ['required']
            ],
            'first_lane' => [
                'name' => 'first_line',
                'type' => Type::string(),
            ],
            'second_line' => [
                'name' => 'second_line',
                'type' => Type::string(),
            ],
            'city' => [
                'name' => 'city',
                'type' => Type::string(),
            ],
            'state' => [
                'name' => 'state',
                'type' => Type::string(),
            ],
            'country' => [
                'name' => 'country',
                'type' => Type::string(),
            ],
            'zipcode' => [
                'name' => 'zipcode',
                'type' => Type::int(),
            ],
            'latitude' => [
                'name' => 'latitude',
                'type' => Type::int(),
            ],
            'longitude' => [
                'name' => 'longitude',
                'type' => Type::int(),
            ],
        ];
    }

    public function resolve($root, $args): bool
    {
        $address = Address::findOrFail($args['id']);
        return (bool)$address->delete();
    }
}
