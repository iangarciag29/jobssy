<?php

namespace App\GraphQL\Mutations\Address;

use App\Models\Address;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class UpdateAddressMutation extends Mutation
{

    /**
     * @var string[] Mutation details.
     */
    protected $attributes = [
        'name' => 'updateAddress',
        'description' => 'Updates an address'
    ];

    /**
     * @return Type Mutation model type.
     */
    public function type(): Type
    {
        return GraphQL::type('Address');
    }

    /**
     * @return array[] Mutation arguments.
     */
    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::int()),
            ],

        ];
    }

    /**
     * @param $root Mutation root object.
     * @param $args Mutation arguments.
     * @return Address
     */
    public function resolve($root, $args): Address
    {
        $address = Address::findOrFail($args['id']);
        $address->fill($args);
        $address->save();

        return $address;
    }
}
