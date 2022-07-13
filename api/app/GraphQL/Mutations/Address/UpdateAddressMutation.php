<?php

namespace App\GraphQL\Mutations\Address;

use App\Models\Address;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class UpdateAddressMutation extends Mutation
{

    protected $attributes = [
        'name' => 'updateAddress',
        'description' => 'Updates an address'
    ];

    public function type(): Type
    {
        return GraphQL::type('Address');
    }

    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::int()),
            ],

        ];
    }

    public function resolve($root, $args)
    {
        $address = Address::findOrFail($args['id']);
        $address->fill($args);
        $address->save();

        return $address;
    }
}
